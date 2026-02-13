import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserTier = 'FREE' | 'PRO' | 'BUSINESS';

interface SubscriptionContextType {
    tier: UserTier;
    scansUsed: number;
    maxScans: number;
    businessReportsUsed: number;
    maxBusinessReports: number;
    incrementScans: () => boolean;
    incrementBusinessReports: () => boolean;
    upgradeTier: (tier: UserTier) => void;
    resetUsages: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
    tier: 'FREE',
    scansUsed: 0,
    maxScans: 3,
    businessReportsUsed: 0,
    maxBusinessReports: 0,
    incrementScans: () => false,
    incrementBusinessReports: () => false,
    upgradeTier: () => { },
    resetUsages: () => { },
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tier, setTier] = useState<UserTier>('FREE');
    const [scansUsed, setScansUsed] = useState(0);
    const [businessReportsUsed, setBusinessReportsUsed] = useState(0);

    // Limits Definitions
    const LIMITS = {
        FREE: { scans: 10, reports: 0 },
        PRO: { scans: 30, reports: 0 },
        BUSINESS: { scans: 30, reports: 1000 }, // Same as PRO for scans
    };

    useEffect(() => {
        // Load state from local storage
        const savedTier = localStorage.getItem('gat_tier') as UserTier;
        if (savedTier) setTier(savedTier);

        const today = new Date().toDateString();
        const storedDate = localStorage.getItem('gat_usage_date');

        if (storedDate !== today) {
            // Reset daily counts
            setScansUsed(0);
            localStorage.setItem('gat_usage_date', today);
            localStorage.setItem('gat_scans_used', '0');
        } else {
            setScansUsed(parseInt(localStorage.getItem('gat_scans_used') || '0'));
        }
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
        // Business reports might be monthly, but for now we treat them simply
        const newCount = businessReportsUsed + 1;
        setBusinessReportsUsed(newCount);
        return true;
    };

    const upgradeTier = (newTier: UserTier) => {
        setTier(newTier);
        localStorage.setItem('gat_tier', newTier);
        // Reset usages on upgrade to give immediate access? Or keep them?
        // Let's keep them but since limits increase, it works out.
    };

    const resetUsages = () => {
        setScansUsed(0);
        setBusinessReportsUsed(0);
    };

    return (
        <SubscriptionContext.Provider value={{
            tier,
            scansUsed,
            maxScans: LIMITS[tier].scans,
            businessReportsUsed,
            maxBusinessReports: LIMITS[tier].reports,
            incrementScans,
            incrementBusinessReports,
            upgradeTier,
            resetUsages
        }}>
            {children}
        </SubscriptionContext.Provider>
    );
};
