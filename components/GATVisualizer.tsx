
import React from 'react';
import { Zap, ArrowRight, Hammer, Briefcase, DollarSign, Activity } from 'lucide-react';

const GATVisualizer: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-slate-900/50 backdrop-blur-2xl rounded-[3rem] p-8 md:p-16 shadow-3xl border-2 border-slate-200 dark:border-slate-800/50 my-16 transition-all">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">THE GAT ENGINE</h2>
        <div className="flex items-center justify-center gap-2">
           <Activity className="w-4 h-4 text-emerald-500" />
           <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-xs italic">UNLOCk YOUR AI MONEY MACHINE</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8">
        {/* Gig */}
        <div className="group relative flex flex-col items-center p-10 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border-2 border-indigo-500/10 dark:border-indigo-500/20 hover:border-indigo-500/60 hover:shadow-2xl transition-all duration-500 w-full md:w-1/4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PHASE 01</div>
          <div className="p-6 bg-indigo-500/10 rounded-[1.5rem] mb-6 group-hover:scale-110 transition-transform duration-500">
            <Briefcase className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter text-center leading-tight">GIG SCAN</h3>
          <p className="text-center text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase mt-3">Find High-Value Gaps</p>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2 px-2">
            <div className="w-8 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <Zap className="w-6 h-6 text-slate-300 dark:text-slate-700 animate-pulse" />
        </div>

        {/* Action */}
        <div className="group relative flex flex-col items-center p-10 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border-2 border-blue-500/10 dark:border-blue-500/20 hover:border-blue-500/60 hover:shadow-2xl transition-all duration-500 w-full md:w-1/4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PHASE 02</div>
          <div className="p-6 bg-blue-500/10 rounded-[1.5rem] mb-6 group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter text-center leading-tight">ACTION PLAN</h3>
          <p className="text-center text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase mt-3">Step-by-Step Exec</p>
        </div>

        <div className="hidden md:flex flex-col items-center gap-2 px-2">
            <div className="w-8 h-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <Zap className="w-6 h-6 text-slate-300 dark:text-slate-700 animate-pulse" />
        </div>

        {/* Tool */}
        <div className="group relative flex flex-col items-center p-10 bg-slate-50 dark:bg-slate-950 rounded-[2rem] border-2 border-purple-500/10 dark:border-purple-500/20 hover:border-purple-500/60 hover:shadow-2xl transition-all duration-500 w-full md:w-1/4">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">PHASE 03</div>
          <div className="p-6 bg-purple-500/10 rounded-[1.5rem] mb-6 group-hover:scale-110 transition-transform duration-500">
            <Hammer className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter text-center leading-tight">AI TOOL STACK</h3>
          <p className="text-center text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase mt-3">Automate Everything</p>
        </div>

        <div className="hidden md:block px-4">
            <ArrowRight className="w-10 h-10 text-emerald-500 animate-[bounce_1s_infinite_horizontal]" />
        </div>

        {/* Money */}
        <div className="group relative flex flex-col items-center p-12 bg-emerald-600 dark:bg-emerald-600 rounded-[2.5rem] border-4 border-emerald-500 hover:scale-105 transition-all duration-700 w-full md:w-1/4 shadow-[0_32px_64px_rgba(16,185,129,0.4)]">
          <div className="absolute -top-4 -right-4 bg-white text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full rotate-12 tracking-[0.2em] uppercase shadow-2xl">PROFIT_SYNCED</div>
          <div className="p-6 bg-white/20 rounded-full mb-6">
            <DollarSign className="w-14 h-14 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white tracking-tighter uppercase text-center">EARNINGS</h3>
          <p className="text-center text-[10px] text-white/70 mt-2 font-black tracking-[0.4em] uppercase">MONEY MACHINE LIVE</p>
        </div>
      </div>
    </div>
  );
};

export default GATVisualizer;
