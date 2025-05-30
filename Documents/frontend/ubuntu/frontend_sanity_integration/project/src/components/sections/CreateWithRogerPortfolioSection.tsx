import React from 'react';
import { motion } from 'framer-motion';
import { VideoEmbed } from '../common/VideoEmbed';
import { QuoteBlock } from '../common/QuoteBlock';

export const CreateWithRogerPortfolioSection = () => {
  return (
    <section className="container py-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
          Portfolio
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Nos dernières réalisations
        </h2>
        <p className="text-tertiary text-lg">
          Découvrez la qualité de nos productions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <VideoEmbed
          url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Interview d'entrepreneur"
        />
        <VideoEmbed
          url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Portrait d'expert"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <QuoteBlock
          quote="Une expérience unique qui m'a permis de créer du contenu authentique et professionnel qui me ressemble vraiment."
          author="Marie Durant, CEO"
        />
        <QuoteBlock
          quote="Roger a su capter l'essence de mon message et le transformer en contenu impactant qui convertit."
          author="Thomas Martin, Expert"
        />
        <QuoteBlock
          quote="Un accompagnement complet et personnalisé, du brief à la livraison. Je recommande à 100% !"
          author="Sophie Bernard, Fondatrice"
        />
      </div>
    </section>
  );
};