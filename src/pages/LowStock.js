import React, { useEffect, useState } from "react";
import { getLowStockReport } from "../services/api";
import "./LowStock.css";

const LowStock = () => {
  const [lowStock, setLowStock] = useState([]);

  useEffect(() => { fetchLowStock(); }, []);

  const fetchLowStock = async () => {
    try {
      const data = await getLowStockReport();
      setLowStock(data);
    } catch (err) { console.error(err); }
  };

  return (
    <div className="low-stock-page">
      <h2>Low Stock Report</h2>
      <table className="low-stock-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Reorder Point</th>
          </tr>
        </thead>
        <tbody>
          {lowStock.map(s => (
            <tr key={s._id}>
              <td>{s.item?.name}</td>
              <td>{s.warehouse?.name}</td>
              <td>{s.quantity}</td>
              <td>{s.item?.reorderPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStock;
