import React, { useState, useEffect } from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ConsultationSection from './ConsultationSection';
import SpecialistSection from './SpecialistSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';
import LoginModal from './SignIn';

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLogin(true); // Show login modal if user is not logged in
    }
  }, []);

  return (
    <div>
      <Header />
      <HeroSection />
      <ConsultationSection />
      <SpecialistSection />
      <TestimonialsSection />
      <Footer />

      {/* Login Modal */}
      <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} />
    </div>
  );
}
