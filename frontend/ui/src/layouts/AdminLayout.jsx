// src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/ui/TopNav";
import Sidebar from "../components/ui/Sidebar";

export default function AdminLayout() {
  return (
    <>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <main className="main-container flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
}
