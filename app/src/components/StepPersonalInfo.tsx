import { useFormContext } from 'react-hook-form';
import { User, Mail, Phone, Calendar } from 'lucide-react';

export default function StepPersonalInfo() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <div className="space-y-6 animate-fadeUp">
            <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Personal Information</h2>
                <p className="text-slate-400 text-sm">Please provide your legal name as it appears on your ID.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">First Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            {...register('firstName')}
                            className={`form-input pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                            placeholder="John"
                        />
                    </div>
                    {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Last Name</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            {...register('lastName')}
                            className={`form-input pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                            placeholder="Doe"
                        />
                    </div>
                    {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message as string}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="email"
                            {...register('email')}
                            className={`form-input pl-10 ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="john@example.com"
                        />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="tel"
                            {...register('phone')}
                            className={`form-input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                            placeholder="(555) 123-4567"
                        />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message as string}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Date of Birth</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="date"
                        {...register('dob')}
                        className={`form-input pl-10 ${errors.dob ? 'border-red-500' : ''}`}
                    />
                </div>
                <p className="text-xs text-slate-500 mt-1">You must be at least 18 years old to apply.</p>
                {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob.message as string}</p>}
            </div>

            <div className="pt-4 border-t border-white/10 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Home Address</h3>
                <div className="space-y-4">
                    <div>
                        <input {...register('street')} placeholder="Street Address" className={`form-input ${errors.street ? 'border-red-500' : ''}`} />
                        {errors.street && <p className="text-red-400 text-xs mt-1">{errors.street.message as string}</p>}
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="col-span-2">
                            <input {...register('city')} placeholder="City" className={`form-input ${errors.city ? 'border-red-500' : ''}`} />
                            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message as string}</p>}
                        </div>
                        <div>
                            <input {...register('state')} placeholder="State" className={`form-input ${errors.state ? 'border-red-500' : ''}`} />
                            {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message as string}</p>}
                        </div>
                        <div>
                            <input {...register('zip')} placeholder="ZIP" className={`form-input ${errors.zip ? 'border-red-500' : ''}`} />
                            {errors.zip && <p className="text-red-400 text-xs mt-1">{errors.zip.message as string}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
