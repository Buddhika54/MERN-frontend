
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../AddMachines.css'

function Edit() {
    const{id}=useParams()
    const [maintain, setMaintenance] = useState({
  machineName: " ",
  priority: " ",
  date: " ",
  description: " ",
  status: " "
});
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

     const handleChange = (e) => {
        const { name, value } = e.target
        setMaintenance(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(()=>{
        // Check if id is valid before making the request
        if (!id ) {
            console.error("Invalid ID from URL:", id)
            alert("Invalid maintenance ID")
            return
        }
    const fetchMaintenance=async()=>{
        setLoading(true)
      try{
         setLoading(true)
        const response= await axios.get(`http://localhost:5000/Maintenance/${id}`,{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          setMaintenance(response.data.maintenance)
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error fetching machines");
      } finally {
        setLoading(false)
      }
    }
   fetchMaintenance();

  },[id])

    if (loading) {
        return <div>Loading ...</div>
    }

    if (!maintain) {
        return <div>Maintenance not found</div>
    }

        const handleSubmit=async(e)=>{
           e.preventDefault()
        console.log("Submitting machine:", maintain);
        try {
            const response = await axios.put(`http://localhost:5000/Maintenance/${id}`, maintain, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log("Server response:", response);

            if (response.status === 200) {
                navigate("/home/maintenance")
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error editing maintenance");
        }
        }
  return (
    <div className="add-machine-form">
            <h2>Edit Maintenance</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-field">
                    <label >Machine Name</label>
                    <input 
                        type="text" 
                        name="machineName" 
                        onChange={handleChange} 
                        value={maintain.machineName}
                        readOnly
                    />
                </div>
                <div className="form-field">
                    <label >Priority</label>
                    <select
                        name="priority"
                        value={maintain.priority}   // ✅ will auto-select saved priority
                        onChange={handleChange}
                        required
                        >
                        <option value="Low">low</option>
                        <option value="Medium">medium</option>
                        <option value="High">high</option>
                    </select>
                </div>
                <div className="form-field">
                    <label >Date</label>
                    <input 
                        type="date" 
                        name="date" 
                        onChange={handleChange} 
                        value={maintain.date}
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        onChange={handleChange} 
                        value={maintain.description}
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Maintenance Status</label>
                    <input 
                        type="text" 
                        name="status" 
                        onChange={handleChange}
                        value={maintain.status}
                        required 
                    />
                </div>
                <button 
                    type="submit"
                >
                    Edit Maintenance
                </button>
            </form>
        </div>
  )
}

export default Edit
