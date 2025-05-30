import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { MindsetHeroSection as MentalHeroSection } from '../components/sections/MindsetHeroSection';
import { MindsetPillarsSection as MentalPillarsSection } from '../components/sections/MindsetPillarsSection';
import { MindsetFeaturedSection as MentalFeaturedSection } from '../components/sections/MindsetFeaturedSection';
import { MindsetVideosSection as MentalVideosSection } from '../components/sections/MindsetVideosSection';
import { MindsetExercisesSection as MentalExercisesSection } from '../components/sections/MindsetExercisesSection';

export const MentalPage = () => {
  return (
    <>
      <SEO
        title="Mental | Développez un mental de champion"
        description="Découvrez les clés mentales qui font la différence entre réussite et échec. Stratégies mentales, résilience et développement personnel."
        image="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        <MentalHeroSection />
        <MentalPillarsSection />
        <MentalFeaturedSection />
        <MentalExercisesSection />
        <MentalVideosSection />

        {/* Quote Section */}
        <section className="container mb-20">
          <QuoteBlock
            quote="Le succès n'est pas une destination, c'est un voyage constant d'apprentissage et de dépassement de soi."
            author="Roger Ormières"
          />
        </section>

        {/* Newsletter */}
        <section className="container">
          <NewsletterForm />
        </section>
      </div>
    </>
  );
};

export default MentalPage;
