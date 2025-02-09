import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const articles = [
  {
    title: "12 Coronavirus Myths and Facts You Should Be Aware Of",
    author: "Dr. Diana Borgio",
    img: "/images/article1.jpg",
    link: "/articles/coronavirus-myths"
  },
  {
    title: "Eating Right to Build Immunity Against Cold and Viral Infections",
    author: "Dr. Diana Borgio",
    img: "/images/article2.jpg",
    link: "/articles/eating-right"
  }
];

const ArticlesSection = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Health Articles</h2>
      <Row>
        {articles.map((article, index) => (
          <Col key={index} md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={article.img}
                alt={article.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>By {article.author}</Card.Text>
                <Button variant="outline-primary" href={article.link}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticlesSection;
