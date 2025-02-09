import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import '../../css/HomePage.css';

const Footer = () => {
  return (
    <footer className="text-light py-4 modern-footer">
      <Container style={{paddingTop: '1%',paddingBottom:'1%'}}>
        <Row>
          <Col md={3} sm={6} xs={12}>
            <h5>CareBuddy</h5>
            <Nav className="flex-column">
              <Nav.Link href="/about" className="text-light">
                About
              </Nav.Link>
              <Nav.Link href="/careers" className="text-light">
                Careers
              </Nav.Link>
              <Nav.Link href="/contact" className="text-light">
                Contact Us
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>For Patients</h5>
            <Nav className="flex-column">
              <Nav.Link href="/find-doctors" className="text-light">
                Search for Doctors
              </Nav.Link>
              <Nav.Link href="/clinics" className="text-light">
                Search for Clinics
              </Nav.Link>
              <Nav.Link href="/hospitals" className="text-light">
                Search for Hospitals
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>For Doctors</h5>
            <Nav className="flex-column">
              <Nav.Link href="/practo-profile" className="text-light">
                Practo Profile
              </Nav.Link>
              <Nav.Link href="/for-clinics" className="text-light">
                For Clinics
              </Nav.Link>
              <Nav.Link href="/for-hospitals" className="text-light">
                For Hospitals
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <h5>More</h5>
            <Nav className="flex-column">
              <Nav.Link href="/help" className="text-light">
                Help
              </Nav.Link>
              <Nav.Link href="/privacy" className="text-light">
                Privacy Policy
              </Nav.Link>
              <Nav.Link href="/terms" className="text-light">
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
