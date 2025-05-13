import React from 'react';
import { SanityImage } from '../../pages/ArticlePage'; // Assurez-vous que ce chemin est correct
import { urlFor } from '../../utils/sanityImage';
import { Share2, Clock, Tag, CalendarDays } from 'lucide-react'; // Ajout de Tag et CalendarDays
import { motion } from 'framer-motion';

interface ArticleHeaderProps {
  article: {
    title: string;
    description?: string; // Rendre optionnel si parfois non fourni
    date: string;
    readingTime: string;
    category: string; // Garder pour l'instant, même si la récupération est en attente
    image?: SanityImage; // Type SanityImage pour l'image principale
  };
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const imageUrl = article.image ? urlFor(article.image).width(1200).height(675).fit('crop').auto('format').url() : undefined;

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const metaItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i:number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <motion.header 
      className="mb-10 md:mb-16 pt-6 md:pt-10 text-white"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {/* Image principale en fond ou en haut */}
      {imageUrl && (
        <motion.div 
          className="relative w-full h-64 md:h-80 lg:h-96 xl:h-[500px] mb-8 md:mb-12 rounded-xl overflow-hidden shadow-2xl group"
          variants={metaItemVariants}
          custom={0}
        >
          <img
            src={imageUrl}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </motion.div>
      )}

      <div className={`max-w-3xl mx-auto text-center ${imageUrl ? 'relative z-10 -mt-24 md:-mt-32' : ''}`}>
        {/* Conteneur pour les éléments au-dessus de l'image si l'image est en fond */} 
        <div className={`${imageUrl ? 'bg-background-dark/80 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-xl' : ''}`}>
          {/* Catégorie et Temps de lecture */} 
          <motion.div 
            className="flex items-center justify-center gap-3 mb-4 md:mb-6"
            variants={metaItemVariants}
            custom={1}
          >
            {article.category && article.category !== "Non catégorisé" && (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-violet bg-accent-violet/10 px-3 py-1 rounded-full">
                <Tag size={16} />
                {article.category}
              </span>
            )}
            <span className={`text-gray-400 ${article.category && article.category !== "Non catégorisé" ? '' : 'hidden'}`}>•</span>
            <div className="inline-flex items-center gap-1.5 text-sm text-gray-400">
              <Clock size={16} />
              <span>{article.readingTime} de lecture</span>
            </div>
          </motion.div>

          {/* Titre de l'article */} 
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4 md:mb-6"
            variants={metaItemVariants}
            custom={2}
          >
            {article.title}
          </motion.h1>
          
          {/* Description/Extrait */} 
          {article.description && (
            <motion.p 
              className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed"
              variants={metaItemVariants}
              custom={3}
            >
              {article.description}
            </motion.p>
          )}

          {/* Date et Bouton Partager */} 
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 py-4 border-t border-b border-gray-700/50"
            variants={metaItemVariants}
            custom={4}
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <CalendarDays size={16} />
              <time>{article.date}</time>
            </div>
            <button 
              className="inline-flex items-center gap-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/70 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-accent-violet/50 shadow-md hover:shadow-lg"
              onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Lien copié !'))} // Simple share action
            >
              <Share2 size={16} />
              Partager l'article
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export default ArticleHeader;

