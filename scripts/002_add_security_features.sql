-- Add security columns to agents table
ALTER TABLE agents ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
ALTER TABLE agents ADD COLUMN IF NOT EXISTS failed_attempts INTEGER DEFAULT 0;
ALTER TABLE agents ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP WITH TIME ZONE;
ALTER TABLE agents ADD COLUMN IF NOT EXISTS notes TEXT;

-- Create login_attempts table for rate limiting and security tracking
CREATE TABLE IF NOT EXISTS login_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id_attempted VARCHAR(20),
  ip_address VARCHAR(50),
  user_agent TEXT,
  success BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on login_attempts
ALTER TABLE login_attempts ENABLE ROW LEVEL SECURITY;

-- Allow insert for tracking attempts
CREATE POLICY "Allow insert for login tracking" 
  ON login_attempts FOR INSERT 
  WITH CHECK (true);

-- Allow select for admins to view logs
CREATE POLICY "Allow select for login logs" 
  ON login_attempts FOR SELECT 
  USING (true);

-- Create activity_logs table for session tracking
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(20) NOT NULL,
  action VARCHAR(50) NOT NULL,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on activity_logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for activity logging" 
  ON activity_logs FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow select for activity logs" 
  ON activity_logs FOR SELECT 
  USING (true);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_login_attempts_ip ON login_attempts(ip_address, created_at);
CREATE INDEX IF NOT EXISTS idx_login_attempts_agent ON login_attempts(agent_id_attempted, created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_agent ON activity_logs(agent_id, created_at);
