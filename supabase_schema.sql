-- Pricing Tiers & Media Generation Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Credits Table
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  image_credits INTEGER DEFAULT 0,
  video_seconds_credits DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Media Generation Logs Table
CREATE TABLE IF NOT EXISTS media_generation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  prompt TEXT NOT NULL,
  credits_used DECIMAL(10,2) NOT NULL,
  media_url TEXT,
  generation_status TEXT CHECK (generation_status IN ('pending', 'completed', 'failed')),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Fingerprints Table (Fraud Detection)
CREATE TABLE IF NOT EXISTS user_fingerprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address TEXT,
  browser_fingerprint TEXT,
  device_info JSONB,
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW()
);

-- Credit Purchases Table
CREATE TABLE IF NOT EXISTS credit_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  purchase_type TEXT CHECK (purchase_type IN ('image', 'video')),
  credits_purchased DECIMAL(10,2) NOT NULL,
  amount_paid DECIMAL(10,2) NOT NULL,
  payment_method TEXT,
  payment_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Library Table (Social Proof)
CREATE TABLE IF NOT EXISTS media_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  title TEXT NOT NULL,
  description TEXT,
  prompt TEXT,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User API Keys Table (Business Tier)
CREATE TABLE IF NOT EXISTS user_api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name TEXT CHECK (service_name IN ('gemini_imagen', 'veo')),
  encrypted_api_key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_media_logs_user_id ON media_generation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_media_logs_status ON media_generation_logs(generation_status);
CREATE INDEX IF NOT EXISTS idx_fingerprints_user_id ON user_fingerprints(user_id);
CREATE INDEX IF NOT EXISTS idx_fingerprints_browser ON user_fingerprints(browser_fingerprint);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON credit_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_media_library_featured ON media_library(is_featured);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON user_api_keys(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_generation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_api_keys ENABLE ROW LEVEL SECURITY;

-- User Credits Policies
CREATE POLICY "Users can view own credits" ON user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own credits" ON user_credits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can insert credits" ON user_credits
  FOR INSERT WITH CHECK (true);

-- Media Generation Logs Policies
CREATE POLICY "Users can view own generation logs" ON media_generation_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generation logs" ON media_generation_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User Fingerprints Policies
CREATE POLICY "Users can view own fingerprints" ON user_fingerprints
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage fingerprints" ON user_fingerprints
  FOR ALL USING (true);

-- Credit Purchases Policies
CREATE POLICY "Users can view own purchases" ON credit_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases" ON credit_purchases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Media Library Policies (Public Read)
CREATE POLICY "Anyone can view media library" ON media_library
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage media library" ON media_library
  FOR ALL USING (false); -- Admins would use service role key

-- User API Keys Policies
CREATE POLICY "Users can view own API keys" ON user_api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own API keys" ON user_api_keys
  FOR ALL USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_credits_updated_at
    BEFORE UPDATE ON user_credits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_api_keys_updated_at
    BEFORE UPDATE ON user_api_keys
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to initialize user credits on signup
CREATE OR REPLACE FUNCTION initialize_user_credits()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_credits (user_id, image_credits, video_seconds_credits)
    VALUES (NEW.id, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create credits record for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION initialize_user_credits();

COMMENT ON TABLE user_credits IS 'Tracks user image and video generation credits';
COMMENT ON TABLE media_generation_logs IS 'Logs all media generation attempts and results';
COMMENT ON TABLE user_fingerprints IS 'Stores device/browser fingerprints for fraud detection';
COMMENT ON TABLE credit_purchases IS 'Records all credit purchase transactions';
COMMENT ON TABLE media_library IS 'Public showcase of sample generated media for social proof';
COMMENT ON TABLE user_api_keys IS 'Encrypted storage of user-provided API keys (Business tier)';
