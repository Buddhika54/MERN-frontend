import React, { useState, useEffect } from "react";
import OrderForm from "../../components/Orders/OrderForm";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        alert("❌ Failed to fetch orders: " + data.error);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      alert("❌ Error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleOrderSaved = () => {
    fetchOrders();
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Customer Dashboard</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Create Order
      </button>

      {showForm && (
        <OrderForm onClose={handleFormClose} onSaved={handleOrderSaved} />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Specifications</th>
            <th>Delivery Instructions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.contactNumber || "-"}</td>
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.productSpecs || "-"}</td>
                <td>{order.deliveryInstructions || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
