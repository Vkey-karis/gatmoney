
import React, { useState } from 'react';
import { Globe, Shield, Mail, Twitter, Github, Linkedin, ExternalLink, Cpu, Zap, DollarSign, Scale, Info, X, FileText, Lock, HelpCircle, Activity, ChevronRight, BookOpen } from 'lucide-react';
import { TabView } from '../types';

interface FooterProps {
  onNavigate: (tab: TabView) => void;
}

interface ModalContent {
  title: string;
  icon: React.ReactNode;
  content: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);

  const legalContent: Record<string, ModalContent> = {
    'Rules of Use': {
      title: 'Our Rules',
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      content: `Welcome to GATMONEY.com. By using our site, you agree to these simple rules:

1. USE OUR TOOLS RIGHT: The GAT plans we give you are to help you learn and work. You are responsible for your own work.
2. BE HONEST: Do not use our AI to lie or trick people.
3. WE ARE HELPERS: We provide the tools and plans, but we are not your boss or bank.
4. THINGS CHANGE: As AI changes, we might update these rules to keep everyone safe.`
    },
    'Privacy Rules': {
      title: 'Privacy Rules',
      icon: <Lock className="w-6 h-6 text-indigo-500" />,
      content: `We care about your privacy.

1. LESS IS BETTER: We only keep what we need to show you your saved GAT plans.
2. YOUR PHONE/COMPUTER: Most of your data stays on your own device, so it is very safe.
3. AI HELP: When you ask our AI Coach a question, it is sent over a safe, secret connection.
4. COOKIES: We only use tiny cookies to remember if you like the dark or light theme.`
    },
    'Help Center': {
      title: 'Get Help',
      icon: <HelpCircle className="w-6 h-6 text-purple-500" />,
      content: `Need help with the app?

- HOW TO START: Go to the "Find Gigs" tab. Enter your skills, and our engine will find gigs for you.
- COACHING: Use the "AI Coach" tab to ask any question about your gigs in simple words.
- DOWNLOADING: You can save your GAT plans to your computer using the "Download" button.
- FEEDBACK: Found a problem? Use the links below to let us know.`
    },
    'System Status': {
      title: 'Is it Working?',
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      content: `EVERYTHING IS WORKING: 100%

- AI BRAIN: Fast and Ready
- WEB SEARCH: Online and Current
- VIDEO MAKER: Ready for Gigs
- IMAGE MAKER: Ready for Gigs
- CONNECTIONS: Fast around the world`
    }
  };

  const handleLegalClick = (link: string) => {
    if (legalContent[link]) {
      setActiveModal(legalContent[link]);
    } else {
      setActiveModal({
        title: link,
        icon: <Info className="w-6 h-6 text-slate-400" />,
        content: `The information for ${link} is being updated. Check back soon for the full guide.`
      });
    }
  };

  const handleTabNavigate = (tab: TabView) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      {/* Help Articles Section */}
      <section className="container mx-auto px-4 py-16 border-b border-slate-100 dark:border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">Build Your Future with GAT</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-2xl">Master the only strategy you need to thrive in the age of AI. No experience required.</p>
          </div>
          <button 
            onClick={() => handleTabNavigate(TabView.LEARN)}
            className="group flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-slate-950 font-black rounded-xl transition-all shadow-xl uppercase text-xs tracking-widest whitespace-nowrap mx-auto md:mx-0"
          >
            Start Learning Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <article className="space-y-4">
            <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">AI Gig Economy</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Freelancing has changed. Today, success is about <strong>Leverage</strong>. Smart operators use AI to fulfill high-value client needs in record time.
            </p>
          </article>

          <article className="space-y-4">
            <h3 className="text-lg font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">The GAT Method</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We focus on the <strong>Gig + Action + Tool</strong> trifecta. Find a gap, execute with precision, and scale with the best AI tools on the market.
            </p>
          </article>

          <article className="space-y-4">
            <h3 className="text-lg font-black text-purple-600 dark:text-purple-400 uppercase tracking-tight">Automated Profit</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Our vision is to move you from solo worker to <strong>AI Agency Owner</strong>. Let the machines do the heavy lifting while you focus on growth.
            </p>
          </article>

          <article className="space-y-4">
            <h3 className="text-lg font-black text-amber-600 dark:text-amber-400 uppercase tracking-tight">Stay Competitive</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Don't get left behind. We track the latest AI tool updates and gig trends daily so your GAT strategy is always cutting-edge.
            </p>
          </article>
        </div>
      </section>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6" onClick={() => handleTabNavigate(TabView.DASHBOARD)}>
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg cursor-pointer">
                <span className="font-black text-white text-sm">G</span>
              </div>
              <span className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tighter cursor-pointer">GATMONEY</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-6">
              Empowering the next generation of digital entrepreneurs through search-grounded AI gig strategies.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home Hub', tab: TabView.DASHBOARD },
                { label: 'Learn GAT', tab: TabView.LEARN },
                { label: 'Find a Gig', tab: TabView.GENERATOR },
                { label: 'AI Strategy Library', tab: TabView.MY_PLANS },
                { label: 'Consult AI Coach', tab: TabView.COACH },
                { label: 'Pricing Tiers', tab: TabView.PRICING }
              ].map((item) => (
                <li key={item.label}>
                  <button 
                    onClick={() => handleTabNavigate(item.tab)}
                    className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors uppercase tracking-tight"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Legal & Support</h4>
            <ul className="space-y-3">
              {['Rules of Use', 'Privacy Rules', 'Help Center', 'System Status'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => handleLegalClick(link)}
                    className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-500 cursor-pointer transition-colors uppercase tracking-tight"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-[0.2em]">Network Status</h4>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-black mb-4 uppercase leading-tight">
              AI Market Engine: 100% Operational
            </p>
            <button 
              onClick={() => handleTabNavigate(TabView.GENERATOR)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all shadow-lg"
            >
              Scan Live Markets
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-2 mb-2 text-slate-400 dark:text-slate-500">
              <Scale className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.1em]">Important Disclaimer</h4>
           </div>
           <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 font-bold italic">
              <strong>NOTICE:</strong> GATMONEY.com is an educational platform. Success in the gig economy requires skill, dedication, and proper tool utilization. We provide the framework, but results vary based on individual effort and market conditions.
           </p>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} <span className="text-emerald-500">GATMONEY.COM</span>
            </p>
            <span className="text-slate-200 dark:text-slate-800 text-[10px]">|</span>
            <button 
              onClick={() => handleTabNavigate(TabView.LEARN)} 
              className="text-[10px] font-black text-slate-400 hover:text-emerald-500 dark:hover:text-white uppercase tracking-widest flex items-center gap-1 transition-all"
            >
              <BookOpen className="w-3 h-3" /> Learn More
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Globe className="w-3 h-3" /> GAT_SYNCED
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Cpu className="w-3 h-3" /> AI CONNECTED
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-scale-in">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 uppercase tracking-tighter">
                {activeModal.icon}
                {activeModal.title}
              </h3>
              <button 
                onClick={() => setActiveModal(null)} 
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-10">
              <div className="whitespace-pre-wrap text-slate-600 dark:text-slate-300 leading-relaxed font-bold text-sm">
                {activeModal.content}
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="mt-10 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-emerald-500/20"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
