import React from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { AmuseBoucheSection } from '../components/sections/AmuseBoucheSection'; // Ajout de l'import
import { HomeArticlesSection } from '../components/sections/HomeArticlesSection';
import { EditorialSection } from '../components/sections/EditorialSection';
import { MediaSection } from '../components/sections/MediaSection';
import { DebateSection } from '../components/sections/DebateSection';
import { AboutRogerSection } from '../components/sections/AboutRogerSection';
import { WritersSection } from '../components/sections/WritersSection';
import { CreateWithRogerSection } from '../components/sections/CreateWithRogerSection';
import { RogerSaidSection } from '../components/sections/RogerSaidSection';
import { CulturalSection } from '../components/sections/CulturalSection';
import { NewsletterSection } from '../components/sections/NewsletterSection';
import { AboutSection } from '../components/sections/AboutSection';
import { HomeBusinessIdeasSection } from '../components/sections/HomeBusinessIdeasSection';
import { HomeCaseStudiesSection } from '../components/sections/HomeCaseStudiesSection';
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
          <AmuseBoucheSection /> {/* Ajout de la section Amuse-bouches ici */}
          <HomeArticlesSection />
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
          <HomeBusinessIdeasSection />
          <DebateSection />
          <AboutRogerSection />
          <EditorialSection />
          <HomeCaseStudiesSection />
          <WritersSection />
          <MediaSection />
          <CreateWithRogerSection />
          <RogerSaidSection />
          <CulturalSection />
          <NewsletterSection />
          <AboutSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
