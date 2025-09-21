import React from "react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdShoppingCart, MdLocalShipping, MdGavel, MdReceiptLong, MdLocalMall } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Sales, Orders and Dispatch</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdDashboard className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdShoppingCart className="me-2" /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pickups"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdLocalShipping className="me-2" /> Pickups
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/auctions"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdGavel className="me-2" /> Auctions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/customer/auctions"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdGavel className="me-2" /> Customer Auctions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdLocalMall className="me-2" /> Tea Accessories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/invoices"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <MdReceiptLong className="me-2" /> Invoices
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
