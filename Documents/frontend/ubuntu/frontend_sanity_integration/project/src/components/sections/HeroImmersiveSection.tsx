import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Composant pour la section héro immersive
export const HeroImmersiveSection = () => {
  // Animation pour le titre
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation pour le badge de catégorie
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Animation pour le bouton CTA
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(0, 164, 249, 1)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Overlay de l'image avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-r from-hv-dark/90 to-hv-dark/60 z-10"></div>
      
      {/* Image d'arrière-plan */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Article à la une" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Contenu */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
            className="inline-block mb-6"
          >
            <span className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
              MENTAL
            </span>
          </motion.div>
          
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Redéfinir le succès : <br />
            <span className="text-blue-400">trouver sa propre voie</span>
          </motion.h1>
          
          <motion.p
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
          >
            Découvrez comment les nouveaux paradigmes du succès transforment notre rapport au travail et à l'accomplissement personnel.
          </motion.p>
          
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="inline-block"
          >
            <Link
              to="/article/redefenir-le-succes"
              className="bg-blue-500/80 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all duration-300"
            >
              Lire l'article
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Indicateur de défilement */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2 
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroImmersiveSection;
