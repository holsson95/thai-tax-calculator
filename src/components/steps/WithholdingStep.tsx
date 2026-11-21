import { StepProps } from '../../types/taxForm';

const WithholdingStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(value) || 0;
    setFormData({ ...formData, taxWithheld: numValue });
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-US');
  };

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Tax Withholding</h2>
      <p className="text-ink-soft mb-6">
        Enter the total tax already withheld from your income this year.
      </p>

      <div className="mb-6">
        <label htmlFor="taxWithheld" className="block text-sm font-medium text-ink-soft mb-2">
          Tax Already Withheld (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-mute">฿</span>
          <input
            type="text"
            id="taxWithheld"
            value={formatNumber(formData.taxWithheld)}
            onChange={handleChange}
            placeholder="0"
            className="field-input pl-8 pr-4 h-12 text-lg"
          />
        </div>
        <p className="mt-2 text-sm text-ink-mute">
          Leave at 0 if you haven't had any tax withheld.
        </p>
      </div>

      <div className="border border-ink/25 p-4 mb-6">
        <h3 className="note-title">Where to find this amount:</h3>
        <ul className="text-sm text-ink-soft space-y-1">
          <li>• Check your monthly payslips (look for "Tax Withheld" or "WHT")</li>
          <li>• Request a withholding certificate from your employer</li>
          <li>• Sum up all monthly withholdings for the year</li>
          <li>• Check your 50 Tawi form from your employer</li>
        </ul>
      </div>

      <div className="p-4 border border-ink/25">
        <h3 className="note-title">Why this matters:</h3>
        <p className="text-sm text-ink-soft">
          If you've had tax withheld throughout the year, you may be entitled to a refund
          if the total exceeds your actual tax liability. Or you may owe additional tax
          if the withholding was insufficient.
        </p>
      </div>
    </div>
  );
};

export default WithholdingStep;
