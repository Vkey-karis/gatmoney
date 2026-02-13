
import React, { useState, useRef, useEffect } from 'react';
import { editImage } from '../services/geminiService';
import { Image as ImageIcon, Loader2, Sparkles, Upload, ArrowRight, Copy, Check, Wand2, AlertTriangle, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const STYLE_PRESETS = [
  { label: 'Cyberpunk', prompt: 'Convert this image to a cyberpunk style with neon lights' },
  { label: 'Cartoon', prompt: 'Turn this into a vibrant cartoon illustration' },
  { label: 'Sketch', prompt: 'Make this look like a pencil sketch' },
  { label: 'Oil Painting', prompt: 'Transform this into a classic oil painting' },
  { label: 'Remove Background', prompt: 'Remove the background and keep the subject on white' },
];

const MAX_FREE_GENERATIONS = 3;

const ImageEditor: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [genCount, setGenCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auth Check
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in text-center py-20">
        <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border-2 border-purple-500/30 rounded-3xl p-12">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 uppercase">Authentication Required</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Please log in to access the Image Studio.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const count = parseInt(localStorage.getItem('gat_image_gen_count') || '0');
    setGenCount(count);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setGeneratedImage(null); // Reset result on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt.trim()) return;

    if (genCount >= MAX_FREE_GENERATIONS) {
      alert("You've reached your free limit of 3 AI image generations. Please upgrade your plan to continue.");
      return;
    }

    setLoading(true);

    // Extract base64 data only (remove "data:image/png;base64,")
    const base64Data = selectedImage.split(',')[1];

    try {
      const resultUrl = await editImage(base64Data, mimeType, prompt);
      setGeneratedImage(resultUrl);

      const newCount = genCount + 1;
      setGenCount(newCount);
      localStorage.setItem('gat_image_gen_count', newCount.toString());
    } catch (error) {
      console.error(error);
      alert("Failed to edit image. Please ensure your image is under 4MB and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Magic Photo Editor
          </span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto font-bold italic">
          Add objects, remove backgrounds, or change styles instantly using AI.
        </p>
      </div>

      {genCount >= MAX_FREE_GENERATIONS && (
        <div className="mb-8 p-6 bg-amber-500/10 border-2 border-amber-500/50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 animate-bounce-subtle">
          <div className="flex items-center gap-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
            <div>
              <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">Free Generation Limit Reached</h4>
              <p className="text-xs font-bold text-slate-500">You have used your {MAX_FREE_GENERATIONS} free edits. Upgrade to continue building.</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all flex items-center gap-2">
            <CreditCard className="w-4 h-4" /> Upgrade Now
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedImage ? 'border-indigo-500 bg-white dark:bg-slate-900' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 shadow-xl'
              }`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Original" className="h-full w-full object-contain rounded-2xl p-2" />
            ) : (
              <div className="text-center p-6">
                <Upload className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Upload photo</p>
                <p className="text-slate-500 text-[10px] mt-1 uppercase font-bold tracking-tighter">PNG / JPG (MAX 4MB)</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Prompt Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Modification Prompt</label>
              <div className="text-[10px] font-black uppercase text-slate-400">
                {MAX_FREE_GENERATIONS - genCount} / {MAX_FREE_GENERATIONS} FREE LEFT
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-3">
              {STYLE_PRESETS.map((style, idx) => (
                <button
                  key={idx}
                  onClick={() => setPrompt(style.prompt)}
                  className="text-[9px] font-black uppercase tracking-tight px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {style.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Add a cat, make it cyberpunk style..."
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-cyan-500 shadow-lg"
              />
              <button
                onClick={handleEdit}
                disabled={loading || !selectedImage || !prompt || genCount >= MAX_FREE_GENERATIONS}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white px-6 rounded-xl font-black transition-all shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl min-h-[300px] flex items-center justify-center relative overflow-hidden group">
          {generatedImage ? (
            <div className="w-full h-full relative p-4">
              <img src={generatedImage} alt="Edited" className="w-full h-full object-contain rounded-xl" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <a href={generatedImage} download="GAT_Edited_Image.png" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                  <Wand2 className="w-4 h-4" /> Download Result
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center p-8">
              {loading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mb-4" />
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest animate-pulse">Processing GAT Data...</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mt-2">Connecting to Visual Engine</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-inner">
                    <ArrowRight className="w-10 h-10 text-slate-200 dark:text-slate-700" />
                  </div>
                  <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Visual Output Ready</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
