import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';

interface ArticleHeaderProps {
  article: {
    title?: string;
    mainImage?: any;
    publishedAt?: string;
    author?: {
      name?: string;
      image?: any;
    };
    categories?: Array<{
      _id: string;
      title: string;
      slug?: {
        current: string;
      };
    }>;
    description?: string;
    readingTime?: string;
    category?: string;
    image?: any;
  };
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  if (!article) return null;

  return (
    <ErrorBoundary>
      <header className="relative min-h-[70vh] flex items-center justify-center pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24">
        {/* Image de fond en hero avec overlay amélioré */}
        {article.image && (
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <SafeImage
              image={article.image}
              alt={article.title || "Image de l'article"}
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient plus sophistiqué */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-background-dark"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
            {/* Effet de vignette pour améliorer la lisibilité */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]"></div>
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Catégorie avec design amélioré */}
            {article.category && (
              <div className="flex justify-center mb-8">
                <Link 
                  to={`/rubrique/${article.category.toLowerCase()}`}
                  className="px-4 py-1.5 bg-accent-blue/20 text-accent-blue rounded-full font-medium hover:bg-accent-blue/30 transition-colors border border-accent-blue/30 backdrop-blur-sm shadow-lg"
                >
                  {article.category}
                </Link>
              </div>
            )}

            {/* Titre principal avec animation et style amélioré */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 leading-tight text-white shadow-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              {article.title || "Article sans titre"}
            </motion.h1>
            
            {/* Description / Extrait avec style amélioré */}
            {article.description && (
              <motion.p 
                className="text-xl md:text-2xl text-white/90 text-center max-w-3xl mx-auto mb-10 leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              >
                {article.description}
              </motion.p>
            )}
            
            {/* Métadonnées de l'article (date, temps de lecture) */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-accent-blue" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2 text-accent-blue" />
                <span>{article.readingTime || "5 min de lecture"}</span>
              </div>
            </motion.div>
            
            {/* Informations sur l'auteur avec design amélioré */}
            <motion.div 
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              <div className="flex items-center bg-black/40 px-5 py-3 rounded-full backdrop-blur-md border border-white/10 shadow-xl hover:border-accent-blue/30 transition-all duration-300 group">
                {article.author?.image ? (
                  <div className="mr-4 w-12 h-12 rounded-full overflow-hidden border-2 border-accent-blue/50 shadow-glow">
                    <SafeImage
                      image={article.author.image}
                      alt={article.author.name || "Auteur"}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mr-4 w-12 h-12 rounded-full bg-accent-blue/20 flex items-center justify-center border-2 border-accent-blue/50 shadow-glow">
                    <span className="text-accent-blue font-bold">
                      {article.author?.name?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-base font-medium text-white group-hover:text-accent-blue transition-colors">
                    {article.author?.name || "Auteur inconnu"}
                  </span>
                  <span className="text-sm text-white/60">
                    Rédacteur
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Indicateur de défilement */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          <span className="text-white/60 text-sm mb-2">Défiler pour lire</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-3 bg-accent-blue rounded-full mt-1"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </header>
    </ErrorBoundary>
  );
};

export default ArticleHeader;
