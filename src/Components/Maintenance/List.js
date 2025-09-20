import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../MachinesList.css'
import {  columns,MaintenanceButtons } from './MaintenanceHelper'
import axios from 'axios'


function List() {
    const [maintain, setMaintenance] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [searchPriority, setSearchPriority] = useState('') // 1. State for search

      const onMaintenanceDelete = useCallback((id) => {
    setMaintenance(prev => prev.filter(maintain => maintain._id !== id))
  }, []) // no dependencies since it only depends on setMachine

      

     useEffect(()=>{
    const fetchMaintenance=async()=>{
      try{
         setLoading(true)
         setError(null)

        const response= await axios.get('http://localhost:5000/Maintenance',{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          let sno=1;
                const data =  response.data.maintenances.map((maintain)=>(
                  {
                    _id:maintain._id,
                    sno: sno++,
                    machineName:maintain.machineName,
                    priority:maintain.priority,
                    date:maintain.date,
                    description:maintain.description,
                    status:maintain.status,
                    action:(<MaintenanceButtons id={maintain._id} onMaintenanceDelete={onMaintenanceDelete}/>)// Pass ID to buttons


                  }
                

                ))
                setMaintenance(data);
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            // CHANGED: Added better error handling
                if (error.code === 'ECONNREFUSED') {
                    setError("Cannot connect to server. Make sure the backend is running on port 5000.");
                } else {
                    setError(error.response?.data?.message || "Error fetching maintenance")
                }
      } finally {
        setLoading(false)
      }
    }
   fetchMaintenance();

  },[onMaintenanceDelete])
  
  if (loading) {
    return <div className="machines-container">Loading maintenance...</div>
  }

  // CHANGED: Added error display
    if (error) {
        return (
            <div className="machines-container">
                <div className="error-message">{error}</div>
                <button onClick={() => window.location.reload()} className="retry-btn">
                    Retry
                </button>
            </div>
        )
    }



      // 2. Filter maintenance by priority
  const filteredMaintenance = maintain?.filter(m =>
    m.priority.toLowerCase().includes(searchPriority.toLowerCase())
  )

  return (
    <div>
      <div className="machines-header">
             <h3 >Manage Maintenance</h3>
        </div>  
        <div className="machines-actions">
            <input type="text" placeholder="Search by priority" className="px-4 py-0.5 border"value={searchPriority} onChange={(e) => setSearchPriority(e.target.value)} />
            <Link to="/home/add-maintenance" className="add-machine-btn">Add New Maintenance</Link>
        </div>
        <div>
                  <table className="machines-table">
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <th key={index}>{column.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMaintenance && filteredMaintenance.map((row, index) => (
                        <tr key={index}>
                          {columns.map((column, colIndex) => (
                            <td key={colIndex}>{column.selector(row)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                </div>
    </div>
  )
}

export default List
