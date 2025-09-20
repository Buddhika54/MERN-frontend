import React, { useEffect, useState } from "react";
import { getPOs, updateDeliveryStatus } from "../services/api";
import "./POs.css";

const POs = () => {
  const [pos, setPOs] = useState([]);

  useEffect(() => { fetchPOs(); }, []);

  const fetchPOs = async () => {
    try {
      const data = await getPOs();
      setPOs(data);
    } catch (err) { console.error(err); }
  };

  const handleDelivered = async (poId) => {
    try {
      await updateDeliveryStatus(poId, "delivered");
      fetchPOs();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="pos-page">
      <h2>Purchase Orders</h2>
      <table className="pos-table">
        <thead>
          <tr>
            <th>PR Item</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pos.map(po => (
            <tr key={po._id}>
              <td>{po.pr?.item?.name}</td>
              <td>{po.supplier?.name}</td>
              <td>{po.quantity}</td>
              <td>{po.status}</td>
              <td>
                {po.status !== "delivered" && (
                  <button onClick={() => handleDelivered(po._id)}>Mark Delivered</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default POs;
