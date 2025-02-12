import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token from localStorage
    navigate("/"); // Redirect to sign-in page
  };

  const toHome = () => {
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light"> {/* Light theme */}
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold ps-4 fs-4" to="/" style={{fontFamily:"cursive", color:"rgb(4, 152, 179)"}}> {/* Brand styling */}
          HealthCare Application
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
              <button 
                className="nav-link btn btn-outline-primary fw-semibold"
                style={{marginRight: '20px'}} 
                onClick={toHome}
              >
                Home
              </button>
            <li className="nav-item">
              <button 
                className="nav-link btn btn-outline-primary fw-semibold" 
                style={{marginRight: '20px'}}
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;