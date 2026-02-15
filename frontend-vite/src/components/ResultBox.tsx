import './ResultBox.css'

interface ResultBoxProps {
  success: boolean
  data: any
}

export default function ResultBox({ success, data }: ResultBoxProps) {
  return (
    <div className={`result-box ${success ? 'success' : 'error'}`}>
      <div className="result-header">
        <span className="result-icon">{success ? '✓' : '✗'}</span>
        <span className="result-title">
          {success ? 'Success' : 'Error'}
        </span>
      </div>

      <div className="result-content">
        {data.error && (
          <div className="result-item">
            <span className="result-label">Error:</span>
            <span className="result-value">{data.error}</span>
          </div>
        )}

        {data.method && (
          <div className="result-item">
            <span className="result-label">Method:</span>
            <span className="result-value">{data.method}</span>
          </div>
        )}

        {data.contractCall && (
          <div className="result-item">
            <span className="result-label">Circuit:</span>
            <span className="result-value">{data.contractCall.circuit}</span>
          </div>
        )}

        {data.contractCall?.input && (
          <div className="result-item">
            <span className="result-label">Input:</span>
            <span className="result-value mono">{data.contractCall.input}</span>
          </div>
        )}

        {data.contractCall?.output && (
          <div className="result-item">
            <span className="result-label">Output:</span>
            <span className="result-value mono">{data.contractCall.output}</span>
          </div>
        )}

        {data.result !== undefined && data.result !== null && (
          <div className="result-item highlight">
            <span className="result-label">Result:</span>
            <span className="result-value">{String(data.result)}</span>
          </div>
        )}

        {data.contractCall?.status && (
          <div className="result-item highlight">
            <span className="result-label">Status:</span>
            <span className={`status-badge ${data.contractCall.status === 'QUALIFIED' ? 'qualified' : 'not-qualified'}`}>
              {data.contractCall.status}
            </span>
          </div>
        )}

        {data.contractCall?.ledgerUpdate && (
          <div className="result-item">
            <span className="result-label">Ledger Update:</span>
            <span className="result-value mono">{data.contractCall.ledgerUpdate}</span>
          </div>
        )}

        {data.timestamp && (
          <div className="result-item tiny">
            <span className="result-label">Timestamp:</span>
            <span className="result-value">{new Date(data.timestamp).toLocaleTimeString()}</span>
          </div>
        )}
      </div>
    </div>
  )
}
