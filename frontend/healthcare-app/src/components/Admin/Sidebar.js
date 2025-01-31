import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Sidebar.css";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{
        width: "250px",
        height: "100vh",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f8f9fa", // Light background
        color: "#343a40", // Dark text for contrast
      }}
    >
      <Link
        to="/admin/home"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
        style={{ color: "#007bff" }} // Blue brand color
      >
        <span className="fs-4 fw-bold" style={{fontFamily: "cursive", color:"rgb(4, 152, 179)" }}>
          Admin Dashboard
        </span>
      </Link>
      <hr style={{ color: "#dee2e6" }} />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/admin/home"
            className="nav-link sidebar-text"
            style={{
            //   backgroundColor: "#007bff", // Blue active background
            //   color: "white",
            }}
          >
            <i className="bi bi-house-door me-2"></i>Home
          </Link>
        </li>
        <li>
          <Link
            to="/admin/users"
            className="nav-link sidebar-text"
            style={{ color: "#343a40" }}
          >
            <i className="bi bi-person-lines-fill me-2"></i>Manage Users
          </Link>
        </li>
        <li>
          <Link
            to="/admin/doctors"
            className="nav-link sidebar-text"
            style={{ color: "#343a40" }}
          >
            <i className="bi bi-person-lines-fill me-2"></i>Manage Doctors
          </Link>
        </li>
        <li>
          <Link
            to="/admin/home"
            className="nav-link sidebar-text"
            style={{ color: "#343a40" }}
          >
            <i className="bi bi-gear-fill me-2"></i>Settings
          </Link>
        </li>
      </ul>
      <hr style={{ color: "#dee2e6" }} />
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle"
          style={{ color: "#343a40", borderColor: "#ced4da" }}
          id="dropdownUser"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <strong>Admin</strong>
        </button>
        <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser">
          <li>
            <Link
              className="dropdown-item"
              to="/settings"
              style={{ color: "#343a40" }}
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => alert("Logging out...")}
              style={{ color: "#343a40" }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
