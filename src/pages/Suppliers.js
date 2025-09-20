import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSuppliers, deleteSupplier } from "../services/api"; 
import "./Suppliers.css";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this supplier?")) {
      try {
        await deleteSupplier(id);
        fetchSuppliers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="supplier-list-container">
      <div className="supplier-card">
        <h2>Suppliers</h2>
        <button className="add-btn" onClick={() => navigate("/add-edit-supplier")}>
          Add Supplier
        </button>
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Lead Time (days)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.contact}</td>
                <td>{s.email}</td>
                <td>{s.leadTime}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/add-edit-supplier/${s._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
