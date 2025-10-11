import React from 'react'
import { NavLink } from 'react-router-dom'

function SideBar() {
  return (
    <div className="bg-green-600 text-white h-screen fixed left-0 top-0 bottom-0 w-64 flex flex-col gap-2">
      {/* Header */}
      <div className="bg-green-700 h-12 flex items-center justify-center">
        <h2 className="text-xl font-bold text-center">Maintenance MS</h2>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 px-4">
        <NavLink 
          to="/home"
          className="flex items-center gap-4 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/home/machines"
          className="flex items-center gap-4 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <span>Machines</span>
        </NavLink>

        <NavLink 
          to="/home/technician"
          className="flex items-center gap-4 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <span>Technicians</span>
        </NavLink>

        <NavLink 
          to="/home/maintenance"
          className="flex items-center gap-4 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <span>Maintenance</span>
        </NavLink>

        <NavLink 
          to="/home/assign"
          className="flex items-center gap-4 px-4 py-2 rounded-md text-white bg-green-500 hover:bg-green-700 transition-colors text-lg font-medium"
        >
          <span>Assign</span>
        </NavLink>

        
      </div>
    </div>
  )
}

export default SideBar
