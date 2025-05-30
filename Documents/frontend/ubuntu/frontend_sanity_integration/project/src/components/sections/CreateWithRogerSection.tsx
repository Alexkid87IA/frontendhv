import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CreateWithRogerSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
          alt="Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Toi aussi, passe devant la caméra
          </h2>
          <p className="text-xl text-tertiary mb-8">
            Profite d'un accompagnement personnalisé pour créer du contenu authentique
            et impactant qui te ressemble.
          </p>
          <Link
            to="/create-with-roger"
            className="inline-flex items-center gap-2 bg-accent-violet hover:bg-accent-fuchsia text-white px-6 py-3 rounded-lg transition-colors"
          >
            <span>Découvrir l'expérience</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};