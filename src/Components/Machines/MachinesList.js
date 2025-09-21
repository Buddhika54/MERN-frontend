import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import '../MachinesList.css'
import { columns, MachineButtons } from '../MachineHelper'
import axios from 'axios'
import SideBar from '../SideBar'
import Navbar from '../Navbar'   // ✅ import Navbar



function MachinesList() {
  const [machine, setMachine] = useState(null)
  const [loading, setLoading] = useState(true)
   const [searchStatus, setSearchStatus] = useState('') // 1. State for search
  
  const onMachineDelete = useCallback((id) => {
    setMachine(prev => prev.filter(machine => machine._id !== id))
  }, []) // no dependencies since it only depends on setMachine


  useEffect(()=>{
    const fetchMachines=async()=>{
      try{
         setLoading(true)
        const response= await axios.get('http://localhost:5000/Machine',{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          let sno=1;
                const data =  response.data.Machines.map((machine)=>(
                  {
                    _id:machine._id,
                    sno: sno++,
                    name:machine.name,
                    type:machine.type,
                    location:machine.location,
                    status:machine.status,
                    action:(<MachineButtons id={machine._id} onMachineDelete={onMachineDelete}/>)// Pass ID to buttons


                  }
                

                ))
                setMachine(data);
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error fetching machines");
      } finally {
        setLoading(false)
      }
    }
   fetchMachines();

  },[onMachineDelete])

  // 2. Filter machines based on searchStatus
  const filteredMachines = machine?.filter(m => 
    m.status.toLowerCase().includes(searchStatus.toLowerCase())
  )

  
  if (loading) {
    return <div className="machines-container">Loading machines...</div>
  }

  
  
  return (
    <div className="machines-main">
        <Navbar />
    <div className="machines-container">
      <SideBar/>
            {/* ✅ add Navbar here */}
        <div className="machines-header">
             <h3 >Manage Machines</h3>
        </div>  
        <div className="machines-actions">
            <input type="text" placeholder="Search by Machine Status" className="px-4 py-0.5 border"value={searchStatus}onChange={(e) => setSearchStatus(e.target.value)}/>
            <Link to="/home/add-machine" className="add-machine-btn">Add New Machine</Link>
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
               {filteredMachines && filteredMachines.map((row, index) => (
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
  )
}

export default MachinesList

