import { formatThb } from '../utils/taxCalculations';

interface TakeHomeIncomeCardProps {
  annualTakeHome: number;
}

export default function TakeHomeIncomeCard({ annualTakeHome }: TakeHomeIncomeCardProps) {
  const monthlyTakeHome = annualTakeHome / 12;

  return (
    <div className="border border-ink/25 p-6 mb-6 text-center">
      <p className="text-sm text-ink-soft mb-1">Estimated Take-Home Income</p>
      <p className="text-3xl font-bold text-ink-soft">{formatThb(annualTakeHome)}</p>
      <p className="text-sm text-ink-mute mt-1">≈ {formatThb(monthlyTakeHome)}/month</p>
    </div>
  );
}
