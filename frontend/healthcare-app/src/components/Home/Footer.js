import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import '../../css/HomePage.css';

const Footer = () => {
  return (
    <footer className="text-light py-4 modern-footer" style={{ width: '100%' }}>
       <Container fluid style={{ 
        paddingTop: '1%',
        paddingBottom: '1%',
        maxWidth: '100%',
        margin: 0 
      }}>
        <Row>
          <Col md={3} sm={6} xs={12}>
            <h5>CareBuddy</h5>
            <Nav className="flex-column">
              <Nav.Link href="/about" className="text-light footer-link">
                About
              </Nav.Link>
              <Nav.Link href="/careers" className="text-light footer-link">
                Careers
              </Nav.Link>
              <Nav.Link href="/contact" className="text-light footer-link">
                Contact Us
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>For Patients</h5>
            <Nav className="flex-column">
              <Nav.Link href="/find-doctors" className="text-light footer-link">
                Search for Doctors
              </Nav.Link>
              <Nav.Link href="/clinics" className="text-light footer-link">
                Search for Clinics
              </Nav.Link>
              <Nav.Link href="/hospitals" className="text-light footer-link">
                Search for Hospitals
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>For Doctors</h5>
            <Nav className="flex-column">
              <Nav.Link href="/practo-profile" className="text-light footer-link">
                Practo Profile
              </Nav.Link>
              <Nav.Link href="/for-clinics" className="text-light footer-link">
                For Clinics
              </Nav.Link>
              <Nav.Link href="/for-hospitals" className="text-light footer-link">
                For Hospitals
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>More</h5>
            <Nav className="flex-column">
              <Nav.Link href="/help" className="text-light footer-link">
                Help
              </Nav.Link>
              <Nav.Link href="/privacy" className="text-light footer-link">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="/terms" className="text-light footer-link">
                Terms & Conditions
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center" style={{paddingTop: '1rem'}}>
            <p>&copy; 2025 CareBuddy. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
