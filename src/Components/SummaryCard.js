import React from 'react'
import './SummaryCard.css'

function SummaryCard({icon,text,number,color}) {
  return (
    <div className={`summary-card ${color}`}>
      {/* Icon container */}
      <div className="summary-icon">
        {icon}
      </div>
       
      
      <div className="summary-content">
        <p className="summary-text">{text}</p>
        <p className="summary-number">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
