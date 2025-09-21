// src/components/Pickups/PickupForm.jsx
import React, { useState, useEffect } from "react";

export default function PickupForm({ onClose, onSaved, orders = [] }) {
  const [formData, setFormData] = useState({
    orderId: "",
    clientName: "",
    pickupDate: "",
    pickupTime: "",
    truckAssigned: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const hasOrders = Array.isArray(orders) && orders.length > 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/pickups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert("✅ Pickup scheduled successfully!");
        onSaved(data.pickup);
      } else {
        alert("❌ Failed: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Error scheduling pickup");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="text-success mb-3">Schedule Pickup</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <select
            name="orderId"
            className="form-select"
            value={formData.orderId}
            onChange={handleChange}
            required
            disabled={!hasOrders}
          >
            <option value="">{hasOrders ? "Select Order" : "No orders available"}</option>
            {hasOrders &&
              orders.map((order) => (
                <option key={order._id} value={order._id}>
                  {order.customerName} - {order.product}
                </option>
              ))}
          </select>
          {!hasOrders && (
            <small className="text-muted">Create an order first, then schedule a pickup.</small>
          )}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="clientName"
            placeholder="Client Name"
            className="form-control"
            value={formData.clientName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="date"
            name="pickupDate"
            className="form-control"
            value={formData.pickupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="time"
            name="pickupTime"
            className="form-control"
            value={formData.pickupTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="truckAssigned"
            placeholder="Truck Assigned"
            className="form-control"
            value={formData.truckAssigned}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2" disabled={!hasOrders || !formData.orderId}>
          Schedule Pickup
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
