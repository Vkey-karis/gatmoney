
import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus, AlertCircle, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../services/supabase';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                // Optional: Show success message for email verification if needed
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'An error occurred during authentication.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Failed to initiate Google Login.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-[0_0_100px_rgba(79,70,229,0.2)] border border-slate-200 dark:border-slate-800 overflow-hidden relative">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-10">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                            {isSignUp ? 'Join GAT' : 'Welcome Back'}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide">
                            {isSignUp ? 'Start your money-making machine' : 'Access your dashboard'}
                        </p>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full py-4 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-900 dark:text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with email</span>
                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-4 font-bold text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                <p className="text-xs font-bold text-red-600 dark:text-red-400">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                            className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                        >
                            {isSignUp ? 'Already have an account? Sign In' : 'New to GAT? Create Account'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
