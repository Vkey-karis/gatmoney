import React from 'react';
import { User, Briefcase, ArrowRight, Building2, TrendingUp, ShieldCheck, Zap, Bot, ImageIcon, Film, Bookmark, Activity, Target, BarChart, Rocket } from 'lucide-react';

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

            <div className="relative z-10 max-w-6xl w-full space-y-20">
                {/* Header */}
                <div className="text-center space-y-4">
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

                {/* Mode Selection */}
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

                {/* What's Inside Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
                            What's <span className="text-emerald-500">Inside</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                            Powerful AI-driven tools designed to help you find opportunities and scale your income.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Freelancer Features */}
                        <div className="bg-slate-900/50 border-2 border-emerald-500/20 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase">Freelancer Tools</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Gig Generator</h4>
                                        <p className="text-xs text-slate-400">AI-powered gig discovery with pricing bands, competition analysis, and AI leverage scores</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">AI Strategy Coach</h4>
                                        <p className="text-xs text-slate-400">Deep-thinking AI assistant for personalized business strategy and growth advice</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Image Studio</h4>
                                        <p className="text-xs text-slate-400">Create professional graphics and visuals for your gigs and marketing</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Film className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Video Automation</h4>
                                        <p className="text-xs text-slate-400">Generate and edit videos to fulfill content creation gigs efficiently</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bookmark className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">My Plans</h4>
                                        <p className="text-xs text-slate-400">Save and organize your best gig strategies for quick reference</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Features */}
                        <div className="bg-slate-900/50 border-2 border-indigo-500/20 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase">Business Tools</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Market Gap Finder</h4>
                                        <p className="text-xs text-slate-400">Discover untapped opportunities in your industry with AI-powered market analysis</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Activity className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Competitor Analysis</h4>
                                        <p className="text-xs text-slate-400">Identify competitor weaknesses and service gaps to exploit in your market</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BarChart className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">ROI Automation Opportunities</h4>
                                        <p className="text-xs text-slate-400">Find high-return automation strategies with estimated ROI and implementation tools</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Rocket className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Implementation Roadmap</h4>
                                        <p className="text-xs text-slate-400">Get phased action plans to execute your market expansion strategy</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">AI Strategy Coach</h4>
                                        <p className="text-xs text-slate-400">Deep-thinking AI assistant for business scaling and strategic decision-making</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login / Auth Options */}
                <div className="text-center animate-fade-in space-y-4 pb-8">
                    <p className="text-slate-500 font-medium text-sm">Already have an account?</p>
                    <button
                        onClick={() => onSelectMode('FREELANCER')} // Default to a mode to trigger entrance then auth
                        className="text-emerald-500 hover:text-emerald-400 font-black uppercase tracking-widest text-sm border-b-2 border-transparent hover:border-emerald-500 transition-all pb-1"
                    >
                        Login to Terminal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
