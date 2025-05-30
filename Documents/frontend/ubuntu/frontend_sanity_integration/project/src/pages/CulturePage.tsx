import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { CultureHeroSection } from '../components/sections/CultureHeroSection';
import { CultureDomainsSection } from '../components/sections/CultureDomainsSection';
import { CultureFeaturedSection } from '../components/sections/CultureFeaturedSection';
import { CultureVideosSection } from '../components/sections/CultureVideosSection';
import { CultureRecommendationsSection } from '../components/sections/CultureRecommendationsSection';

export const CulturePage = () => {
  return (
    <>
      <SEO
        title="Culture & Société | Décryptage des mutations contemporaines"
        description="Explorez les tendances culturelles et les mouvements qui façonnent notre société. Art, littérature, musique et transformations sociales."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        <CultureHeroSection />
        <CultureDomainsSection />
        <CultureFeaturedSection />
        <CultureVideosSection />
        <CultureRecommendationsSection />

        {/* Quote Section */}
        <section className="container mb-20">
          <QuoteBlock
            quote="La culture n'est pas un luxe, c'est une nécessité. Elle nous permet de comprendre qui nous sommes et où nous allons."
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

export default CulturePage;