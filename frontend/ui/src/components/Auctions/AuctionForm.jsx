// src/components/Auctions/AuctionForm.jsx
import React, { useState } from "react";

export default function AuctionForm({ onClose }) {
  const [formData, setFormData] = useState({
    orderId: "",
    startDate: "",
    endDate: "",
    minBid: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/auctions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Auction created successfully!");
        onClose();
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      console.error("Error creating auction:", err);
      alert("Error creating auction");
    }
  };

  return (
    <div className="border p-4 mb-3 bg-light rounded">
      <h5>Create Auction</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            className="form-control"
            value={formData.orderId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="datetime-local"
            name="startDate"
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="datetime-local"
            name="endDate"
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            name="minBid"
            placeholder="Minimum Bid"
            className="form-control"
            value={formData.minBid}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Create
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
