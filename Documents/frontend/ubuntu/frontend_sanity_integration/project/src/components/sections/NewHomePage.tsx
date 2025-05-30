import React from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';

// Nouveaux composants pour la homepage modernisée
import { HeroImmersiveSection } from '../components/sections/HeroImmersiveSection';
import { FeaturedArticlesSection } from '../components/sections/FeaturedArticlesSection';
import { ExploreUniversesSection } from '../components/sections/ExploreUniversesSection';
import { QuoteOfDaySection } from '../components/sections/QuoteOfDaySection';
import { LatestArticlesSection } from '../components/sections/LatestArticlesSection';
import { WeeklyDebateSection } from '../components/sections/WeeklyDebateSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';

export const NewHomePage = () => {
  return (
    <>
      <SEO {...staticSEO.home} />
      
      {/* Conteneur principal avec effets d'arrière-plan */}
      <div className="relative min-h-screen">
        {/* Effets d'arrière-plan */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          
          {/* Particules animées (optionnel) */}
          <div className="particles-container" id="particles-js"></div>
        </div>

        {/* Contenu de la page */}
        <div className="relative z-10 space-y-24 md:space-y-32 lg:space-y-40">
          {/* Section Héro Immersive */}
          <HeroImmersiveSection />
          
          {/* Section Articles à la Une */}
          <FeaturedArticlesSection />
          
          {/* Section Explorer nos univers */}
          <ExploreUniversesSection />
          
          {/* Section Citation du Jour */}
          <QuoteOfDaySection />
          
          {/* Section Derniers Articles */}
          <LatestArticlesSection />
          
          {/* Section Débat de la Semaine */}
          <WeeklyDebateSection />
          
          {/* Section Newsletter */}
          <NewsletterSection />
          
          {/* Espace pour le footer */}
          <div className="h-16"></div>
        </div>
      </div>
    </>
  );
};

export default NewHomePage;
