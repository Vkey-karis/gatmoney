
import { Module } from './types';

/**
 * ==========================================
 * AFFILIATE CONTROL ROOM
 * ==========================================
 */
export interface PartnerTool {
  url: string;
  description: string;
}

export const PARTNER_LINKS: Record<string, PartnerTool> = {
  // --- GIG PLATFORMS ---
  'Fiverr': { 
    url: 'https://www.fiverr.com/', 
    description: 'The world\'s largest marketplace for digital services. Perfect for starting your GAT journey with low-barrier entry gigs.' 
  },
  'Upwork': { 
    url: 'https://www.upwork.com/', 
    description: 'A platform for higher-value, long-term contracts. Ideal for scaling your GAT agency once you have a portfolio.' 
  },
  'Freelancer': { 
    url: 'https://www.freelancer.com/', 
    description: 'A global crowdsourcing marketplace where you can bid on specific AI implementation projects.' 
  },
  
  // --- AI CONTENT TOOLS ---
  'Canva': { 
    url: 'https://www.canva.com/', 
    description: 'The ultimate design partner. Use their Magic Studio AI to fulfill graphic design, social media, and presentation gigs.' 
  },
  'Jasper': { 
    url: 'https://www.jasper.ai/', 
    description: 'An enterprise-grade AI copywriter. Use this for high-paying blog writing and marketing strategy gigs.' 
  },
  'Copy.ai': { 
    url: 'https://www.copy.ai/', 
    description: 'A creativity-focused writing tool. Excellent for social media captions, ad copy, and email marketing gigs.' 
  },
  'Writesonic': { 
    url: 'https://writesonic.com/', 
    description: 'Specializes in SEO-optimized content. Perfect for gigs requiring long-form articles that rank on Google.' 
  },
  
  // --- VIDEO & AUDIO ---
  'InVideo': { 
    url: 'https://invideo.io/', 
    description: 'AI-powered video creation. Turn scripts into viral TikToks or YouTube Shorts for your clients in minutes.' 
  },
  'Synthesia': { 
    url: 'https://www.synthesia.io/', 
    description: 'The leader in AI video avatars. Great for training videos, corporate presentations, and educational gigs.' 
  },
  'ElevenLabs': { 
    url: 'https://elevenlabs.io/', 
    description: 'The gold standard for AI voice. Use this for high-quality voiceover, narration, and dubbing gigs.' 
  },
  'Descript': { 
    url: 'https://www.descript.com/', 
    description: 'Revolutionary audio/video editing. Use "Overdub" and AI-transcription to fulfill podcast and video editing gigs.' 
  },
  
  // --- BUSINESS & WEB ---
  'Hostinger': { 
    url: 'https://www.hostinger.com/', 
    description: 'Fast, reliable hosting with an AI Website Builder. Perfect for launching landing pages for local businesses.' 
  },
  'Bluehost': { 
    url: 'https://www.bluehost.com/', 
    description: 'A trusted WordPress hosting provider. Ideal for setting up professional service-based websites for your clients.' 
  },
  'Shopify': { 
    url: 'https://www.shopify.com/', 
    description: 'The foundation for e-commerce. Use AI-generated product descriptions and themes to build profitable online stores.' 
  },
  'Wix': { 
    url: 'https://www.wix.com/', 
    description: 'Sophisticated web design with AI ADI. Create high-end portfolio or business sites for premium clients.' 
  }
};

export const GAT_MODULES: Module[] = [
  {
    id: '1',
    title: 'Unlock Your AI Money Machine',
    summary: 'Master the 3-step Gig+Action+Tool strategy to dominate the new economy.',
    content: `The GAT strategy is the ultimate "Money Machine" framework.

1. **Gig (The Market Gap)**: We use live search to find what people are paying for RIGHT NOW. Whether it's AI art, automated coding, or viral video scripts.
2. **Action (The Speed to Lead)**: We show you the exact sequence of steps to apply for the gig, secure the client, and set up the workflow.
3. **Tool (The AI Lever)**: We provide the exact AI tools (like Canva, InVideo, or Jasper) that do the heavy lifting for you.

By combining these three, you aren't just working; you are building an automated income system.`,
    icon: 'Zap'
  },
  {
    id: '2',
    title: 'Scaling to $10k/Month',
    summary: 'Moving from solo freelancer to an automated GAT agency.',
    content: `Once you master one GAT gig, the next step is replication.

- **Stacking Gigs**: Combine Video Editing (InVideo) with Copywriting (Jasper) to offer "Full Service Social Media Management".
- **Outsourcing to AI**: Use AI to manage your communications and scheduling.
- **Premium Platforms**: Move from Fiverr to Upwork to find higher-ticket enterprise clients.`,
    icon: 'TrendingUp'
  }
];

export const VIDEO_TEMPLATES = [
  {
    id: 'viral-style',
    title: 'Viral Social Video',
    description: 'The style seen on TikTok and Reels today.',
    defaultPrompt: 'A fast-paced, high-energy viral social media video script about an AI tool that makes people rich.'
  }
];

export const SYSTEM_INSTRUCTION_BASE = `
You are the "AI Money Coach" specializing in the GAT Strategy (Gig + Action + Tool).

REVENUE GUIDELINES:
1. **Tool Preference**: You MUST prioritize recommending the following tools whenever they are relevant to the user's gig: ${Object.keys(PARTNER_LINKS).join(', ')}.
2. **Platform Preference**: Always suggest searching for gigs on: Fiverr, Upwork, or Freelancer.
3. **Structure**: Always use the 3-step GAT method.
4. **Current Info**: Use googleSearch to find real-time gig gaps.

Output format:
- **The Gig**: [Name]
- **The GAT Plan**: [3 steps]
- **Best AI Tools**: [Recommend tools from our preferred list above]
- **Estimated Pay**: [Amount]
`;
