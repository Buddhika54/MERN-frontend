// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import SupplierPortalDashboard from "./pages/SupplierPortalDashboard";
import SupplierLogin from "./pages/SupplierLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SupplierRegister from "./pages/SupplierRegister";
import Layout from "./components/Layout";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

// Protected route component
const ProtectedRoute = ({ element, requiredRole }) => {
  const { currentUser, isAdmin, isSupplier } = useAuth();
  
  if (!currentUser) {
    // Not logged in
    return <Navigate to={requiredRole === 'supplier' ? '/supplier-login' : '/login'} />;
  }
  
  // Check if user has required role
  if (requiredRole === 'admin' && !isAdmin()) {
    return <Navigate to="/supplier-portal" />;
  }
  
  if (requiredRole === 'supplier' && !isSupplier()) {
    return <Navigate to="/" />;
  }
  
  return element;
};

function AppRoutes() {
  const { isAdmin, isSupplier } = useAuth();
  
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/supplier-login" element={<SupplierLogin />} />
        <Route path="/supplier-register" element={<SupplierRegister />} />
        
        {/* Choose homepage based on role */}
        <Route 
          path="/" 
          element={
            isSupplier() ? <Navigate to="/supplier-portal" /> : 
            isAdmin() ? <Layout><Dashboard /></Layout> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Admin Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} requiredRole="admin" />} />
          <Route path="/inventory-list" element={<ProtectedRoute element={<InventoryList />} requiredRole="admin" />} />
          <Route path="/inventory-flow" element={<ProtectedRoute element={<InventoryFlow />} requiredRole="admin" />} />
          <Route path="/reorders" element={<ProtectedRoute element={<Reorders />} requiredRole="admin" />} />
          <Route path="/monthly-report" element={<ProtectedRoute element={<MonthlyReport />} requiredRole="admin" />} />
          <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} requiredRole="admin" />} />
          
          <Route path="/suppliers" element={<ProtectedRoute element={<Suppliers />} requiredRole="admin" />} />
          <Route path="/suppliers/dashboard" element={<ProtectedRoute element={<SupplierDashboard />} requiredRole="admin" />} />
          <Route path="/suppliers/manage" element={<ProtectedRoute element={<SupplierManagement />} requiredRole="admin" />} />
          <Route path="/suppliers/orders" element={<ProtectedRoute element={<PurchaseOrders />} requiredRole="admin" />} />
          
          <Route path="/warehouses" element={<ProtectedRoute element={<Warehouses />} requiredRole="admin" />} />
          <Route path="/tea-varieties" element={<ProtectedRoute element={<TeaVarieties />} requiredRole="admin" />} />
        </Route>
        
        {/* Supplier Routes */}
        <Route path="/supplier-portal" element={<ProtectedRoute element={<SupplierPortalDashboard />} requiredRole="supplier" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
