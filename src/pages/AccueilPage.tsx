import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroBanner from '../components/HeroBanner';
import KeyMetrics from '../components/KeyMetrics';
import PartnersSection from '../components/PartnersSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';

const AccueilPage = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>Accueil - CSF Transport International Europe-Afrique</title>
        <meta name="description" content="Bienvenue chez CSF, votre partenaire de confiance pour le transport international : colis, déménagement et véhicules entre l'Europe et l'Afrique." />
        <link rel="canonical" href="https://csf-transport.com/" />
      </Helmet>
      <HeroBanner />
      <KeyMetrics />
      <PartnersSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default AccueilPage;