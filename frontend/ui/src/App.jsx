// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiFetch } from "./utils/api";

// Layout
import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Orders
import OrdersList from "./components/Orders/OrdersList";
import OrderForm from "./components/Orders/OrderForm";
import OrderDetails from "./components/Orders/OrderDetails";

// Pickups
import PickupsList from "./components/Pickups/PickupsList";
import PickupForm from "./components/Pickups/PickupForm";

// Auctions
import AuctionsList from "./components/Auctions/AuctionsList";
import AuctionForm from "./components/Auctions/AuctionForm";

// Invoices
import InvoicesList from "./components/Invoices/InvoicesList";
import InvoiceForm from "./components/Invoices/InvoiceForm";

// Accessories
import Accessories from "./components/Accessories/Accessories";

// Admin Sales
import Sales from "./components/Admin/Sales";

// Customer customer
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerAuctions from "./pages/customer/CustomerAuctions";
import CustomerSales from "./pages/customer/CustomerSales";

function AppInner() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const data = await apiFetch("/api/orders");
      if (data && data.success) {
        setOrders(data.orders);
      } else {
        const msg = (data && data.error) || "Failed to fetch orders";
        console.error("Failed to fetch orders:", msg);
        toast.error(msg);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error(err.message || "Network error while fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover />
      <Routes>
        {/* Redirect root and legacy paths */}
        <Route path="/" element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="/orders/*" element={<Navigate to="/admin/orders" replace />} />
        <Route path="/pickups/*" element={<Navigate to="/admin/pickups" replace />} />
        <Route path="/auctions/*" element={<Navigate to="/admin/auctions" replace />} />
        <Route path="/invoices/*" element={<Navigate to="/admin/invoices" replace />} />
        <Route path="/accessories" element={<Navigate to="/customer/accessories" replace />} />
        {/* Admin area */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Sales />} />
          <Route path="orders" element={<OrdersList orders={orders} refreshOrders={fetchOrders} />} />
          <Route path="orders/new" element={<OrderForm refreshOrders={fetchOrders} />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="pickups" element={<PickupsList orders={orders} />} />
          <Route path="pickups/new" element={<PickupForm orders={orders} />} />
          <Route path="auctions" element={<AuctionsList />} />
          <Route path="auctions/new" element={<AuctionForm />} />
          <Route path="invoices" element={<InvoicesList />} />
          <Route path="invoices/new" element={<InvoiceForm />} />
          <Route path="sales" element={<Sales />} />
        </Route>

        {/* Customer area */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="auctions" element={<CustomerAuctions />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="sales" element={<CustomerSales />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
