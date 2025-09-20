import React from "react";
import { Outlet } from "react-router-dom";
import IMSidebar from "./IMSidebar";
import IMHeader from "./IMHeader";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="app-layout">
      <IMSidebar />
      <IMHeader />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
