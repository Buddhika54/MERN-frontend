import React, { useEffect, useState } from "react";
import { getStockMovements } from "../services/api";
import "./Stock.css";

const Stock = () => {
  const [stockMovements, setStockMovements] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const data = await getStockMovements();
      setStockMovements(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="stock-page">
      <h2>Stock Movements</h2>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stockMovements.map((m) => (
            <tr key={m._id}>
              <td>{m.item?.name}</td>
              <td>{m.warehouse?.name}</td>
              <td>{m.quantity}</td>
              <td>{m.type}</td>
              <td>{new Date(m.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
