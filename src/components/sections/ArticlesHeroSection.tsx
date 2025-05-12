import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const ArticlesHeroSection = () => {
  return (
    <motion.header
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      className="container pt-48 pb-8"
    >
      <h1 className="text-4xl md:text-5xl font-montserrat font-bold leading-tight mb-4">
        Tous les articles
      </h1>
      <p className="text-tertiary text-lg max-w-3xl">
        Explorez notre collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel.
      </p>
    </motion.header>
  );
};