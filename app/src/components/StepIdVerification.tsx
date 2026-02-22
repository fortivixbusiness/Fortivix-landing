import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Upload, Camera, FileCheck, X, User } from 'lucide-react';

export default function StepIdVerification() {
    const { setValue } = useFormContext();

    // Preview local state
    const [previews, setPreviews] = useState<{ [key: string]: string }>({});

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue(fieldName, file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews(prev => ({ ...prev, [fieldName]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeFile = (fieldName: string) => {
        setValue(fieldName, null);
        setPreviews(prev => {
            const updated = { ...prev };
            delete updated[fieldName];
            return updated;
        });
    };

    const FileUploader = ({ fieldName, label, description, icon: Icon }: any) => {
        const preview = previews[fieldName];

        return (
            <div className="bg-slate-900/50 border border-slate-700 hover:border-purple-500/50 transition-colors rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <Icon className="w-5 h-5 text-purple-400" /> {label}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">{description}</p>
                    </div>
                </div>

                {preview ? (
                    <div className="relative rounded-lg overflow-hidden border border-slate-700 bg-black/50 aspect-video flex items-center justify-center">
                        <img src={preview} alt="Preview" className="max-h-full object-contain" />
                        <button
                            onClick={() => removeFile(fieldName)}
                            type="button"
                            className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white flex items-center gap-2">
                            <FileCheck className="w-3 h-3 text-green-400" /> Uploaded successfully
                        </div>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 hover:border-purple-400 hover:bg-purple-900/10 transition-all rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 text-slate-400 mb-3" />
                            <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-white">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, fieldName)}
                        />
                    </label>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fadeUp">
            <div>
                <h2 className="text-2xl font-display font-semibold text-white mb-2">Identity Verification</h2>
                <p className="text-slate-400 text-sm">Upload clear photos of your valid government-issued ID.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUploader
                    fieldName="idFront"
                    label="Front of ID"
                    description="Driver's License or State ID"
                    icon={Camera}
                />
                <FileUploader
                    fieldName="idBack"
                    label="Back of ID"
                    description="Ensure barcode is fully visible"
                    icon={Camera}
                />
            </div>

            <FileUploader
                fieldName="selfie"
                label="Selfie with ID"
                description="Take a clear selfie holding your ID next to your face"
                icon={User}
            />
        </div>
    );
}
