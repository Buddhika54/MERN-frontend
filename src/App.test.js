// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout & Pages
import Layout from "./components/Layout";
import IMDashboard from "./pages/IMDashboard";
import IMInventoryList from "./pages/IMInventoryList";
import IMAddEditItem from "./pages/IMAddEditItem";
import IMInventoryFlow from "./pages/IMInventoryFlow";
import IMMonthlyReport from "./pages/IMMonthlyReport";
import IMLogin from "./pages/IMLogin";
// import IMNotifications from "./pages/IMNotifications"; // Uncomment if created

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page has no sidebar/header */}
        <Route path="/login" element={<IMLogin />} />

        {/* All other pages are inside the Layout (with sidebar & header) */}
        <Route element={<Layout />}>
          <Route path="/" element={<IMDashboard />} />
          <Route path="/inventory" element={<IMInventoryList />} />
          <Route path="/inventory/add" element={<IMAddEditItem />} />
          <Route path="/inventory/edit/:id" element={<IMAddEditItem />} />
          <Route path="/inventory-flow" element={<IMInventoryFlow />} />
          <Route path="/monthly-report" element={<IMMonthlyReport />} />
          {/* <Route path="/notifications" element={<IMNotifications />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
