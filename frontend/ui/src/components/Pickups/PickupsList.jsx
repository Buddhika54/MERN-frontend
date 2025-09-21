// src/components/Pickups/PickupsList.jsx
import React, { useEffect, useState } from "react";
import PickupForm from "./PickupForm";

export default function PickupsList({ orders }) {
  const [pickups, setPickups] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPickups = async () => {
    try {
      const res = await fetch(`${API_URL}/api/pickups`);
      const data = await res.json();
      if (res.ok && data.success) setPickups(data.pickups);
      else alert("❌ Failed to fetch pickups: " + data.error);
    } catch (err) {
      console.error(err);
      alert("❌ Error fetching pickups");
    }
  };

  useEffect(() => {
    fetchPickups();
  }, []);

  const handleFormClose = () => setShowForm(false);

  const handlePickupSaved = (newPickup) => {
    setPickups([...pickups, newPickup]);
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Pickups</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        Schedule Pickup
      </button>

      {showForm && (
        <PickupForm
          orders={orders}
          onClose={handleFormClose}
          onSaved={handlePickupSaved}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Client Name</th>
            <th>Order</th>
            <th>Date</th>
            <th>Time</th>
            <th>Truck</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pickups.length > 0 ? (
            pickups.map((pickup) => (
              <tr key={pickup._id}>
                <td>{pickup.clientName}</td>
                <td>
                  {pickup.orderId?.customerName} - {pickup.orderId?.product}
                </td>
                <td>{new Date(pickup.pickupDate).toLocaleDateString()}</td>
                <td>{pickup.pickupTime}</td>
                <td>{pickup.truckAssigned}</td>
                <td>{pickup.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No pickups scheduled
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
