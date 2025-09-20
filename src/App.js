import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IMSidebar from "./components/IMSidebar";

// Pages
import IMDashboard from "./pages/IMDashboard";
import Items from "./pages/Items";
import Stock from "./pages/Items"; 
import PRs from "./pages/PRs";
import POs from "./pages/POs";
import InventoryFlow from "./pages/InventoryFlow";
import LowStock from "./pages/LowStock";
import Notifications from "./pages/Notifications";
import Suppliers from "./pages/Suppliers";
import Warehouses from "./pages/Warehouses"; 

function App() {
  return (
    <Router>
      <IMSidebar />
      <Routes>
        <Route path="/" element={<IMDashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/prs" element={<PRs />} />
        <Route path="/pos" element={<POs />} />
        <Route path="/inventory-flow" element={<InventoryFlow />} />
        <Route path="/low-stock" element={<LowStock />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/warehouses" element={<Warehouses />} />
      </Routes>
    </Router>
  );
}

export default App;
