import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import VendorRegistry from './components/VendorRegistry'
import VerifyQualification from './components/VerifyQualification'
import CheckCompliance from './components/CheckCompliance'
import Debug from './components/Debug'

function App() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [vendorsRegistry, setVendorsRegistry] = useState<Set<number>>(new Set())

  const updateDebugInfo = (info: any) => {
    setDebugInfo(info)
  }

  const addQualifiedVendor = (vendorId: number) => {
    setVendorsRegistry(prev => new Set([...Array.from(prev), vendorId]))
  }

  const isQualified = (vendorId: number) => {
    return vendorsRegistry.has(vendorId)
  }

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="cards-grid">
          <VerifyQualification onDebugUpdate={updateDebugInfo} />
          <CheckCompliance onDebugUpdate={updateDebugInfo} />
          <VendorRegistry 
            onDebugUpdate={updateDebugInfo}
            onQualificationRecord={addQualifiedVendor}
            onStatusCheck={isQualified}
          />
        </div>
        <Debug debugInfo={debugInfo} />
      </div>
    </div>
  )
}

export default App
