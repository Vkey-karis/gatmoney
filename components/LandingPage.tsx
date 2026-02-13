import React from 'react';
import { User, Briefcase, ArrowRight, Building2, TrendingUp, ShieldCheck } from 'lucide-react';

interface LandingPageProps {
    onSelectMode: (mode: 'FREELANCER' | 'BUSINESS') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-5xl w-full">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-2">
                        GATSMONEY
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
                        AI-Powered Market Intelligence Platform
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-xs font-black text-emerald-500 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" /> System Operational {new Date().getFullYear()}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Freelancer Mode */}
                    <button
                        onClick={() => onSelectMode('FREELANCER')}
                        className="group relative bg-slate-900/50 hover:bg-slate-900 border-2 border-slate-800 hover:border-emerald-500 rounded-[2.5rem] p-10 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Freelancer / Creator</h2>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Generate high-demand gig strategies, find immediate opportunities, and automate your workflow.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest pt-4">
                                Launch Opportunity Engine <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>

                    {/* Business Mode */}
                    <button
                        onClick={() => onSelectMode('BUSINESS')}
                        className="group relative bg-slate-900/50 hover:bg-slate-900 border-2 border-slate-800 hover:border-indigo-500 rounded-[2.5rem] p-10 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Business / Startup</h2>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Identify market gaps, analyze competitors, and deploy high-ROI AI automation systems.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-widest pt-4">
                                Access Intelligence Core <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
