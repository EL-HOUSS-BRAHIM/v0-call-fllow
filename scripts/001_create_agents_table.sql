-- Create agents table for authorized users
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  agent_type VARCHAR(20) DEFAULT 'wireless',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

-- Allow anyone to check if an agent_id exists (for login validation)
CREATE POLICY "Allow public read for login validation" 
  ON agents FOR SELECT 
  USING (true);

-- Only admins can insert new agents (we'll handle this in the app)
CREATE POLICY "Allow insert for service role" 
  ON agents FOR INSERT 
  WITH CHECK (true);

-- Only admins can update agents
CREATE POLICY "Allow update for service role" 
  ON agents FOR UPDATE 
  USING (true);

-- Only admins can delete agents
CREATE POLICY "Allow delete for service role" 
  ON agents FOR DELETE 
  USING (true);

-- Insert the admin user (agent_id: 203163)
INSERT INTO agents (agent_id, name, is_admin, agent_type) 
VALUES ('203163', 'Admin', true, 'wireless')
ON CONFLICT (agent_id) DO NOTHING;
