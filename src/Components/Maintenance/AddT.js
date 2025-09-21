import React, { useState } from 'react'
import '../AddMachines.css'
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddT() {

  

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    techname: "",
    machinename: "",
    adate: "",
    issue: "",
    edate: ""
  });

   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // ✅ here you can send data to backend using axios/fetch if needed
     try {
      // ✅ send data to backend
      await axios.post("http://localhost:5000/Assign", formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });


    // after successful submit → navigate to List.js
    navigate("/home/maintenance"); 

     } catch (error) {
      console.error("Error saving assign:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div className="add-machine-form">
            <h2>Add Technician</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-field">
                    <label >Technician Name</label>
                    <input 
                        name="techname"
            value={formData.techname}
            onChange={handleChange}
            required
            pattern="^[A-Za-z\s]{2,10}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-10 characters)"
                    />
                </div>
                <div className="form-field">
                    <label >Machine Name</label>
                    <input 
                        name="machinename"
            value={formData.machinename}
            onChange={handleChange}
            required
            pattern="^[A-Za-z\s]{2,10}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-10 characters)"
                    />
                </div>
                <div className="form-field">
                    <label >Assign Date</label>
                    <input 
                        type="date"
            name="adate"
            value={formData.adate}
            onChange={handleChange}
            required
                    />
                </div>
                <div className="form-field">
                    <label >Issue</label>
                    <input 
                         name="issue"
            value={formData.issue}
            onChange={handleChange} 
            required
            pattern="^[A-Za-z\s]{2,50}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-50 characters)"
                    />
                </div>
                <div className="form-field">
                    <label >Maintenance End Date</label>
                    <input 
                         type="date"
            name="edate"
            value={formData.edate}
            onChange={handleChange} 
            required
                    />
                </div>
                <button 
                    type="submit"
                >
                    Assign
                </button>
            </form>
        </div>



           
  )
}




export default AddT