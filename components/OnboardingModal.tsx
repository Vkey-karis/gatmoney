
import React, { useState } from 'react';
import { X, ChevronRight, Zap, Globe, Bot, Rocket, CheckCircle2, Sparkles, BrainCircuit, TrendingUp } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'FREELANCER' | 'BUSINESS';
}

const FREELANCER_STEPS = [
  {
    title: "The GAT Strategy",
    icon: <Zap className="w-12 h-12 text-emerald-500" />,
    description: "Welcome! We use a simple 3-step way to help you earn: Gig + Action + AI Tool. It is the easiest way to make money in the new gig economy.",
    highlight: "Gig + Action + Tool = Profit"
  },
  {
    title: "Live Gig Search",
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    description: "Our app is special because it checks the real gig market today. We find gigs that are needed right now and AI tools that just came out.",
    highlight: "Fresh gigs every day."
  },
  {
    title: "Your AI Coach",
    icon: <BrainCircuit className="w-12 h-12 text-indigo-500" />,
    description: "Need help? Talk to our AI Coach. It can help you solve hard problems and give you a better GAT plan using simple words.",
    highlight: "A smart helper on your side."
  },
  {
    title: "Gig-Ready Content",
    icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    description: "You can make professional videos and pictures directly in this app to finish your gigs fast. You dont need any special skills.",
    highlight: "Professional work made easy."
  }
];

const BUSINESS_STEPS = [
  {
    title: "Business Gap Intelligence",
    icon: <Rocket className="w-12 h-12 text-indigo-500" />,
    description: "Welcome! GATSMONEY helps you find hidden market gaps and automate your business scaling using AI.",
    highlight: "Gap + Solution + Automation = Scale"
  },
  {
    title: "Market Surveillance",
    icon: <Globe className="w-12 h-12 text-blue-500" />,
    description: "We analyze your industry in real-time to tell you what competitors are missing and what customers actually want right now.",
    highlight: "Real-time market data."
  },
  {
    title: "Strategic AI Coach",
    icon: <BrainCircuit className="w-12 h-12 text-emerald-500" />,
    description: "Consult with our Strategic AI to build 90-day execution roadmaps and calculate ROI for new automation systems.",
    highlight: "Your virtual CTO."
  },
  {
    title: "Automated ROI",
    icon: <TrendingUp className="w-12 h-12 text-purple-500" />,
    description: "Identify high-value automation opportunities that reduce costs and increase revenue immediately.",
    highlight: "Data-driven growth."
  }
];

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, mode }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = mode === 'BUSINESS' ? BUSINESS_STEPS : FREELANCER_STEPS;

  if (!isOpen) return null;

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl animate-fade-in">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.2)] border border-slate-200 dark:border-slate-800 overflow-hidden relative">

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 flex gap-1">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 transition-all duration-500 ${i <= currentStep ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-12 md:p-16 flex flex-col items-center text-center">
          <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] shadow-inner animate-bounce-subtle">
            {step.icon}
          </div>

          <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
            {step.title}
          </h2>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-bold leading-relaxed mb-6 max-w-md">
            {step.description}
          </p>

          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-10">
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> {step.highlight}
            </span>
          </div>

          <div className="flex w-full gap-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={() => isLast ? onClose() : setCurrentStep(prev => prev + 1)}
              className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {isLast ? "Let's Go!" : "Next Step"}
              {!isLast && <ChevronRight className="w-5 h-5" />}
              {isLast && <Rocket className="w-5 h-5 animate-pulse" />}
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-8 text-[10px] font-black text-slate-400 dark:text-slate-600 hover:text-slate-900 dark:hover:text-white uppercase tracking-[0.3em] transition-colors"
          >
            Skip Intro
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
