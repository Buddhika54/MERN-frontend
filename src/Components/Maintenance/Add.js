import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../AddMachines.css'

function Add() {
  const [maintain, setMaintenance] = useState({
          machineName: '',
          priority: '',
          date: '',
          description:'',
          status: 'Pending'   // ✅ always default Pending
      })

      const [machines, setMachines] = useState([]); // store machine list
      const navigate = useNavigate()

      // Fetch machines on mount
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Machine', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.status === 200) {
          setMachines(response.data.Machines); // Save machine list
        }
      } catch (error) {
        console.error("Error fetching machines:", error);
        alert(error.response?.data?.message || "Error fetching machines");
      }
    };
    fetchMachines();
  }, []);

       const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenance({ ...maintain, [name]: value })
    }

        const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submitting maintenance:", maintain);
        try {
            const response = await axios.post('http://localhost:5000/Maintenance', maintain, {
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
            alert(error.response?.data?.message || "Error adding maintenance");
        }
    }




  return (
   <div className="add-machine-form">
            <h2>Add New Maintenance</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label >Machine Name</label>
                    <select 
            name="machineName" 
            value={maintain.machineName} 
            onChange={handleChange} 
            required
          >
            <option value="">-- Select Machine --</option>
            {machines.map((machine) => (
              <option key={machine._id} value={machine.name}>
                {machine.name}
              </option>
            ))}
          </select>
                </div>
                <div className="form-field">
                    <label >Priority</label>
                     <select 
      name="priority" 
      value={maintain.priority} 
      onChange={handleChange} 
      required
    >
      <option value="">-- Select Priority --</option>
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
                       
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        onChange={handleChange}
                        required 
                        pattern="^[A-Za-z\s]{2,50}$"  // Only letters and spaces, 2-10 chars
        title="Name should contain only letters and spaces (2-50 characters)"
                    />
                </div>
                <div className="form-field">
                    <label >Status</label>
                    <input 
                        type="text" 
                        name="status" 
                       
                        onChange={handleChange} 
                        value={maintain.status}   // ✅ bind to state
                        readOnly // ✅ user cannot change
                    />
                </div>
                <button 
                    type="submit"
                >
                    Add Maintenance
                </button>
            </form>
        </div>
  )
}

export default Add
