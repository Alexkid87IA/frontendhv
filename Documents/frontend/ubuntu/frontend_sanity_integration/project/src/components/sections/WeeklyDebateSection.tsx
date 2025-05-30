import React from 'react';
import { motion } from 'framer-motion';

export const WeeklyDebateSection = () => {
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

  // Animation pour les cartes de débat
  const debateCardVariants = {
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

  // Animation pour les boutons
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2 * i
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  // Données du débat de la semaine
  const debateData = {
    title: "Pensez-vous que le développement personnel est un concept marketing ?",
    description: "Alors alors alors ouiiiii mais non",
    participants: [
      {
        id: 1,
        name: "Eric Diaz",
        role: "président",
        experience: "20 ans d'expérience en tant que chef",
        opinion: "Non c'est bon pour le moral",
        publications: 5,
        citations: 1,
        image: "/images/eric-diaz.jpg"
      },
      {
        id: 2,
        name: "Gilbert Brebois",
        role: "adjoint",
        experience: "fun",
        opinion: "Oui c'est un truc de pigeon",
        publications: 15,
        citations: 3,
        image: "/images/gilbert-brebois.jpg"
      }
    ],
    stats: {
      participants: 4998,
      comments: 1,
      category: "mental"
    },
    relatedArticles: [
      {
        id: 1,
        title: "On choisit un coach ?",
        slug: "on-choisit-un-coach"
      }
    ]
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionTitleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center mb-2">
            <div className="bg-blue-500 h-6 w-1.5 rounded-full mr-3"></div>
            <p className="text-gray-300 uppercase text-sm font-medium tracking-wider">Le débat de la semaine</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Confrontez les idées</h2>
        </motion.div>

        <motion.div
          variants={debateCardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-hv-card-bg/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 shadow-xl"
        >
          {/* En-tête du débat */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-400 font-medium">
                {debateData.stats.category.toUpperCase()} • {debateData.stats.participants} participants
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {debateData.title}
            </h3>
            <p className="text-gray-300">
              {debateData.description}
            </p>
          </div>
          
          {/* Participants au débat */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {debateData.participants.map((participant, index) => (
              <div key={participant.id} className="p-6 md:p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={participant.image} 
                      alt={participant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{participant.name}</h4>
                    <p className="text-sm text-gray-400">{participant.role}</p>
                    <p className="text-xs text-gray-500">{participant.experience}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-xl text-white font-serif italic mb-4">
                    "{participant.opinion}"
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      {participant.publications} publications
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {participant.citations} citations
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Boutons de vote */}
          <div className="p-6 md:p-8 bg-hv-dark/50 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <motion.button
                custom={0}
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full sm:w-auto transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
                Je suis pour
              </motion.button>
              
              <motion.button
                custom={1}
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center w-full sm:w-auto transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667v-5.43a2 2 0 00-1.105-1.79l-.05-.025A4 4 0 0011.055 2H5.64a2 2 0 00-1.962 1.608l-1.2 6A2 2 0 004.44 12H8v4a2 2 0 002 2 1 1 0 001-1v-.667a4 4 0 01.8-2.4l1.4-1.866a4 4 0 00.8-2.4z" />
                </svg>
                Je suis contre
              </motion.button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                {debateData.stats.participants} participants
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                </svg>
                {debateData.stats.comments} commentaires
              </div>
              
              <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                Partager
              </button>
            </div>
          </div>
          
          {/* Articles liés */}
          {debateData.relatedArticles.length > 0 && (
            <div className="p-6 md:p-8 border-t border-white/10">
              <h4 className="font-bold text-white mb-3">Articles liés</h4>
              <ul className="space-y-2">
                {debateData.relatedArticles.map(article => (
                  <li key={article.id}>
                    <Link 
                      to={`/article/${article.slug}`} 
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyDebateSection;
