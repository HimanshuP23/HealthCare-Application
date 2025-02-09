import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import '../../css/HomePage.css';

const specialists = [
  { title: "Dentist", img: "/images/specialist_dentist.jpg" },
  { title: "Gynecologist/Obstetrician", img: "/images/specialist_gynecologist.jpg" },
  { title: "Dietitian/Nutritionist", img: "/images/specialist_dietitian.jpg" },
  { title: "Physiotherapist", img: "/images/specialist_physiotherapist.jpg" }
];

const SpecialistSection = () => {
  return (
    <Container fluid className="py-5 modern-specialist gradient-background" style={{paddingLeft: '10%',paddingRight:'10%'}}>
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
                <Button variant="primary">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SpecialistSection;
