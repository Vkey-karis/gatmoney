import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TabView } from '../types';

interface GlobalBackButtonProps {
    currentTab: TabView;
    onNavigate: (tab: TabView) => void;
}

const GlobalBackButton: React.FC<GlobalBackButtonProps> = ({ currentTab, onNavigate }) => {
    // Only show if NOT on Dashboard
    if (currentTab === TabView.DASHBOARD) {
        return null;
    }

    return (
        <div className="fixed bottom-8 left-8 z-[90]">
            <button
                onClick={() => onNavigate(TabView.DASHBOARD)}
                className="px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-full shadow-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-wide"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back to Hub</span>
            </button>
        </div>
    );
};

export default GlobalBackButton;
