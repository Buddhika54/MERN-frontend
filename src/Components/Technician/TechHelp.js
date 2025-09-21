
 import {  useNavigate } from "react-router-dom"
  import axios from 'axios'
  

 export const columns=[
    
    {
        name:"S No",
        selector:(row)=>row.sno
    },
    

    {
        name:"Technician Name",
        selector:(row)=>row.name
    },

    {
        name:"E-mail",
        selector:(row)=>row.email
    },

    {
        name:"Phone No",
       selector: (row) => row.phone
    },
{
        name:"Specialty",
        selector:(row)=>row.specialty
    },

    {
        name:"Availability",
        selector:(row)=>row.availability
    },
     {
        name:"Work",
        selector:(row)=>row.work
    },
  
    {
        name:"Action",
        selector:(row)=>row.action
    },
     
   
]

export const TechnicianButtons = ({id,onTechnicianDelete}) =>{
    const navigate=useNavigate()

    const handleDelete=async()=>{
        const confirm = window.confirm("Do you want to delete?")
         if(confirm){
        try{
           
         
        const response= await axios.delete(`http://localhost:5000/Technician/${id}`,{
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Server response:", response);
        if (response.status === 200) {
          onTechnicianDelete(id)
            }

      }catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Error fetching machines");
      }
    }

    }
     
    return(
        <div className="action-buttons">
            <button onClick={()=>navigate(`/home/technician/${id}`)}className="edit-btn">Edit</button>
            <button onClick={handleDelete}className="delete-btn">Delete</button>
            
        </div>
    )

}