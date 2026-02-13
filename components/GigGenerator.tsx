
import React, { useState, useEffect } from 'react';
import { GeneratedGigWithSources } from '../services/geminiService';
import { generateGATStrategy } from '../services/geminiService';
import { Language, TabView } from '../types';
import { PARTNER_LINKS, PartnerTool } from '../constants';
import { Loader2, Sparkles, CheckCircle, ChevronRight, Wrench, DollarSign, Save, Copy, Check, MessageSquareText, Globe, ExternalLink, Bot, Download, Share2, Link, ShieldCheck, ArrowUpRight, Zap, Tag, StickyNote, Info, LayoutDashboard, AlertTriangle, CreditCard, Coins, Rocket } from 'lucide-react';

interface GigGeneratorProps {
  onCoachRequest: (msg: string) => void;
  onNavigateToTab?: (tab: TabView) => void;
  language?: Language;
}

const MAX_SCANS = 50;

const GigGenerator: React.FC<GigGeneratorProps> = ({ onCoachRequest, onNavigateToTab, language = 'EN' }) => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedGigWithSources | null>(null);
  const [saved, setSaved] = useState(false);
  const [scanCount, setScanCount] = useState(0);

  // Personalization state
  const [personalNote, setPersonalNote] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('gat_scan_date');
    if (storedDate !== today) {
      localStorage.setItem('gat_scan_date', today);
      localStorage.setItem('gat_scan_count', '0');
      setScanCount(0);
    } else {
      const count = parseInt(localStorage.getItem('gat_scan_count') || '0');
      setScanCount(count);
    }
  }, []);

  const handleGenerate = async () => {
    if (!skills.trim() || !interests.trim()) return;

    if (scanCount >= MAX_SCANS) {
      return;
    }

    setLoading(true);
    setSaved(false);
    setPersonalNote('');
    setTagsInput('');
    const data = await generateGATStrategy(skills, interests, language as Language);

    if (data) {
      const newCount = scanCount + 1;
      setScanCount(newCount);
      localStorage.setItem('gat_scan_count', newCount.toString());
      setResult(data);
    }
    setLoading(false);
  };

  const handleSave = () => {
    if (!result) return;
    const existingPlans = JSON.parse(localStorage.getItem('gat_saved_plans') || '[]');

    const formattedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newPlan = {
      ...result,
      dateCreated: new Date().toLocaleDateString(),
      personalNote: personalNote.trim() || undefined,
      tags: formattedTags.length > 0 ? formattedTags : undefined
    };

    localStorage.setItem('gat_saved_plans', JSON.stringify([newPlan, ...existingPlans]));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareData = {
      title: `AI Money Strategy: ${result.gigTitle}`,
      text: `I just generated a new AI Money Machine strategy for: ${result.gigTitle}! Potential earnings: ${result.estimatedEarnings}. Find yours at GATSMONEY.com`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      const mailto = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
      window.location.href = mailto;
    }
  };

  const getPartnerInfo = (toolName: string): PartnerTool | null => {
    const toolLower = toolName.toLowerCase();
    const match = Object.keys(PARTNER_LINKS).find(key =>
      toolLower.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(toolLower)
    );
    return match ? PARTNER_LINKS[match] : null;
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            GAT Strategy Engine
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Generate your personal <span className="text-emerald-600 dark:text-emerald-400 font-black">MONEY MACHINE</span> plan.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col items-end mr-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Access</span>
            <span className={`text-xs font-black uppercase ${scanCount >= MAX_SCANS ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {scanCount} / {MAX_SCANS} SCANS USED
            </span>
          </div>
          {onNavigateToTab && (
            <button
              onClick={() => onNavigateToTab(TabView.DASHBOARD)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
            >
              <LayoutDashboard className="w-4 h-4" /> Hub
            </button>
          )}
        </div>
      </div>

      {scanCount >= MAX_SCANS && (
        <div className="mb-8 p-8 bg-gradient-to-br from-red-500/10 to-amber-500/10 border-2 border-amber-500/50 rounded-[2rem] flex flex-col items-center text-center gap-6 animate-scale-in">
          <div className="p-4 bg-amber-500/20 rounded-2xl">
            <AlertTriangle className="w-12 h-12 text-amber-500" />
          </div>
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">Market Access Limit Reached</h4>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-4">
              You have reached your daily limit of {MAX_SCANS} AI machine scans. Unlock unlimited power or top-up your credits to continue searching for high-value gigs.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-lg">
            <button
              onClick={() => onNavigateToTab?.(TabView.PRICING)}
              className="flex-1 min-w-[200px] px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
            >
              <Rocket className="w-5 h-5" /> Upgrade Plan
            </button>
            <button
              onClick={() => onNavigateToTab?.(TabView.PRICING)}
              className="flex-1 min-w-[200px] px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20"
            >
              <Coins className="w-5 h-5" /> Buy Credits
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Your Skills</label>
              <textarea
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-bold placeholder:opacity-30"
                rows={3}
                placeholder="E.g. Video editing, Writing, Sales..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                disabled={scanCount >= MAX_SCANS}
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest">Your Interests</label>
              <textarea
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-bold placeholder:opacity-30"
                rows={3}
                placeholder="E.g. Local Business, Crypto, Fashion..."
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                disabled={scanCount >= MAX_SCANS}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !skills || !interests || scanCount >= MAX_SCANS}
              className={`w-full py-5 px-4 rounded-2xl flex items-center justify-center gap-3 font-black text-white transition-all transform hover:scale-[1.02] uppercase tracking-widest ${loading || scanCount >= MAX_SCANS
                ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-indigo-600 shadow-xl shadow-emerald-500/20'
                }`}
            >
              {loading ? <Loader2 className="animate-spin" /> : <Globe className="w-5 h-5" />}
              {loading ? 'Scanning Markets...' : 'Generate GAT Strategy'}
            </button>
            <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-widest">
              Search power by Google Gemini 3 Flash
            </p>
          </div>
        </div>

        <div className="relative min-h-[400px]">
          {result && !loading ? (
            <div className="flex flex-col gap-6 animate-scale-in">
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-emerald-500/20 shadow-2xl overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-slate-200 dark:border-emerald-500/20 flex justify-between items-center">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-tight">{result.gigTitle}</h3>
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black">
                    <DollarSign className="w-5 h-5" /> {result.estimatedEarnings}
                  </div>
                </div>

                {/* New Metrics Dashboard */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 pt-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Confidence</div>
                    <div className="text-xl font-black text-emerald-500">{result.marketConfidence || 8}/10</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Competition</div>
                    <div className={`text-xl font-black ${result.competitionDensity === 'High' ? 'text-red-500' : 'text-indigo-500'}`}>
                      {result.competitionDensity || 'Medium'}
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">AI Leverage</div>
                    <div className="text-xl font-black text-purple-500">{result.aiLeverageScore || 9}/10</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center border border-slate-100 dark:border-slate-700/50">
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Pricing</div>
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      {result.pricingBands?.mid || '$50 - $150'}
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-4 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-amber-500" /> Action Steps
                    </h4>
                    <ul className="space-y-3">
                      {result.actionPlan.map((step, idx) => (
                        <li key={idx} className="flex gap-4 text-slate-700 dark:text-slate-300 text-sm font-bold items-start group">
                          <span className="bg-emerald-500/10 text-emerald-600 w-6 h-6 flex-shrink-0 rounded-lg flex items-center justify-center text-xs font-black transition-colors group-hover:bg-emerald-500 group-hover:text-white">{idx + 1}</span>
                          <span className="pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black mb-4 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-emerald-500" /> Personalize Your Plan
                    </h4>
                    <div className="space-y-3">
                      <div className="relative">
                        <StickyNote className="absolute top-3 left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        <textarea
                          placeholder="Add a personal goal or note for this gig..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500"
                          rows={2}
                          value={personalNote}
                          onChange={(e) => setPersonalNote(e.target.value)}
                        />
                      </div>
                      <div className="relative">
                        <Tag className="absolute top-3 left-3 w-4 h-4 text-slate-400 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Tags (comma separated)..."
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none focus:ring-1 focus:ring-emerald-500"
                          value={tagsInput}
                          onChange={(e) => setTagsInput(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Verified GAT Stack</h4>
                      <span className="text-[8px] font-black text-emerald-500 uppercase flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Partner Safe</span>
                    </div>
                    <div className="space-y-4">
                      {result.recommendedTools.map((tool, idx) => {
                        const partner = getPartnerInfo(tool);
                        return partner ? (
                          <div key={idx} className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl overflow-hidden transition-all hover:border-emerald-500/60 shadow-sm group">
                            <div className="p-4 space-y-3">
                              <div className="flex items-center gap-3">
                                <Wrench className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-900 dark:text-emerald-400 font-black uppercase text-xs tracking-tight">{tool}</span>
                              </div>
                              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-bold">
                                {partner.description}
                              </p>
                              <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase transition-all shadow-md group-hover:scale-[1.01]"
                              >
                                Access Official Tool <ArrowUpRight className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black uppercase">
                            <Bot className="w-4 h-4 opacity-50" />
                            {tool}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saved}
                      className={`flex-[2] text-xs font-black uppercase flex items-center justify-center gap-2 py-4 rounded-xl transition-all ${saved ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                      {saved ? 'Saved' : 'Save Strategy'}
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex-1 text-xs font-black uppercase flex items-center justify-center gap-2 py-4 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-all"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => onCoachRequest(`I have this GAT Strategy for "${result.gigTitle}". How can I land my first client for this on Fiverr or Upwork?`)}
                      className="flex-1 py-3 px-4 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                      <Bot className="w-3.5 h-3.5" /> Consult Coach
                    </button>
                    <button
                      onClick={() => onNavigateToTab?.(TabView.MY_PLANS)}
                      className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                    >
                      <Download className="w-3.5 h-3.5" /> View Library
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-[9px] text-center text-slate-400 dark:text-slate-600 font-bold px-8 uppercase tracking-widest leading-relaxed">
                Disclosure: Some external links are partner referrals. Using them supports GAT Strategy research at no cost to you.
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-slate-100/50 dark:bg-slate-900/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
              {loading ? (
                <div className="space-y-6">
                  <Globe className="w-16 h-16 text-emerald-500 animate-spin mx-auto" />
                  <p className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Connecting to Market...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <Zap className="w-16 h-16 text-slate-200 dark:text-slate-800 mx-auto" />
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">GAT Engine Status: Idle</p>
                  <button
                    onClick={() => onNavigateToTab?.(TabView.DASHBOARD)}
                    className="text-[10px] font-black text-indigo-500 uppercase border-b border-indigo-500/50"
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GigGenerator;
