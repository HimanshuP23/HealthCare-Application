import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../css/HomePage.css';

const Header = () => {
  const navigate = useNavigate();
  
  // State to manage authentication status and role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  // Logout handler: removes stored token/role and redirects
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    // Redirect to a public route (or refresh the current page)
    navigate('/'); 
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm modern-header">
      <Container>
        <Navbar.Brand href="/">CareBuddy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/find-doctors">Find Doctors</Nav.Link>
            {/* Conditionally show dashboard links based on the role */}
            {isAuthenticated && role === 'ADMIN' && (
              <Nav.Link href="/admin/home">Admin Dashboard</Nav.Link>
            )}
            {isAuthenticated && role === 'DOCTOR' && (
              <Nav.Link href="/doctor/dashboard">Doctor Dashboard</Nav.Link>
            )}
            {/* Show Logout when authenticated, otherwise Login/Signup */}
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/signin">Login / Signup</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
