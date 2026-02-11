
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use placeholder values if env vars are not set to prevent app crash
const defaultUrl = 'https://placeholder.supabase.co';
const defaultKey = 'placeholder-key';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-anon-key')) {
    console.warn('⚠️ Supabase credentials not configured. Please update .env.local with your Supabase URL and Anon Key.');
    console.warn('Get your credentials from: https://app.supabase.com → Project Settings → API');
}

export const supabase = createClient(
    supabaseUrl && !supabaseUrl.includes('your-project') ? supabaseUrl : defaultUrl,
    supabaseAnonKey && !supabaseAnonKey.includes('your-anon-key') ? supabaseAnonKey : defaultKey
);

console.log('🔌 Supabase Initialized. URL:', supabaseUrl ? supabaseUrl.substring(0, 20) + '...' : 'Not Set');

