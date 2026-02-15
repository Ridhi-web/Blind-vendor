import './Header.css'

export default function Header() {
  return (
    <div className="header">
      <h1>🔐 Vendor Qualification System</h1>
      <p>Zero-Knowledge Proof Based Vendor Management with Vite + React</p>
      <div className="status-bar">
        <span className="status-badge">Smart Contract Connected</span>
        <span className="tech-badge">Vite + React + TypeScript</span>
      </div>
    </div>
  )
}
