import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utills/EmpHelper'
import DataTable from 'react-data-table-component'

const EmpList = () => {

  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoarding] = useState(false)
  const [filterEmployee, setFilterEmployee] = useState([])

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoarding(true)
      try{
        const response = await axios.get('http://localhost:3001/api/employee',{
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          let sno = 1;
            const data = await response.data.employees.map((emp)=>(
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob: new Date(emp.dob).toLocaleDateString(),
                profileImage: <img width={40} height={40} className= 'rounded-full' src={`http://localhost:3001/${emp.userId.profileImage}`} alt='Employee'/>,
                action: (<EmployeeButtons _id={emp._id}/>),

              }
            ));
            setEmployees(data);
            setFilterEmployee(data);
        }
      }catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }finally{
        setEmpLoarding(false)
      }
    };

    fetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const record = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilterEmployee(record)
  }

  return (
    <>{empLoading ? <div>Loading...</div> : 
    <div className='p-6'>
       <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search By Emp Name' className='px-4 py-0.5 border' onChange={handleFilter} />
        <Link 
          to="/admin-dashboard/add-employee" 
          className='px-4 py-1 bg-teal-600 rounded text-white'>
            Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable 
          columns={columns} data={filterEmployee} pagination
        />
      </div>
    </div>
    }</>
  )
}

export default EmpList