interface IncomeInputProps {
  income: number | '';
  setIncome: (value: number | '') => void;
}

const IncomeInput: React.FC<IncomeInputProps> = ({ income, setIncome }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setIncome('');
    } else {
      setIncome(parseFloat(value) || 0);
    }
  };

  return (
    <div>
      <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
        Annual Income (THB)
      </label>
      <input
        type="number"
        id="income"
        value={income}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        placeholder="Enter your annual income"
      />
    </div>
  );
};

export default IncomeInput;
