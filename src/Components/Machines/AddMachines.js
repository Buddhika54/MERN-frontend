import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../AddMachines.css'

function AddMachines() {
    const [machine, setMachine] = useState({
        name: '',
        type: '',
        location: '',
        status: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachine({ ...machine, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("Submitting machine:", machine);
        try {
            const response = await axios.post('http://localhost:5000/Machine', machine, {
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
            <h2>Add New Machine</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label >Machine Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Machine Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-field">
                    <label >Machine Location</label>
                    <select 
                        type="text" 
                        name="location" 
                        onChange={handleChange} 
                       
                        required 
                    >
                       <option value="">-- Select Location --</option>
                        <option value="Factory Floor 1">floor 1</option>
                        <option value="Factory Floor 2">floor 2</option>
                         <option value="Factory Floor 3">floor 3</option> 
                    </select>
                </div>
                <div className="form-field">
                    <label >Machine Status</label>
                    <select 
                        type="text" 
                        name="status" 
                        onChange={handleChange}
                        required 
                    >
                    <option value="">-- Select Status --</option>
                    <option value="Active">Active</option>
                   
                    </select>
                </div>
                <button 
                    type="submit"
                >
                    Add Machine
                </button>
            </form>
        </div>
    )
}

export default AddMachines