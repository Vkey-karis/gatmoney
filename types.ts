
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

// Media Credits & Generation Types
export interface MediaCredits {
  userId: string;
  imageCredits: number;
  videoSecondsCredits: number;
  createdAt: string;
  updatedAt: string;
}

export interface MediaGenerationLog {
  id: string;
  userId: string;
  mediaType: 'image' | 'video';
  prompt: string;
  creditsUsed: number;
  mediaUrl?: string;
  generationStatus: 'pending' | 'completed' | 'failed';
  errorMessage?: string;
  createdAt: string;
}

export interface CreditPurchase {
  id: string;
  userId: string;
  purchaseType: 'image' | 'video';
  creditsPurchased: number;
  amountPaid: number;
  paymentMethod: 'paypal' | 'paystack';
  paymentId: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

// Fraud Detection Types
export interface UserFingerprint {
  id: string;
  userId: string;
  ipAddress: string;
  browserFingerprint: string;
  deviceInfo: {
    userAgent: string;
    platform: string;
    language: string;
    screenResolution: string;
    timezone: string;
  };
  firstSeen: string;
  lastSeen: string;
}

// Media Library Types
export interface MediaLibraryItem {
  id: string;
  mediaType: 'image' | 'video';
  title: string;
  description?: string;
  prompt?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
}

// API Key Management Types
export interface UserAPIKey {
  id: string;
  userId: string;
  serviceName: 'gemini_imagen' | 'veo';
  encryptedApiKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Credit Package Types
export interface CreditPackage {
  id: string;
  type: 'video';
  seconds: number;
  price: number;
  popular?: boolean;
}
