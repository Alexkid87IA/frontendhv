import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { BusinessHeroSection } from '../components/sections/BusinessHeroSection';
import { BusinessTrendsSection } from '../components/sections/BusinessTrendsSection';
import { BusinessFeaturedSection } from '../components/sections/BusinessFeaturedSection';
import { BusinessCaseStudiesSection } from '../components/sections/BusinessCaseStudiesSection';
import { BusinessVideosSection } from '../components/sections/BusinessVideosSection';
import { BusinessResourcesSection } from '../components/sections/BusinessResourcesSection';

export const BusinessInnovationPage = () => {
  return (
    <>
      <SEO
        title="Business & Innovation | Décryptage des tendances et innovations"
        description="Explorez les nouvelles frontières du business et de l'innovation. Analyses, success stories et insights sur les mutations qui façonnent le monde des affaires."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        <BusinessHeroSection />
        <BusinessTrendsSection />
        <BusinessFeaturedSection />
        <BusinessCaseStudiesSection />
        <BusinessVideosSection />
        <BusinessResourcesSection />

        {/* Quote Section */}
        <section className="container mb-20">
          <QuoteBlock
            quote="L'innovation n'est pas une question de budget, mais de vision et d'audace. Les plus grandes disruptions naissent souvent de contraintes."
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

export default BusinessInnovationPage;