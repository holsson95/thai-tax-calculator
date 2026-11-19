-- Leads sent to the partner firm
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',          -- new | contacted | booked | client | rejected
  status_reason TEXT,
  is_duplicate INTEGER NOT NULL DEFAULT 0,
  duplicate_of TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  email_norm TEXT NOT NULL,
  phone TEXT,
  nationality TEXT NOT NULL,
  days_in_thailand INTEGER,
  income_types TEXT NOT NULL,                  -- JSON array
  remittance_range TEXT NOT NULL,
  urgency TEXT NOT NULL,
  notes TEXT,
  calculator_source TEXT,
  calculator TEXT,                             -- JSON snapshot of results
  flags TEXT,                                  -- JSON array
  estimated_tax_thb INTEGER,
  consent_text TEXT NOT NULL,
  consent_at TEXT NOT NULL,                    -- client timestamp
  consent_recorded_at TEXT NOT NULL,           -- server timestamp
  partner_name TEXT NOT NULL,
  page_url TEXT,
  referrer TEXT,
  utm TEXT,                                    -- JSON object
  partner_email_status TEXT,                   -- sent | failed: ... | skipped
  webhook_status TEXT,                         -- sent | failed: ... | skipped
  user_email_status TEXT
);
CREATE INDEX IF NOT EXISTS idx_leads_email_created ON leads (email_norm, created_at);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at);

-- Email-capture subscribers (tax breakdown emails + optional updates opt-in)
CREATE TABLE IF NOT EXISTS subscribers (
  email_norm TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  marketing_opt_in INTEGER NOT NULL DEFAULT 0,
  marketing_consent_text TEXT,
  marketing_consent_at TEXT,
  source TEXT,
  breakdowns_sent INTEGER NOT NULL DEFAULT 0,
  unsubscribed_at TEXT
);

-- Fixed-window rate limiting (keyed by hashed IP)
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT NOT NULL,
  window_start INTEGER NOT NULL,
  count INTEGER NOT NULL,
  PRIMARY KEY (key, window_start)
);
