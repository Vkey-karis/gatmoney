import { supabase } from './supabase';
import { CreditPurchase, MediaCredits } from '../types';

/**
 * Get user's current credit balance
 */
export async function getUserCredits(userId: string): Promise<MediaCredits | null> {
    const { data, error } = await supabase
        .from('user_credits')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching credits:', error);
        return null;
    }

    return data ? {
        userId: data.user_id,
        imageCredits: data.image_credits,
        videoSecondsCredits: data.video_seconds_credits,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    } : null;
}

/**
 * Add credits to user account
 */
export async function addCreditsToUser(
    userId: string,
    imageCredits: number = 0,
    videoSeconds: number = 0
): Promise<boolean> {
    try {
        // Get current credits
        const current = await getUserCredits(userId);

        if (!current) {
            // Create new credits record
            const { error } = await supabase
                .from('user_credits')
                .insert({
                    user_id: userId,
                    image_credits: imageCredits,
                    video_seconds_credits: videoSeconds,
                });

            return !error;
        }

        // Update existing credits
        const { error } = await supabase
            .from('user_credits')
            .update({
                image_credits: current.imageCredits + imageCredits,
                video_seconds_credits: current.videoSecondsCredits + videoSeconds,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId);

        return !error;
    } catch (error) {
        console.error('Error adding credits:', error);
        return false;
    }
}

/**
 * Deduct credits from user account
 */
export async function deductCredits(
    userId: string,
    imageCredits: number = 0,
    videoSeconds: number = 0
): Promise<boolean> {
    try {
        const current = await getUserCredits(userId);

        if (!current) return false;

        // Check if user has enough credits
        if (current.imageCredits < imageCredits || current.videoSecondsCredits < videoSeconds) {
            return false;
        }

        const { error } = await supabase
            .from('user_credits')
            .update({
                image_credits: current.imageCredits - imageCredits,
                video_seconds_credits: current.videoSecondsCredits - videoSeconds,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId);

        return !error;
    } catch (error) {
        console.error('Error deducting credits:', error);
        return false;
    }
}

/**
 * Initiate credit purchase
 */
export async function initiateCreditPurchase(
    userId: string,
    purchaseType: 'image' | 'video',
    creditsPurchased: number,
    amountPaid: number,
    paymentMethod: 'paypal' | 'paystack'
): Promise<string | null> {
    try {
        const { data, error } = await supabase
            .from('credit_purchases')
            .insert({
                user_id: userId,
                purchase_type: purchaseType,
                credits_purchased: creditsPurchased,
                amount_paid: amountPaid,
                payment_method: paymentMethod,
                status: 'pending',
            })
            .select('id')
            .single();

        if (error) {
            console.error('Error creating purchase record:', error);
            return null;
        }

        return data.id;
    } catch (error) {
        console.error('Error initiating purchase:', error);
        return null;
    }
}

/**
 * Process completed credit purchase
 */
export async function processCreditPurchase(
    purchaseId: string,
    paymentId: string,
    status: 'completed' | 'failed'
): Promise<boolean> {
    try {
        // Update purchase status
        const { data: purchase, error: updateError } = await supabase
            .from('credit_purchases')
            .update({
                payment_id: paymentId,
                status,
            })
            .eq('id', purchaseId)
            .select()
            .single();

        if (updateError || !purchase) {
            console.error('Error updating purchase:', updateError);
            return false;
        }

        // If successful, add credits to user
        if (status === 'completed') {
            const creditsAdded = purchase.purchase_type === 'image'
                ? await addCreditsToUser(purchase.user_id, purchase.credits_purchased, 0)
                : await addCreditsToUser(purchase.user_id, 0, purchase.credits_purchased);

            return creditsAdded;
        }

        return true;
    } catch (error) {
        console.error('Error processing purchase:', error);
        return false;
    }
}

/**
 * Get user's purchase history
 */
export async function getCreditPurchaseHistory(userId: string): Promise<CreditPurchase[]> {
    const { data, error } = await supabase
        .from('credit_purchases')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

    if (error) {
        console.error('Error fetching purchase history:', error);
        return [];
    }

    return data || [];
}

/**
 * Credit packages available for purchase
 */
export const CREDIT_PACKAGES = [
    {
        id: 'video-10',
        type: 'video' as const,
        seconds: 10,
        price: 7.50,
        popular: false,
    },
    {
        id: 'video-30',
        type: 'video' as const,
        seconds: 30,
        price: 22.50,
        popular: true,
    },
    {
        id: 'video-60',
        type: 'video' as const,
        seconds: 60,
        price: 45.00,
        popular: false,
    },
    {
        id: 'video-120',
        type: 'video' as const,
        seconds: 120,
        price: 90.00,
        popular: false,
    },
];
