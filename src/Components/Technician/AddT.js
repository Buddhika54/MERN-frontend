
import React from 'react'
import '../AddMachines.css'
import {  useNavigate } from 'react-router-dom';

function AddT() {

  

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ here you can send data to backend using axios/fetch if needed

    // after successful submit → navigate to List.js
    navigate("/home/maintenance"); 
  };
  
  return (
    <div className="add-machine-form">
            <h2>Add Technician</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-field">
                    <label >Technician Name</label>
                    <input 
                        
                    />
                </div>
                <div className="form-field">
                    <label >Machine Name</label>
                    <input 
                       
                    />
                </div>
                <div className="form-field">
                    <label >Assign Date</label>
                    <input 
                        
                    />
                </div>
                <div className="form-field">
                    <label >Issue</label>
                    <input 
                         
                    />
                </div>
                <div className="form-field">
                    <label >Maintenance End Date</label>
                    <input 
                         
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