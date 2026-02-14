import { supabase } from './supabase';
import { UserFingerprint } from '../types';

/**
 * Get user's IP address using a public IP API
 */
export async function getIPAddress(): Promise<string> {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Failed to get IP address:', error);
        return 'unknown';
    }
}

/**
 * Generate a browser fingerprint based on various browser characteristics
 * This is a simple implementation - for production, consider using FingerprintJS
 */
export function getBrowserFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser Fingerprint', 2, 2);
    }

    const canvasData = canvas.toDataURL();

    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        canvasFingerprint: canvasData.substring(0, 50), // First 50 chars
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: (navigator as any).deviceMemory || 'unknown',
    };

    // Create a hash from the fingerprint object
    const fingerprintString = JSON.stringify(fingerprint);
    return simpleHash(fingerprintString);
}

/**
 * Simple hash function for fingerprinting
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
}

/**
 * Collect device information
 */
export function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
}

/**
 * Check if there are duplicate accounts with the same fingerprint
 */
export async function checkForDuplicateAccounts(
    browserFingerprint: string,
    ipAddress: string
): Promise<{ isDuplicate: boolean; matchCount: number }> {
    try {
        // Check for matching browser fingerprints
        const { data: fingerprintMatches, error: fpError } = await supabase
            .from('user_fingerprints')
            .select('user_id')
            .eq('browser_fingerprint', browserFingerprint);

        if (fpError) {
            console.error('Error checking fingerprints:', fpError);
            return { isDuplicate: false, matchCount: 0 };
        }

        // Check for matching IP addresses (less strict)
        const { data: ipMatches, error: ipError } = await supabase
            .from('user_fingerprints')
            .select('user_id')
            .eq('ip_address', ipAddress);

        if (ipError) {
            console.error('Error checking IP addresses:', ipError);
            return { isDuplicate: false, matchCount: 0 };
        }

        const fingerprintCount = fingerprintMatches?.length || 0;
        const ipCount = ipMatches?.length || 0;

        // Consider it suspicious if:
        // - Same browser fingerprint exists (very suspicious)
        // - Same IP with 3+ accounts (moderately suspicious)
        const isDuplicate = fingerprintCount > 0 || ipCount >= 3;
        const matchCount = Math.max(fingerprintCount, ipCount);

        return { isDuplicate, matchCount };
    } catch (error) {
        console.error('Error in duplicate check:', error);
        return { isDuplicate: false, matchCount: 0 };
    }
}

/**
 * Record user fingerprint data
 */
export async function recordUserFingerprint(userId: string): Promise<void> {
    try {
        const ipAddress = await getIPAddress();
        const browserFingerprint = getBrowserFingerprint();
        const deviceInfo = getDeviceInfo();

        // Check if fingerprint already exists for this user
        const { data: existing } = await supabase
            .from('user_fingerprints')
            .select('id')
            .eq('user_id', userId)
            .single();

        if (existing) {
            // Update last_seen
            await supabase
                .from('user_fingerprints')
                .update({
                    last_seen: new Date().toISOString(),
                    ip_address: ipAddress,
                })
                .eq('user_id', userId);
        } else {
            // Insert new fingerprint
            await supabase
                .from('user_fingerprints')
                .insert({
                    user_id: userId,
                    ip_address: ipAddress,
                    browser_fingerprint: browserFingerprint,
                    device_info: deviceInfo,
                });
        }
    } catch (error) {
        console.error('Error recording fingerprint:', error);
    }
}

/**
 * Analyze if current activity is suspicious
 */
export async function isSuspiciousActivity(userId: string): Promise<boolean> {
    try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) return false;

        // Check account age
        const accountAge = Date.now() - new Date(user.user.created_at).getTime();
        const isNewAccount = accountAge < 24 * 60 * 60 * 1000; // Less than 24 hours

        // Check fingerprint matches
        const browserFingerprint = getBrowserFingerprint();
        const ipAddress = await getIPAddress();
        const { isDuplicate, matchCount } = await checkForDuplicateAccounts(
            browserFingerprint,
            ipAddress
        );

        // Suspicious if new account with duplicate fingerprint
        return isNewAccount && isDuplicate && matchCount > 1;
    } catch (error) {
        console.error('Error checking suspicious activity:', error);
        return false;
    }
}
