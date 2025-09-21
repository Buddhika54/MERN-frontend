import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../AddMachines.css'

function EditT() {

    const{id}=useParams()
    const [technician, setTechnician] = useState({
  name: " ",
  email: " ",
  phone: " ",
  specialty: " ",
  availability: " ",
  work:" "
});

const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

     const handleChange = (e) => {
        const { name, value } = e.target
        setTechnician(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(()=>{
        // Check if id is valid before making the request
        if (!id ) {
            console.error("Invalid ID from URL:", id)
            alert("Invalid technician ID")
            return
        }
    const fetchTechnician=async()=>{
        setLoading(true)
      try{
         setLoading(true)
        const response= await axios.get(`http://localhost:5000/Technician/${id}`,{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          setTechnician(response.data.technician)
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error fetching technician");
      } finally {
        setLoading(false)
      }
    }
   fetchTechnician();

  },[id])

    if (loading) {
        return <div>Loading ...</div>
    }

    if (!technician) {
        return <div>Technician not found</div>
    }

        const handleSubmit=async(e)=>{
           e.preventDefault()
        console.log("Submitting technician:", technician);
        try {
            const response = await axios.put(`http://localhost:5000/Technician/${id}`, technician, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            console.log("Server response:", response);

            if (response.status === 200) {
                navigate("/home/technician")
            }
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error editing technician");
        }
        }

  return (
    <div className="add-machine-form">
            <h2>Edit Technician</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-field">
                    <label >Technician Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={technician.name}
                        required
                         pattern="^[A-Za-z\s]{2,10}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-10 characters)"
                    />
                </div>
                <div className="form-field">
                    <label >E-mail</label>
                    <input
                        name="email"
                        type="email"
                        value={technician.email}   
                        onChange={handleChange}
                        required
                        >
                
                    </input>
                </div>
                <div className="form-field">
                    <label >Phone Number</label>
                    <input 
                         pattern="[0-9]{10}"   // Only 10 digits allowed
        title="Phone number must be 10 digits"
        placeholder="0123456789"
         type="text" 
                        name="phone" 
                        onChange={handleChange} 
                        value={technician.phone}
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Specialty</label>
                    <input 
                        type="text" 
                        name="specialty" 
                        onChange={handleChange} 
                        value={technician.specialty}
                        required 
                         pattern="^[A-Za-z\s]{2,50}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-50 characters)"
                    />
                </div>
                <div className="form-field">
    <label>Availability</label>
    <select
        name="availability"
        value={technician.availability}  // This sets the default selected option
        onChange={handleChange}
        required
    >
        <option value="Available">available</option>
       
        <option value="On Leave">not-available</option>
    </select>
</div>

<div className="form-field">
    <label>Work</label>
    <select
        name="work"
        value={technician.work}  // This sets the default selected option
        onChange={handleChange}
        required
    >
        <option value="Maintenance">assigned</option>
        <option value="Repair">not-assigned</option>
       
    </select>
</div>

                <button 
                    type="submit"
                >
                    Edit Technician
                </button>
            </form>
        </div>
  )
}

export default EditT
