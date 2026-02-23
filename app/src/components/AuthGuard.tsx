import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Shield, Mail, ArrowRight, Loader2 } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [message, setMessage] = useState<{ text: string; iType: 'success' | 'error' | null }>({ text: '', iType: null });

    useEffect(() => {
        let timer: any;
        if (cooldown > 0) {
            timer = setInterval(() => setCooldown(c => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [cooldown]);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setMessage({ text: '', iType: null });

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: window.location.href,
                },
            });

            if (error) throw error;

            setMessage({
                text: 'Check your email for the login link!',
                iType: 'success'
            });
            setCooldown(60);
            setEmail('');
        } catch (error: any) {
            setMessage({
                text: error.error_description || error.message || 'An error occurred during login.',
                iType: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#060a14]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    <p className="text-slate-400 font-medium">Verifying session...</p>
                </div>
            </div>
        );
    }

    // If authenticated, render the children (the onboarding flow)
    if (session) {
        return <>{children}</>;
    }

    // If not authenticated, show the login UI
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060a14] relative overflow-hidden">
            {/* Background styling matching the landing page */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[120px] rounded-full point-events-none"></div>

            <div className="relative z-10 w-full max-w-md p-8">
                <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-white/5 mb-6 group-hover:border-purple-500/30 transition-colors shadow-lg shadow-black/50">
                            <Shield className="w-8 h-8 text-purple-500" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-white mb-2">Secure Access</h2>
                        <p className="text-slate-400 text-sm">
                            Enter your email to receive a secure login link. No password required.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none text-white placeholder-slate-500"
                                    placeholder="guard@example.com"
                                />
                            </div>
                        </div>

                        {message.iType === 'success' && (
                            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm text-center">
                                {message.text}
                            </div>
                        )}

                        {message.iType === 'error' && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || !email || cooldown > 0}
                            className="w-full py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 focus:ring-2 focus:ring-purple-500 focus:outline-none focus:ring-offset-2 focus:ring-offset-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : cooldown > 0 ? (
                                `Wait ${cooldown}s`
                            ) : (
                                <>
                                    Send Magic Link
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-slate-500">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </div>
            </div>
        </div>
    );
}
