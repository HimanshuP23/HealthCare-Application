import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginModal from './SignIn'; // Import the Login Modal
import '../../css/HomePage.css';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication status
  const [showLogin, setShowLogin] = useState(false); // State to control LoginModal

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Consult Now button click
  const handleConsultNowClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true); // Show the login modal if not authenticated
    } else {
      navigate('/find-doctors'); // Navigate to Find Doctors page if authenticated
    }
  };

  return (
    <Container fluid className="bg-light py-5 modern-hero">
      <Row className="align-items-center">
        <Col
          md={6}
          style={{ textAlign: "center", paddingLeft: "10rem" }}
          className="text-center text-md-start"
        >
          <h1>Consult Top Doctors Online</h1>
          <p>
            Private online consultations with verified doctors across all
            specialties.
          </p>
          <Button variant="primary" size="lg" onClick={handleConsultNowClick}>
            Consult Now
          </Button>
        </Col>
        <Col md={6}>
          <Image
            style={{ width: "40%", borderRadius: "1rem" }}
            src="/images/hero-image.jpg"
            fluid
            alt="Hero"
          />
        </Col>
      </Row>

      {/* Include the Login Modal */}
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </Container>
  );
};

export default HeroSection;
