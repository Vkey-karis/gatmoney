import React from 'react';
import { User, Calendar, Zap, Bookmark, Clock, TrendingUp } from 'lucide-react';

interface UserProfileProps {
  email: string;
  joinDate?: string;
  stats?: {
    plansCreated: number;
    gigsAnalyzed: number;
    timeSaved: number;
  };
}

export const UserProfile: React.FC<UserProfileProps> = ({ 
  email, 
  joinDate = new Date().toLocaleDateString(),
  stats = { plansCreated: 0, gigsAnalyzed: 0, timeSaved: 0 }
}) => {
  const userName = email.split('@')[0];
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-2xl font-black text-white">{initial}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1">
            {userName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Member since {joinDate}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-4 border-2 border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 rounded-xl">
              <Bookmark className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Plans
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.plansCreated}
          </div>
          <div className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-medium">
            Created
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-2xl p-4 border-2 border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500 rounded-xl">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Gigs
            </span>
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {stats.gigsAnalyzed}
          </div>
          <div className="text-xs text-indigo-600/70 dark:text-indigo-400/70 font-medium">
            Analyzed
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-4 border-2 border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500 rounded-xl">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Time
            </span>
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
            {stats.timeSaved}h
          </div>
          <div className="text-xs text-amber-600/70 dark:text-amber-400/70 font-medium">
            Saved
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Quick Actions
        </h4>
        <button className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-left flex items-center gap-3 transition-all group border border-slate-200 dark:border-slate-700">
          <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-sm font-black text-slate-900 dark:text-white">View Saved Plans</span>
          <TrendingUp className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-left flex items-center gap-3 transition-all group border border-slate-200 dark:border-slate-700">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span className="text-sm font-black text-slate-900 dark:text-white">Account Settings</span>
          <TrendingUp className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
