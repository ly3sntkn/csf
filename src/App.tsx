import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import WhatsAppButton from './components/WhatsAppButton';

// Lazy load pages
const AccueilPage = React.lazy(() => import('./pages/AccueilPage'));
const EnvoiColisPage = React.lazy(() => import('./pages/EnvoiColisPage'));
const DemenagementPage = React.lazy(() => import('./pages/DemenagementPage'));
const AchatLivraisonPage = React.lazy(() => import('./pages/AchatLivraisonPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));

// Loading component
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');

  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail);
      // Scroll to top when navigating to a new page
      window.scrollTo(0, 0);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Also scroll to top when currentPage changes directly
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <AccueilPage />;
      case 'envoi-colis':
        return <EnvoiColisPage />;
      case 'demenagement':
        return <DemenagementPage />;
      case 'achat-livraison':
        return <AchatLivraisonPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <AccueilPage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <CookieBanner />
      <WhatsAppButton />
    </div>
  );
}

export default App;