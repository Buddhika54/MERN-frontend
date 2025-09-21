import React from "react";
import { Link } from "react-router-dom";
import { MdSpa, MdAdminPanelSettings } from "react-icons/md";

export default function TopNav() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#2e7d32", padding: "6px 20px" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-white fw-bold" to="/">
          <span aria-hidden className="me-2" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#ffffff22" }}>
            <MdSpa size={18} />
          </span>
          <span>Auction System</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item d-flex align-items-center">
              <Link className="nav-link text-white fw-semibold d-flex align-items-center" to="/admin/login">
                <MdAdminPanelSettings className="me-2" size={18} /> Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
