import React from 'react';
import { ArrowRight, Zap, Bot, Bookmark, Briefcase, Wrench, Equal, Search, TrendingUp, Activity, Globe, Stars } from 'lucide-react';
import { UserProfile } from './UserProfile';

interface AuthenticatedDashboardProps {
    userName: string;
    userEmail: string;
    onNavigate: (tab: string) => void;
}

export const AuthenticatedDashboard: React.FC<AuthenticatedDashboardProps> = ({
    userName,
    userEmail,
    onNavigate
}) => {
    // Mode Management
    const [userMode, setUserMode] = React.useState<'FREELANCER' | 'BUSINESS'>('FREELANCER');

    React.useEffect(() => {
        const storedMode = localStorage.getItem('gat_user_mode');
        if (storedMode === 'BUSINESS') setUserMode('BUSINESS');
    }, []);

    const toggleMode = () => {
        const newMode = userMode === 'FREELANCER' ? 'BUSINESS' : 'FREELANCER';
        setUserMode(newMode);
        localStorage.setItem('gat_user_mode', newMode);
        // Force reload to update app context/nav (temporary fix until context refactor)
        window.location.reload();
    };

    return (
        <div className="space-y-12 animate-fade-in relative">
            {/* Mode Switcher */}
            <div className="absolute top-0 right-0 z-20">
                <button
                    onClick={toggleMode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest transition-all ${userMode === 'BUSINESS'
                        ? 'bg-slate-900 border-indigo-500 text-indigo-400 hover:bg-slate-800'
                        : 'bg-white border-emerald-500 text-emerald-600 hover:bg-slate-50'
                        }`}
                >
                    {userMode === 'BUSINESS' ? <Activity className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                    Switch to {userMode === 'BUSINESS' ? 'Freelancer' : 'Business'}
                </button>
            </div>
            {/* Personalized Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-indigo-500/10 dark:from-emerald-500/5 dark:via-teal-500/5 dark:to-indigo-500/5 border-2 border-emerald-200 dark:border-emerald-500/20 rounded-[3rem] p-8 md:p-16">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[11px] font-black tracking-widest mb-6 border border-emerald-500/20 uppercase">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        YOUR DASHBOARD
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                        Welcome Back, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-teal-500 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400">
                            {userName}! 👋
                        </span>
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-8 max-w-2xl">
                        Your GAT machine is ready. Let's discover new AI money opportunities and turn them into profit.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => onNavigate('GENERATOR')}
                            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(5,150,105,0.3)] flex items-center gap-3 group text-base"
                        >
                            <Zap className="w-5 h-5" />
                            <Zap className="w-5 h-5" />
                            {userMode === 'BUSINESS' ? 'Analyze Market Gaps' : 'Find New Gigs'}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <button
                            onClick={() => onNavigate('MY_PLANS')}
                            className="px-8 py-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 text-base flex items-center gap-3"
                        >
                            <Bookmark className="w-5 h-5" />
                            My Saved Plans
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Section */}
            <UserProfile email={userEmail} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                {userMode === 'BUSINESS' ? '85%' : '1,420'}
                            </div>
                            <div className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {userMode === 'BUSINESS' ? 'Market Confidence' : 'New Gigs Today'}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                        Live market scan powered by Gemini
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-indigo-500/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                                {userMode === 'BUSINESS' ? '12' : '+140%'}
                            </div>
                            <div className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {userMode === 'BUSINESS' ? 'Competitors Tracked' : 'AI GAT Growth'}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                        {userMode === 'BUSINESS' ? 'Real-time surveillance active' : 'Video automation leading the way'}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:border-amber-500/30 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                                {userMode === 'BUSINESS' ? '$450k' : '24/7'}
                            </div>
                            <div className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                {userMode === 'BUSINESS' ? 'Gap Value Detected' : 'AI Monitoring'}
                            </div>
                        </div>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                        Never miss an opportunity
                    </div>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">
                    Recent Activity
                </h2>
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Bookmark className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">
                        No activity yet. Start exploring GAT opportunities!
                    </p>
                    <button
                        onClick={() => onNavigate('GENERATOR')}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl transition-all text-sm"
                    >
                        Discover Gigs
                    </button>
                </div>
            </div>
        </div>
    );
};
