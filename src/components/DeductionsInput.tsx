interface DeductionsInputProps {
  deductions: number | '';
  setDeductions: (value: number | '') => void;
}

const DeductionsInput: React.FC<DeductionsInputProps> = ({ deductions, setDeductions }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDeductions('');
    } else {
      setDeductions(parseFloat(value) || 0);
    }
  };

  return (
    <div>
      <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-1">
        Total Deductions (THB)
      </label>
      <input
        type="number"
        id="deductions"
        value={deductions}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
        placeholder="Enter your total deductions"
      />
    </div>
  );
};

export default DeductionsInput;
