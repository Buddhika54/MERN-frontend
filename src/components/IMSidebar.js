import React from "react";
import { NavLink } from "react-router-dom";
import "./IMSidebar.css";

const IMSidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Items", path: "/items" },
    { name: "Stock", path: "/stock" },
    { name: "Purchase Requests", path: "/prs" },
    { name: "Purchase Orders", path: "/pos" },
    { name: "Inventory Flow", path: "/inventory-flow" },
    { name: "Low Stock Report", path: "/low-stock" },
    { name: "Notifications", path: "/notifications" },
    { name: "Suppliers", path: "/suppliers" },
    { name: "Warehouses", path: "/warehouses" },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        Inventory & Stock <br /> Management
      </h2>
      <ul className="sidebar-menu">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IMSidebar;
