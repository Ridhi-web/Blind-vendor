import { useState } from 'react'
import Card from './Card'
import ResultBox from './ResultBox'
import './Form.css'

interface VerifyQualificationProps {
  onDebugUpdate: (info: any) => void
}

export default function VerifyQualification({ onDebugUpdate }: VerifyQualificationProps) {
  const [vendorScore, setVendorScore] = useState('')
  const [minimumThreshold, setMinimumThreshold] = useState('')
  const [salt, setSalt] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleVerify = async () => {
    if (!vendorScore || !minimumThreshold || !salt) {
      alert('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      // Simulate smart contract call
      const scoreNum = parseInt(vendorScore)
      const thresholdNum = parseInt(minimumThreshold)
      const qualifies = scoreNum >= thresholdNum

      const response = {
        method: 'verifyQualification',
        params: {
          vendorScore: scoreNum,
          minimumThreshold: thresholdNum,
          salt: parseInt(salt),
        },
        result: qualifies,
        timestamp: new Date().toISOString(),
        contractCall: {
          circuit: 'verifyQualification',
          input: `[${scoreNum}, ${thresholdNum}, ${salt}]`,
          output: `[${qualifies}]`
        }
      }

      setResult(response)
      onDebugUpdate(response)
    } catch (error) {
      const errorResponse = {
        method: 'verifyQualification',
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
      badge="Circuit 1"
      title="✓ Verify Qualification"
      description="Verify vendor meets minimum quality threshold without revealing actual score"
    >
      <div className="input-group">
        <label>Vendor Score</label>
        <input
          type="number"
          value={vendorScore}
          onChange={(e) => setVendorScore(e.target.value)}
          placeholder="e.g., 85"
          min="0"
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Minimum Threshold</label>
        <input
          type="number"
          value={minimumThreshold}
          onChange={(e) => setMinimumThreshold(e.target.value)}
          placeholder="e.g., 80"
          min="0"
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label>Salt (for ZK proof)</label>
        <input
          type="number"
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
          placeholder="e.g., 12345"
          min="0"
          disabled={loading}
        />
      </div>

      <button 
        onClick={handleVerify} 
        className="btn-primary"
        disabled={loading}
      >
        {loading ? '⏳ Verifying...' : '→ Verify Qualification'}
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
