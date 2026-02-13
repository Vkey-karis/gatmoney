import React, { useState } from 'react';
import { generateBusinessIntelligence, BusinessReportWithSources } from '../services/geminiService';
import { TabView } from '../types';
import { useSubscription } from '../context/SubscriptionContext';
import { useAuth } from '../context/AuthContext';
import { Loader2, Building, Globe, Target, BarChart, Activity, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Save, Share2, FileText, Zap, ShieldCheck, Lock, Rocket } from 'lucide-react';

interface MarketGapFinderProps {
    onNavigateToTab?: (tab: TabView) => void;
}

const MarketGapFinder: React.FC<MarketGapFinderProps> = ({ onNavigateToTab }) => {
    const { user } = useAuth();
    const { scansUsed, maxScans, incrementScans, tier } = useSubscription();
    const [industry, setIndustry] = useState('');
    const [region, setRegion] = useState('');
    const [goals, setGoals] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<BusinessReportWithSources | null>(null);

    const handleAnalyze = async () => {
        if (!industry || !goals) return;

        // Auth Check
        if (!user) {
            alert('Please log in to analyze market gaps.');
            onNavigateToTab?.(TabView.DASHBOARD);
            return;
        }

        // Check Limit
        if (scansUsed >= maxScans) {
            return;
        }

        setLoading(true);
        setReport(null);

        const reportData = await generateBusinessIntelligence(industry, region || 'Global', goals);

        if (reportData) {
            incrementScans();
            setReport(reportData);
        }
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20 relative">
            {/* Scan Limit Upgrade Prompt */}
            {scansUsed >= maxScans && (
                <div className="mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">Market Scan Limit Reached</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">You've used {scansUsed}/{maxScans} scans this month. Upgrade for more insights.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onNavigateToTab?.(TabView.PRICING)}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-widest transition-all text-sm whitespace-nowrap"
                        >
                            Upgrade Now
                        </button>
                    </div>
                </div>
            )}

            <div className="text-center mb-8 md:mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black tracking-widest mb-4 border border-indigo-500/20 uppercase">
                    <Rocket className="w-3 h-3" /> Business Intelligence
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-3">
                    Market <span className="text-indigo-600 dark:text-indigo-400">Gap Finder</span>
                </h2>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                    Discover untapped opportunities, competitor weaknesses, and high-ROI automation strategies in your industry.
                </p>
                <div className="mt-4 text-xs font-black text-slate-500 dark:text-slate-600 uppercase tracking-widest">
                    Scans Used: {scansUsed}/{maxScans} this month
                </div>
            </div>

            {/* Input Form */}
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 mb-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">
                            <Building className="w-3 h-3 inline mr-1" /> Industry / Niche
                        </label>
                        <input
                            type="text"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            placeholder="e.g., SaaS Marketing, E-commerce Logistics"
                            disabled={loading || scansUsed >= maxScans}
                            className="w-full px-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm md:text-base focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">
                            <Globe className="w-3 h-3 inline mr-1" /> Target Region (Optional)
                        </label>
                        <input
                            type="text"
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="e.g., North America, Southeast Asia, Global"
                            disabled={loading || scansUsed >= maxScans}
                            className="w-full px-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm md:text-base focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">
                            <Target className="w-3 h-3 inline mr-1" /> Business Goals
                        </label>
                        <textarea
                            value={goals}
                            onChange={(e) => setGoals(e.target.value)}
                            placeholder="e.g., Reduce customer acquisition cost, Automate lead generation, Find underserved market segments"
                            disabled={loading || scansUsed >= maxScans}
                            rows={4}
                            className="w-full px-4 py-3 md:py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm md:text-base focus:outline-none focus:border-indigo-500 disabled:opacity-50 resize-none"
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !industry || !goals || scansUsed >= maxScans}
                        className="w-full py-4 md:py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm md:text-base uppercase tracking-widest"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Market...
                            </>
                        ) : (
                            <>
                                <BarChart className="w-5 h-5" />
                                Find Market Gaps
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Results */}
            {report && (
                <div className="space-y-6">
                    {/* Service Gaps */}
                    {report.serviceGaps && report.serviceGaps.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
                                Service Gaps
                            </h3>
                            <div className="space-y-3">
                                {report.serviceGaps.map((gap, idx) => (
                                    <div key={idx} className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">{gap}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Competitor Weaknesses */}
                    {report.competitorWeaknesses && report.competitorWeaknesses.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                                Competitor Weaknesses
                            </h3>
                            <div className="space-y-3">
                                {report.competitorWeaknesses.map((weakness, idx) => (
                                    <div key={idx} className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                                        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300">{weakness}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ROI Opportunities */}
                    {report.automationOpportunities && report.automationOpportunities.length > 0 && (
                        <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                                High-ROI Automation Opportunities
                            </h3>
                            <div className="space-y-4">
                                {report.automationOpportunities.map((opp, idx) => (
                                    <div key={idx} className="p-4 md:p-5 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800">
                                        <h4 className="font-black text-sm md:text-base text-slate-900 dark:text-white mb-2">{opp.area}</h4>
                                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mb-2">Tool: {opp.tool}</p>
                                        <div className="text-xs font-black text-amber-600 dark:text-amber-400">
                                            Estimated ROI: {opp.estimatedRoi}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Implementation Roadmap */}
                    {report.implementationRoadmap && report.implementationRoadmap.length > 0 && (
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
                                Implementation Roadmap
                            </h3>
                            <div className="space-y-4">
                                {report.implementationRoadmap.map((phase, idx) => (
                                    <div key={idx} className="p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                                        <h4 className="font-black text-sm md:text-base text-indigo-600 dark:text-indigo-400 mb-2">{phase.phase}</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {phase.actions.map((action, aIdx) => (
                                                <li key={aIdx} className="text-xs md:text-sm text-slate-700 dark:text-slate-300">{action}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MarketGapFinder;
