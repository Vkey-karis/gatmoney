import React from 'react';
import { ArrowRight, Zap, Briefcase, Wrench, Equal, Search, TrendingUp, Activity, Globe, Stars } from 'lucide-react';
import GATVisualizer from './GATVisualizer';

interface UnauthenticatedDashboardProps {
    onNavigate: (tab: string) => void;
    language: string;
    t: any;
}

export const UnauthenticatedDashboard: React.FC<UnauthenticatedDashboardProps> = ({
    onNavigate,
    language,
    t
}) => {
    return (
        <div className="space-y-12 animate-fade-in">
            {/* Neural Market Ticker */}
            <div className="w-full bg-slate-900 overflow-hidden py-2 rounded-full border border-slate-800 shadow-2xl">
                <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-12 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                    {[1, 2, 3, 4, 5].map(i => (
                        <React.Fragment key={i}>
                            <span className="flex items-center gap-2">
                                <Globe className="w-3 h-3" /> MARKET_SCAN: 1,420 NEW GIGS
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="flex items-center gap-2">
                                <Stars className="w-3 h-3 text-amber-500" /> GEMINI_2.5_PRO_SYNC: SUCCESS
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="flex items-center gap-2">
                                <Activity className="w-3 h-3 text-slate-400" /> AI GAT GAP: VIDEO_AUTOMATION_SaaS (+140%)
                            </span>
                            <span className="text-slate-500">•</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-emerald-500/20 rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(16,185,129,0.1)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[11px] font-black tracking-widest mb-8 border border-emerald-500/20 uppercase">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            {language === 'AR' ? 'مدعوم من محرك البحث' : 'LIVE SEARCH ENGINE POWERED'}
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.85] mb-4 tracking-tighter">
                            {t.hero.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-teal-500 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400">
                                {t.hero.machine}
                            </span>
                        </h1>

                        {/* THE CORE GAT FORMULA */}
                        <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 py-3 px-4 sm:py-4 sm:px-8 bg-slate-50 dark:bg-slate-800/80 rounded-[2rem] border-2 border-emerald-500/30 mb-10 shadow-lg group transform hover:scale-[1.02] transition-transform">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                                <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/30"><Briefcase className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">GIG</span><span className="sm:hidden">G</span>
                            </div>
                            <span className="text-emerald-500 font-black text-lg sm:text-xl">+</span>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                                <div className="p-1.5 sm:p-2 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/30"><Zap className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">ACTION</span><span className="sm:hidden">A</span>
                            </div>
                            <span className="text-emerald-500 font-black text-lg sm:text-xl">+</span>
                            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                                <div className="p-1.5 sm:p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30"><Wrench className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">(AI) TOOL</span><span className="sm:hidden">T</span>
                            </div>
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-1 sm:mx-2"></div>
                            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
                                <Equal className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">REVENUE / PROFIT</span><span className="sm:hidden">$$</span>
                            </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed max-w-xl font-medium">
                            Unlock the secrets of the <span className="text-emerald-600 font-black">GAT Strategy</span>. Turn AI tools into 24/7 money-making machines.
                        </p>
                        <div className="flex flex-wrap gap-3 sm:gap-5">
                            <button
                                onClick={() => onNavigate('GENERATOR')}
                                className="px-6 sm:px-10 py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(5,150,105,0.3)] flex items-center gap-2 sm:gap-3 group text-base sm:text-lg"
                            >
                                {t.hero.button} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button
                                onClick={() => onNavigate('WHY_GAT')}
                                className="px-6 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 text-base sm:text-lg"
                            >
                                {t.nav.why}
                            </button>
                        </div>
                    </div>

                    {/* Side Panel */}
                    <div className="hidden lg:block relative">
                        <div className="absolute -inset-10 bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] rounded-full"></div>
                        <div className="relative bg-white dark:bg-slate-900/80 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-3xl backdrop-blur-3xl animate-float">
                            <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2 tracking-[0.2em]">
                                    <Search className="w-4 h-4" /> {new Date().getFullYear()}_NEURAL_PULSE
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-black">
                                    SYNC_STATUS: 100%
                                </div>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { name: 'GAT VIDEO AUTOMATION', growth: '+2,410%', color: 'emerald' },
                                    { name: 'AI AGENT DEPLOYMENT', growth: '+980%', color: 'indigo' },
                                    { name: 'B2B GAT SOLUTIONS', growth: '+1,150%', color: 'blue' }
                                ].map((item, idx) => (
                                    <div key={idx} className="group flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border-2 border-transparent hover:border-emerald-500/30 transition-all cursor-default">
                                        <div className="text-md font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.name}</div>
                                        <div className="text-right flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            <div className="text-emerald-600 dark:text-emerald-400 text-sm font-black">{item.growth}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 pt-6 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global GAT Search powered by Gemini</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <GATVisualizer />
        </div>
    );
};
