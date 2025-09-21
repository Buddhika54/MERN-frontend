// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiFetch } from "./utils/api";

// Layout
import TopNav from "./components/ui/TopNav";
import Sidebar from "./components/ui/Sidebar";

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

// Customer customer
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerAuctions from "./pages/customer/CustomerAuctions";

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

  const accessoriesPage = location.pathname.startsWith("/accessories");

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} newestOnTop closeOnClick pauseOnHover />
      <TopNav />
      <div className="flex">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area; make transparent on accessories page */}
        <main className="main-container flex-1" style={accessoriesPage ? { background: "transparent", boxShadow: "none" } : undefined}>
          <Routes>
            {/* Orders */}
            <Route
              path="/orders"
              element={<OrdersList orders={orders} refreshOrders={fetchOrders} />}
            />
            <Route
              path="/orders/new"
              element={<OrderForm refreshOrders={fetchOrders} />}
            />
            <Route path="/orders/:id" element={<OrderDetails />} />

            {/* Pickups */}
            <Route path="/pickups" element={<PickupsList orders={orders} />} />
            <Route path="/pickups/new" element={<PickupForm orders={orders} />} />

            {/* Auctions */}
            <Route path="/auctions" element={<AuctionsList />} />
            <Route path="/auctions/new" element={<AuctionForm />} />

            {/* Tea Accessories */}
            <Route path="/accessories" element={<Accessories />} />

            {/* Invoices */}
            <Route path="/invoices" element={<InvoicesList />} />
            <Route path="/invoices/new" element={<InvoiceForm />} />

            {/* Dashboard (optional route) */}
            <Route path="/dashboard" element={<CustomerDashboard />} />
            {/* Customer Auctions */}
            <Route path="/customer/auctions" element={<CustomerAuctions />} />
          </Routes>
        </main>
      </div>
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
