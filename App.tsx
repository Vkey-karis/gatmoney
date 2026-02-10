
import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  LayoutDashboard,
  Bot,
  Zap,
  Menu,
  X,
  Rocket,
  Send,
  Code,
  TrendingUp,
  Workflow,
  Wrench,
  Trophy,
  Calendar,
  Building,
  AlertTriangle,
  Briefcase,
  Bookmark,
  Copy,
  Check,
  BrainCircuit,
  ArrowUpRight,
  Sun,
  Moon,
  ExternalLink,
  Search,
  Globe,
  Download,
  Info,
  HelpCircle,
  Stars,
  Link,
  CreditCard,
  Languages,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Activity,
  ArrowRight,
  Loader2,
  Film,
  Image as ImageIcon,
  Equal,
  User,
  LogOut
} from 'lucide-react';
import { GAT_MODULES, PARTNER_LINKS } from './constants';
import { TabView, ChatMessage, Module, Language } from './types';
import { TRANSLATIONS, LANGUAGES } from './translations';
import GATVisualizer from './components/GATVisualizer';
import GigGenerator from './components/GigGenerator';
import EarningsChart from './components/EarningsChart';
import VideoGenerator from './components/VideoGenerator';
import ImageEditor from './components/ImageEditor';
import MyPlans from './components/MyPlans';
import Footer from './components/Footer';
import WhyUs from './components/WhyUs';
import OnboardingModal from './components/OnboardingModal';
import AuthModal from './components/AuthModal';
import Pricing from './components/Pricing';
import HelpChatbot from './components/HelpChatbot';
import { chatWithCoach } from './services/geminiService';
import { useAuth } from './context/AuthContext';

const getIcon = (iconName: string) => {
  const icons: any = {
    Zap: <Zap className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
    Rocket: <Rocket className="w-6 h-6" />,
    Code: <Code className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Workflow: <Workflow className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
    Trophy: <Trophy className="w-6 h-6" />,
    Calendar: <Calendar className="w-6 h-6" />,
    Bot: <Bot className="w-6 h-6" />,
    Building: <Building className="w-6 h-6" />,
    AlertTriangle: <AlertTriangle className="w-6 h-6" />
  };
  return icons[iconName] || <BookOpen className="w-6 h-6" />;
};

interface ChatMessageWithSources extends ChatMessage {
  sources?: { title: string; uri: string }[];
}

