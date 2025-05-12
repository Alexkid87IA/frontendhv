import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const MindsetHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center pt-48">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80"
          alt="Psychologie"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container relative z-10"
      >
        <span className="inline-block px-4 py-2 bg-accent-blue text-white text-sm font-medium rounded-full mb-6">
          Psychologie
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-6 max-w-3xl">
          Développez une psychologie de champion
        </h1>
        <p className="text-xl text-tertiary max-w-2xl mb-8">
          Découvrez les clés psychologiques qui font la différence entre réussite et échec.
        </p>
      </motion.div>
    </section>
  );
};

export default MindsetHeroSection;