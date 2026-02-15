import { useState } from 'react'
import Card from './Card'
import ResultBox from './ResultBox'
import './Form.css'

interface VendorRegistryProps {
  onDebugUpdate: (info: any) => void
  onQualificationRecord: (vendorId: number) => void
  onStatusCheck: (vendorId: number) => boolean
}

export default function VendorRegistry({ 
  onDebugUpdate, 
  onQualificationRecord,
  onStatusCheck 
}: VendorRegistryProps) {
  const [recordVendorId, setRecordVendorId] = useState('')
  const [checkVendorId, setCheckVendorId] = useState('')
  const [result, setResult] = useState<any>(null)
  const [statusResult, setStatusResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleRecord = async () => {
    if (!recordVendorId) {
      alert('Please enter vendor ID')
      return
    }

    setLoading(true)
    try {
      const vendorNum = parseInt(recordVendorId)
      onQualificationRecord(vendorNum)

      const response = {
        method: 'recordQualification',
        params: { vendorId: vendorNum },
        result: null,
        timestamp: new Date().toISOString(),
        contractCall: {
          circuit: 'recordQualification',
          input: `[${vendorNum}]`,
          output: 'Vendor marked as qualified in ledger',
          ledgerUpdate: `vendors.markQualified(${vendorNum})`
        }
      }

      setResult(response)
      onDebugUpdate(response)
      setRecordVendorId('')
    } catch (error) {
      const errorResponse = {
        method: 'recordQualification',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
      setResult(errorResponse)
      onDebugUpdate(errorResponse)
    } finally {
      setLoading(false)
    }
  }

  const handleCheck = async () => {
    if (!checkVendorId) {
      alert('Please enter vendor ID')
      return
    }

    setLoading(true)
    try {
      const vendorNum = parseInt(checkVendorId)
      const isQualified = onStatusCheck(vendorNum)

      const response = {
        method: 'isVendorQualified',
        params: { vendorId: vendorNum },
        result: isQualified,
        timestamp: new Date().toISOString(),
        contractCall: {
          circuit: 'isVendorQualified',
          input: `[${vendorNum}]`,
          output: `[${isQualified}]`,
          status: isQualified ? 'QUALIFIED' : 'NOT QUALIFIED'
        }
      }

      setStatusResult(response)
      onDebugUpdate(response)
    } catch (error) {
      const errorResponse = {
        method: 'isVendorQualified',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }
      setStatusResult(errorResponse)
      onDebugUpdate(errorResponse)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
      <Card
        badge="Circuit 3"
        title="📝 Record Qualification"
        description="Record vendor qualification approval in the public ledger"
      >
        <div className="input-group">
          <label>Vendor ID</label>
          <input
            type="number"
            value={recordVendorId}
            onChange={(e) => setRecordVendorId(e.target.value)}
            placeholder="e.g., 1"
            min="0"
            disabled={loading}
          />
        </div>

        <button 
          onClick={handleRecord} 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? '⏳ Recording...' : '→ Record Qualification'}
        </button>

        {result && (
          <ResultBox 
            success={!('error' in result)}
            data={result}
          />
        )}
      </Card>

      <Card
        badge="Circuit 4"
        title="❓ Check Vendor Status"
        description="Check if a vendor is qualified (yes/no only, no details revealed)"
      >
        <div className="input-group">
          <label>Vendor ID</label>
          <input
            type="number"
            value={checkVendorId}
            onChange={(e) => setCheckVendorId(e.target.value)}
            placeholder="e.g., 1"
            min="0"
            disabled={loading}
          />
        </div>

        <button 
          onClick={handleCheck} 
          className="btn-primary"
          disabled={loading}
        >
          {loading ? '⏳ Checking...' : '→ Check Status'}
        </button>

        {statusResult && (
          <ResultBox 
            success={'result' in statusResult && statusResult.result !== undefined}
            data={statusResult}
          />
        )}
      </Card>
    </div>
  )
}
