import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../AddMachines.css'

function NewTech() {

     const [technician, setTechnician] = useState({
          name: '',
          email: '',
          phone: '',
          specialty:'',
          availability: '' ,  
          work:''
      })

      const navigate = useNavigate()

       const handleChange = (e) => {
        const { name, value } = e.target;
        setTechnician({ ...technician, [name]: value })
    }

        const handleSubmit = async (e) => {
        e.preventDefault()

        
        console.log("Submitting technician:", technician);
        try {
            const response = await axios.post('http://localhost:5000/Technician', technician, {
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
            alert(error.response?.data?.message || "Error adding technician");
        }
    }




  return (
    <div className="add-machine-form">
            <h2>Add New Technician</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label >Technician Name</label>
                    <input
                        name="name" 
                       type="text"
                       value={technician.name}
                       onChange={handleChange}
                        required
                        pattern="^[A-Za-z\s]{2,10}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-10 characters)"
                    >
                        </input>
            
          
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
                        type="text" 
                        name="phone" 
                        onChange={handleChange} 
                       value={technician.phone}
                        required 
                        pattern="[0-9]{10}"   // Only 10 digits allowed
        title="Phone number must be 10 digits"
        placeholder="0123456789"
                    />
                </div>
                <div className="form-field">
                    <label >Specialty</label>
                    <input 
                        type="text" 
                        name="specialty" 
                        value={technician.specialty}
                        onChange={handleChange}
                        required 
                        pattern="^[A-Za-z\s]{2,50}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-50 characters)"
                    />
                </div>
               <div className="form-field">
    <label>Availability</label>
    <select
        name="availability"
        value={technician.availability}
        onChange={handleChange}
        required
    >
        <option value="">-- Select Availability --</option>
        <option value="Available">available</option>
       
        <option value="On Leave">not-available</option>
    </select>
</div>

<div className="form-field">
    <label>Work</label>
    <select
        name="work"
        value={technician.work}
        onChange={handleChange}
        required
    >
        <option value="">-- Select Work --</option>
        <option value="Maintenance">assigned</option>
        <option value="Repair">not-assigned</option>
        
    </select>
</div>

                <button 
                    type="submit"
                >
                    Add Technician
                </button>
            </form>
        </div>
  )
}

export default NewTech
