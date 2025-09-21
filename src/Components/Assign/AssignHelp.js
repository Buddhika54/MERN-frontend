
 
  

 export const columns=[
    
    {
        name:"S No",
        selector:(row)=>row.sno
    },
    

    {
        name:"Technician Name",
        selector:(row)=>row.techname
    },

    {
        name:"Machine Name",
        selector:(row)=>row.machinename
    },

    {
        name:"Assign Date",
       selector: (row) => new Date(row.adate).toLocaleDateString(),
    },
{
        name:"Issue",
        selector:(row)=>row.issue
    },
    {
        name:" Should Complete",
        selector: (row) => new Date(row.edate).toLocaleDateString(),
    },

    {
        name:"Action",
        selector:(row)=>row.action
    },
   
]

export const AssignButtons = () =>{
   

    
     
    return(
        <div className="action-buttons">
            <button className="edit-btn">Inform</button>
            <button className="delete-btn">Delete</button>
           
        </div>
    )

}