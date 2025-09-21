// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InventoryList from "./pages/InventoryList";
import InventoryFlow from "./pages/InventoryFlow";
import Reorders from "./pages/Reorders";
import MonthlyReport from "./pages/MonthlyReport";
import Notifications from "./pages/Notifications";
import Suppliers from "./pages/Suppliers";
import SupplierDashboard from "./pages/SupplierDashboard";
import SupplierManagement from "./pages/SupplierManagement";
import PurchaseOrders from "./pages/PurchaseOrders";
import Warehouses from "./pages/Warehouses";
import TeaVarieties from "./pages/TeaVarieties";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory-list" element={<InventoryList />} />
          <Route path="/inventory-flow" element={<InventoryFlow />} />
          <Route path="/reorders" element={<Reorders />} />
          <Route path="/monthly-report" element={<MonthlyReport />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Supplier Routes */}
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/dashboard" element={<SupplierDashboard />} />
          <Route path="/suppliers/manage" element={<SupplierManagement />} />
          <Route path="/suppliers/orders" element={<PurchaseOrders />} />
          
          <Route path="/warehouses" element={<Warehouses />} />
          <Route path="/tea-varieties" element={<TeaVarieties />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
