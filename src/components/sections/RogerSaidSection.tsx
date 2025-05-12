import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { QuoteBlock } from '../common/QuoteBlock';

export const RogerSaidSection = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <QuoteBlock
          quote="Le succès n'est pas une destination, c'est un voyage constant d'apprentissage et de dépassement de soi."
        />
        <div>
          <span className="inline-block px-3 py-1 bg-accent-blue text-white text-sm font-inter uppercase tracking-wider rounded-full mb-4">
            Dernière tribune
          </span>
          <h3 className="text-2xl font-bold mb-4">
            L'innovation frugale : une nécessité pour 2024
          </h3>
          <p className="text-tertiary mb-6">
            Dans un monde en constante mutation, l'innovation frugale n'est plus une option
            mais une nécessité. Découvrez pourquoi cette approche redéfinit les règles du
            jeu entrepreneurial.
          </p>
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-turquoise transition-colors"
          >
            <span>Voir tous les articles</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};