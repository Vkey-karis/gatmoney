
import React, { useState, useEffect } from 'react';
import { GeneratedGig } from '../types';
import { PARTNER_LINKS, PartnerTool } from '../constants';
import { Trash2, Copy, Check, DollarSign, Wrench, Calendar, AlertTriangle, MessageSquareText, ChevronRight, Download, Share2, ExternalLink, Tag, StickyNote, Info } from 'lucide-react';

interface MyPlansProps {
  onCoachRequest: (msg: string) => void;
}

const MyPlans: React.FC<MyPlansProps> = ({ onCoachRequest }) => {
  const [plans, setPlans] = useState<GeneratedGig[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('gat_saved_plans');
    if (saved) {
      try {
        setPlans(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved plans", e);
      }
    }
  }, []);

  const handleDelete = (indexToDelete: number) => {
    const newPlans = plans.filter((_, idx) => idx !== indexToDelete);
    setPlans(newPlans);
    localStorage.setItem('gat_saved_plans', JSON.stringify(newPlans));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete all saved plans? This cannot be undone.")) {
      setPlans([]);
      localStorage.removeItem('gat_saved_plans');
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

  const handleCopy = (plan: GeneratedGig, idx: number) => {
    const text = `
GAT STRATEGY: ${plan.gigTitle}
Estimated Earnings: ${plan.estimatedEarnings}
${plan.personalNote ? `Note: ${plan.personalNote}` : ''}

ACTION PLAN:
${plan.actionPlan.map((step, i) => `${i + 1}. ${step}`).join('\n')}

TOOLS:
${plan.recommendedTools.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(idx.toString());
    setTimeout(() => setCopiedId(null), 2000);
  };

  const downloadPlan = (plan: GeneratedGig) => {
    const text = `
GAT STRATEGY: ${plan.gigTitle}
Estimated Earnings: ${plan.estimatedEarnings}
Date Saved: ${plan.dateCreated || 'Unknown'}
${plan.personalNote ? `Note: ${plan.personalNote}` : ''}

ACTION PLAN:
${plan.actionPlan.map((step, i) => `${i + 1}. ${step}`).join('\n')}

REQUIRED AI TOOLS:
${plan.recommendedTools.join(', ')}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GAT_Saved_Plan_${plan.gigTitle.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async (plan: GeneratedGig) => {
    const shareData = {
      title: `AI Money Strategy: ${plan.gigTitle}`,
      text: `I'm using this AI Money Strategy: ${plan.gigTitle}! Potential earnings: ${plan.estimatedEarnings}. Check out GATMONEY.com to find your own plan.`,
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

  const handleAskCoach = (plan: GeneratedGig) => {
    onCoachRequest(`I'm looking at my saved plan for "${plan.gigTitle}". Can you help me refine the action plan for Step 2 and recommend some specific AI tools to automate this?`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 dark:from-emerald-400 dark:to-teal-500">
              Live GAT Library
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Your personal collection of search-grounded money strategies.</p>
        </div>
        
        {plans.length > 0 && (
          <button 
            onClick={handleClearAll}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 border border-slate-200 dark:border-slate-700 hover:border-red-500/50 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 rounded-lg text-sm font-black uppercase transition-all flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
          <p className="text-slate-500 dark:text-slate-400 text-lg font-bold">You haven't saved any strategies yet.</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">Go to the Generator to create and save your first plan!</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {plans.map((plan, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col md:flex-row">
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="max-w-[60%]">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight truncate">{plan.gigTitle}</h3>
                    <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest mt-1">
                       <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {plan.estimatedEarnings}</span>
                       <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {plan.dateCreated || 'Saved'}</span>
                       {plan.tags && plan.tags.map((tag, tIdx) => (
                         <span key={tIdx} className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded border border-indigo-100 dark:border-indigo-800/50">
                           <Tag className="w-2.5 h-2.5" /> {tag}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleShare(plan)}
                      className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => downloadPlan(plan)}
                      className="p-2 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-600"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleCopy(plan, idx)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg text-slate-500 dark:text-slate-400 transition-all border border-slate-200 dark:border-slate-600"
                    >
                      {copiedId === idx.toString() ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(idx)}
                      className="p-2 bg-slate-50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg text-slate-500 dark:text-red-400 transition-colors border border-slate-200 dark:border-slate-700 hover:border-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.personalNote && (
                    <div className="p-3 bg-emerald-50/50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <StickyNote className="w-3 h-3 text-emerald-600 dark:text-emerald-500" />
                        <span className="text-[9px] font-black uppercase text-emerald-600 dark:text-emerald-500 tracking-widest">Strategy Goal</span>
                      </div>
                      <p className="text-xs italic font-bold text-slate-700 dark:text-slate-300">"{plan.personalNote}"</p>
                    </div>
                  )}

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50">
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">GAT Strategy Steps</h4>
                    <ul className="space-y-1">
                      {plan.actionPlan.map((step, i) => (
                        <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex gap-2 font-bold">
                           <span className="text-emerald-600 dark:text-emerald-500 font-mono text-xs">{i+1}.</span> {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3 h-3 text-indigo-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GAT Stack Ref</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {plan.recommendedTools.map((tool, i) => {
                        const partner = getPartnerInfo(tool);
                        return partner ? (
                          <div key={i} className="group/tool relative">
                            <a 
                              href={partner.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[9px] font-black uppercase tracking-tight px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-300 rounded flex items-center gap-1 hover:bg-emerald-500 hover:text-white transition-all peer"
                            >
                              {tool} <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                            <div className="absolute bottom-full left-0 mb-2 w-48 p-2 bg-slate-900 text-white rounded-lg text-[10px] opacity-0 pointer-events-none group-hover/tool:opacity-100 transition-opacity z-20 shadow-xl border border-slate-700">
                               {partner.description}
                            </div>
                          </div>
                        ) : (
                          <span key={i} className="text-[9px] font-black uppercase tracking-tight px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded">
                            {tool}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleAskCoach(plan)}
                className="bg-slate-50/50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/80 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center justify-center gap-3 transition-all group md:w-48"
              >
                <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-full text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform shadow-inner">
                  <MessageSquareText className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">Consult Strategist</p>
                  <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-tighter">Deep Neural Refine</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlans;
