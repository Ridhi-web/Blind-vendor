import { useState } from 'react'
import './Debug.css'

interface DebugProps {
  debugInfo: any
}

export default function Debug({ debugInfo }: DebugProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const debugText = debugInfo ? JSON.stringify(debugInfo, null, 2) : 'No debug info yet...'

  return (
    <div className={`debug-container ${isExpanded ? 'expanded' : ''}`}>
      <button 
        className="debug-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '▼' : '▶'} 🛠️ Debug Information
      </button>

      {isExpanded && (
        <div className="debug-content">
          <textarea 
            value={debugText}
            readOnly
            className="debug-textarea"
          />
          <button 
            className="debug-copy"
            onClick={() => navigator.clipboard.writeText(debugText)}
          >
            📋 Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  )
}
