import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const ExploreUniversesSection = () => {
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

  // Animation pour les cartes de catégorie
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
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    }
  };

  // Données des univers éditoriaux
  const universes = [
    {
      id: 'story',
      title: 'Récits de vie',
      description: 'Des parcours inspirants qui redéfinissent le possible',
      image: '/images/story-universe.jpg',
      color: 'from-blue-600/70 to-blue-900/70',
      slug: '/rubrique/story'
    },
    {
      id: 'business',
      title: 'Business & innovation',
      description: 'Les nouvelles frontières de l\'entrepreneuriat',
      image: '/images/business-universe.jpg',
      color: 'from-purple-600/70 to-purple-900/70',
      slug: '/rubrique/business'
    },
    {
      id: 'mental',
      title: 'Mental',
      description: 'Développer une psychologie de champion',
      image: '/images/mental-universe.jpg',
      color: 'from-green-600/70 to-green-900/70',
      slug: '/rubrique/mental'
    },
    {
      id: 'society',
      title: 'Culture & société',
      description: 'Décrypter les mutations de notre époque',
      image: '/images/society-universe.jpg',
      color: 'from-orange-600/70 to-orange-900/70',
      slug: '/rubrique/society'
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Explorer nos univers éditoriaux</h2>
          <p className="text-xl text-gray-300 mb-4">Plongez dans nos thématiques phares</p>
          <div className="w-20 h-1 bg-blue-500 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universes.map((universe, index) => (
            <motion.div
              key={universe.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              {/* Image d'arrière-plan */}
              <img 
                src={universe.image} 
                alt={universe.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay avec dégradé */}
              <div className={`absolute inset-0 bg-gradient-to-b ${universe.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}></div>
              
              {/* Contenu */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="mb-2">
                  <span className="uppercase text-sm font-bold tracking-wider text-white/80">
                    {universe.id.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {universe.title}
                </h3>
                <p className="text-white/90 mb-4">
                  {universe.description}
                </p>
                <Link 
                  to={universe.slug} 
                  className="inline-flex items-center text-white font-medium transition-colors duration-300 group-hover:text-blue-200"
                >
                  Voir la rubrique
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreUniversesSection;
