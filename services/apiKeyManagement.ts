import { supabase } from './supabase';
import { UserAPIKey } from '../types';

/**
 * Simple encryption/decryption (NOT production-ready)
 * In production, use proper encryption libraries and server-side encryption
 */
function simpleEncrypt(text: string): string {
    // This is a placeholder - in production, use proper encryption
    return btoa(text);
}

function simpleDecrypt(encrypted: string): string {
    // This is a placeholder - in production, use proper decryption
    return atob(encrypted);
}

/**
 * Save user's API key (encrypted)
 */
export async function saveUserAPIKey(
    userId: string,
    serviceName: 'gemini_imagen' | 'veo',
    apiKey: string
): Promise<boolean> {
    try {
        const encryptedKey = simpleEncrypt(apiKey);

        // Check if key already exists
        const { data: existing } = await supabase
            .from('user_api_keys')
            .select('id')
            .eq('user_id', userId)
            .eq('service_name', serviceName)
            .single();

        if (existing) {
            // Update existing key
            const { error } = await supabase
                .from('user_api_keys')
                .update({
                    encrypted_api_key: encryptedKey,
                    is_active: true,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);

            return !error;
        } else {
            // Insert new key
            const { error } = await supabase
                .from('user_api_keys')
                .insert({
                    user_id: userId,
                    service_name: serviceName,
                    encrypted_api_key: encryptedKey,
                    is_active: true,
                });

            return !error;
        }
    } catch (error) {
        console.error('Error saving API key:', error);
        return false;
    }
}

/**
 * Get user's API key (decrypted)
 */
export async function getUserAPIKey(
    userId: string,
    serviceName: 'gemini_imagen' | 'veo'
): Promise<string | null> {
    try {
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

        return simpleDecrypt(data.encrypted_api_key);
    } catch (error) {
        console.error('Error getting API key:', error);
        return null;
    }
}

/**
 * Delete user's API key
 */
export async function deleteUserAPIKey(
    userId: string,
    serviceName: 'gemini_imagen' | 'veo'
): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('user_api_keys')
            .update({ is_active: false })
            .eq('user_id', userId)
            .eq('service_name', serviceName);

        return !error;
    } catch (error) {
        console.error('Error deleting API key:', error);
        return false;
    }
}

/**
 * Test if API key is valid
 */
export async function testAPIKey(
    apiKey: string,
    serviceName: 'gemini_imagen' | 'veo'
): Promise<{ valid: boolean; error?: string }> {
    try {
        // Test Gemini Imagen key
        if (serviceName === 'gemini_imagen') {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models',
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.ok) {
                return { valid: true };
            } else {
                return { valid: false, error: 'Invalid API key' };
            }
        }

        // Test Veo key
        if (serviceName === 'veo') {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models',
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                    },
                }
            );

            if (response.ok) {
                return { valid: true };
            } else {
                return { valid: false, error: 'Invalid API key' };
            }
        }

        return { valid: false, error: 'Unknown service' };
    } catch (error: any) {
        return { valid: false, error: error.message };
    }
}

/**
 * Get all user's API keys
 */
export async function getUserAPIKeys(userId: string): Promise<UserAPIKey[]> {
    try {
        const { data, error } = await supabase
            .from('user_api_keys')
            .select('*')
            .eq('user_id', userId)
            .eq('is_active', true);

        if (error || !data) {
            return [];
        }

        return data.map(key => ({
            id: key.id,
            userId: key.user_id,
            serviceName: key.service_name,
            encryptedApiKey: key.encrypted_api_key,
            isActive: key.is_active,
            createdAt: key.created_at,
            updatedAt: key.updated_at,
        }));
    } catch (error) {
        console.error('Error getting API keys:', error);
        return [];
    }
}
