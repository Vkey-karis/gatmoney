
export interface Module {
  id: string;
  title: string;
  summary: string;
  content: string;
  icon: 'Zap' | 'Briefcase' | 'Rocket' | 'Code' | 'TrendingUp' | 'Workflow' | 'Wrench' | 'Trophy' | 'Calendar' | 'Bot' | 'Building' | 'AlertTriangle';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
  isThinking?: boolean;
}

export interface GeneratedGig {
  gigTitle: string;
  actionPlan: string[];
  recommendedTools: string[];
  estimatedEarnings: string;
  dateCreated?: string;
  personalNote?: string;
  tags?: string[];
  // New metrics for Engine A
  pricingBands?: { low: string; mid: string; high: string };
  competitionDensity?: 'Low' | 'Medium' | 'High';
  aiLeverageScore?: number; // 1-10
  marketConfidence?: number; // 1-10
}

export type UserMode = 'FREELANCER' | 'BUSINESS';

export interface BusinessReport {
  industry: string;
  region: string;
  serviceGaps: string[];
  competitorWeaknesses: string[];
  automationOpportunities: { area: string; tool: string; estimatedRoi: string }[];
  revenueExpansion: string[];
  implementationRoadmap: { phase: string; actions: string[] }[];
  marketConfidence: number;
  trendDirection: 'Up' | 'Down' | 'Stable';
  dateCreated?: string;
}

export enum TabView {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',
  GENERATOR = 'GENERATOR',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  COACH = 'COACH',
  MY_PLANS = 'MY_PLANS',
  WHY_GAT = 'WHY_GAT',
  PRICING = 'PRICING',
  BUSINESS_INTEL = 'BUSINESS_INTEL'
}

export type Language = 'EN' | 'ES' | 'FR' | 'DE' | 'ZH' | 'JA' | 'KO' | 'PT' | 'HI' | 'AR';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  isRTL?: boolean;
}
