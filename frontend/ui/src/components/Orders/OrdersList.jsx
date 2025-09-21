// src/components/Orders/OrdersList.jsx
import React, { useEffect, useState } from "react";
import OrderForm from "../Orders/OrderForm";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

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

  const handleConfirmAndGenerateInvoice = async (order) => {
    try {
      setUpdatingId(order._id);
      const res = await fetch(`${API_URL}/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Confirmed" }),
      });
      const data = await res.json();
      if (data.success) {
        alert("✅ Order confirmed and invoice generated.");
        await fetchOrders();
      } else {
        alert("❌ Failed to confirm order: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error confirming order:", err);
      alert("❌ Error confirming order");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusChange = async (order, nextStatus) => {
    if (!nextStatus || nextStatus === order.status) return;
    try {
      setUpdatingId(order._id);
      const res = await fetch(`${API_URL}/api/orders/${order._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchOrders();
      } else {
        alert("❌ Failed to update status: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFormClose = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleOrderSaved = () => {
    fetchOrders();
    setShowForm(false);
    setEditingOrder(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const res = await fetch(`${API_URL}/api/orders/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.filter((o) => o._id !== id));
      } else {
        alert("❌ Failed to delete order: " + data.error);
      }
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("❌ Error deleting order");
    }
  };

  const handleRowClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Orders</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(true)}
      >
        + Add New Order
      </button>

      {showForm && (
        <OrderForm
          order={editingOrder}
          onClose={handleFormClose}
          onSaved={handleOrderSaved}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-success">
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price (LKR)</th>
            <th>Specifications</th>
            <th>Delivery Instructions</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr
                  onClick={() => handleRowClick(order._id)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.customerName}</td>
                  <td>{order.customerEmail}</td>
                  <td>{order.contactNumber || "-"}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{typeof order.price === "number" ? `LKR ${order.price.toLocaleString()}` : "-"}</td>
                  <td>{order.productSpecs || "-"}</td>
                  <td>{order.deliveryInstructions || "-"}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingOrder(order);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    {(order.status !== "Confirmed" && typeof order.price === "number" && order.price > 0) && (
                      <button
                        className="btn btn-sm btn-success me-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmAndGenerateInvoice(order);
                        }}
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(order._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedOrderId === order._id && (
                  <tr>
                    <td colSpan="10" className="bg-light">
                      <strong>Order Details:</strong>
                      <div>Customer: {order.customerName}</div>
                      <div>Email: {order.customerEmail}</div>
                      <div>Contact: {order.contactNumber || "-"}</div>
                      <div>Product: {order.product}</div>
                      <div>Quantity: {order.quantity}</div>
                      <div>Price: {typeof order.price === "number" ? `LKR ${order.price.toLocaleString()}` : "-"}</div>
                      <div>Specs: {order.productSpecs || "-"}</div>
                      <div>Delivery Instructions: {order.deliveryInstructions || "-"}</div>
                      <div>Status: {order.status}</div>

                      {/* Download Buttons */}
                      <div className="mt-2">
                        {(typeof order.price === "number" && order.price > 0) && (
                          <a
                            href={`${API_URL}/api/orders/${order._id}/invoice`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-success me-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Download Invoice
                          </a>
                        )}
                        <a
                          href={`${API_URL}/api/orders/${order._id}/details-pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Download Order Details
                        </a>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No orders yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
