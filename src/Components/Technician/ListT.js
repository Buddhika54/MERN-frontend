import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, TechnicianButtons } from './TechHelp'
import axios from 'axios'
import SideBar from '../SideBar'
import Navbar from '../Navbar'

function ListT() {
  const [technician, setTechnician] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const onTechnicianDelete = useCallback((id) => {
    setTechnician(prev => prev.filter(technician => technician._id !== id))
  }, [])

  useEffect(() => {
    const fetchTechnician = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios.get('http://localhost:5000/Technician', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          let sno = 1
          const data = response.data.technicians.map((technician) => (
            {
              _id: technician._id,
              sno: sno++,
              name: technician.name,
              email: technician.email,
              phone: technician.phone,
              specialty: technician.specialty,
              availability: technician.availability,
              work: technician.work,
              action: (<TechnicianButtons id={technician._id} onTechnicianDelete={onTechnicianDelete} />)
            }
          ))
          setTechnician(data)
        }
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message)
        if (error.code === 'ECONNREFUSED') {
          setError("Cannot connect to server. Make sure the backend is running on port 5000.")
        } else {
          setError(error.response?.data?.message || "Error fetching technician")
        }
      } finally {
        setLoading(false)
      }
    }
    fetchTechnician()
  }, [onTechnicianDelete])

  if (loading) {
    return <div className="p-6 ml-64 mt-12">Loading technician...</div>
  }

  if (error) {
    return (
      <div className="p-6 ml-64 mt-12">
        <div className="text-red-600 font-medium">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-64 flex flex-col bg-[#b5fcca] min-h-screen">
        <Navbar />

        <div className="p-6 mt-12">
          {/* Header */}
          <div className="text-center mt-4">
            <h3 className="text-2xl font-bold text-gray-800">Manage Technicians</h3>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search by Availability"
              className="py-2 px-4 border border-gray-300 rounded-md"
            />
            <Link
              to="/home/new-technician"
              className="py-2 px-4 bg-teal-600 rounded-md text-white font-medium hover:bg-teal-700 transition"
            >
              Add New Technician
            </Link>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white/90 rounded-md shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="border border-gray-200 p-3 text-lg bg-green-500 font-semibold text-white"
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {technician && technician.map((row, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : ""} hover:bg-gray-100`}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-200 p-3 text-center text-lg"
                      >
                        {column.selector(row)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListT
