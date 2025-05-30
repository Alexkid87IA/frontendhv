import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const LatestArticlesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.08 * i
      }
    }),
    hover: {
      y: -8,
      transition: {
        duration: 0.3
      }
    }
  };

  // Fonction pour faire défiler horizontalement
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 340; // Largeur approximative d'une carte + marge
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Données simulées pour les derniers articles
  const latestArticles = [
    {
      id: 1,
      title: "Comment choisir un coach de vie",
      excerpt: "Guide complet pour réussir sa quête",
      image: "/images/coach-life.jpg",
      category: "SOCIETY",
      slug: "comment-choisir-coach-vie",
      author: "Alex Quighlini",
      date: "13 mai 2025"
    },
    {
      id: 2,
      title: "Le même article en test",
      excerpt: "Contenu de test pour la mise en page",
      image: "/images/test-article.jpg",
      category: "BUSINESS",
      slug: "meme-article-test",
      author: "Alex Quighlini",
      date: "13 mai 2025"
    },
    {
      id: 3,
      title: "Test catégories",
      excerpt: "C'est l'histoire de robert jeanjack",
      image: "/images/categories-test.jpg",
      category: "BUSINESS",
      slug: "test-categories",
      author: "Alex Quighlini",
      date: "13 mai 2025"
    },
    {
      id: 4,
      title: "Allez l'OM",
      excerpt: "eezgezgezgf zzzz ff fz z",
      image: "/images/om-test.jpg",
      category: "SOCIETY",
      slug: "allez-om",
      author: "Alex Quighlini",
      date: "13 mai 2025"
    },
    {
      id: 5,
      title: "Test 2",
      excerpt: "jdl@kjgr",
      image: "/images/test-2.jpg",
      category: "MENTAL",
      slug: "test-2",
      author: "Alex Quighlini",
      date: "13 mai 2025"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <motion.div
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Derniers articles</h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
          </motion.div>
          
          {/* Filtres et contrôles */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <button 
                className="bg-hv-card-bg/40 hover:bg-hv-card-bg/60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                onClick={() => scroll('left')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className="bg-hv-card-bg/40 hover:bg-hv-card-bg/60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                onClick={() => scroll('right')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <Link 
              to="/articles" 
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 flex items-center"
            >
              Tous les articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Conteneur scrollable horizontal */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-6 -mx-4 px-4 space-x-6 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {latestArticles.map((article, index) => (
            <motion.div
              key={article.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className="flex-shrink-0 w-[300px] snap-start"
            >
              <Link to={`/article/${article.slug}`} className="block">
                <div className="bg-hv-card-bg/40 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {article.author}
                      </span>
                      <span className="text-xs text-gray-400">
                        {article.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestArticlesSection;
