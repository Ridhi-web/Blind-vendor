import { ReactNode } from 'react'
import './Card.css'

interface CardProps {
  badge: string
  title: string
  description: string
  children: ReactNode
}

export default function Card({ badge, title, description, children }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="badge">{badge}</span>
        <h2>{title}</h2>
      </div>
      <p className="description">{description}</p>
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}
