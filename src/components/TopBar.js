import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <span className="welcome-text">Welcome, Admin</span>
      {/* Profile icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-person-circle"
        viewBox="0 0 16 16"
      >
        <path d="M13.468 12.37C12.758 11.226 11.486 10.5 10 10.5H6c-1.486 0-2.758.726-3.468 1.87A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
        <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z" />
      </svg>
    </div>
  );
};

export default TopBar;
