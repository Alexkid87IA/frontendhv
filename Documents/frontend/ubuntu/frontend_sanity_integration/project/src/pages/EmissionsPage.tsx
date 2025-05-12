import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { EmissionsHeroSection } from '../components/sections/EmissionsHeroSection';
import { EmissionsLatestSection } from '../components/sections/EmissionsLatestSection';
import { EmissionsListSection } from '../components/sections/EmissionsListSection';
import { EmissionsCapsuleSection } from '../components/sections/EmissionsCapsuleSection';

export const EmissionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <>
      <SEO {...staticSEO.emissions} />
      <div className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative pb-20">
          <EmissionsHeroSection />
          <EmissionsLatestSection />
          <EmissionsListSection
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />
          <EmissionsCapsuleSection />

          {/* Newsletter */}
          <section className="container">
            <NewsletterForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default EmissionsPage;