import React, { useEffect, useState } from 'react';
import { X, Sparkles, TrendingUp, Zap } from 'lucide-react';

interface WelcomeMessageProps {
  userName: string;
  onDismiss: () => void;
  isFirstLogin?: boolean;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName, onDismiss, isFirstLogin = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(isFirstLogin);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setIsVisible(true), 100);

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    // Hide confetti after 3 seconds
    if (isFirstLogin) {
      setTimeout(() => setShowConfetti(false), 3000);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10%',
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ec4899'][Math.floor(Math.random() * 4)],
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Welcome Message */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
        }`}
      >
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-indigo-600 p-[2px] rounded-3xl shadow-2xl">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8">
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">
                  {isFirstLogin ? '🎉 Welcome to GAT!' : '👋 Welcome Back!'} {userName}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-4">
                  {isFirstLogin
                    ? "You're now part of the GAT revolution. Let's turn AI tools into money-making machines!"
                    : "Ready to discover more AI money gaps? Your dashboard is waiting."}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-3 text-center border border-emerald-200 dark:border-emerald-800">
                    <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Powered Up
                    </div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-xl p-3 text-center border border-indigo-200 dark:border-indigo-800">
                    <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                    <div className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Let's Grow
                    </div>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 text-center border border-amber-200 dark:border-amber-800">
                    <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
                    <div className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      AI Ready
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
