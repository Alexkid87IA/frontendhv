import React from 'react';
import { motion } from 'framer-motion';

export const NewsletterSection = () => {
  // Animation pour la section
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation pour le formulaire
  const formVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-xl"
        >
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Restez informé des dernières tendances
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Inscrivez-vous à notre newsletter pour recevoir nos meilleurs articles et analyses directement dans votre boîte mail.
              </p>
            </div>
            
            <motion.div
              variants={formVariants}
              className="max-w-md mx-auto"
            >
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Adresse email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-500 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-300">
                    J'accepte de recevoir la newsletter et la politique de confidentialité
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                  S'inscrire à la newsletter
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
              
              <p className="mt-4 text-xs text-gray-400 text-center">
                Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
