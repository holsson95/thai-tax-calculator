import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PARTNER } from '../../config/partner';
import { buildMarketingConsentText, isValidEmail } from '../../shared/leads';
import { errorMessage, subscribe } from '../../services/leadsApi';
import { track } from '../../utils/analytics';
import type { LeadContext } from '../../utils/leadContext';
import Turnstile from './Turnstile';

interface Props {
  context: LeadContext;
  /** Visual weight: 'card' when it replaces the lead CTA, 'inline' under it. */
  variant?: 'card' | 'inline';
}

/** "Email me my tax breakdown" with a separate, unticked opt-in for updates. */
const EmailCapture: React.FC<Props> = ({ context, variant = 'inline' }) => {
  const [email, setEmail] = useState('');
  const [optIn, setOptIn] = useState(false);
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(variant === 'card');
  const needsTurnstile = !!PARTNER.turnstileSiteKey;
  const marketingText = buildMarketingConsentText();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    if (needsTurnstile && !token) {
      setStatus('error');
      setMessage('Please complete the spam check.');
      return;
    }
    setStatus('sending');
    setMessage(null);
    const res = await subscribe({
      email: email.trim(),
      marketingOptIn: optIn,
      marketingConsentText: optIn ? marketingText : undefined,
      breakdown: context.breakdown,
      source: context.source,
      turnstileToken: token ?? undefined,
      website,
    });
    if (!res.ok) {
      setStatus('error');
      setMessage(res.fields?.email ?? errorMessage(res.error));
      return;
    }
    setStatus('sent');
    track('email_captured', { calculator: context.source, marketing_opt_in: optIn });
  };

  if (status === 'sent') {
    return (
      <p role="status" className="p-3 text-sm text-ink border-2 border-desk">
        Sent. Check your inbox for your tax breakdown{optIn ? '; you are also signed up for updates' : ''}.
      </p>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-medium text-desk hover:underline">
        Email me my tax breakdown
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={variant === 'card' ? 'border border-paper-rule bg-paper-white p-5 space-y-3' : 'space-y-3'}
    >
      {variant === 'card' && <h3 className="font-semibold text-ink">Email me my tax breakdown</h3>}
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={`ec-email-${context.source}`} className="sr-only">Email address</label>
        <input
          id={`ec-email-${context.source}`}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="field-input flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={status === 'sending'} className="bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send breakdown'}
        </button>
      </div>
      <label className="flex items-start gap-2 text-sm text-ink-soft cursor-pointer">
        <input type="checkbox" className="mt-0.5 h-4 w-4 border-ink/25" checked={optIn} onChange={(e) => setOptIn(e.target.checked)} />
        <span>{marketingText}</span>
      </label>
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {needsTurnstile && <Turnstile siteKey={PARTNER.turnstileSiteKey} onToken={setToken} />}
      {message && <p role="alert" className="text-sm text-ink">{message}</p>}
      <p className="text-xs text-ink-mute">
        We use your email to send this breakdown{optIn ? ' and updates' : ''}.{' '}
        <Link to="/privacy/#email" className="text-desk hover:underline">Privacy policy</Link>
      </p>
    </form>
  );
};

export default EmailCapture;
