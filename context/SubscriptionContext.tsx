import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserTier = 'FREE' | 'INDIVIDUAL' | 'PRO' | 'BUSINESS';

interface SubscriptionContextType {
    tier: UserTier;
    scansUsed: number;
    maxScans: number;
    imageCredits: number;
    maxImageCredits: number;
    videoSecondsCredits: number;
    maxVideoSecondsCredits: number;
    businessReportsUsed: number;
    maxBusinessReports: number;
    incrementScans: () => boolean;
    incrementBusinessReports: () => boolean;
    deductImageCredit: () => boolean;
    deductVideoSeconds: (seconds: number) => boolean;
    addImageCredits: (amount: number) => void;
    addVideoSeconds: (seconds: number) => void;
    upgradeTier: (tier: UserTier) => void;
    resetUsages: () => void;
    hasMediaAccess: () => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
    tier: 'FREE',
    scansUsed: 0,
    maxScans: 10,
    imageCredits: 0,
    maxImageCredits: 0,
    videoSecondsCredits: 0,
    maxVideoSecondsCredits: 0,
    businessReportsUsed: 0,
    maxBusinessReports: 0,
    incrementScans: () => false,
    incrementBusinessReports: () => false,
    deductImageCredit: () => false,
    deductVideoSeconds: () => false,
    addImageCredits: () => { },
    addVideoSeconds: () => { },
    upgradeTier: () => { },
    resetUsages: () => { },
    hasMediaAccess: () => false,
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tier, setTier] = useState<UserTier>('FREE');
    const [scansUsed, setScansUsed] = useState(0);
    const [businessReportsUsed, setBusinessReportsUsed] = useState(0);
    const [imageCredits, setImageCredits] = useState(0);
    const [videoSecondsCredits, setVideoSecondsCredits] = useState(0);

    // Limits Definitions - Updated for 4-tier pricing structure
    const LIMITS = {
        FREE: {
            scans: 10,
            reports: 0,
            images: 0,
            videoSeconds: 0
        },
        INDIVIDUAL: {
            scans: 30,
            reports: 0,
            images: 0,
            videoSeconds: 0
        },
        PRO: {
            scans: 100,
            reports: 0,
            images: 20,
            videoSeconds: 90
        },
        BUSINESS: {
            scans: 30,
            reports: 1000,
            images: 20,
            videoSeconds: 180
        },
    };

    useEffect(() => {
        // Load state from local storage
        const savedTier = localStorage.getItem('gat_tier') as UserTier;
        if (savedTier) setTier(savedTier);

        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('gat_usage_date');

        if (storedDate !== today) {
            // Reset daily scan counts (not credits)
            setScansUsed(0);
            localStorage.setItem('gat_usage_date', today);
            localStorage.setItem('gat_scans_used', '0');
        } else {
            setScansUsed(parseInt(localStorage.getItem('gat_scans_used') || '0'));
        }

        // Load media credits (these persist across days)
        setImageCredits(parseInt(localStorage.getItem('gat_image_credits') || '0'));
        setVideoSecondsCredits(parseFloat(localStorage.getItem('gat_video_seconds') || '0'));
    }, []);

    const incrementScans = () => {
        if (scansUsed >= LIMITS[tier].scans) return false;

        const newCount = scansUsed + 1;
        setScansUsed(newCount);
        localStorage.setItem('gat_scans_used', newCount.toString());
        return true;
    };

    const incrementBusinessReports = () => {
        if (businessReportsUsed >= LIMITS[tier].reports) return false;
        const newCount = businessReportsUsed + 1;
        setBusinessReportsUsed(newCount);
        return true;
    };

    const deductImageCredit = () => {
        if (imageCredits <= 0) return false;
        const newCredits = imageCredits - 1;
        setImageCredits(newCredits);
        localStorage.setItem('gat_image_credits', newCredits.toString());
        return true;
    };

    const deductVideoSeconds = (seconds: number) => {
        if (videoSecondsCredits < seconds) return false;
        const newCredits = videoSecondsCredits - seconds;
        setVideoSecondsCredits(newCredits);
        localStorage.setItem('gat_video_seconds', newCredits.toString());
        return true;
    };

    const addImageCredits = (amount: number) => {
        const newCredits = imageCredits + amount;
        setImageCredits(newCredits);
        localStorage.setItem('gat_image_credits', newCredits.toString());
    };

    const addVideoSeconds = (seconds: number) => {
        const newCredits = videoSecondsCredits + seconds;
        setVideoSecondsCredits(newCredits);
        localStorage.setItem('gat_video_seconds', newCredits.toString());
    };

    const upgradeTier = (newTier: UserTier) => {
        setTier(newTier);
        localStorage.setItem('gat_tier', newTier);

        // Grant tier-based credits on upgrade
        const tierLimits = LIMITS[newTier];
        setImageCredits(tierLimits.images);
        setVideoSecondsCredits(tierLimits.videoSeconds);
        localStorage.setItem('gat_image_credits', tierLimits.images.toString());
        localStorage.setItem('gat_video_seconds', tierLimits.videoSeconds.toString());
    };

    const resetUsages = () => {
        setScansUsed(0);
        setBusinessReportsUsed(0);
    };

    const hasMediaAccess = () => {
        return tier === 'PRO' || tier === 'BUSINESS';
    };

    return (
        <SubscriptionContext.Provider value={{
            tier,
            scansUsed,
            maxScans: LIMITS[tier].scans,
            imageCredits,
            maxImageCredits: LIMITS[tier].images,
            videoSecondsCredits,
            maxVideoSecondsCredits: LIMITS[tier].videoSeconds,
            businessReportsUsed,
            maxBusinessReports: LIMITS[tier].reports,
            incrementScans,
            incrementBusinessReports,
            deductImageCredit,
            deductVideoSeconds,
            addImageCredits,
            addVideoSeconds,
            upgradeTier,
            resetUsages,
            hasMediaAccess
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
