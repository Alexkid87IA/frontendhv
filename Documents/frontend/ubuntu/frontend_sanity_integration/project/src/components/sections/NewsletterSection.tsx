import React from 'react';
import { NewsletterForm } from '../common/NewsletterForm';

export const NewsletterSection = () => {
  return (
    <section className="container">
      <div className="bg-neutral-900 p-8 md:p-12 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Chaque semaine, Roger vous écrit.
          </h2>
          <p className="text-xl text-tertiary mb-8">
            Pas pour faire du bruit, mais pour semer des idées.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
};