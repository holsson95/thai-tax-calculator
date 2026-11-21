import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PARTNER } from '../../config/partner';
import {
  buildLeadConsentText,
  LEAD_INCOME_TYPES,
  LeadIncomeType,
  LeadSubmission,
  MAX_NOTES,
  REMITTANCE_RANGES,
  RemittanceRange,
  URGENCY_OPTIONS,
  Urgency,
  validateLeadSubmission,
} from '../../shared/leads';
import { ALL_COUNTRIES } from '../../data/dtaCountries';
import { errorMessage, submitLead } from '../../services/leadsApi';
import { getAttribution } from '../../utils/attribution';
import { track, taxBand } from '../../utils/analytics';
import type { LeadContext } from '../../utils/leadContext';
import Turnstile from './Turnstile';

const inputCls = 'field-input font-sans';
const labelCls = 'field-name';
const errCls = 'text-xs text-ink mt-1';

export const LAST_LEAD_KEY = 'mtt-last-lead-v1';

interface Props {
  context: LeadContext;
  onCancel: () => void;
}

const LeadForm: React.FC<Props> = ({ context, onCancel }) => {
  const navigate = useNavigate();
  const consentText = buildLeadConsentText(PARTNER.partnerName);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState(context.prefill.nationality ?? '');
  const [days, setDays] = useState(context.prefill.daysInThailand ? String(context.prefill.daysInThailand) : '');
  const [incomeTypes, setIncomeTypes] = useState<LeadIncomeType[]>(context.prefill.incomeTypes);
  const [range, setRange] = useState<RemittanceRange | ''>(context.prefill.remittanceRange ?? '');
  const [urgency, setUrgency] = useState<Urgency | ''>('');
  const [notes, setNotes] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [token, setToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const needsTurnstile = !!PARTNER.turnstileSiteKey;

  const countries = useMemo(() => ALL_COUNTRIES, []);

  const toggleType = (t: LeadIncomeType) =>
    setIncomeTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const attribution = getAttribution();
    const lead: LeadSubmission = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      nationality,
      daysInThailand: days === '' ? null : Number(days),
      incomeTypes,
      remittanceRange: (range || 'none') as RemittanceRange,
      urgency: urgency as Urgency,
      notes: notes.trim() || undefined,
      consent: { given: consent, text: consentText, at: new Date().toISOString() },
      calculator: context.snapshot,
      pageUrl: window.location.href.split('#')[0].slice(0, 500),
      referrer: attribution?.referrer || document.referrer || undefined,
      utm: attribution?.utm,
      turnstileToken: token ?? undefined,
      website,
    };
    const v = validateLeadSubmission({ ...lead, remittanceRange: (range || undefined) as RemittanceRange }, consentText);
    if (!v.ok) {
      setErrors(v.errors);
      setServerError(null);
      const first = Object.keys(v.errors)[0];
      document.getElementById(`lead-${first}`)?.focus();
      return;
    }
    if (needsTurnstile && !token) {
      setServerError('Please complete the spam check.');
      return;
    }
    setErrors({});
    setServerError(null);
    setSubmitting(true);
    const res = await submitLead(lead);
    setSubmitting(false);
    if (!res.ok) {
      if (res.fields) setErrors(res.fields);
      setServerError(errorMessage(res.error));
      return;
    }
    track('lead_submitted', {
      calculator: context.source,
      flag_count: context.flags.length,
      tax_band: taxBand(context.estimatedTaxThb),
      is_duplicate: !!res.duplicate,
    });
    try {
      window.sessionStorage.setItem(LAST_LEAD_KEY, JSON.stringify({ leadId: res.leadId ?? null, bookingUrl: res.bookingUrl ?? null }));
    } catch {
      /* ignore */
    }
    navigate(`/thank-you/${res.leadId ? `?lead=${encodeURIComponent(res.leadId)}` : ''}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-labelledby="lead-form-title">
      <div>
        <h3 id="lead-form-title" className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">
          Request a free 15-minute call
        </h3>
        <p className="text-sm text-ink-soft">
          {PARTNER.partnerName} will contact you. We have filled in what we know from your calculation; check it and add anything else.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className={labelCls}>Name</label>
          <input id="lead-name" className={inputCls} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="lead-email" className={labelCls}>Email</label>
          <input id="lead-email" type="email" className={inputCls} autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
          {errors.email && <p className={errCls}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="lead-phone" className={labelCls}>
            WhatsApp / phone <span className="font-normal text-ink-mute">(optional)</span>
          </label>
          <input id="lead-phone" type="tel" className={inputCls} autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="lead-nationality" className={labelCls}>Nationality</label>
          <select id="lead-nationality" className={inputCls} value={nationality} onChange={(e) => setNationality(e.target.value)} aria-invalid={!!errors.nationality}>
            <option value="">Select…</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          {errors.nationality && <p className={errCls}>{errors.nationality}</p>}
        </div>
        <div>
          <label htmlFor="lead-daysInThailand" className={labelCls}>
            Days in Thailand this year <span className="font-normal text-ink-mute">(optional)</span>
          </label>
          <input id="lead-daysInThailand" type="number" inputMode="numeric" min={0} max={366} className={inputCls} value={days} onChange={(e) => setDays(e.target.value)} aria-invalid={!!errors.daysInThailand} />
          {errors.daysInThailand && <p className={errCls}>{errors.daysInThailand}</p>}
        </div>
        <div>
          <label htmlFor="lead-remittanceRange" className={labelCls}>Approximate yearly remittance to Thailand</label>
          <select id="lead-remittanceRange" className={inputCls} value={range} onChange={(e) => setRange(e.target.value as RemittanceRange)} aria-invalid={!!errors.remittanceRange}>
            <option value="">Select…</option>
            {REMITTANCE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.remittanceRange && <p className={errCls}>{errors.remittanceRange}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>Income types</legend>
        <div className="flex flex-wrap gap-2" id="lead-incomeTypes" tabIndex={-1}>
          {LEAD_INCOME_TYPES.map((t) => {
            const on = incomeTypes.includes(t.value);
            return (
              <label
                key={t.value}
                className={`cursor-pointer select-none border-2 px-3 py-1.5 text-sm focus-within:ring-2 focus-within:ring-desk ${
                  on ? 'bg-desk border-desk text-white' : 'bg-paper-white border-desk/40 text-ink-soft hover:border-desk'
                }`}
              >
                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleType(t.value)} />
                {t.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>When do you need help?</legend>
        <div className="flex flex-wrap gap-2" id="lead-urgency" tabIndex={-1}>
          {URGENCY_OPTIONS.map((u) => (
            <label
              key={u.value}
              className={`cursor-pointer border px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-desk ${
                urgency === u.value ? 'border-desk ring-1 ring-desk' : 'border-ink/25 bg-paper-white'
              }`}
            >
              <input type="radio" name="lead-urgency" className="sr-only" checked={urgency === u.value} onChange={() => setUrgency(u.value)} />
              {u.label}
            </label>
          ))}
        </div>
        {errors.urgency && <p className={errCls}>{errors.urgency}</p>}
      </fieldset>

      <div>
        <label htmlFor="lead-notes" className={labelCls}>
          Anything else? <span className="font-normal text-ink-mute">(optional)</span>
        </label>
        <textarea id="lead-notes" rows={3} maxLength={MAX_NOTES} className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <div className="border border-paper-rule p-3 border border-ink/25">
        <label className="flex items-start gap-3 text-sm text-ink cursor-pointer">
          <input
            id="lead-consent"
            type="checkbox"
            className="mt-0.5 h-4 w-4 border-ink/25"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-invalid={!!errors.consent}
          />
          <span>
            {consentText}{' '}
            <Link to="/privacy/#leads" className="text-desk hover:underline">Privacy policy</Link>
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent}</p>}
        <p className="text-xs text-ink-mute mt-2">
          My Thai Taxes may receive a referral fee from {PARTNER.partnerName}.{' '}
          <Link to="/how-this-site-is-funded/" className="text-desk hover:underline">How this site is funded</Link>. This is not tax advice;
          any advice comes from the firm.
        </p>
      </div>

      {needsTurnstile && <Turnstile siteKey={PARTNER.turnstileSiteKey} onToken={setToken} />}

      {serverError && (
        <p role="alert" className="text-sm text-ink border border-desk p-3 border-2 border-desk">{serverError}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="submit" disabled={submitting} className="w-full sm:w-auto bg-desk px-6 py-3 font-semibold text-white hover:bg-desk-deep disabled:opacity-60">
          {submitting ? 'Sending…' : 'Send my request'}
        </button>
        <button type="button" onClick={onCancel} className="w-full sm:w-auto border border-ink/25 px-6 py-3 font-medium text-ink-soft hover:bg-desk/[0.05]">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
