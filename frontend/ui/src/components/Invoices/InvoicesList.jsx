// src/components/invoices/InvoicesList.jsx
import React, { useEffect, useState } from "react";

export default function InvoicesList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/invoices`);
        const data = await res.json();
        if (data.success) {
          setInvoices(data.invoices || []);
        } else {
          console.error("Failed to fetch invoices:", data.error);
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [API_URL]);

  return (
    <div className="container mt-4">
      <h2 className="text-success mb-3">Invoices</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Created At</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total (LKR)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((inv) => (
                <tr key={inv._id}>
                  <td>{new Date(inv.createdAt).toLocaleString()}</td>
                  <td>{inv.customerName}</td>
                  <td>{inv.product}</td>
                  <td>{inv.quantity}</td>
                  <td>{typeof inv.totalAmount === "number" ? `LKR ${inv.totalAmount.toLocaleString()}` : "-"}</td>
                  <td>
                    <a
                      href={`${API_URL}/api/orders/${inv.orderId}/invoice`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-success"
                    >
                      Download Invoice
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No invoices yet</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
