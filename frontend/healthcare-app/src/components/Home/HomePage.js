import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import ConsultationSection from './ConsultationSection';
import SpecialistSection from './SpecialistSection';
import ArticlesSection from './ArticlesSection';
import TestimonialsSection from './TestimonialsSection';
import DownloadAppSection from './DownloadAppSection';
import Footer from './Footer';

export default function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <ConsultationSection />
      <SpecialistSection />
      {/* <ArticlesSection /> */}
      <TestimonialsSection />
      {/* <DownloadAppSection /> */}
      <Footer />
    </div>
  )
}
