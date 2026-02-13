import React, { useState } from 'react';
import { generateBusinessIntelligence, BusinessReportWithSources } from '../services/geminiService';
import { TabView } from '../types';
import { Loader2, Building, Globe, Target, BarChart, Activity, TrendingUp, AlertCircle, CheckCircle, ArrowRight, Save, Share2, FileText, Zap, ShieldCheck } from 'lucide-react';

interface BusinessIntelligenceProps {
    onNavigateToTab?: (tab: TabView) => void;
}

const BusinessIntelligence: React.FC<BusinessIntelligenceProps> = ({ onNavigateToTab }) => {
    const [industry, setIndustry] = useState('');
    const [region, setRegion] = useState('');
    const [goals, setGoals] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<BusinessReportWithSources | null>(null);

    const handleAnalyze = async () => {
        if (!industry || !goals) return;
        setLoading(true);
        setReport(null);

        // Default region to "Global" if empty
        const reportData = await generateBusinessIntelligence(industry, region || 'Global', goals);

        setReport(reportData);
        setLoading(false);
    };

    return (
        <div className="max-w-6xl mx-auto animate-fade-in pb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
                    Business Gap <span className="text-indigo-600 dark:text-indigo-400">Intelligence</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                    Deploy AI to analyze market gaps, competitor weaknesses, and high-ROI automation opportunities.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Input Panel */}
                <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl sticky top-24">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Target Industry</label>
                            <div className="relative">
                                <Building className="absolute top-3.5 left-4 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. SaaS, Real Estate, E-commerce..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Region (Optional)</label>
                            <div className="relative">
                                <Globe className="absolute top-3.5 left-4 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="e.g. Global, New York, London..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Strategic Goals</label>
                            <div className="relative">
                                <Target className="absolute top-3.5 left-4 w-4 h-4 text-slate-400" />
                                <textarea
                                    placeholder="e.g. Reduce operational costs, Expand into new markets, Automate customer support..."
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                                    value={goals}
                                    onChange={(e) => setGoals(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading || !industry || !goals}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg ${loading || !industry || !goals
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20'
                                }`}
                        >
                            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Activity className="w-5 h-5" />}
                            {loading ? 'Analyzing Market...' : 'Generate Intelligence'}
                        </button>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {loading && (
                        <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 animate-pulse">
                            <Globe className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
                            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Scanning Market Data...</h3>
                            <p className="text-slate-500 text-sm mt-2">Analyzing competitors, identifying gaps, and calculating ROI.</p>
                        </div>
                    )}

                    {!loading && !report && (
                        <div className="h-96 flex flex-col items-center justify-center text-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <BarChart className="w-16 h-16 text-slate-300 dark:text-slate-700 mb-6" />
                            <h3 className="text-xl font-black text-slate-400 dark:text-slate-600 uppercase tracking-tight">Awaiting Analysis</h3>
                            <p className="text-slate-400 text-sm mt-2">Enter your market parameters to begin intelligence gathering.</p>
                        </div>
                    )}

                    {report && (
                        <div className="animate-scale-in space-y-6">
                            {/* Head-Is */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row justify-between md:items-center gap-6">
                                <div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">
                                        <ShieldCheck className="w-3 h-3" /> Market Intelligence Verified
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                        {report.industry} <span className="text-slate-400">/</span> {report.region}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <div className="text-center">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence</div>
                                        <div className="text-2xl font-black text-emerald-500">{report.marketConfidence}/10</div>
                                    </div>
                                    <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trend</div>
                                        <div className="flex items-center gap-1 text-2xl font-black text-indigo-500">
                                            {report.trendDirection === 'Up' ? <TrendingUp className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                                            {report.trendDirection}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gaps & Weaknesses */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg">
                                    <h4 className="flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-6">
                                        <Zap className="w-4 h-4" /> Detected Service Gaps
                                    </h4>
                                    <ul className="space-y-4">
                                        {report.serviceGaps.map((gap, i) => (
                                            <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm font-bold">
                                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                                                {gap}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg">
                                    <h4 className="flex items-center gap-2 text-sm font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-6">
                                        <AlertCircle className="w-4 h-4" /> Competitor Weaknesses
                                    </h4>
                                    <ul className="space-y-4">
                                        {report.competitorWeaknesses.map((weakness, i) => (
                                            <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm font-bold">
                                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                                {weakness}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Automation ROI */}
                            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
                                <h4 className="flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-8">
                                    <Zap className="w-4 h-4" /> High-ROI Automation Stack
                                </h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Area</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Recommended AI Tool</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. ROI</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                            {report.automationOpportunities.map((opp, i) => (
                                                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <td className="py-4 pl-4 text-sm font-bold text-slate-900 dark:text-white">{opp.area}</td>
                                                    <td className="py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{opp.tool}</td>
                                                    <td className="py-4 text-sm font-black text-emerald-600 dark:text-emerald-400">{opp.estimatedRoi}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Roadmap */}
                            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-[2.5rem] shadow-xl text-white">
                                <h4 className="flex items-center gap-2 text-sm font-black text-indigo-300 uppercase tracking-widest mb-8">
                                    <Activity className="w-4 h-4" /> 90-Day Execution Roadmap
                                </h4>
                                <div className="space-y-8 relative">
                                    <div className="absolute top-4 bottom-4 left-[19px] w-0.5 bg-indigo-500/30"></div>
                                    {report.implementationRoadmap.map((phase, i) => (
                                        <div key={i} className="relative pl-12">
                                            <div className="absolute left-0 top-0 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-black text-sm border-4 border-slate-900">
                                                {i + 1}
                                            </div>
                                            <h5 className="text-lg font-black uppercase tracking-tight mb-3">{phase.phase}</h5>
                                            <ul className="space-y-2">
                                                {phase.actions.map((action, j) => (
                                                    <li key={j} className="text-sm text-indigo-100/80 font-medium flex items-start gap-2">
                                                        <span className="mt-1.5 w-1 h-1 bg-indigo-400 rounded-full flex-shrink-0"></span>
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4" /> Save Report
                                </button>
                                <button className="flex-1 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-black uppercase tracking-widest transition-all hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                                    <Share2 className="w-4 h-4" /> Share
                                </button>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessIntelligence;
