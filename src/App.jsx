import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import MakeDelivery from "./deliveries/MakeDelivery";
import DeliveryList from "./deliveries/DeliveryList";
import DeliveryEdit from "./deliveries/DeliveryEdit";
import DeliveryDashboard from "./deliveries/DeliveryDashboard";
import DriversPage from "./deliveries/DriversPage";
import VehiclesPage from "./deliveries/VehiclesPage";
import ReportsPage from "./deliveries/ReportsPage";
import NotificationsPage from "./deliveries/NotificationsPage";
import ProfilePage from "./deliveries/ProfilePage";
import RoutesPage from "./deliveries/RoutesPage";

// Layout components
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <Routes>
              <Route path="/" element={<DeliveryList />} />
              <Route path="/dashboard" element={<DeliveryDashboard />} />
              <Route path="/make-delivery" element={<MakeDelivery />} />
              <Route path="/drivers" element={<DriversPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/deliveries/edit/:id" element={<DeliveryEdit />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
