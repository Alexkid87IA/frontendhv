import React from 'react';
import { SanityImage } from '../../pages/ArticlePage';
import { urlFor } from '../../utils/sanityClient'; // Fixed import path
import { Share2, Clock, Tag, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';

interface ArticleHeaderProps {
  article: {
    title: string;
    description?: string;
    date: string;
    readingTime: string;
    category: string;
    image?: SanityImage;
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
      transition: { delay: i * 0.1 + (imageUrl ? 0.4 : 0.1), duration: 0.4, ease: "easeOut" } 
    })
  };

  return (
    <motion.header 
      className="mb-10 md:mb-16 pt-6 md:pt-10 text-white"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      {imageUrl && (
        <motion.div 
          className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] xl:h-[500px] mb-8 md:mb-12 rounded-xl overflow-hidden shadow-2xl group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <img
            src={imageUrl}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </motion.div>
      )}

      <div className={`max-w-4xl mx-auto text-center px-4 ${imageUrl ? 'relative z-10 -mt-24 sm:-mt-28 md:-mt-36 lg:-mt-44' : 'pt-8'}`}>
        <div className={`${imageUrl ? 'bg-background-dark/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-lg shadow-xl' : ''}`}>
          
          <motion.div 
            className="flex items-center justify-center gap-x-3 gap-y-2 flex-wrap mb-4 md:mb-6"
            variants={metaItemVariants}
            custom={1}
          >
            {article.category && article.category !== "Non catégorisé" && (
              <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-accent-violet bg-accent-violet/10 px-3 py-1.5 rounded-full">
                <Tag size={14} />
                {article.category}
              </span>
            )}
            {article.category && article.category !== "Non catégorisé" && (
                <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">•</span>
            )}
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
              <Clock size={14} />
              <span>{article.readingTime} de lecture</span>
            </div>
          </motion.div>

          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-5 md:mb-8"
            variants={metaItemVariants}
            custom={2}
          >
            {article.title}
          </motion.h1>
          
          {article.description && (
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto"
              variants={metaItemVariants}
              custom={3}
            >
              {article.description}
            </motion.p>
          )}

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 py-4 border-t border-b border-gray-700/50 mt-6 md:mt-8"
            variants={metaItemVariants}
            custom={4}
          >
            <div className="inline-flex items-center gap-2 text-sm text-gray-400">
              <CalendarDays size={16} />
              <time>{article.date}</time>
            </div>
            <button 
              className="inline-flex items-center gap-2 rounded-lg bg-gray-700/60 hover:bg-gray-600/75 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-accent-violet/50 shadow-md hover:shadow-lg"
              onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Lien copié !'))}
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