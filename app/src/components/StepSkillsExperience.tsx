import { useFormContext } from 'react-hook-form';

const SKILL_OPTIONS = [
    "Unarmed Combat", "Armed Certified", "Crowd Control",
    "Access Control", "CCTV Monitoring", "Event Security",
    "Executive Protection", "Patrol Driver", "First Responder"
];

const CERT_OPTIONS = [
    "CPR Certified", "First Aid", "Baton", "Pepper Spray", "Taser", "Fire Guard"
];

const LANG_OPTIONS = [
    "English", "Spanish", "French", "Mandarin", "ASL"
];

export default function StepSkillsExperience() {
    const { register, watch, setValue, formState: { errors } } = useFormContext();

    const selectedSkills = watch('skills') || [];
    const selectedCerts = watch('certifications') || [];
    const selectedLangs = watch('languages') || [];

    const toggleArrayItem = (field: string, current: string[], value: string) => {
        if (current.includes(value)) {
            setValue(field, current.filter(i => i !== value), { shouldValidate: true });
        } else {
            setValue(field, [...current, value], { shouldValidate: true });
        }
    };

    const ChipList = ({ options, fieldName, currentValues }: any) => (
        <div className="flex flex-wrap gap-3">
            {options.map((opt: string) => {
                const isActive = currentValues.includes(opt);
                return (
                    <button
                        key={opt}
                        type="button"
                        onClick={() => toggleArrayItem(fieldName, currentValues, opt)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${isActive
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-500'
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
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Skills & Experience</h2>
                <p className="text-slate-400 text-sm">Tell us about your professional background and capabilities.</p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Years of Experience in Security</label>
                <select
                    {...register('experienceYears')}
                    className={`form-input appearance-none bg-no-repeat w-full max-w-xs ${errors.experienceYears ? 'border-red-500' : ''}`}
                    style={{ backgroundPosition: 'right 16px center' }}
                >
                    <option value="" disabled>Select...</option>
                    <option value="0-1">0 - 1 year</option>
                    <option value="1-3">1 - 3 years</option>
                    <option value="3-5">3 - 5 years</option>
                    <option value="5-10">5 - 10 years</option>
                    <option value="10+">10+ years</option>
                </select>
                {errors.experienceYears && <p className="text-red-400 text-xs mt-1">{errors.experienceYears.message as string}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Core Skills (Select all that apply)</label>
                <ChipList options={SKILL_OPTIONS} fieldName="skills" currentValues={selectedSkills} />
                {errors.skills && <p className="text-red-400 text-xs mt-1">{errors.skills.message as string}</p>}
            </div>

            <div>
                <label className="block text-sm font-semibold text-slate-300 mb-3">Certifications (Optional)</label>
                <ChipList options={CERT_OPTIONS} fieldName="certifications" currentValues={selectedCerts} />
            </div>

            <div className="pt-6 border-t border-white/10">
                <label className="block text-sm font-semibold text-slate-300 mb-3">Languages Spoken</label>
                <ChipList options={LANG_OPTIONS} fieldName="languages" currentValues={selectedLangs} />
            </div>
        </div>
    );
}
