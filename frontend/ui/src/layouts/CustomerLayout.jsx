// src/layouts/CustomerLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopNav from "../components/ui/TopNav";
import CustomerSidebar from "../components/ui/CustomerSidebar";

export default function CustomerLayout() {
  const location = useLocation();
  const accessoriesPage = location.pathname.startsWith("/customer/accessories");
  return (
    <>
      <TopNav />
      <div className="flex">
        <CustomerSidebar />
        <main
          className="main-container flex-1"
          style={accessoriesPage ? { background: "transparent", boxShadow: "none" } : undefined}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
