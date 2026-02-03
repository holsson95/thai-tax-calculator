import { useState } from 'react'

function App() {
  const [income, setIncome] = useState<string>('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thai Tax Calculator
          </h1>
          <p className="text-gray-600 mb-8">
            Calculate your personal income tax in Thailand
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income (฿)
              </label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter your annual income"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-200">
              Calculate Tax
            </button>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Tax Calculation Result
              </h2>
              <div className="space-y-2 text-gray-600">
                <p>Results will appear here after calculation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Based on Thailand's Personal Income Tax rates for 2025</p>
        </div>
      </div>
    </div>
  )
}

export default App
