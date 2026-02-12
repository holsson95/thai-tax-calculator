interface ResultDisplayProps {
  result: {
    tax: number
    effectiveRate: number
  }
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className="bg-gray-50 p-4 rounded border">
      <div className="text-lg font-medium">Results</div>
      <div className="mt-2">
        Estimated Tax: <strong>{result.tax.toLocaleString()} THB</strong>
      </div>
      <div>
        Effective Tax Rate: <strong>{result.effectiveRate.toFixed(2)}%</strong>
      </div>
    </div>
  )
}
