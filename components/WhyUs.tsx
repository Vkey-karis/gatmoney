
import React from 'react';
import { ShieldCheck, Target, TrendingUp, Zap, MousePointerClick, CloudLightning } from 'lucide-react';

const FEATURES = [
  {
    title: "Always Current",
    desc: "We scan the gig market today to find the best gigs that people need help with right now.",
    icon: <Target className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Find GAT Gaps",
    desc: "We show you where AI can do a gig that most people still think is hard work.",
    icon: <TrendingUp className="w-6 h-6 text-indigo-500" />
  },
  {
    title: "Everything Included",
    desc: "From finding the gig to making the videos and photos, everything you need is here.",
    icon: <Zap className="w-6 h-6 text-amber-500" />
  },
  {
    title: "GAT Action Plan",
    desc: "We dont just give ideas. We give you a 1-2-3 plan to start your first gig today.",
    icon: <ShieldCheck className="w-6 h-6 text-blue-500" />
  }
];

const WhyUs: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.4em] mb-4">Why Use This App?</h2>
        <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6 leading-tight">
          THE EASIEST WAY TO <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-indigo-600">START MAKING MONEY FROM GIGS</span>
        </h3>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 font-bold">
          The old way was about selling your time for a job. The new way is about using <span className="text-slate-900 dark:text-white underline decoration-emerald-500 decoration-4">smart AI tools</span> to get fast results in the gig market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {FEATURES.map((f, i) => (
          <div key={i} className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 transition-all hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all">
              {f.icon}
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-tight">{f.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-r from-emerald-600 to-indigo-700 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <CloudLightning className="w-full h-full scale-150 -translate-y-1/2" />
        </div>
        <div className="relative z-10 text-center md:text-left">
          <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Ready to start your first gig?</h4>
          <p className="text-emerald-100 font-bold text-sm opacity-80">Join thousands of people using the GAT Strategy to earn money right now.</p>
        </div>
        <button className="relative z-10 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-50 transition-all flex items-center gap-3 group shadow-xl">
          Get Started Now <MousePointerClick className="w-5 h-5 group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default WhyUs;
