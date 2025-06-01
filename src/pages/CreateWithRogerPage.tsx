import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { CreateWithRogerHeroSection } from '../components/sections/CreateWithRogerHeroSection';
import { CreateWithRogerShowreelSection } from '../components/sections/CreateWithRogerShowreelSection';
import { CreateWithRogerFeaturesSection } from '../components/sections/CreateWithRogerFeaturesSection';
import { CreateWithRogerProcessSection } from '../components/sections/CreateWithRogerProcessSection';
import { CreateWithRogerTestimonialsSection } from '../components/sections/CreateWithRogerTestimonialsSection';
import { CreateWithRogerOffersSection } from '../components/sections/CreateWithRogerOffersSection';
import { CreateWithRogerResultsSection } from '../components/sections/CreateWithRogerResultsSection';
import { CreateWithRogerBookingSection } from '../components/sections/CreateWithRogerBookingSection';

export const CreateWithRogerPage = () => {
  return (
    <>
      <SEO
        title="Créer avec Roger | Production de contenu premium"
        description="Une expérience de création unique avec Roger pour transformer votre expertise en contenu professionnel qui attire, engage et convertit."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        {/* Section 1: Hero - Introduction visuelle */}
        <CreateWithRogerHeroSection />
        
        {/* Section 2: Showreel - Démonstration visuelle */}
        <CreateWithRogerShowreelSection />
        
        {/* Section 3: Features - Services proposés */}
        <CreateWithRogerFeaturesSection />
        
        {/* Section 4: Process - Méthodologie en 4 étapes */}
        <CreateWithRogerProcessSection />
        
        {/* Section 5: Testimonials - Témoignages clients */}
        <CreateWithRogerTestimonialsSection />
        
        {/* Section 6: Results - Résultats et métriques */}
        <CreateWithRogerResultsSection />
        
        {/* Section 7: Offers - Offre détaillée */}
        <CreateWithRogerOffersSection />
        
        {/* Section 8: Booking - Réservation */}
        <CreateWithRogerBookingSection />

        {/* Section 9: Newsletter - Inscription */}
        <section className="container">
          <NewsletterForm />
        </section>
      </div>
    </>
  );
};

export default CreateWithRogerPage;