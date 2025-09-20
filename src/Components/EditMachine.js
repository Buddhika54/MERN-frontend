import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function EditMachine() {
    const{id}=useParams()
    const [machine, setMachine] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

     const handleChange = (e) => {
        const { name, value } = e.target
        setMachine(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(()=>{
    const fetchMachines=async()=>{
        setLoading(true)
      try{
         setLoading(true)
        const response= await axios.get(`http://localhost:5000/Machine/${id}`,{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          setMachine(response.data.Machines)
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error fetching machines");
      } finally {
        setLoading(false)
      }
    }
   fetchMachines();

  },[id])

    if (loading) {
        return <div>Loading ...</div>
    }

    if (!machine) {
        return <div>Machine not found</div>
    }

        const handleSubmit=async(e)=>{
           e.preventDefault()
        console.log("Submitting machine:", machine);
        try {
            const response = await axios.put(`http://localhost:5000/Machine/${id}`, machine, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log("Server response:", response);

            if (response.status === 200) {
                navigate("/home/machines")
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error adding machine");
        }
        }

  return (
   
    <div className="add-machine-form">
            <h2>Edit Machine</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-field">
                    <label >Machine Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={machine.name}
                        readOnly   // 🔒 makes it not editable
                    />
                </div>
                <div className="form-field">
                    <label >Machine Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        onChange={handleChange} 
                        value={machine.type}
                        readOnly   // 🔒 makes it not editable
                    />
                </div>
                <div className="form-field">
                    <label >Machine Location</label>
                     <select
                        name="location"
                        value={machine.location}   // ✅ controlled: shows saved location
                        onChange={handleChange}
                        required
                        >
                    <option value="" disabled>-- Select Location --</option>
                    <option value="Factory Floor 1">floor 1</option>
                    <option value="Factory Floor 2">floor 2</option>
                    <option value="Factory Floor 3">floor 3</option>
                </select>
                </div>
                <div className="form-field">
                    <label >Machine Status</label>
                    <select
                        name="status"
                        value={machine.status}   // ✅ controlled: shows saved status
                        onChange={handleChange}
                        required
                        >
                        <option value="" disabled>-- Select Status --</option>
                        <option value="Active">active</option>
                        <option value="Inactive">inactive</option>
                        <option value="Maintenance">under-maintenance</option>
                    </select>
                </div>
                <button 
                    type="submit"
                >
                    Edit Machine
                </button>
            </form>
        </div>
    
  )
}

export default EditMachine
