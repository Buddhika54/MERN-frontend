import React, {  useEffect, useState } from 'react'

import '../MachinesList.css'
import {  columns,AssignButtons } from './AssignHelp'
import axios from 'axios'
import SideBar from '../SideBar'
import Navbar from '../Navbar'

import '../MachineHelper.css'

function AssignList() {

    const [assign, setAssign] = useState(null)
    const [loading, setLoading] = useState(true)
     const [error, setError] = useState(null)

      useEffect(()=>{
    const fetchAssign=async()=>{
      try{
         setLoading(true)
         setError(null)

        const response= await axios.get('http://localhost:5000/Assign',{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          let sno=1;
                const data =  response.data.assigns.map((assign)=>(
                  {
                    _id:assign._id,
                    sno: sno++,
                    techname:assign.techname,
                    machinename:assign.machinename,
                    adate:assign.adate,
                    issue:assign.issue,
                    edate:assign.edate,
                    action:(<AssignButtons />)


                  }
                

                ))
                setAssign(data);
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            // CHANGED: Added better error handling
                if (error.code === 'ECONNREFUSED') {
                    setError("Cannot connect to server. Make sure the backend is running on port 5000.");
                } else {
                    setError(error.response?.data?.message || "Error fetching assign")
                }
      } finally {
        setLoading(false)
      }
    }
   fetchAssign();

  },[])
  
  if (loading) {
    return <div className="machines-container">Loading assigns...</div>
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






  return (
    <div>
      <div className="page-container">
      <SideBar />
      <div className="page-main">
        <Navbar />
    <div className="listContainer">
      <div className="listHeader">
             <h3 >Manage Assigned Technicians</h3>
        </div>  
        <div className="listActions">
            <input type="text" placeholder="Search by machine Name" className="px-4 py-0.5 border" />
            
            
        </div>
        <div>
                  <table className="listTable">
                    <thead>
                      <tr>
                        {columns.map((column, index) => (
                          <th key={index}>{column.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {assign && assign.map((row, index) => (
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
    </div>
    </div>
    </div>
  )
}

export default AssignList
