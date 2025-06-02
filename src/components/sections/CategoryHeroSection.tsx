import React from 'react';
import { motion } from 'framer-motion';

interface CategoryHeroSectionProps {
  categorySlug?: string;
}

export const CategoryHeroSection = ({ categorySlug }: CategoryHeroSectionProps) => {
  return (
    <section className="container pt-40 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6">
          {categorySlug?.charAt(0).toUpperCase()}{categorySlug?.slice(1)}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {categorySlug === 'mental' ? 'Développez votre mental de champion' :
           categorySlug === 'business' ? 'Stratégies et innovations business' :
           categorySlug === 'story' ? 'Histoires inspirantes' :
           categorySlug === 'society' ? 'Décryptage de notre époque' :
           'Explorez nos articles'}
        </h1>
        <p className="text-xl text-gray-300">
          {categorySlug === 'mental' ? 'Découvrez les clés mentales qui font la différence entre réussite et échec.' :
           categorySlug === 'business' ? 'Les dernières tendances et stratégies qui façonnent le monde des affaires.' :
           categorySlug === 'story' ? 'Des parcours inspirants qui redéfinissent le possible.' :
           categorySlug === 'society' ? 'Comprendre les mutations qui transforment notre société.' :
           'Une sélection d\'articles pour vous inspirer et vous transformer.'}
        </p>
      </motion.div>
    </section>
  );
};