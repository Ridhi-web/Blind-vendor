import { useState } from 'react'
import Card from './Card'
import ResultBox from './ResultBox'
import './Form.css'

interface CheckComplianceProps {
  onDebugUpdate: (info: any) => void
}

export default function CheckCompliance({ onDebugUpdate }: CheckComplianceProps) {
  const [certification, setCertification] = useState(true)
  const [insurance, setInsurance] = useState(true)
  const [paymentHistory, setPaymentHistory] = useState(true)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async () => {
    setLoading(true)
    try {
      // Simulate smart contract call
      const compliant = certification && insurance && paymentHistory

      const response = {
        method: 'checkCompliance',
        params: {
          certificationValid: certification,
          insuranceActive: insurance,
          paymentHistoryGood: paymentHistory,
        },
        result: compliant,
        timestamp: new Date().toISOString(),
        contractCall: {
          circuit: 'checkCompliance',
          input: `[${certification}, ${insurance}, ${paymentHistory}]`,
          output: `[${compliant}]`
        }
      }

      setResult(response)
      onDebugUpdate(response)
    } catch (error) {
      const errorResponse = {
        method: 'checkCompliance',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
      setResult(errorResponse)
      onDebugUpdate(errorResponse)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      badge="Circuit 2"
      title="📋 Check Compliance"
      description="Verify all compliance checks pass without revealing individual details"
    >
      <div className="checkbox-group">
        <div className="checkbox-item">
          <input
            type="checkbox"
            id="cert"
            checked={certification}
            onChange={(e) => setCertification(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="cert">Certification Valid</label>
        </div>

        <div className="checkbox-item">
          <input
            type="checkbox"
            id="insur"
            checked={insurance}
            onChange={(e) => setInsurance(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="insur">Insurance Active</label>
        </div>

        <div className="checkbox-item">
          <input
            type="checkbox"
            id="payment"
            checked={paymentHistory}
            onChange={(e) => setPaymentHistory(e.target.checked)}
            disabled={loading}
          />
          <label htmlFor="payment">Payment History Good</label>
        </div>
      </div>

      <button 
        onClick={handleCheck} 
        className="btn-primary"
        disabled={loading}
      >
        {loading ? '⏳ Checking...' : '→ Check Compliance'}
      </button>

      {result && (
        <ResultBox 
          success={'result' in result && result.result !== undefined}
          data={result}
        />
      )}
    </Card>
  )
}