const App: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));
  const [language, setLanguage] = useState<Language>((localStorage.getItem('gat_lang') as Language) || 'EN');
  const [langPickerOpen, setLangPickerOpen] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessageWithSources[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];
  const isRTL = LANGUAGES[language].isRTL;

  useEffect(() => {
    setMessages([
      { role: 'model', text: language === 'EN' ? 'GAT Neural Engine: ACTIVE. Searching the web for 2026 AI Money Gaps. How can I assist your machine today?' : `Motor Neural GAT: ACTIVO. Buscando brechas de dinero IA en la web. ¿Cómo puedo ayudarte hoy?` }
    ]);
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language.toLowerCase();
  }, [language, isRTL]);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('gat_onboarded');
    if (!hasOnboarded) {
      setShowOnboarding(true);
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('gat_onboarded', 'true');
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('gat_lang', lang);
    setLangPickerOpen(false);
  };

  const handleSendMessage = async (msgOverride?: string, forceThinking: boolean = false) => {
    const textToSend = msgOverride || inputMessage;
    if (!textToSend.trim() || isChatLoading) return;

    const userMsg: ChatMessageWithSources = { role: 'user', text: textToSend };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInputMessage('');
    setIsChatLoading(true);

    const response = await chatWithCoach(newMessages, textToSend, forceThinking || isThinkingMode, language);

    setMessages(prev => [...prev, {
      role: 'model',
      text: response.text,
      isThinking: forceThinking || isThinkingMode,
      sources: response.sources
    }]);
    setIsChatLoading(false);
  };

  const startCoachConversation = (initialMessage: string) => {
    setActiveTab(TabView.COACH);
    setIsThinkingMode(true);
    handleSendMessage(initialMessage, true);
  };

  const renderDashboard = () => (
    <div className="space-y-12 animate-fade-in">
      {/* Neural Market Ticker - Video Automation is strictly last */}
      <div className="w-full bg-slate-900 overflow-hidden py-2 rounded-full border border-slate-800 shadow-2xl">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-12 text-[10px] font-black uppercase tracking-widest text-emerald-400">
          {[1, 2, 3, 4, 5].map(i => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2">
                <Globe className="w-3 h-3" /> MARKET_SCAN: 1,420 NEW GIGS
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-2">
                <Stars className="w-3 h-3 text-amber-500" /> GEMINI_2.5_PRO_SYNC: SUCCESS
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-slate-400" /> AI GAT GAP: VIDEO_AUTOMATION_SaaS (+140%)
              </span>
              <span className="text-slate-500">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-emerald-500/20 rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(16,185,129,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[11px] font-black tracking-widest mb-8 border border-emerald-500/20 uppercase">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              {language === 'AR' ? 'مدعوم من محرك البحث' : 'LIVE SEARCH ENGINE POWERED'}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.85] mb-4 tracking-tighter">
              {t.hero.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 via-teal-500 to-indigo-600 dark:from-emerald-400 dark:via-teal-300 dark:to-indigo-400">
                {t.hero.machine}
              </span>
            </h1>

            {/* THE CORE GAT FORMULA - High Visibility */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 py-3 px-4 sm:py-4 sm:px-8 bg-slate-50 dark:bg-slate-800/80 rounded-[2rem] border-2 border-emerald-500/30 mb-10 shadow-lg group transform hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                <div className="p-1.5 sm:p-2 bg-indigo-500 rounded-xl text-white shadow-lg shadow-indigo-500/30"><Briefcase className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">GIG</span><span className="sm:hidden">G</span>
              </div>
              <span className="text-emerald-500 font-black text-lg sm:text-xl">+</span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                <div className="p-1.5 sm:p-2 bg-amber-500 rounded-xl text-white shadow-lg shadow-amber-500/30"><Zap className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">ACTION</span><span className="sm:hidden">A</span>
              </div>
              <span className="text-emerald-500 font-black text-lg sm:text-xl">+</span>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-black uppercase tracking-tight text-slate-900 dark:text-white">
                <div className="p-1.5 sm:p-2 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30"><Wrench className="w-3 h-3 sm:w-4 sm:h-4" /></div> <span className="hidden sm:inline">(AI) TOOL</span><span className="sm:hidden">T</span>
              </div>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-1 sm:mx-2"></div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-black uppercase tracking-tight text-emerald-600 dark:text-emerald-400">
                <Equal className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">REVENUE / PROFIT</span><span className="sm:hidden">$$</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed max-w-xl font-medium">
              Unlock the secrets of the <span className="text-emerald-600 font-black">GAT Strategy</span>. Turn AI tools into 24/7 money-making machines.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-5">
              <button
                onClick={() => setActiveTab(TabView.GENERATOR)}
                className="px-6 sm:px-10 py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-500 text-white dark:text-slate-950 font-black rounded-2xl transition-all shadow-[0_20px_40px_rgba(5,150,105,0.3)] flex items-center gap-2 sm:gap-3 group text-base sm:text-lg"
              >
                {t.hero.button} <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button
                onClick={() => setActiveTab(TabView.WHY_GAT)}
                className="px-6 sm:px-10 py-4 sm:py-5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-black rounded-2xl transition-all border-2 border-slate-200 dark:border-slate-700 text-base sm:text-lg"
              >
                {t.nav.why}
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="absolute -inset-10 bg-emerald-500/10 dark:bg-emerald-500/20 blur-[120px] rounded-full"></div>
            <div className="relative bg-white dark:bg-slate-900/80 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] p-10 shadow-3xl backdrop-blur-3xl animate-float">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
                <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-2 tracking-[0.2em]">
                  <Search className="w-4 h-4" /> 2026_NEURAL_PULSE
                </div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-black">
                  SYNC_STATUS: 100%
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { name: 'GAT VIDEO AUTOMATION', growth: '+2,410%', color: 'emerald' },
                  { name: 'AI AGENT DEPLOYMENT', growth: '+980%', color: 'indigo' },
                  { name: 'B2B GAT SOLUTIONS', growth: '+1,150%', color: 'blue' }
                ].map((item, idx) => (
                  <div key={idx} className="group flex justify-between items-center p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border-2 border-transparent hover:border-emerald-500/30 transition-all cursor-default">
                    <div className="text-md font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">{item.name}</div>
                    <div className="text-right flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <div className="text-emerald-600 dark:text-emerald-400 text-sm font-black">{item.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-6 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global GAT Search powered by Gemini</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GATVisualizer />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <EarningsChart />
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Trophy className="w-20 h-20 text-emerald-500" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 uppercase tracking-tighter">THE GAT ADVANTAGE</h3>
          <ul className="space-y-8">
            <li className="flex gap-6 items-start group">
              <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tight">Real-Time Search Grounding</h4>
                <p className="text-md text-slate-600 dark:text-slate-400 font-medium">We don't use old data. Every GAT plan is built using live web search for today's highest paying gigs.</p>
              </div>
            </li>
            <li className="flex gap-6 items-start group">
              <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tight">Neural GAT Coaching</h4>
                <p className="text-md text-slate-600 dark:text-slate-400 font-medium">Get a deep-thinking coach that knows the app and the current AI market inside out.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderLearn = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-4">{t.nav.learn}</h2>
        <p className="text-slate-600 dark:text-slate-400 font-bold">Master the GAT Strategy through our curriculum.</p>
      </div>

      <div className="grid gap-8">
        {GAT_MODULES.map((module) => (
          <div
            key={module.id}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 p-8 md:p-12 hover:border-emerald-500/30 transition-all group"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="bg-emerald-500/10 p-6 rounded-3xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                {getIcon(module.icon)}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{module.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-black text-xs uppercase tracking-widest mb-6 italic">{module.summary}</p>
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 font-medium whitespace-pre-wrap">
                  {module.content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCoach = () => (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-200 dark:border-slate-800 shadow-3xl overflow-hidden animate-fade-in">
      {/* Coach Header */}
      <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-600 dark:text-indigo-400">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t.coach.title}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">{t.coach.status}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsThinkingMode(!isThinkingMode)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isThinkingMode
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'
              }`}
          >
            <BrainCircuit className="w-4 h-4 inline mr-2" /> {isThinkingMode ? t.coach.thinking : t.coach.fast}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth custom-scrollbar bg-slate-50 dark:bg-slate-950/20">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-scale-in`}>
            <div className={`max-w-[85%] p-6 rounded-[2rem] text-sm font-bold leading-relaxed shadow-xl ${m.role === 'user'
              ? 'bg-indigo-600 text-white rounded-tr-none'
              : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none'
              }`}>
              {m.text}

              {m.sources && m.sources.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Grounding Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {m.sources.map((source, sIdx) => (
                      <a
                        key={sIdx}
                        href={source.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all border border-slate-200 dark:border-slate-700"
                      >
                        {source.title.slice(0, 30)}... <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {m.isThinking && (
              <span className="mt-2 text-[9px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-1">
                <BrainCircuit className="w-3 h-3" /> Processed via Deep Reasoning
              </span>
            )}
          </div>
        ))}
        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] rounded-tl-none border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">{t.common.thinking}</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t.coach.input}
            className="flex-1 bg-slate-100 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-indigo-500 dark:text-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isChatLoading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-50"
          >
            {isChatLoading ? <Loader2 className="animate-spin" /> : <Send className="w-5 h-5" />}
            <span className="hidden md:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />

      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/70 dark:bg-slate-950/70 border-b border-slate-200 dark:border-white/5 py-4">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveTab(TabView.DASHBOARD)}>
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
              <span className="font-black text-white text-2xl tracking-tighter">G</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tighter uppercase">GATMONEY</span>
              <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-500 tracking-[0.3em] leading-none mt-1 flex items-center gap-1 uppercase">
                <Activity className="w-2.5 h-2.5" /> PULSE_SYNCED
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
            {[
              { id: TabView.DASHBOARD, label: t.nav.home, icon: LayoutDashboard },
              { id: TabView.GENERATOR, label: t.nav.jobs, icon: Zap },
              { id: TabView.COACH, label: t.nav.coach, icon: Bot },
              { id: TabView.MY_PLANS, label: t.nav.plans, icon: Bookmark },
              { id: TabView.IMAGE, label: t.nav.image, icon: ImageIcon, hideOnMd: true },
              { id: TabView.PRICING, label: t.nav.pricing, icon: CreditCard, hideOnMd: true },
              { id: TabView.VIDEO, label: t.nav.video, icon: Film },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 xl:px-4 py-2 rounded-xl flex items-center gap-1.5 xl:gap-2 text-[10px] xl:text-xs font-black transition-all uppercase tracking-wider ${item.hideOnMd ? 'hidden xl:flex' : ''} ${activeTab === item.id
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xl border border-emerald-500/20'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                {item.id === TabView.GENERATOR ? <Zap className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                  item.id === TabView.COACH ? <Bot className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                    item.id === TabView.MY_PLANS ? <Bookmark className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                      item.id === TabView.IMAGE ? <ImageIcon className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                        item.id === TabView.VIDEO ? <Film className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                          item.id === TabView.PRICING ? <CreditCard className="w-3.5 h-3.5 xl:w-4 xl:h-4" /> :
                            <LayoutDashboard className="w-3.5 h-3.5 xl:w-4 xl:h-4" />}
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}

            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1"></div>

            {/* Restored Language Toggle */}
            <div className="relative">
              <button
                onClick={() => setLangPickerOpen(!langPickerOpen)}
                className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl flex items-center gap-1 group"
              >
                <Languages className="w-4 h-4 xl:w-5 xl:h-5 group-hover:rotate-12 transition-transform" />
                <span className="text-[9px] xl:text-[10px] font-black uppercase tracking-wider">{language}</span>
              </button>
              {langPickerOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-in">
                  <div className="max-h-60 overflow-y-auto custom-scrollbar">
                    {Object.entries(LANGUAGES).map(([code, config]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code as Language)}
                        className={`w-full px-4 py-3 text-left text-xs font-black flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-widest ${language === code ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-slate-600 dark:text-slate-400'
                          }`}
                      >
                        <span className="text-base leading-none">{config.flag}</span>
                        {config.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-xl"
            >
              {isDark ? <Sun className="w-4 h-4 xl:w-5 xl:h-5" /> : <Moon className="w-4 h-4 xl:w-5 xl:h-5" />}
            </button>

            <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1"></div>

            {/* Auth Button */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-2.5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-all">
                  <User className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-[10px] xl:text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider max-w-[80px] xl:max-w-[100px] truncate">
                    {user.email?.split('@')[0]}
                  </span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <button
                    onClick={() => signOut()}
                    className="w-full px-4 py-3 text-left text-xs font-black flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-red-600 dark:text-red-400 uppercase tracking-widest"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/20 text-[10px] xl:text-xs flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span className="hidden xl:inline">Login</span>
              </button>
            )}
          </nav>

          <div className="lg:hidden flex items-center gap-2">
            {/* Language Toggle for Mobile */}
            <button
              onClick={() => { setLangPickerOpen(!langPickerOpen); setMobileMenuOpen(false); }}
              className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-900 dark:text-slate-300 flex items-center gap-2"
            >
              <Languages className="w-5 h-5" />
              <span className="text-[10px] font-black">{language}</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-900 dark:text-slate-300">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-slate-950 p-8 flex flex-col gap-6 animate-fade-in overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <div className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">GAT_MENU</div>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-900 rounded-full"><X className="w-8 h-8 dark:text-white" /></button>
          </div>
          {[
            { id: TabView.DASHBOARD, label: t.nav.home, icon: LayoutDashboard },
            { id: TabView.LEARN, label: t.nav.learn, icon: BookOpen },
            { id: TabView.GENERATOR, label: t.nav.jobs, icon: Zap },
            { id: TabView.COACH, label: t.nav.coach, icon: Bot },
            { id: TabView.MY_PLANS, label: t.nav.plans, icon: Bookmark },
            { id: TabView.IMAGE, label: t.nav.image, icon: ImageIcon },
            { id: TabView.PRICING, label: t.nav.pricing, icon: CreditCard },
            { id: TabView.VIDEO, label: t.nav.video, icon: Film },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full py-6 text-3xl font-black text-left border-b border-slate-200 dark:border-slate-800 flex items-center justify-between ${activeTab === item.id ? 'text-emerald-500' : 'text-slate-900 dark:text-white uppercase tracking-tighter'}`}
            >
              {item.label}
              <item.icon className="w-10 h-10" />
            </button>
          ))}
        </div>
      )}

      {/* Language Picker Modal for Mobile */}
      {langPickerOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-black uppercase tracking-widest text-xs text-slate-400">Select Language</h3>
              <button onClick={() => setLangPickerOpen(false)}><X className="w-6 h-6 dark:text-white" /></button>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {Object.entries(LANGUAGES).map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as Language)}
                  className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col gap-2 ${language === code
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                    }`}
                >
                  <span className="text-2xl">{config.flag}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{config.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-6 py-12 pb-32">
        {activeTab === TabView.DASHBOARD && renderDashboard()}
        {activeTab === TabView.WHY_GAT && <WhyUs />}
        {activeTab === TabView.LEARN && renderLearn()}
        {activeTab === TabView.GENERATOR && <GigGenerator onCoachRequest={startCoachConversation} onNavigateToTab={setActiveTab} language={language} />}
        {activeTab === TabView.VIDEO && <VideoGenerator />}
        {activeTab === TabView.IMAGE && <ImageEditor />}
        {activeTab === TabView.MY_PLANS && <MyPlans onCoachRequest={startCoachConversation} />}
        {activeTab === TabView.COACH && renderCoach()}
        {activeTab === TabView.PRICING && <Pricing />}
      </main>

      <Footer onNavigate={setActiveTab} />
      <HelpChatbot />
    </div>
  );
};

export default App;
