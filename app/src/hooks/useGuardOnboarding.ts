import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useGuardOnboarding(userId: string | undefined) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize draft and step from local storage OR profiles table
    useEffect(() => {
        if (!userId) return;

        const loadState = async () => {
            // 1. Check local storage first (most recent edits)
            const draftKey = `guard_onboarding_form_data_${userId}`;
            const saved = localStorage.getItem(draftKey);

            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.step) setCurrentStep(parsed.step);
                    // Note: The form defaultValues are populated by App.tsx observing this storage as well
                    return;
                } catch (e) {
                    console.error("Failed to parse local draft", e);
                }
            }

            // 2. If no local storage, check profile progress
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('guard_onboarding_step, guard_status')
                    .eq('id', userId)
                    .single();

                if (error && error.code !== 'PGRST116') { // Ignore row not found
                    console.error('Error fetching profile progress', error);
                } else if (data) {
                    if (data.guard_status === 'pending_approval' || data.guard_status === 'approved') {
                        setIsSubmitted(true);
                    } else if (data.guard_status === 'onboarding' && data.guard_onboarding_step) {
                        setCurrentStep(data.guard_onboarding_step);
                    }
                }
            } catch (err) {
                console.error("Error checking profile state:", err);
            }
        };

        loadState();
    }, [userId]);

    const goToStep = async (newStep: number) => {
        setCurrentStep(newStep);
        window.scrollTo(0, 0);

        // Update profile step
        if (userId) {
            await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    guard_onboarding_step: newStep,
                    guard_status: 'onboarding'
                }, { onConflict: 'id' });
        }
    };

    const nextStep = () => goToStep(Math.min(currentStep + 1, 6));
    const prevStep = () => goToStep(Math.max(currentStep - 1, 1));

    const uploadFile = async (file: File | string | undefined, path: string) => {
        if (!file || typeof file === 'string') return file; // Already a URL or empty

        // Prevent crash if File object was stripped by localStorage upon page refresh
        if (!file.name) {
            throw new Error(`Your uploaded image for the ${path} field was lost (likely due to a page refresh). Please go back to the previous steps and re-select your photos before submitting.`);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${path}_${Date.now()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('guard-documents')
            .upload(filePath, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('guard-documents')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const submitApplication = async (formData: any) => {
        if (!userId) throw new Error("User not authenticated");
        setIsSubmitting(true);

        try {
            // 1. Upload files concurrently
            const [idFrontUrl, idBackUrl, selfieUrl, licenseUrl] = await Promise.all([
                uploadFile(formData.idFront, 'idPhotoFrontUrl'),
                uploadFile(formData.idBack, 'idPhotoBackUrl'),
                uploadFile(formData.selfie, 'selfiePhotoUrl'),
                uploadFile(formData.licensePhoto, 'licensePhotoUrl'),
            ]);

            // 2. Format payload
            const payload = {
                guard_id: userId,
                legal_name: `${formData.firstName} ${formData.lastName}`.trim(),
                date_of_birth: formData.dob,
                phone: formData.phone,
                address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`,
                id_photo_front_url: idFrontUrl,
                id_photo_back_url: idBackUrl,
                selfie_photo_url: selfieUrl,
                license_number: formData.licenseNumber,
                license_state: formData.licenseState,
                license_expiration: formData.licenseExpiry,
                license_photo_url: licenseUrl,
                years_experience: parseInt(formData.experienceYears) || 0,
                skills: formData.skills,
                certifications: formData.certifications,
                languages: formData.languages,
                availability_days: formData.availableDays,
                availability_shifts: formData.preferredShifts,
                service_radius_miles: parseInt(formData.serviceRadius) || null,
                short_bio: formData.bio,
                consent_to_background_check: formData.consentBackground,
                consent_to_drug_test: true, // Assuming this maps to terms/background or is added later
                consent_to_terms: formData.consentTerms,
                status: 'pending',
                submitted_at: new Date().toISOString()
            };

            // 3. Upsert profile status first to satisfy foreign key constraints
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    id: userId,
                    email: formData.email,
                    guard_status: 'pending_approval',
                    guard_onboarding_completed_at: new Date().toISOString(),
                    is_guard: true,
                    skills: formData.skills
                }, { onConflict: 'id' });

            if (profileError) throw profileError;

            // 4. Upsert into guard_verifications
            const { error: verifError } = await supabase
                .from('guard_verifications')
                .upsert(payload, { onConflict: 'guard_id' });

            if (verifError) throw verifError;

            // 5. Success - Clear draft
            localStorage.removeItem(`guard_onboarding_form_data_${userId}`);
            setIsSubmitted(true);

        } catch (error) {
            console.error("Submission failed:", error);
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        currentStep,
        isSubmitted,
        isSubmitting,
        nextStep,
        prevStep,
        submitApplication,
        setCurrentStep // Expose if needed for direct jumps
    };
}
