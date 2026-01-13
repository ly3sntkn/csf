import React from 'react';
import HeroBanner from '../components/HeroBanner';
import KeyMetrics from '../components/KeyMetrics';
import PartnersSection from '../components/PartnersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const AccueilPage = () => {
  return (
    <div className="relative">
      <HeroBanner />
      <KeyMetrics />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default AccueilPage;