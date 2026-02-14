import React, { useState } from 'react';
import { User, Briefcase, ArrowRight, Building2, TrendingUp, ShieldCheck, Zap, Bot, ImageIcon, Film, Bookmark, Activity, Target, BarChart, Rocket, Languages, Sun, Moon, X } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGES } from '../translations';

interface LandingPageProps {
    onSelectMode: (mode: 'FREELANCER' | 'BUSINESS') => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    isDark: boolean;
    onThemeToggle: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectMode, language, onLanguageChange, isDark, onThemeToggle }) => {
    const [langPickerOpen, setLangPickerOpen] = useState(false);

    const translations = {
        EN: { title: 'GATSMONEY', subtitle: 'AI-Powered Market Intelligence Platform', status: 'System Operational', freelancer: 'Freelancer / Creator', freelancerDesc: 'Generate high-demand gig strategies, find immediate opportunities, and automate your workflow.', freelancerCta: 'Launch Opportunity Engine', business: 'Business / Startup', businessDesc: 'Identify market gaps, analyze competitors, and deploy high-ROI AI automation systems.', businessCta: 'Access Intelligence Core', whatsInside: "What's Inside", whatsInsideDesc: 'Powerful AI-driven tools designed to help you find opportunities and scale your income.', freelancerTools: 'Freelancer Tools', businessTools: 'Business Tools', alreadyAccount: 'Already have an account?', login: 'Login to Terminal' },
        ES: { title: 'GATSMONEY', subtitle: 'Plataforma de Inteligencia de Mercado con IA', status: 'Sistema Operativo', freelancer: 'Freelancer / Creador', freelancerDesc: 'Genera estrategias de gigs de alta demanda, encuentra oportunidades inmediatas y automatiza tu flujo de trabajo.', freelancerCta: 'Lanzar Motor de Oportunidades', business: 'Negocio / Startup', businessDesc: 'Identifica brechas de mercado, analiza competidores y despliega sistemas de automatización de alto ROI.', businessCta: 'Acceder al Núcleo de Inteligencia', whatsInside: 'Qué Hay Dentro', whatsInsideDesc: 'Herramientas potentes impulsadas por IA diseñadas para ayudarte a encontrar oportunidades y escalar tus ingresos.', freelancerTools: 'Herramientas Freelancer', businessTools: 'Herramientas Empresariales', alreadyAccount: '¿Ya tienes una cuenta?', login: 'Iniciar Sesión en Terminal' },
        FR: { title: 'GATSMONEY', subtitle: 'Plateforme d\'Intelligence de Marché IA', status: 'Système Opérationnel', freelancer: 'Freelancer / Créateur', freelancerDesc: 'Générez des stratégies de gigs à forte demande, trouvez des opportunités immédiates et automatisez votre workflow.', freelancerCta: 'Lancer le Moteur d\'Opportunités', business: 'Entreprise / Startup', businessDesc: 'Identifiez les lacunes du marché, analysez les concurrents et déployez des systèmes d\'automatisation à haut ROI.', businessCta: 'Accéder au Noyau d\'Intelligence', whatsInside: 'Ce Qu\'il Y a Dedans', whatsInsideDesc: 'Outils puissants alimentés par l\'IA conçus pour vous aider à trouver des opportunités et à augmenter vos revenus.', freelancerTools: 'Outils Freelancer', businessTools: 'Outils Entreprise', alreadyAccount: 'Vous avez déjà un compte?', login: 'Se Connecter au Terminal' },
        DE: { title: 'GATSMONEY', subtitle: 'KI-gestützte Marktintelligenz-Plattform', status: 'System Betriebsbereit', freelancer: 'Freelancer / Kreator', freelancerDesc: 'Generiere hochgefragte Gig-Strategien, finde sofortige Chancen und automatisiere deinen Workflow.', freelancerCta: 'Chancen-Motor Starten', business: 'Geschäft / Startup', businessDesc: 'Identifiziere Marktlücken, analysiere Wettbewerber und setze hochrentable KI-Automatisierungssysteme ein.', businessCta: 'Zugang zum Intelligenz-Kern', whatsInside: 'Was Drin Ist', whatsInsideDesc: 'Leistungsstarke KI-gesteuerte Tools, die dir helfen, Chancen zu finden und dein Einkommen zu skalieren.', freelancerTools: 'Freelancer-Tools', businessTools: 'Geschäfts-Tools', alreadyAccount: 'Hast du bereits ein Konto?', login: 'Zum Terminal Anmelden' },
        ZH: { title: 'GATSMONEY', subtitle: 'AI驱动的市场情报平台', status: '系统运行中', freelancer: '自由职业者 / 创作者', freelancerDesc: '生成高需求的零工策略，发现即时机会，并自动化您的工作流程。', freelancerCta: '启动机会引擎', business: '企业 / 创业公司', businessDesc: '识别市场空白，分析竞争对手，并部署高投资回报率的AI自动化系统。', businessCta: '访问智能核心', whatsInside: '内部功能', whatsInsideDesc: '强大的AI驱动工具，旨在帮助您发现机会并扩大收入。', freelancerTools: '自由职业者工具', businessTools: '企业工具', alreadyAccount: '已有账户？', login: '登录终端' },
        JA: { title: 'GATSMONEY', subtitle: 'AI駆動の市場インテリジェンスプラットフォーム', status: 'システム稼働中', freelancer: 'フリーランサー / クリエイター', freelancerDesc: '高需要のギグ戦略を生成し、即座の機会を見つけ、ワークフローを自動化します。', freelancerCta: '機会エンジンを起動', business: 'ビジネス / スタートアップ', businessDesc: '市場のギャップを特定し、競合を分析し、高ROIのAI自動化システムを展開します。', businessCta: 'インテリジェンスコアにアクセス', whatsInside: '中身', whatsInsideDesc: '機会を見つけ、収入を拡大するために設計された強力なAI駆動ツール。', freelancerTools: 'フリーランサーツール', businessTools: 'ビジネスツール', alreadyAccount: 'すでにアカウントをお持ちですか？', login: 'ターミナルにログイン' },
        KO: { title: 'GATSMONEY', subtitle: 'AI 기반 시장 인텔리전스 플랫폼', status: '시스템 작동 중', freelancer: '프리랜서 / 크리에이터', freelancerDesc: '높은 수요의 기그 전략을 생성하고, 즉각적인 기회를 찾고, 워크플로우를 자동화하세요.', freelancerCta: '기회 엔진 시작', business: '비즈니스 / 스타트업', businessDesc: '시장 공백을 식별하고, 경쟁사를 분석하고, 높은 ROI의 AI 자동화 시스템을 배포하세요.', businessCta: '인텔리전스 코어 액세스', whatsInside: '내부 기능', whatsInsideDesc: '기회를 찾고 수입을 확장하도록 설계된 강력한 AI 기반 도구.', freelancerTools: '프리랜서 도구', businessTools: '비즈니스 도구', alreadyAccount: '이미 계정이 있으신가요?', login: '터미널에 로그인' },
        PT: { title: 'GATSMONEY', subtitle: 'Plataforma de Inteligência de Mercado com IA', status: 'Sistema Operacional', freelancer: 'Freelancer / Criador', freelancerDesc: 'Gere estratégias de gigs de alta demanda, encontre oportunidades imediatas e automatize seu fluxo de trabalho.', freelancerCta: 'Lançar Motor de Oportunidades', business: 'Negócio / Startup', businessDesc: 'Identifique lacunas de mercado, analise concorrentes e implante sistemas de automação de alto ROI.', businessCta: 'Acessar Núcleo de Inteligência', whatsInside: 'O Que Tem Dentro', whatsInsideDesc: 'Ferramentas poderosas impulsionadas por IA projetadas para ajudá-lo a encontrar oportunidades e escalar sua renda.', freelancerTools: 'Ferramentas Freelancer', businessTools: 'Ferramentas Empresariais', alreadyAccount: 'Já tem uma conta?', login: 'Entrar no Terminal' },
        HI: { title: 'GATSMONEY', subtitle: 'AI-संचालित बाजार खुफिया मंच', status: 'सिस्टम चालू', freelancer: 'फ्रीलांसर / क्रिएटर', freelancerDesc: 'उच्च मांग वाली गिग रणनीतियां उत्पन्न करें, तत्काल अवसर खोजें, और अपने वर्कफ़्लो को स्वचालित करें।', freelancerCta: 'अवसर इंजन लॉन्च करें', business: 'व्यवसाय / स्टार्टअप', businessDesc: 'बाजार के अंतराल की पहचान करें, प्रतिस्पर्धियों का विश्लेषण करें, और उच्च ROI AI स्वचालन प्रणालियों को तैनात करें।', businessCta: 'इंटेलिजेंस कोर तक पहुंचें', whatsInside: 'अंदर क्या है', whatsInsideDesc: 'शक्तिशाली AI-संचालित उपकरण जो आपको अवसर खोजने और आय बढ़ाने में मदद करने के लिए डिज़ाइन किए गए हैं।', freelancerTools: 'फ्रीलांसर उपकरण', businessTools: 'व्यवसाय उपकरण', alreadyAccount: 'पहले से खाता है?', login: 'टर्मिनल में लॉगिन करें' },
        AR: { title: 'GATSMONEY', subtitle: 'منصة استخبارات السوق المدعومة بالذكاء الاصطناعي', status: 'النظام قيد التشغيل', freelancer: 'مستقل / منشئ محتوى', freelancerDesc: 'قم بإنشاء استراتيجيات جِيج عالية الطلب، واعثر على فرص فورية، وقم بأتمتة سير عملك.', freelancerCta: 'إطلاق محرك الفرص', business: 'أعمال / شركة ناشئة', businessDesc: 'حدد فجوات السوق، وحلل المنافسين، ونشر أنظمة أتمتة الذكاء الاصطناعي ذات العائد المرتفع.', businessCta: 'الوصول إلى نواة الاستخبارات', whatsInside: 'ما بالداخل', whatsInsideDesc: 'أدوات قوية مدعومة بالذكاء الاصطناعي مصممة لمساعدتك في العثور على الفرص وتوسيع دخلك.', freelancerTools: 'أدوات المستقلين', businessTools: 'أدوات الأعمال', alreadyAccount: 'هل لديك حساب بالفعل؟', login: 'تسجيل الدخول إلى الطرفية' }
    };

    const t = translations[language];
    const isRTL = LANGUAGES[language].isRTL;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Language & Theme Toggle - Top Right */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
                {/* Language Picker */}
                <div className="relative">
                    <button
                        onClick={() => setLangPickerOpen(!langPickerOpen)}
                        className="p-3 bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-white/20 dark:hover:bg-slate-900/70 transition-all flex items-center gap-2 group"
                    >
                        <Languages className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:rotate-12 transition-transform" />
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">{language}</span>
                    </button>
                    {langPickerOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-scale-in">
                            <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                {Object.entries(LANGUAGES).map(([code, config]) => (
                                    <button
                                        key={code}
                                        onClick={() => {
                                            onLanguageChange(code as Language);
                                            setLangPickerOpen(false);
                                        }}
                                        className={`w-full px-4 py-3 text-left text-xs font-black flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors uppercase tracking-widest ${language === code
                                                ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                                                : 'text-slate-600 dark:text-slate-400'
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

                {/* Theme Toggle */}
                <button
                    onClick={onThemeToggle}
                    className="p-3 bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-white/20 dark:hover:bg-slate-900/70 transition-all"
                >
                    {isDark ? (
                        <Sun className="w-5 h-5 text-slate-300" />
                    ) : (
                        <Moon className="w-5 h-5 text-slate-700" />
                    )}
                </button>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-6xl w-full space-y-20">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-2">
                        {t.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3" /> {t.status} {new Date().getFullYear()}
                    </div>
                </div>

                {/* Mode Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Freelancer Mode */}
                    <button
                        onClick={() => onSelectMode('FREELANCER')}
                        className="group relative bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 rounded-[2.5rem] p-10 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{t.freelancer}</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                    {t.freelancerDesc}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase tracking-widest pt-4">
                                {t.freelancerCta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>

                    {/* Business Mode */}
                    <button
                        onClick={() => onSelectMode('BUSINESS')}
                        className="group relative bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-indigo-500 rounded-[2.5rem] p-10 text-left transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                <Building2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">{t.business}</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                                    {t.businessDesc}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-widest pt-4">
                                {t.businessCta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>

                {/* What's Inside Section */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-3">
                            {t.whatsInside.split(' ')[0]} <span className="text-emerald-500">{t.whatsInside.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
                            {t.whatsInsideDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Freelancer Features */}
                        <div className="bg-white dark:bg-slate-900/50 border-2 border-emerald-500/20 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">{t.freelancerTools}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Gig Generator</h4>
                                        <p className="text-xs text-slate-400">AI-powered gig discovery with pricing bands, competition analysis, and AI leverage scores</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">AI Strategy Coach</h4>
                                        <p className="text-xs text-slate-400">Deep-thinking AI assistant for personalized business strategy and growth advice</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <ImageIcon className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Image Studio</h4>
                                        <p className="text-xs text-slate-400">Create professional graphics and visuals for your gigs and marketing</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Film className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Video Automation</h4>
                                        <p className="text-xs text-slate-400">Generate and edit videos to fulfill content creation gigs efficiently</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bookmark className="w-4 h-4 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">My Plans</h4>
                                        <p className="text-xs text-slate-400">Save and organize your best gig strategies for quick reference</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Features */}
                        <div className="bg-white dark:bg-slate-900/50 border-2 border-indigo-500/20 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-indigo-500" />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">{t.businessTools}</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Market Gap Finder</h4>
                                        <p className="text-xs text-slate-400">Discover untapped opportunities in your industry with AI-powered market analysis</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Activity className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Competitor Analysis</h4>
                                        <p className="text-xs text-slate-400">Identify competitor weaknesses and service gaps to exploit in your market</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <BarChart className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">ROI Automation Opportunities</h4>
                                        <p className="text-xs text-slate-400">Find high-return automation strategies with estimated ROI and implementation tools</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Rocket className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">Implementation Roadmap</h4>
                                        <p className="text-xs text-slate-400">Get phased action plans to execute your market expansion strategy</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-8 h-8 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-white mb-1">AI Strategy Coach</h4>
                                        <p className="text-xs text-slate-400">Deep-thinking AI assistant for business scaling and strategic decision-making</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login / Auth Options */}
                <div className="text-center animate-fade-in space-y-4 pb-8">
                    <p className="text-slate-600 dark:text-slate-500 font-medium text-sm">{t.alreadyAccount}</p>
                    <button
                        onClick={() => onSelectMode('FREELANCER')} // Default to a mode to trigger entrance then auth
                        className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-black uppercase tracking-widest text-sm border-b-2 border-transparent hover:border-emerald-500 transition-all pb-1"
                    >
                        {t.login}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
