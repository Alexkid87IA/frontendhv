import React from 'react';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { CreateWithRogerHeroSection } from '../components/sections/CreateWithRogerHeroSection';
import { CreateWithRogerShowreelSection } from '../components/sections/CreateWithRogerShowreelSection';
import { CreateWithRogerFeaturesSection } from '../components/sections/CreateWithRogerFeaturesSection';
import { CreateWithRogerResultsSection } from '../components/sections/CreateWithRogerResultsSection';
import { CreateWithRogerProcessSection } from '../components/sections/CreateWithRogerProcessSection';
import { CreateWithRogerTestimonialsSection } from '../components/sections/CreateWithRogerTestimonialsSection';
import { CreateWithRogerOffersSection } from '../components/sections/CreateWithRogerOffersSection';
import { CreateWithRogerBookingSection } from '../components/sections/CreateWithRogerBookingSection';

export const CreateWithRogerPage = () => {
  return (
    <div className="pb-20">
      <CreateWithRogerHeroSection />
      <CreateWithRogerShowreelSection />
      <CreateWithRogerFeaturesSection />
      <CreateWithRogerResultsSection />
      <CreateWithRogerProcessSection />
      <CreateWithRogerTestimonialsSection />
      <CreateWithRogerOffersSection />
      <CreateWithRogerBookingSection />

      {/* Newsletter */}
      <section className="container">
        <NewsletterForm />
      </section>
    </div>
  );
};