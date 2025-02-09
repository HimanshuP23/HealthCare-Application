import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

const DownloadAppSection = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your SMS/link logic here
    alert(`App download link sent to ${phone}`);
  };

  return (
    <Container fluid className="py-5" style={{ background: "#f8f9fa" }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-3">
            <h2>Download the Practo App</h2>
            <p>
              Access video consultation with India’s top doctors on the Practo
              app.
            </p>
            <Form onSubmit={handleSubmit} className="d-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="+91 Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="me-2"
                required
              />
              <Button variant="primary" type="submit">
                Get the link
              </Button>
            </Form>
          </Col>
          <Col md={6} className="text-center">
            <Image src="/images/app-mockup.png" alt="Practo App" fluid />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default DownloadAppSection;
