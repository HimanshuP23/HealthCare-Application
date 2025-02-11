import React, { useState, useEffect } from "react";
import { Container, Carousel } from "react-bootstrap";
import '../../css/HomePage.css';

const testimonials = [
  {
    name: "Avinash Kumar",
    feedback:
      "Very good app. Well thought out about booking/rescheduling/canceling an appointment. Also, Email/SMS Notification mechanism is good.",
    img: "/images/user1.jpg"
  },
  {
    name: "Anjali Sharma",
    feedback:
      "I had an amazing experience consulting a doctor online. Highly recommend CareBuddy!",
    img: "/images/user2.png"
  }
];

const TestimonialsSection = () => {
  // State to track the currently active index
  const [index, setIndex] = useState(0);

  // useEffect hook to set up the auto-slider timer
  useEffect(() => {
    const timer = setInterval(() => {
      // Update the index; wrap around when reaching the end
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change slide every 3 seconds

    // Clear timer on component unmount
    return () => clearInterval(timer);
  }, []);

  // Handle manual selection (if you want to allow manual changes via indicators)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid className="py-5 modern-testimonials" style={{paddingLeft: '10%',paddingRight:'10%'}}>
      <h2 className="text-center mb-4 component-title">What our users have to say</h2>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        indicators={true}
        ride="carousel"
        interval={null} // Disable built-in auto sliding
      >
        {testimonials.map((testimonial, idx) => (
          <Carousel.Item key={idx}>
            <div
              className="d-flex flex-column align-items-center justify-content-center modern-carousel-item"
              style={{ minHeight: "300px" }}
            >
              <img
                src={testimonial.img}
                alt={testimonial.name}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
                className="mb-3"
              />
              <h5>{testimonial.name}</h5>
              <p className="text-center" style={{ maxWidth: "600px" }}>
                {testimonial.feedback}
              </p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default TestimonialsSection;
