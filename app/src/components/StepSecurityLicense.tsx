import { useFormContext } from 'react-hook-form';
import { Shield, MapPin, Calendar, Camera } from 'lucide-react';

export default function StepSecurityLicense() {
    const { register, watch, formState: { errors } } = useFormContext();
    const file = watch('licensePhoto');

    return (
        <div className="space-y-6 animate-fadeUp">
            <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Security Credentials</h2>
                <p className="text-slate-400 text-sm">Provide your active guard card or security license details.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-300 mb-2">License / Guard Card Number</label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            {...register('licenseNumber')}
                            className={`form-input pl-10 ${errors.licenseNumber ? 'border-red-500' : ''}`}
                            placeholder="e.g. G12345678"
                        />
                    </div>
                    {errors.licenseNumber && <p className="text-red-400 text-xs mt-1">{errors.licenseNumber.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">State Issued</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <select
                            {...register('licenseState')}
                            className={`form-input pl-10 appearance-none bg-no-repeat ${errors.licenseState ? 'border-red-500' : ''}`}
                            style={{ backgroundPosition: 'right 16px center' }}
                        >
                            <option value="">Select State...</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            {/* Simplified for demo, add all 50 states */}
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    {errors.licenseState && <p className="text-red-400 text-xs mt-1">{errors.licenseState.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Expiration Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="date"
                            {...register('licenseExpiry')}
                            className={`form-input pl-10 ${errors.licenseExpiry ? 'border-red-500' : ''}`}
                        />
                    </div>
                    {errors.licenseExpiry && <p className="text-red-400 text-xs mt-1">{errors.licenseExpiry.message as string}</p>}
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-semibold text-slate-300 mb-2">Upload Photo of License</label>
                <div className="bg-slate-900/50 border border-slate-700 hover:border-purple-500/50 transition-colors rounded-xl p-6">
                    <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-600 hover:border-purple-400 hover:bg-purple-900/10 transition-all rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center">
                            <Camera className="w-6 h-6 text-slate-400 mb-2" />
                            <span className="text-sm font-medium text-slate-300">
                                {file && file.length > 0 ? file[0].name : 'Click to attach image'}
                            </span>
                        </div>
                        <input
                            type="file"
                            {...register('licensePhoto')}
                            className="hidden"
                            accept="image/*"
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
