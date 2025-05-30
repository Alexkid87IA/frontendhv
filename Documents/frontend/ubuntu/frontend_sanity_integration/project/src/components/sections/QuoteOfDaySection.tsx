import React from 'react';
import { motion } from 'framer-motion';

export const QuoteOfDaySection = () => {
  // Animation pour la carte de citation
  const quoteCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation pour le texte de citation
  const quoteTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  // Données de la citation du jour
  const quoteData = {
    text: "Il est venu le temps des cathédrales, le monde est entré dans un nouveau millénaire",
    author: "Alex Brinx",
    role: "plombier"
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={quoteCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative">
            {/* Titre de section */}
            <div className="mb-8 flex items-center">
              <div className="w-10 h-1 bg-blue-500 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-white">Citation du Jour</h2>
            </div>
            
            {/* Carte de citation */}
            <div className="bg-hv-card-bg/30 backdrop-blur-md rounded-xl p-8 md:p-10 border border-white/10 shadow-xl">
              {/* Guillemets décoratifs */}
              <div className="absolute top-6 left-6 text-blue-500/20 text-8xl font-serif">
                "
              </div>
              
              <motion.div
                variants={quoteTextVariants}
                className="relative z-10"
              >
                <p className="text-2xl md:text-3xl font-serif text-white mb-8 leading-relaxed">
                  "{quoteData.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                    <span className="text-blue-400 font-bold text-xl">
                      {quoteData.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{quoteData.author}</p>
                    <p className="text-gray-400 text-sm">{quoteData.role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteOfDaySection;
