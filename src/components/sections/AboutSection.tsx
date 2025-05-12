import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="container text-center pb-20">
      <p className="text-xl text-tertiary mb-4">
        Un média indépendant porté par une voix singulière.
      </p>
      <Link
        to="/about"
        className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-turquoise transition-colors"
      >
        <span>En savoir plus sur Roger</span>
        <ArrowRight size={18} />
      </Link>
    </section>
  );
};