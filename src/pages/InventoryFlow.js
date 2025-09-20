import React, { useEffect, useState } from "react";
import { getInventoryFlow } from "../services/api";
import "./InventoryFlow.css";

const InventoryFlow = () => {
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    fetchFlow();
  }, []);

  const fetchFlow = async () => {
    const data = await getInventoryFlow();
    setMovements(Array.isArray(data) ? data : []);
  };

  return (
    <div className="inventory-flow-container">
      <div className="inventory-flow-card">
        <h2>Inventory Flow</h2>
        <table className="flow-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>From</th>
              <th>To</th>
              <th>Quantity</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {movements.length > 0 ? (
              movements.map((m) => (
                <tr key={m._id}>
                  <td>{m.item?.name}</td>
                  <td>{m.warehouse?.name}</td>
                  <td>{m.relatedWarehouseTo?.name || "N/A"}</td>
                  <td>{m.quantity}</td>
                  <td>{m.type}</td>
                  <td>{new Date(m.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No inventory flow records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryFlow;
