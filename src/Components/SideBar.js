import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideBar.css'

function SideBar() {
  return (
    <div className="sidebar">
        <div className="sidebar-header">
      <h2 >Maintenance MS </h2>
      </div>
      <div  className="sidebar-links">
        <NavLink to="/home" >
            <span>Dashboard</span>
        </NavLink>
        <NavLink to="/home/machines" >
            <span>Machines</span>
        </NavLink>
        <NavLink to="/home/technician">
            <span>Technicians</span>
        </NavLink>
        <NavLink to="/home/maintenance" >
            <span>Maintenance</span>
        </NavLink>
         <NavLink to="/home/assign" >
            <span>Assign</span>
        </NavLink>
        <NavLink to="/home" >
            <span>Records</span>
        </NavLink>

      </div>
    </div>
    
  )
}

export default SideBar
