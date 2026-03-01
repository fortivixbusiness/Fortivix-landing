import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from './lib/supabase';

const guardSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  licenseNumber: z.string().min(1, 'License number is required').refine((val) => {
    // Exactly 8 digits
    if (/^\d{8}$/.test(val)) return true;
    // Exactly 9 characters containing exactly 1 letter and 8 digits (e.g., A12345678, 12345678A)
    // letters and numbers only, no spaces or special characters
    if (/^[A-Za-z0-9]{9}$/.test(val)) {
      const letters = val.match(/[A-Za-z]/g);
      const numbers = val.match(/[0-9]/g);
      return letters?.length === 1 && numbers?.length === 8;
    }
    return false;
  }, {
    message: 'Enter a valid license number (8 digits, or 1 letter + 8 digits).',
  }),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type GuardFormData = z.infer<typeof guardSchema>;

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GuardFormData>({
    resolver: zodResolver(guardSchema) as any,
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      licenseNumber: '',
      email: '',
    },
  });

  const onSubmit = async (data: GuardFormData) => {
    setSubmitError(null);
    try {
      const { error } = await supabase
        .from('guard_applications')
        .insert({
          first_name: data.firstName,
          middle_name: data.middleName || null,
          last_name: data.lastName,
          license_number: data.licenseNumber,
          email: data.email,
        });

      if (error) throw error;
      setIsSubmitted(true);
    } catch (e: any) {
      console.error('Submission error:', e);
      setSubmitError(e.message || 'Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'var(--slate-950)' }}>
        <div className="text-center p-12 rounded-2xl border max-w-md w-full" style={{ background: 'var(--slate-900)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <CheckCircle className="w-20 h-20 mx-auto mb-6" style={{ color: '#4ade80' }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'white', fontFamily: 'var(--font-display)' }}>Application Submitted!</h2>
          <p className="mb-8" style={{ color: 'var(--slate-400)' }}>
            Thank you for applying to the Fortivix network. We'll review your information and get back to you shortly.
          </p>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: '12px',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(135deg, var(--purple-600), var(--indigo-600))',
              textDecoration: 'none',
            }}
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-950)' }}>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: 'rgba(6,10,20,0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '16px 0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'white', fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
            <Shield style={{ width: 32, height: 32, color: 'var(--purple-500)' }} />
            <span>Fortivix</span>
          </a>
          <a href="/" style={{
            padding: '10px 20px', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600,
            background: 'rgba(255,255,255,0.05)', color: 'var(--slate-300)',
            border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none',
          }}>
            Back to Home
          </a>
        </div>
      </nav>

      {/* Form Section */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
              Join as a <span style={{ background: 'linear-gradient(135deg, var(--purple-400), var(--blue-500))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Security Guard</span>
            </h1>
            <p style={{ color: 'var(--slate-400)', fontSize: '1.05rem' }}>
              Get started by providing your basic information and license details.
            </p>
          </div>

          <div style={{
            background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px',
            padding: '40px',
          }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* First Name */}
                <div>
                  <label style={{ display: 'block', color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                    First Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    {...register('firstName')}
                    placeholder="John"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      background: 'var(--slate-900)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                  {errors.firstName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.firstName.message}</p>}
                </div>

                {/* Middle Name */}
                <div>
                  <label style={{ display: 'block', color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                    Middle Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    {...register('middleName')}
                    placeholder="Middle name"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      background: 'var(--slate-900)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                  {errors.middleName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.middleName.message}</p>}
                </div>

                {/* Last Name */}
                <div>
                  <label style={{ display: 'block', color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                    Last Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    {...register('lastName')}
                    placeholder="Doe"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      background: 'var(--slate-900)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                  {errors.lastName && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.lastName.message}</p>}
                </div>

                {/* License Number */}
                <div>
                  <label style={{ display: 'block', color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                    License Number <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    {...register('licenseNumber')}
                    placeholder="e.g. G-12345678"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      background: 'var(--slate-900)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                  {errors.licenseNumber && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.licenseNumber.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '6px' }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="john@example.com"
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      background: 'var(--slate-900)', border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white', fontSize: '0.95rem', outline: 'none',
                    }}
                  />
                  {errors.email && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email.message}</p>}
                </div>

                {/* Error message */}
                {submitError && (
                  <div style={{
                    padding: '12px 16px', borderRadius: '12px',
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    color: '#ef4444', fontSize: '0.875rem',
                  }}>
                    {submitError}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px',
                    fontWeight: 700, fontSize: '1rem', color: 'white', border: 'none', cursor: 'pointer',
                    background: isSubmitting ? 'var(--slate-700)' : 'linear-gradient(135deg, var(--purple-600), var(--indigo-600))',
                    opacity: isSubmitting ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    marginTop: '8px',
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
