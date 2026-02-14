import { supabase } from './supabase';
import { MediaGenerationLog } from '../types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const IMAGEN_API_KEY = import.meta.env.VITE_GEMINI_IMAGEN_API_KEY || '';
const VEO_API_KEY = import.meta.env.VITE_VEO_API_KEY || '';

/**
 * Generate an image using Gemini Imagen API
 */
export async function generateImage(
    prompt: string,
    userId: string,
    useUserApiKey: boolean = false
): Promise<{ success: boolean; imageUrl?: string; error?: string }> {
    try {
        // Get API key (user's own or system key)
        let apiKey = IMAGEN_API_KEY;

        if (useUserApiKey) {
            const userKey = await getUserAPIKey(userId, 'gemini_imagen');
            if (userKey) apiKey = userKey;
        }

        if (!apiKey) {
            return { success: false, error: 'API key not configured' };
        }

        // Log generation attempt
        const logId = await logGenerationAttempt(userId, 'image', prompt, 1);

        // Call Gemini Imagen API
        // Note: This is a placeholder - actual API endpoint may differ
        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    instances: [{ prompt }],
                    parameters: {
                        sampleCount: 1,
                        aspectRatio: '1:1',
                    },
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            await updateGenerationLog(logId, 'failed', undefined, error);
            return { success: false, error: `API Error: ${error}` };
        }

        const data = await response.json();
        const imageUrl = data.predictions?.[0]?.bytesBase64Encoded
            ? `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`
            : data.predictions?.[0]?.imageUrl;

        if (!imageUrl) {
            await updateGenerationLog(logId, 'failed', undefined, 'No image returned');
            return { success: false, error: 'No image generated' };
        }

        // Upload to Supabase Storage
        const storedUrl = await uploadToStorage(imageUrl, userId, 'image');

        // Update log with success
        await updateGenerationLog(logId, 'completed', storedUrl);

        return { success: true, imageUrl: storedUrl };
    } catch (error: any) {
        console.error('Image generation error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Generate a video using Veo 3.1 Fast API
 */
export async function generateVideo(
    prompt: string,
    durationSeconds: number,
    userId: string,
    useUserApiKey: boolean = false
): Promise<{ success: boolean; videoUrl?: string; error?: string }> {
    try {
        // Get API key
        let apiKey = VEO_API_KEY;

        if (useUserApiKey) {
            const userKey = await getUserAPIKey(userId, 'veo');
            if (userKey) apiKey = userKey;
        }

        if (!apiKey) {
            return { success: false, error: 'API key not configured' };
        }

        // Log generation attempt
        const logId = await logGenerationAttempt(userId, 'video', prompt, durationSeconds);

        // Call Veo API
        // Note: This is a placeholder - actual API endpoint may differ
        const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-fast:generate',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    prompt,
                    duration: durationSeconds,
                    aspectRatio: '16:9',
                }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            await updateGenerationLog(logId, 'failed', undefined, error);
            return { success: false, error: `API Error: ${error}` };
        }

        const data = await response.json();
        const videoUrl = data.videoUrl;

        if (!videoUrl) {
            await updateGenerationLog(logId, 'failed', undefined, 'No video returned');
            return { success: false, error: 'No video generated' };
        }

        // Upload to Supabase Storage
        const storedUrl = await uploadToStorage(videoUrl, userId, 'video');

        // Update log with success
        await updateGenerationLog(logId, 'completed', storedUrl);

        return { success: true, videoUrl: storedUrl };
    } catch (error: any) {
        console.error('Video generation error:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Log a generation attempt
 */
async function logGenerationAttempt(
    userId: string,
    mediaType: 'image' | 'video',
    prompt: string,
    creditsUsed: number
): Promise<string> {
    const { data, error } = await supabase
        .from('media_generation_logs')
        .insert({
            user_id: userId,
            media_type: mediaType,
            prompt,
            credits_used: creditsUsed,
            generation_status: 'pending',
        })
        .select('id')
        .single();

    if (error) {
        console.error('Error logging generation:', error);
        return '';
    }

    return data.id;
}

/**
 * Update generation log with result
 */
async function updateGenerationLog(
    logId: string,
    status: 'completed' | 'failed',
    mediaUrl?: string,
    errorMessage?: string
): Promise<void> {
    await supabase
        .from('media_generation_logs')
        .update({
            generation_status: status,
            media_url: mediaUrl,
            error_message: errorMessage,
        })
        .eq('id', logId);
}

/**
 * Upload media to Supabase Storage
 */
async function uploadToStorage(
    mediaData: string,
    userId: string,
    type: 'image' | 'video'
): Promise<string> {
    try {
        // Convert base64 or URL to blob
        let blob: Blob;

        if (mediaData.startsWith('data:')) {
            // Base64 data
            const base64Data = mediaData.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            blob = new Blob([byteArray], { type: type === 'image' ? 'image/png' : 'video/mp4' });
        } else {
            // URL - fetch and convert
            const response = await fetch(mediaData);
            blob = await response.blob();
        }

        const fileName = `${userId}/${type}s/${Date.now()}.${type === 'image' ? 'png' : 'mp4'}`;

        const { data, error } = await supabase.storage
            .from('generated-media')
            .upload(fileName, blob);

        if (error) {
            console.error('Storage upload error:', error);
            return mediaData; // Return original if upload fails
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('generated-media')
            .getPublicUrl(fileName);

        return urlData.publicUrl;
    } catch (error) {
        console.error('Error uploading to storage:', error);
        return mediaData; // Return original if upload fails
    }
}

/**
 * Get user's API key (decrypted)
 */
async function getUserAPIKey(
    userId: string,
    serviceName: 'gemini_imagen' | 'veo'
): Promise<string | null> {
    const { data, error } = await supabase
        .from('user_api_keys')
        .select('encrypted_api_key')
        .eq('user_id', userId)
        .eq('service_name', serviceName)
        .eq('is_active', true)
        .single();

    if (error || !data) {
        return null;
    }

    // In production, decrypt the key here
    // For now, we're storing it as-is (not recommended for production)
    return data.encrypted_api_key;
}

/**
 * Get user's generation history
 */
export async function getGenerationHistory(
    userId: string,
    mediaType?: 'image' | 'video'
): Promise<MediaGenerationLog[]> {
    let query = supabase
        .from('media_generation_logs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

    if (mediaType) {
        query = query.eq('media_type', mediaType);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching history:', error);
        return [];
    }

    return data || [];
}
