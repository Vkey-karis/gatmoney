import React, { useState, useEffect } from 'react';
import { Key, Check, X, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { saveUserAPIKey, deleteUserAPIKey, testAPIKey, getUserAPIKeys } from '../services/apiKeyManagement';
import { UserAPIKey } from '../types';
import { useAuth } from '../context/AuthContext';

const APIKeyManager: React.FC = () => {
    const { user } = useAuth();
    const [imagenKey, setImagenKey] = useState('');
    const [veoKey, setVeoKey] = useState('');
    const [showImagenKey, setShowImagenKey] = useState(false);
    const [showVeoKey, setShowVeoKey] = useState(false);
    const [testingImagen, setTestingImagen] = useState(false);
    const [testingVeo, setTestingVeo] = useState(false);
    const [imagenStatus, setImagenStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [veoStatus, setVeoStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [savedKeys, setSavedKeys] = useState<UserAPIKey[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadSavedKeys();
        }
    }, [user]);

    const loadSavedKeys = async () => {
        if (!user) return;
        setLoading(true);
        const keys = await getUserAPIKeys(user.id);
        setSavedKeys(keys);
        setImagenStatus(keys.some(k => k.serviceName === 'gemini_imagen' && k.isActive) ? 'valid' : 'idle');
        setVeoStatus(keys.some(k => k.serviceName === 'veo' && k.isActive) ? 'valid' : 'idle');
        setLoading(false);
    };

    const handleTestImagen = async () => {
        if (!imagenKey.trim()) return;
        setTestingImagen(true);
        const result = await testAPIKey(imagenKey, 'gemini_imagen');
        setImagenStatus(result.valid ? 'valid' : 'invalid');
        setTestingImagen(false);
    };

    const handleTestVeo = async () => {
        if (!veoKey.trim()) return;
        setTestingVeo(true);
        const result = await testAPIKey(veoKey, 'veo');
        setVeoStatus(result.valid ? 'valid' : 'invalid');
        setTestingVeo(false);
    };

    const handleSaveImagen = async () => {
        if (!user || !imagenKey.trim()) return;
        const success = await saveUserAPIKey(user.id, 'gemini_imagen', imagenKey);
        if (success) {
            setImagenKey('');
            loadSavedKeys();
        }
    };

    const handleSaveVeo = async () => {
        if (!user || !veoKey.trim()) return;
        const success = await saveUserAPIKey(user.id, 'veo', veoKey);
        if (success) {
            setVeoKey('');
            loadSavedKeys();
        }
    };

    const handleDeleteKey = async (serviceName: 'gemini_imagen' | 'veo') => {
        if (!user) return;
        const success = await deleteUserAPIKey(user.id, serviceName);
        if (success) {
            loadSavedKeys();
            if (serviceName === 'gemini_imagen') setImagenStatus('idle');
            if (serviceName === 'veo') setVeoStatus('idle');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4 animate-fade-in">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
                    API Key Management
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-bold">
                    Use your own API keys to generate unlimited media without using credits
                </p>
            </div>

            {/* Info Alert */}
            <div className="mb-8 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100 font-bold">
                    <p className="mb-2">Your API keys are encrypted and stored securely. When you use your own keys:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>You won't consume your monthly credits</li>
                        <li>You'll be billed directly by Google for API usage</li>
                        <li>You have full control over your spending</li>
                    </ul>
                </div>
            </div>

            {/* Gemini Imagen API Key */}
            <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-emerald-500/10">
                        <Key className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-slate-900 dark:text-white">Gemini Imagen API Key</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">For image generation</p>
                    </div>
                    {imagenStatus === 'valid' && (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                            <Check className="w-4 h-4" />
                            Active
                        </div>
                    )}
                </div>

                {imagenStatus === 'valid' ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                            API key configured and active
                        </span>
                        <button
                            onClick={() => handleDeleteKey('gemini_imagen')}
                            className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-950/20 hover:bg-red-200 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="relative mb-3">
                            <input
                                type={showImagenKey ? 'text' : 'password'}
                                value={imagenKey}
                                onChange={(e) => setImagenKey(e.target.value)}
                                placeholder="Enter your Gemini Imagen API key"
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 outline-none font-mono text-sm text-slate-900 dark:text-white"
                            />
                            <button
                                onClick={() => setShowImagenKey(!showImagenKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                {showImagenKey ? (
                                    <EyeOff className="w-4 h-4 text-slate-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-slate-400" />
                                )}
                            </button>
                        </div>

                        {imagenStatus === 'invalid' && (
                            <p className="text-sm text-red-600 dark:text-red-400 font-bold mb-3 flex items-center gap-2">
                                <X className="w-4 h-4" />
                                Invalid API key. Please check and try again.
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleTestImagen}
                                disabled={!imagenKey.trim() || testingImagen}
                                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                            >
                                {testingImagen ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    'Test Connection'
                                )}
                            </button>
                            <button
                                onClick={handleSaveImagen}
                                disabled={!imagenKey.trim() || imagenStatus === 'idle' || imagenStatus === 'invalid'}
                                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest transition-colors"
                            >
                                Save Key
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Veo API Key */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-indigo-500/10">
                        <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-black text-slate-900 dark:text-white">Veo 3.1 Fast API Key</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">For video generation</p>
                    </div>
                    {veoStatus === 'valid' && (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                            <Check className="w-4 h-4" />
                            Active
                        </div>
                    )}
                </div>

                {veoStatus === 'valid' ? (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                        <span className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                            API key configured and active
                        </span>
                        <button
                            onClick={() => handleDeleteKey('veo')}
                            className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-950/20 hover:bg-red-200 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest transition-colors"
                        >
                            Remove
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="relative mb-3">
                            <input
                                type={showVeoKey ? 'text' : 'password'}
                                value={veoKey}
                                onChange={(e) => setVeoKey(e.target.value)}
                                placeholder="Enter your Veo API key"
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 outline-none font-mono text-sm text-slate-900 dark:text-white"
                            />
                            <button
                                onClick={() => setShowVeoKey(!showVeoKey)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                {showVeoKey ? (
                                    <EyeOff className="w-4 h-4 text-slate-400" />
                                ) : (
                                    <Eye className="w-4 h-4 text-slate-400" />
                                )}
                            </button>
                        </div>

                        {veoStatus === 'invalid' && (
                            <p className="text-sm text-red-600 dark:text-red-400 font-bold mb-3 flex items-center gap-2">
                                <X className="w-4 h-4" />
                                Invalid API key. Please check and try again.
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={handleTestVeo}
                                disabled={!veoKey.trim() || testingVeo}
                                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                            >
                                {testingVeo ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Testing...
                                    </>
                                ) : (
                                    'Test Connection'
                                )}
                            </button>
                            <button
                                onClick={handleSaveVeo}
                                disabled={!veoKey.trim() || veoStatus === 'idle' || veoStatus === 'invalid'}
                                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest transition-colors"
                            >
                                Save Key
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Help Section */}
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <h4 className="font-black text-slate-900 dark:text-white mb-3">How to get your API keys</h4>
                <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-bold list-decimal list-inside">
                    <li>Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">Google AI Studio</a></li>
                    <li>Sign in with your Google account</li>
                    <li>Navigate to "Get API Key" section</li>
                    <li>Create a new API key or use an existing one</li>
                    <li>Copy the key and paste it above</li>
                </ol>
            </div>
        </div>
    );
};

export default APIKeyManager;
