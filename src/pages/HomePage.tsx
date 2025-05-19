import React from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { AmuseBoucheSection } from '../components/sections/AmuseBoucheSection';
import { HomeArticlesSection } from '../components/sections/HomeArticlesSection';
import { EditorialSection } from '../components/sections/EditorialSection';
import { DebateSection } from '../components/sections/DebateSection';
import ContentSection from '../components/sections/ContentSection';

export const HomePage = () => {
  return (
    <>
      <SEO {...staticSEO.home} />
      <div className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative space-y-16 md:space-y-24 lg:space-y-32">
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
