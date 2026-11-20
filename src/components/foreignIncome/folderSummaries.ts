import { TAX_RULES } from '../../config/taxRules';
import type { RemittanceEstimateInput, ThaiIncomeInput } from '../../utils/remittanceEstimate';
import type { TransferMoney } from './transferMoney';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const n = (v: number) => v.toLocaleString('en-US');
const thb = (v: number) => `฿${n(v)}`;

export function aboutSummary(input: RemittanceEstimateInput, visaLabel: string): string {
  if (!(input.daysInThailand > 0)) return 'About you · not started';
  const resident = input.daysInThailand >= TAX_RULES.residencyDays.value ? 'resident' : 'non-resident';
  return `About you · ${input.daysInThailand} days · ${resident} · ${visaLabel}`;
}

export function transfersSummary(totalThb: number, count: number): string {
  return `Money brought in · ${count} ${count === 1 ? 'transfer' : 'transfers'} · ${thb(totalThb)}`;
}

export function thaiSummary(t: ThaiIncomeInput): string {
  const total = t.annualSalary + t.otherThaiIncome;
  return total > 0 ? `Thai income · ${thb(total)}` : 'Thai income · none';
}

export function transferCardSummary(i: number, m: TransferMoney, kindLabel: string): string {
  const amount = m.currency === 'THB' ? thb(m.amount) : `${m.currency} ${n(m.amount)}`;
  const parts = [`Transfer ${i + 1}`, amount];
  const [y, mo] = m.date.split('-').map(Number);
  if (y && mo) parts.push(`${MONTHS[mo - 1]} ${y}`);
  parts.push(kindLabel);
  return parts.join(' · ');
}
