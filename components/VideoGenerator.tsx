import React, { useState, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import { VIDEO_TEMPLATES } from '../constants';
import { Film, Loader2, PlayCircle, AlertCircle, LayoutTemplate, Sparkles, Copy, Check } from 'lucide-react';

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    setLoading(true);
    setError(null);
    setVideoUrl(null);

    try {
      const url = await generateVideo(prompt);
      setVideoUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate video. Please ensure you have a valid paid API key selected.");
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
                className={`p-3 rounded-lg border text-left transition-all group relative overflow-hidden ${
                  activeTemplate === t.id 
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
            <button 
              onClick={handleCopy}
              className="text-xs flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {copied ? 'Copied' : 'Copy Text'}
            </button>
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
          className={`w-full py-4 rounded-lg flex items-center justify-center gap-2 font-bold text-white transition-all ${
            loading
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 shadow-lg'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
              <span>Generating Video (This may take a minute)...</span>
            </>
          ) : (
            <>
              <Film className="w-5 h-5" />
              <span>Generate Video</span>
            </>
          )}
        </button>
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
    </div>
  );
};

export default VideoGenerator;