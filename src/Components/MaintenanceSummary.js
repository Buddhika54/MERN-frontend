import React from 'react'
import { FaTools, FaUsers, FaMoneyBillWave, FaCalendarCheck, FaCheckCircle, FaClock,FaExclamationTriangle  } from 'react-icons/fa' 
  
import SummaryCard from './SummaryCard'

import './MaintenanceSummary.css'


function MaintenanceSummary() {
  return (
    <div className="summary-container">
      <h1 >Dashboard Overview</h1>
      <div className="summary-grid">
        <SummaryCard icon={<FaTools />}  text="Total Machines"number={30} color="bg-light-green"/>
        <SummaryCard icon={<FaUsers />} text="Total Technicians"number={25} color="bg-light-yellow"/>
        <SummaryCard  icon={<FaMoneyBillWave />}  text="Monthly Maintenance Cost"number="Rs.500000" color="bg-light-red"/>
      </div>

    <div className="maintenance-section">
        <h4 >Maintenance Details</h4>

        <div className="maintenance-grid">
          <SummaryCard icon={<FaCalendarCheck />} text="Scheduled Maintenance "number={5}color="bg-normal"/> 
          <SummaryCard icon={<FaCheckCircle />} text="Completed Maintenance "number={3} color="bg-light-yellow"/> 
          <SummaryCard icon={<FaClock />} text="Pending Maintenance "number={1}color="bg-light-red"/>
          <SummaryCard icon={<FaExclamationTriangle />} text="Overdue Maintenance "number={0} color="bg-light-green"/>
        </div>
    </div>






    </div>
  )
}

export default MaintenanceSummary
