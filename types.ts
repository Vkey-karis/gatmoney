
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
  PRICING = 'PRICING'
}

export type Language = 'EN' | 'ES' | 'FR' | 'DE' | 'ZH' | 'JA' | 'KO' | 'PT' | 'HI' | 'AR';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
  isRTL?: boolean;
}
