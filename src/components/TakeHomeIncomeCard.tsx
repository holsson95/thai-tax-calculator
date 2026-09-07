import { formatThb } from '../utils/taxCalculations';

interface TakeHomeIncomeCardProps {
  annualTakeHome: number;
}

export default function TakeHomeIncomeCard({ annualTakeHome }: TakeHomeIncomeCardProps) {
  const monthlyTakeHome = annualTakeHome / 12;

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6 text-center">
      <p className="text-sm text-gray-600 mb-1">Estimated Take-Home Income</p>
      <p className="text-3xl font-bold text-emerald-700">{formatThb(annualTakeHome)}</p>
      <p className="text-sm text-gray-500 mt-1">≈ {formatThb(monthlyTakeHome)}/month</p>
    </div>
  );
}
