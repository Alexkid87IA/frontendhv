import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { MindsetHeroSection as PsychologieHeroSection } from '../components/sections/MindsetHeroSection';
import { MindsetPillarsSection as PsychologiePillarsSection } from '../components/sections/MindsetPillarsSection';
import { MindsetFeaturedSection as PsychologieFeaturedSection } from '../components/sections/MindsetFeaturedSection';
import { MindsetVideosSection as PsychologieVideosSection } from '../components/sections/MindsetVideosSection';
import { MindsetExercisesSection as PsychologieExercisesSection } from '../components/sections/MindsetExercisesSection';

export const PsychologiePage = () => {
  return (
    <>
      <SEO
        title="Psychologie | Développez une psychologie de champion"
        description="Découvrez les clés psychologiques qui font la différence entre réussite et échec. Stratégies mentales, résilience et développement personnel."
        image="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        <PsychologieHeroSection />
        <PsychologiePillarsSection />
        <PsychologieFeaturedSection />
        <PsychologieExercisesSection />
        <PsychologieVideosSection />

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

export default PsychologiePage;