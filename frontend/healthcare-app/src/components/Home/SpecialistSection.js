import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoginModal from './SignIn'; // Import the Login Modal
import '../../css/HomePage.css';

const specialists = [
  { title: "Dentist", img: "/images/specialist_dentist.jpg" },
  { title: "Gynecologist/Obstetrician", img: "/images/specialist_gynecologist.jpg" },
  { title: "Dietitian/Nutritionist", img: "/images/specialist_dietitian.jpg" },
  { title: "Physiotherapist", img: "/images/specialist_physiotherapist.jpg" }
];

const SpecialistSection = () => {
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

  // Handle Explore button click
  const handleExploreClick = () => {
    if (!isAuthenticated) {
      setShowLogin(true); // Show the login modal if not authenticated
    } else {
      navigate('/find-doctors'); // Navigate to Find Doctors page if authenticated
    }
  };

  return (
    <Container fluid className="py-5 modern-specialist gradient-background" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
      <h2 className="text-center mb-4 component-title">Specialists</h2>
      <Row>
        {specialists.map((item, index) => (
          <Col key={index} md={3} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm text-center modern-card">
              <Card.Img
                variant="top"
                src={item.img}
                alt={item.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Button variant="primary" onClick={handleExploreClick}>
                  Explore
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Include the Login Modal */}
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </Container>
  );
};

export default SpecialistSection;
