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
      className="relative min-h-[60vh] flex items-center pt-32 pb-20"
    >
      {/* Background Image & Effects */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
          alt="Articles Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          {/* Category Badge */}
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
            <span className="relative inline-block px-6 py-3 bg-black rounded-full text-white font-medium">
              Notre collection d'articles
            </span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Des articles qui{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">
              inspirent et transforment
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl">
            Explorez notre collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel.
            Des insights stratégiques aux histoires inspirantes.
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default ArticlesHeroSection;