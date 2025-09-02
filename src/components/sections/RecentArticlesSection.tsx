import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, RefreshCw } from 'lucide-react';
import SafeImage from '../common/SafeImage';

export const RecentArticlesSection = ({ articles = [] }) => {
  // On prend les 10 derniers articles
  const recentArticles = articles.slice(0, 10);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const categoryColors = {
    'Story': { bg: 'bg-amber-500', text: 'text-white' },
    'Business': { bg: 'bg-blue-500', text: 'text-white' },
    'Mental': { bg: 'bg-purple-500', text: 'text-white' },
    'Society': { bg: 'bg-emerald-500', text: 'text-white' },
    'Mindset': { bg: 'bg-purple-500', text: 'text-white' },
    'default': { bg: 'bg-gray-500', text: 'text-white' }
  };

  const getCategoryStyle = (category) => {
    return categoryColors[category] || categoryColors.default;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const publishDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "À l'instant";
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    const days = Math.floor(diffInHours / 24);
    if (days === 1) return "Il y a 1 jour";
    if (days < 7) return `Il y a ${days} jours`;
    return publishDate.toLocaleDateString('fr-FR');
  };

  // Générer des stats fictives
  const getRandomStats = (index) => {
    const baseViews = 2000 - (index * 150);
    const views = Math.floor(baseViews + Math.random() * 500);
    const comments = Math.floor(8 + Math.random() * 30);
    return { views, comments };
  };

  return (
    <section className="relative py-16 overflow-hidden bg-black">
      <div className="container relative z-10 max-w-5xl mx-auto">
        {/* Header avec indicateur LIVE */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Badge LIVE */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-bold text-white uppercase">Live</span>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Dernières publications
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Mis à jour il y a 2 min
              </p>
            </div>
          </div>

          {/* Bouton refresh */}
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-800">
          <button className="pb-3 text-white font-medium border-b-2 border-white">
            Flash
          </button>
          <button className="pb-3 text-gray-500 hover:text-gray-300 transition-colors">
            Les + lus
          </button>
          <button className="pb-3 text-gray-500 hover:text-gray-300 transition-colors">
            Les + commentés
          </button>
        </div>

        {/* Liste des articles */}
        <div className="space-y-0 border-l-2 border-gray-800 ml-8">
          {recentArticles.map((article, index) => {
            const categoryStyle = getCategoryStyle(article.categories?.[0]?.title);
            
            return (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  group relative flex items-center gap-4 py-4
                  ${index !== recentArticles.length - 1 ? 'border-b border-gray-900' : ''}
                  pl-8 hover:bg-white/[0.02] transition-all duration-200
                `}
              >
                {/* Point sur la timeline */}
                <div className="absolute left-[-9px] w-4 h-4 bg-gray-800 rounded-full border-2 border-black" />

                {/* Timestamp */}
                <div className="flex-shrink-0 w-28 text-gray-500 text-sm">
                  <div className="text-right">
                    {formatTimeAgo(article.publishedAt)}
                  </div>
                </div>

                {/* Image thumbnail */}
                <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-900">
                  <SafeImage
                    source={article.mainImage}
                    alt={article.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Contenu */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    {/* Catégorie */}
                    {article.categories?.[0] && (
                      <span className={`
                        inline-block px-2.5 py-1 text-[11px] font-bold uppercase rounded
                        ${categoryStyle.bg} ${categoryStyle.text}
                      `}>
                        {article.categories[0].title}
                      </span>
                    )}
                    
                    {/* Titre */}
                    <h3 className="flex-grow text-white font-medium text-lg leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>

                {/* Bouton "Lire plus" pour tous les articles */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <a 
                    href={`/article/${article.slug?.current}`}
                    className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-xs font-medium transition-colors"
                  >
                    <span>Lire plus</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-10 pt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Flux en temps réel • {recentArticles.length} nouveaux articles aujourd'hui</span>
          </div>

          <a 
            href="/articles" 
            className="group inline-flex items-center gap-2 text-white hover:text-cyan-400 font-medium text-sm transition-colors"
          >
            <span>Voir tous les articles</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentArticlesSection;