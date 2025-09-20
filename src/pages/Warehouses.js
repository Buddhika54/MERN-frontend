import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWarehouses, deleteData } from "../services/api"; 
import "./Warehouses.css";

const IMWarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const data = await getWarehouses();
      setWarehouses(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this warehouse?")) {
      try {
        await deleteData(`warehouses/${id}`);
        fetchWarehouses();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="warehouse-list-container">
      <div className="warehouse-card">
        <h2>Warehouses</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/add-edit-warehouse")}
        >
          + Add Warehouse
        </button>
        <table className="warehouse-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((w) => (
              <tr key={w._id}>
                <td>{w.name}</td>
                <td>{w.location}</td>
                <td>{w.capacity}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/add-edit-warehouse/${w._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(w._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 && (
              <tr>
                <td colSpan="4">No warehouses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IMWarehouseList;
