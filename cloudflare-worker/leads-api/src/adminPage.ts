// Admin UI for /admin/leads. Served only after Cloudflare Access verification.
// Strict CSP: no inline script; all data is inserted with textContent.
import { escapeHtml } from './emails';

export const ADMIN_HTML = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Leads · My Thai Taxes admin</title>
<link rel="stylesheet" href="/admin/app.css">
</head><body>
<header><h1>Leads</h1><span id="who"></span></header>
<section class="controls">
  <label>Month <input type="month" id="month"></label>
  <label>Status <select id="status"><option value="">All</option></select></label>
  <button id="reload" type="button">Refresh</button>
  <a id="csv" href="#">Export CSV (this filter)</a>
  <a href="/admin/api/subscribers.csv">Export subscribers CSV</a>
</section>
<p id="summary" aria-live="polite"></p>
<div class="table-wrap"><table>
<thead><tr><th>Created</th><th>Lead</th><th>Contact</th><th>Profile</th><th>Est. tax</th><th>Flags</th><th>Delivery</th><th>Status</th></tr></thead>
<tbody id="rows"></tbody></table></div>
<script src="/admin/app.js" defer></script>
</body></html>`;

export const ADMIN_CSS = `
*{box-sizing:border-box}body{margin:0;font:14px/1.4 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#111827;background:#f9fafb}
header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;background:#fff;border-bottom:1px solid #e5e7eb}
h1{font-size:18px;margin:0}#who{color:#6b7280;font-size:12px}
.controls{display:flex;flex-wrap:wrap;gap:12px;align-items:end;padding:16px 20px}
.controls label{display:flex;flex-direction:column;font-size:12px;color:#374151;gap:4px}
input,select,button{font:inherit;padding:6px 8px;border:1px solid #d1d5db;border-radius:6px;background:#fff}
button{cursor:pointer}a{color:#2563eb}
#summary{padding:0 20px;color:#374151}
.table-wrap{overflow-x:auto;padding:0 20px 40px}table{border-collapse:collapse;width:100%;background:#fff}
th,td{border-bottom:1px solid #e5e7eb;padding:8px;text-align:left;vertical-align:top}th{font-size:12px;color:#6b7280;background:#f3f4f6;position:sticky;top:0}
.dup{display:inline-block;background:#fef3c7;color:#92400e;border-radius:9999px;padding:0 6px;font-size:11px;margin-left:4px}
.muted{color:#6b7280;font-size:12px}.err{color:#b91c1c}
.status{display:flex;flex-direction:column;gap:4px;min-width:150px}
`;

export const ADMIN_JS = `(() => {
  const STATUSES = ['new','contacted','booked','client','rejected'];
  const $ = (id) => document.getElementById(id);
  const el = (tag, text, cls) => { const e = document.createElement(tag); if (text !== undefined && text !== null) e.textContent = String(text); if (cls) e.className = cls; return e; };
  const thb = (n) => typeof n === 'number' ? '฿' + Math.round(n).toLocaleString('en-US') : '—';
  const parse = (s, d) => { try { return s ? JSON.parse(s) : d; } catch { return d; } };

  const statusSel = $('status');
  STATUSES.forEach((s) => statusSel.appendChild(Object.assign(el('option', s), { value: s })));
  const now = new Date(); $('month').value = now.toISOString().slice(0, 7);

  const query = () => { const p = new URLSearchParams(); if ($('month').value) p.set('month', $('month').value); if (statusSel.value) p.set('status', statusSel.value); return p.toString(); };

  async function save(id, status, reasonInput, msg) {
    msg.textContent = 'Saving…'; msg.className = 'muted';
    const reason = reasonInput.value.trim();
    if (status === 'rejected' && !reason) { msg.textContent = 'Reason required for rejected'; msg.className = 'err'; return false; }
    const res = await fetch('/admin/api/leads/' + encodeURIComponent(id) + '/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, reason }) });
    if (res.ok) { msg.textContent = 'Saved'; return true; }
    msg.textContent = 'Error ' + res.status; msg.className = 'err'; return false;
  }

  function render(leads) {
    const tbody = $('rows'); tbody.replaceChildren();
    const counts = {}; let billable = 0;
    leads.forEach((l) => { counts[l.status] = (counts[l.status] || 0) + 1; if (!l.is_duplicate) billable++; });
    $('summary').textContent = leads.length + ' leads (' + billable + ' non-duplicate). ' + STATUSES.map((s) => s + ': ' + (counts[s] || 0)).join(' · ');
    for (const l of leads) {
      const tr = el('tr');
      tr.appendChild(el('td', new Date(l.created_at).toLocaleString()));
      const idTd = el('td'); idTd.appendChild(el('strong', l.id)); if (l.is_duplicate) idTd.appendChild(el('span', 'duplicate', 'dup'));
      if (l.duplicate_of) idTd.appendChild(el('div', 'of ' + l.duplicate_of, 'muted'));
      tr.appendChild(idTd);
      const c = el('td'); c.appendChild(el('div', l.name)); c.appendChild(el('div', l.email, 'muted')); if (l.phone) c.appendChild(el('div', l.phone, 'muted')); tr.appendChild(c);
      const p = el('td');
      p.appendChild(el('div', l.nationality + (l.days_in_thailand != null ? ' · ' + l.days_in_thailand + ' days' : '')));
      p.appendChild(el('div', parse(l.income_types, []).join(', '), 'muted'));
      p.appendChild(el('div', l.remittance_range + ' · ' + l.urgency, 'muted'));
      if (l.notes) p.appendChild(el('div', l.notes, 'muted'));
      tr.appendChild(p);
      tr.appendChild(el('td', thb(l.estimated_tax_thb)));
      tr.appendChild(el('td', parse(l.flags, []).join(', ') || '—'));
      const d = el('td'); ['partner_email_status','webhook_status','user_email_status'].forEach((k) => d.appendChild(el('div', k.split('_')[0] + ': ' + (l[k] || 'pending'), 'muted'))); tr.appendChild(d);
      const s = el('td'); const box = el('div', null, 'status');
      const sel = el('select'); STATUSES.forEach((st) => { const o = Object.assign(el('option', st), { value: st }); if (st === l.status) o.selected = true; sel.appendChild(o); });
      const reason = Object.assign(el('input'), { placeholder: 'Reason (required if rejected)', value: l.status_reason || '' });
      const btn = el('button', 'Save'); const msg = el('span', '', 'muted');
      btn.type = 'button'; btn.addEventListener('click', () => save(l.id, sel.value, reason, msg));
      box.append(sel, reason, btn, msg); s.appendChild(box); tr.appendChild(s);
      tbody.appendChild(tr);
    }
  }

  async function load() {
    const q = query(); $('csv').href = '/admin/api/leads.csv' + (q ? '?' + q : '');
    $('summary').textContent = 'Loading…';
    const res = await fetch('/admin/api/leads' + (q ? '?' + q : ''));
    if (!res.ok) { $('summary').textContent = 'Error ' + res.status; return; }
    const body = await res.json(); render(body.leads || []);
  }

  fetch('/admin/api/me').then((r) => r.ok ? r.json() : null).then((b) => { if (b && b.email) $('who').textContent = 'Signed in as ' + b.email; });
  $('reload').addEventListener('click', load); $('month').addEventListener('change', load); statusSel.addEventListener('change', load);
  load();
})();`;

export const UNSUBSCRIBE_HTML = (email: string, token: string, done: boolean) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Unsubscribe · My Thai Taxes</title>
<style>body{font:16px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:480px;margin:48px auto;padding:0 16px;color:#111827}button{font:inherit;padding:10px 16px;border-radius:8px;border:0;background:#2563eb;color:#fff;cursor:pointer}</style>
</head><body>
${done
  ? '<h1>You are unsubscribed</h1><p>You will no longer receive Thai tax updates from My Thai Taxes.</p>'
  : `<h1>Unsubscribe from updates?</h1><form method="post" action="/unsubscribe"><input type="hidden" name="e" value="${escapeHtml(email)}"><input type="hidden" name="t" value="${escapeHtml(token)}"><button type="submit">Unsubscribe</button></form>`}
<p><a href="https://mythaitaxes.com/">Back to mythaitaxes.com</a></p>
</body></html>`;
