import { useFormContext } from 'react-hook-form';
import { FileText, MapPin, Shield, Calendar } from 'lucide-react';

export default function StepReviewSubmit() {
    const { register, watch, formState: { errors } } = useFormContext();
    const values = watch();

    const SummaryItem = ({ label, value, icon: Icon }: any) => (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
            <div className="mt-0.5">
                <Icon className="w-5 h-5 text-slate-400" />
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm text-white font-medium">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeUp">
            <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Review & Submit</h2>
                <p className="text-slate-400 text-sm">Please verify your information before submitting the application.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SummaryItem
                    label="Full Name"
                    value={`${values.firstName || ''} ${values.lastName || ''}`}
                    icon={FileText}
                />
                <SummaryItem
                    label="License Info"
                    value={`${values.licenseNumber || ''} (${values.licenseState || ''})`}
                    icon={Shield}
                />
                <SummaryItem
                    label="Location"
                    value={`${values.city || ''}, ${values.state || ''} ${values.zip || ''}`}
                    icon={MapPin}
                />
                <SummaryItem
                    label="Availability"
                    value={`${values.availableDays?.length || 0} days, ${values.preferredShifts?.length || 0} shifts`}
                    icon={Calendar}
                />
            </div>

            {/* Consents */}
            <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Required Consents</h3>

                <label className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${errors.consentBackground ? 'bg-red-900/10 border-red-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                    <div className="pt-1">
                        <input
                            type="checkbox"
                            {...register('consentBackground')}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-white font-medium mb-1">Background Check Authorization <span className="text-red-400">*</span></p>
                        <p className="text-xs text-slate-400">I consent to Fortivix performing a comprehensive background and criminal record check as part of the onboarding process.</p>
                    </div>
                </label>

                <label className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${errors.consentTerms ? 'bg-red-900/10 border-red-500/50' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
                    <div className="pt-1">
                        <input
                            type="checkbox"
                            {...register('consentTerms')}
                            className="w-5 h-5 rounded border-slate-600 bg-slate-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                        />
                    </div>
                    <div>
                        <p className="text-sm text-white font-medium mb-1">Terms of Service & Privacy Policy <span className="text-red-400">*</span></p>
                        <p className="text-xs text-slate-400">I agree to the Fortivix Independent Contractor Agreement, Terms of Service, and Privacy Policy.</p>
                    </div>
                </label>
            </div>
        </div>
    );
}
