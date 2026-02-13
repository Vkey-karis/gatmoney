
import React, { useState } from 'react';
import { Check, Zap, Rocket, Star, ShieldCheck, Video, Search, BrainCircuit, Globe, Coins, CreditCard, Loader2, Lock } from 'lucide-react';

import { useSubscription, UserTier } from '../context/SubscriptionContext';

const Pricing: React.FC = () => {
  const { tier, upgradeTier } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'paystack'>('paypal');

  const plans = [
    {
      id: 'FREE',
      name: "Starter",
      price: "$0",
      desc: "Perfect for finding your first few opportunities.",
      icon: <Search className="w-8 h-8 text-slate-400" />,
      features: [
        "3 GAT Market Scans / Day",
        "Standard AI Coach Access",
        "Basic Market Metrics",
        "Manual Gig Tracking"
      ],
      cta: "Current Plan",
      featured: false,
      color: "slate"
    },
    {
      id: 'PRO',
      name: "Pro Freelancer",
      price: "$29",
      period: "/mo",
      desc: "Unlimited power for serious gig workers.",
      icon: <Zap className="w-8 h-8 text-emerald-500" />,
      features: [
        "Unlimited GAT Market Scans",
        "Advanced Metrics (Pricing, Competition)",
        "AI Leverage Scores",
        "Deep Thinking Coach",
        "Priority Support"
      ],
      cta: "Upgrade to Pro",
      featured: true,
      color: "emerald"
    },
    {
      id: 'BUSINESS',
      name: "Business Intelligence",
      price: "$99",
      period: "/mo",
      desc: "For agencies & startups scaling systems.",
      icon: <Rocket className="w-8 h-8 text-indigo-500" />,
      features: [
        "All Pro Features",
        "Business Gap Intelligence Engine",
        "Competitor Weakness Analysis",
        "ROI Automation Calculators",
        "90-Day Execution Roadmaps",
        "Enterprise API Access"
      ],
      cta: "Unlock Business",
      featured: false,
      color: "indigo"
    }
  ];

  const handlePayment = (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);

    // Simulating redirect to payment gateway / Auto Upgrade
    setTimeout(() => {
      upgradeTier(planId as UserTier);
      // alert(`Successfully upgraded to ${planId}!`); // Optional feedback
      setIsProcessing(false);
      setSelectedPlan(null);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
          CHOOSE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">PROFIT SCALE</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-bold text-lg">
          Pick a plan that matches how fast you want to grow. Each plan includes live search power.
        </p>
      </div>

      {/* Payment Gateway Selector */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl flex gap-1 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${paymentMethod === 'paypal' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-md' : 'text-slate-400'}`}
          >
            PayPal
          </button>
          <button
            onClick={() => setPaymentMethod('paystack')}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${paymentMethod === 'paystack' ? 'bg-white dark:bg-slate-700 text-teal-500 shadow-md' : 'text-slate-400'}`}
          >
            Paystack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border-2 transition-all duration-300 flex flex-col ${plan.featured
                ? 'border-emerald-500 shadow-[0_20px_50px_rgba(16,185,129,0.1)] scale-105 z-10'
                : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xl'
              }`}
          >
            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white dark:text-slate-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> Most Popular
              </div>
            )}

            <div className={`mb-6 p-4 rounded-2xl bg-${plan.color}-500/10 inline-block self-start`}>
              {plan.icon}
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
              <span className="text-slate-400 font-bold">{plan.period}</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-8">{plan.desc}</p>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`}>
                    <Check className="w-3 h-3 stroke-[4px]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              disabled={plan.id === tier || (plan.id === 'FREE' && tier !== 'FREE') || isProcessing}
              onClick={() => handlePayment(plan.id)}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${plan.id === tier
                  ? 'bg-slate-50 dark:bg-slate-800 text-emerald-500 cursor-default border border-emerald-500/20'
                  : plan.featured
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
                }`}
            >
              {isProcessing && selectedPlan === plan.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                plan.id === tier ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />
              )}
              {plan.id === tier ? "Active Plan" : plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-10 md:p-14 border border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">Global Payment Ready</h3>
          <p className="text-slate-500 font-bold mb-8">We support secure payments via PayPal (Global) and Paystack (Africa/Emerging Markets). Your machine stays powered up wherever you are.</p>
          <div className="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Paystack_Logo.png" alt="Paystack" className="h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
