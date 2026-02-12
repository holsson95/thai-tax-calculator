import { useState } from 'react'
import { calculateThaiTax } from '../utils/tax'
import IncomeInput from './IncomeInput'
import DeductionsInput from './DeductionsInput'
import ResultDisplay from './ResultDisplay'
import CalculateButton from './CalculateButton'
import ResetButton from './ResetButton'

export default function Calculator() {
  const [income, setIncome] = useState<number | ''>('')
  const [deductions, setDeductions] = useState<number | ''>(0)
  const [result, setResult] = useState<{ tax: number; effectiveRate: number } | null>(null)

  const compute = () => {
    const inc = typeof income === 'number' ? income : parseFloat(String(income) || '0')
    const ded = typeof deductions === 'number' ? deductions : parseFloat(String(deductions) || '0')
    const taxable = Math.max(0, inc - ded)
    const tax = calculateThaiTax(taxable)
    setResult({ tax, effectiveRate: inc > 0 ? (tax / inc) * 100 : 0 })
  }

  const reset = () => {
    setIncome('')
    setDeductions(0)
    setResult(null)
  }

  return (
    <div className="space-y-4">
      <IncomeInput income={income} setIncome={setIncome} />
      <DeductionsInput deductions={deductions} setDeductions={setDeductions} />
      <div className="flex gap-2">
        <CalculateButton onClick={compute} />
        <ResetButton onClick={reset} />
      </div>
      {result && <ResultDisplay result={result} />}
    </div>
  )
}
