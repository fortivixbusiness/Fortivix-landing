import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, User, CreditCard, Briefcase, Calendar, CheckCircle } from 'lucide-react';

import StepPersonalInfo from './components/StepPersonalInfo';
import StepIdVerification from './components/StepIdVerification';
import StepSecurityLicense from './components/StepSecurityLicense';
import StepSkillsExperience from './components/StepSkillsExperience';
import StepAvailability from './components/StepAvailability';
import StepReviewSubmit from './components/StepReviewSubmit';

// Zod Schema
const onboardingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  dob: z.string().min(1, "Date of birth is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP code is required"),

  idFront: z.any().optional(), // In production, handle File validations
  idBack: z.any().optional(),
  selfie: z.any().optional(),

  licenseNumber: z.string().min(1, "License number is required"),
  licenseState: z.string().min(2, "Issuing state is required"),
  licenseExpiry: z.string().min(1, "Expiration date is required"),
  licensePhoto: z.any().optional(),

  experienceYears: z.string().min(1, "Experience is required"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  certifications: z.array(z.string()),
  languages: z.array(z.string()),

  availableDays: z.array(z.string()).min(1, "Select at least one available day"),
  preferredShifts: z.array(z.string()).min(1, "Select preferred shifts"),
  serviceRadius: z.string(),
  bio: z.string().optional(),

  consentBackground: z.boolean().refine(val => val === true, "Must consent to background check"),
  consentTerms: z.boolean().refine(val => val === true, "Must agree to terms"),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const STEPS = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'ID Verification', icon: CreditCard },
  { id: 3, title: 'Security License', icon: Shield },
  { id: 4, title: 'Skills', icon: Briefcase },
  { id: 5, title: 'Availability', icon: Calendar },
  { id: 6, title: 'Review', icon: CheckCircle },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    mode: 'onTouched',
    defaultValues: {
      skills: [],
      certifications: [],
      languages: [],
      availableDays: [],
      preferredShifts: [],
      experienceYears: "",
      serviceRadius: "50",
    }
  });

  // Auto-save to LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('fortivixOnboardingDraft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        methods.reset(parsed.data);
        if (parsed.step) setCurrentStep(parsed.step);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('fortivixOnboardingDraft', JSON.stringify({
        data: value,
        step: currentStep
      }));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, currentStep]);

  const nextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: any = [];
    if (currentStep === 1) fieldsToValidate = ['firstName', 'lastName', 'email', 'phone', 'dob', 'street', 'city', 'state', 'zip'];
    if (currentStep === 2) fieldsToValidate = []; // Add specific ID fields if making them required
    if (currentStep === 3) fieldsToValidate = ['licenseNumber', 'licenseState', 'licenseExpiry'];
    if (currentStep === 4) fieldsToValidate = ['experienceYears', 'skills'];
    if (currentStep === 5) fieldsToValidate = ['availableDays', 'preferredShifts'];

    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(s => Math.min(s + 1, 6));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(s => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: OnboardingFormData) => {
    // Here we would typically send to Supabase
    console.log("Submitting to Supabase:", data);

    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));

    localStorage.removeItem('fortivixOnboardingDraft');
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="hero flex items-center justify-center min-h-screen">
        <div className="text-center bg-card-dark p-12 rounded-2xl border border-dark-hover max-w-md w-full">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold mb-4">Application Submitted!</h2>
          <p className="text-slate-400 mb-8">
            Thank you for applying to the Fortivix network. Our compliance team will review your credentials within 24-48 hours.
          </p>
          <a href="/" className="btn-primary w-full">Return Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation matching original */}
      <nav className="fixed top-0 w-full z-50 bg-[#060a14]/80 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-white no-underline">
            <Shield className="w-8 h-8 text-purple-500" />
            <span>Fortivix</span>
          </a>
          <a href="/" className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all">Back to Home</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero pt-32 pb-12" style={{ minHeight: 'auto' }}>
        <div className="hero-grid-bg"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">
              Complete Your <span className="gradient-text">Guard Profile</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Join the future of private security. Please provide accurate information to expedite your background check.
            </p>
          </div>

          {/* Progress Bar & Form Container */}
          <div className="max-w-4xl mx-auto">
            {/* Progress UI */}
            <div className="mb-8">
              <div className="flex justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 -translate-y-1/2 rounded"></div>
                <div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 -z-10 -translate-y-1/2 rounded transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / 5) * 100}%` }}
                ></div>

                {STEPS.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;

                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${isActive ? 'bg-indigo-600 border-indigo-400 text-white' :
                        isCompleted ? 'bg-purple-600 border-purple-600 text-white' :
                          'bg-slate-900 border-slate-700 text-slate-500'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs font-semibold hidden sm:block ${isActive || isCompleted ? 'text-white' : 'text-slate-500'}`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Area */}
            <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Step Contents */}
                  <div className="min-h-[400px]">
                    {currentStep === 1 && <StepPersonalInfo />}
                    {currentStep === 2 && <StepIdVerification />}
                    {currentStep === 3 && <StepSecurityLicense />}
                    {currentStep === 4 && <StepSkillsExperience />}
                    {currentStep === 5 && <StepAvailability />}
                    {currentStep === 6 && <StepReviewSubmit />}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="px-6 py-3 rounded-xl font-semibold opacity-80 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed bg-slate-800 text-white transition-all"
                    >
                      Back
                    </button>

                    {currentStep < 6 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary"
                      >
                        Continue to Next Step
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={methods.formState.isSubmitting}
                        className="btn-primary group"
                      >
                        {methods.formState.isSubmitting ? 'Submitting...' : 'Submit Final Application'}
                      </button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
