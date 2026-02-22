import { useFormContext } from 'react-hook-form';

const DAY_OPTIONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SHIFT_OPTIONS = ['Morning (Day)', 'Swing (Evening)', 'Graveyard (Night)', 'On-Demand / Flexible'];

export default function StepAvailability() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();

    const selectedDays = watch('availableDays') || [];
    const selectedShifts = watch('preferredShifts') || [];

    const toggleArrayItem = (field: string, current: string[], value: string) => {
        if (current.includes(value)) {
            setValue(field, current.filter(i => i !== value), { shouldValidate: true });
        } else {
            setValue(field, [...current, value], { shouldValidate: true });
        }
    };

    const ChipList = ({ options, fieldName, currentValues }: any) => (
        <div className="flex flex-wrap gap-2">
            {options.map((opt: string) => {
                const isActive = currentValues.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => toggleArrayItem(fieldName, currentValues, opt)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                            ? 'bg-indigo-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.3)]'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                            }`}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-8 animate-fadeUp">
            <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Availability & Preferences</h2>
                <p className="text-slate-400 text-sm">Let us know when and where you prefer to work.</p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Available Days</label>
                <ChipList options={DAY_OPTIONS} fieldName="availableDays" currentValues={selectedDays} />
                {errors.availableDays && <p className="text-red-400 text-xs mt-2">{errors.availableDays.message as string}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Preferred Shifts</label>
                <ChipList options={SHIFT_OPTIONS} fieldName="preferredShifts" currentValues={selectedShifts} />
                {errors.preferredShifts && <p className="text-red-400 text-xs mt-2">{errors.preferredShifts.message as string}</p>}
            </div>

            <div className="pt-4 border-t border-white/10">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Max Travel Radius (Miles)</label>
                <div className="flex items-center gap-4 max-w-sm">
                    <input
                        type="range"
                        min="5"
                        max="100"
                        step="5"
                        {...register('serviceRadius')}
                        className="w-full accent-purple-500"
                    />
                    <span className="text-white font-semibold min-w-[3rem] text-center bg-slate-800 px-3 py-1 rounded-lg">
                        {watch('serviceRadius')}m
                    </span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Short Bio (Optional)</label>
                <textarea
                    {...register('bio')}
                    className="form-input min-h-[100px] resize-y"
                    placeholder="Tell us a little about your security philosophy or background..."
                />
            </div>
        </div>
    );
}
