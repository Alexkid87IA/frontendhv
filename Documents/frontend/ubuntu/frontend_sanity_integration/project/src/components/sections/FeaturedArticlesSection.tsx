import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FeaturedArticlesSection = () => {
  // Animation pour les titres de section
  const sectionTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation pour les cartes d'articles
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1 * i
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3
      }
    }
  };

  // Données simulées pour les articles à la une
  const featuredArticles = [
    {
      id: 1,
      title: "Comment réinventer sa carrière après 40 ans",
      excerpt: "Découvrez les stratégies pour pivoter professionnellement et réussir votre reconversion.",
      image: "/images/career-change.jpg",
      category: "BUSINESS",
      slug: "reinventer-carriere-apres-40-ans",
      author: "Marie Dubois",
      date: "18 mai 2025"
    },
    {
      id: 2,
      title: "Les nouvelles frontières de l'intelligence artificielle",
      excerpt: "Comment l'IA transforme notre quotidien et redéfinit les limites du possible.",
      image: "/images/ai-frontiers.jpg",
      category: "TECH",
      slug: "nouvelles-frontieres-intelligence-artificielle",
      author: "Thomas Martin",
      date: "15 mai 2025"
    },
    {
      id: 3,
      title: "Cultiver la résilience en période d'incertitude",
      excerpt: "Les outils mentaux pour traverser les crises et en sortir plus fort.",
      image: "/images/resilience.jpg",
      category: "MENTAL",
      slug: "cultiver-resilience-periode-incertitude",
      author: "Sophie Leroux",
      date: "12 mai 2025"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Articles à la Une</h2>
          <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className="bg-hv-card-bg/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Link to={`/article/${article.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {article.author}
                    </span>
                    <span className="text-sm text-gray-400">
                      {article.date}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 text-center"
        >
          <Link 
            to="/articles" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
          >
            Voir tous les articles
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedArticlesSection;
