import React from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { AmuseBoucheSection } from '../components/sections/AmuseBoucheSection';
import { HomeArticlesSection } from '../components/sections/HomeArticlesSection';
import { EditorialSection } from '../components/sections/EditorialSection';
import { DebateSection } from '../components/sections/DebateSection';
import ContentSection from '../components/sections/ContentSection';
import SimpleFooter from '../components/layout/SimpleFooter';

export const HomePage = () => {
  return (
    <>
      <SEO {...staticSEO.home} />
      {/* Contenu */}
      <div className="relative space-y-16 md:space-y-24 lg:space-y-32">
        {/* Effets d'arrière-plan déplacés pour ne pas interférer avec le footer */}
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Sections de contenu */}
        <HeroSection />
        <AmuseBoucheSection />
        <HomeArticlesSection />
        <EditorialSection />
        <ContentSection 
          title="L'émission"
          description="Des conversations authentiques avec ceux qui façonnent le monde de demain"
          sectionType="emission"
        />
        <ContentSection 
          title="Business Idea"
          description="Découvrez les stratégies et idées qui transforment le monde des affaires"
          sectionType="business-idea"
        />
        <ContentSection 
          title="Success Story"
          description="Parcours inspirants d'entrepreneurs qui ont réussi à concrétiser leur vision"
          sectionType="success-story"
        />
        <DebateSection />
        
        {/* Espace supplémentaire pour garantir que le footer est visible */}
        <div className="h-16"></div>
        
        {/* Ajout explicite du SimpleFooter directement dans la HomePage */}
        <SimpleFooter />
      </div>
    </>
  );
};

export default HomePage;
