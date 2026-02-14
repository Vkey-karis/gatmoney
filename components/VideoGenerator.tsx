import React, { useState, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import { VIDEO_TEMPLATES } from '../constants';
import { Film, Loader2, PlayCircle, AlertCircle, LayoutTemplate, Sparkles, Copy, Check, Lock, Crown, CreditCard, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSubscription } from '../context/SubscriptionContext';
import CreditPurchaseModal from './CreditPurchaseModal';
import { initiateCreditPurchase, processCreditPurchase } from '../services/creditManagement';

const VIDEO_COST_SECONDS = 5;

const VideoGenerator: React.FC = () => {
  const { user } = useAuth();
  const { tier, videoSecondsCredits, deductVideoSeconds, addVideoSeconds } = useSubscription();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Auth Check
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in text-center py-20">
        <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-2 border-pink-500/30 rounded-3xl p-12">
          <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase">Authentication Required</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Please log in to access the Video Automation Studio.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  // Tier Access Check
  if (tier === 'FREE') {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in text-center py-20">
        <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30 rounded-3xl p-12">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Crown className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase">Upgrade Required</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 font-bold">
            The AI Video Studio is available on Individual, Pro, and Business plans.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => window.location.href = '/?tab=PRICING'} // Simple navigation
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm shadow-xl shadow-red-500/20"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handlePurchaseCredits = async (packageId: string, paymentMethod: 'paypal' | 'paystack') => {
    // Determine package details from ID (e.g. 'video-10')
    const seconds = parseInt(packageId.split('-')[1]);
    const priceMap: any = { '10': 7.50, '30': 22.50, '60': 45.00, '120': 90.00 }; // Rough map, could be better to lookup from CREDIT_PACKAGES
    const price = priceMap[seconds.toString()] || 0;

    // Simulate Payment Flow
    const purchaseId = await initiateCreditPurchase(user.id, 'video', seconds, price, paymentMethod);

    if (purchaseId) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await processCreditPurchase(purchaseId, `mock_payment_${Date.now()}`, 'completed');
      addVideoSeconds(seconds);
    }
  };

  // Cleanup Blob URL on unmount or when URL changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (videoSecondsCredits < VIDEO_COST_SECONDS) {
      setShowPurchaseModal(true);
      return;
    }

    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateVideo(prompt, VIDEO_COST_SECONDS);
      setVideoUrl(url);

      deductVideoSeconds(VIDEO_COST_SECONDS);
    } catch (err: any) {
      setError(err.message || "Failed to generate video. Please adjust your prompt.");
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (template: typeof VIDEO_TEMPLATES[0]) => {
    setPrompt(template.defaultPrompt);
    setActiveTemplate(template.id);
  };

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            AI Video Studio
          </span>
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Turn your blog posts, scripts, or ideas into short video clips instantly using the GAT Video Engine.
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">

        {/* Templates Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <LayoutTemplate className="w-5 h-5 text-red-400" />
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Start with a Template</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {VIDEO_TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => applyTemplate(t)}
                className={`p-3 rounded-lg border text-left transition-all group relative overflow-hidden ${activeTemplate === t.id
                  ? 'bg-red-500/10 border-red-500/50 text-white'
                  : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:bg-slate-700 hover:border-slate-500 hover:text-white'
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{t.title}</span>
                  {activeTemplate === t.id && <Sparkles className="w-3 h-3 text-red-400" />}
                </div>
                <p className="text-xs opacity-70 leading-tight">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-300">Video Prompt / Script (Customize below)</label>
            <div className="flex items-center gap-3">
              <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${videoSecondsCredits >= VIDEO_COST_SECONDS ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {videoSecondsCredits.toFixed(1)}s Credits Left
              </div>
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="text-[10px] font-black uppercase text-red-400 hover:text-red-300 flex items-center gap-1"
              >
                <CreditCard className="w-3 h-3" /> Buy More
              </button>
              <button
                onClick={handleCopy}
                className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>
          </div>
          <textarea
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
            rows={4}
            placeholder="Describe the video you want. E.g., 'A futuristic city with flying cars in a cyberpunk style, cinematic lighting.'"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-bold text-white transition-all ${loading
            ? 'bg-slate-600 cursor-not-allowed'
            : videoSecondsCredits >= VIDEO_COST_SECONDS
              ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg'
              : 'bg-slate-700 cursor-not-allowed'
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Generating Video (Cost: {VIDEO_COST_SECONDS}s)...</span>
            </>
          ) : videoSecondsCredits >= VIDEO_COST_SECONDS ? (
            <>
              <Film className="w-5 h-5" />
              <span>Generate Video (Cost: {VIDEO_COST_SECONDS}s)</span>
            </>
          ) : (
            <>
              <Lock className="w-5 h-5" />
              <span>Insufficient Credits (Need {VIDEO_COST_SECONDS}s)</span>
            </>
          )}
        </button>

        {videoSecondsCredits < VIDEO_COST_SECONDS && (
          <div className="mt-3 text-center">
            <button onClick={() => setShowPurchaseModal(true)} className="text-xs text-red-400 font-bold hover:underline">
              You need at least {VIDEO_COST_SECONDS} seconds of credit. Buy now.
            </button>
          </div>
        )}
      </div>

      {videoUrl && (
        <div className="mt-8 bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl animate-fade-in">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <PlayCircle className="text-red-500" /> Generated Result
          </h3>
          <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative border border-slate-800">
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-contain"
              autoPlay
              loop
            />
          </div>
          <div className="mt-4 text-center">
            <a href={videoUrl} download="GAT_Generated_Video.mp4" className="inline-flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full transition-colors">
              <Film className="w-4 h-4" /> Download Video
            </a>
          </div>
        </div>
      )}
      <CreditPurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchase={handlePurchaseCredits}
        purchaseType="video"
      />
    </div>
  );
};

export default VideoGenerator;