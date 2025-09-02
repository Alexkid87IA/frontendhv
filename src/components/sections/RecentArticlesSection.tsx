import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, RefreshCw, TrendingUp } from 'lucide-react';

export const RecentArticlesSection = ({ articles = [] }) => {
  // On prend les 10 derniers articles
  const recentArticles = articles.slice(0, 10);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('flash');

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
    const diffInMinutes = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInMinutes < 60) return `${diffInMinutes}min`;
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const day = publishDate.getDate().toString().padStart(2, '0');
    const month = (publishDate.getMonth() + 1).toString().padStart(2, '0');
    const year = publishDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-black">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Mobile First */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Left: Live Badge + Title */}
          <div className="flex items-start sm:items-center gap-3">
            {/* Live Badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500 rounded-full flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase">Live</span>
            </div>
            
            {/* Title + Subtitle */}
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Dernières publications
              </h2>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                Mis à jour il y a 2 min
              </p>
            </div>
          </div>

          {/* Refresh Button - Hidden on mobile */}
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:block p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Rafraîchir"
          >
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Tabs - Scrollable on mobile */}
        <div className="relative mb-6">
          <div className="flex gap-6 border-b border-gray-800 overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setActiveTab('flash')}
              className={`pb-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'flash' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Flash
            </button>
            <button 
              onClick={() => setActiveTab('plus-lus')}
              className={`pb-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'plus-lus' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Les + lus
            </button>
            <button 
              onClick={() => setActiveTab('plus-commentes')}
              className={`pb-3 font-medium transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'plus-commentes' 
                  ? 'text-white border-b-2 border-white' 
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Les + commentés
            </button>
          </div>
        </div>

        {/* Articles List - Mobile Optimized */}
        <div className="relative">
          {/* Timeline - Desktop only */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-0.5 bg-gray-800" />
          
          <div className="space-y-0">
            {recentArticles.map((article, index) => {
              const categoryStyle = getCategoryStyle(article.categories?.[0]?.title);
              const isFirst = index === 0;
              
              return (
                <motion.article
                  key={article._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    group relative 
                    ${index !== recentArticles.length - 1 ? 'border-b border-gray-900' : ''}
                    hover:bg-white/[0.02] transition-all duration-200
                  `}
                >
                  {/* Timeline Point - Desktop only */}
                  <div className="hidden lg:block absolute left-[29px] top-8 w-3 h-3 bg-gray-800 rounded-full border-2 border-black z-10" />
                  
                  {/* Mobile Layout: Stack vertically */}
                  <div className="p-4 lg:pl-16">
                    {/* Top Row: Time + Category + NEW badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500 min-w-[45px]">
                        {formatTimeAgo(article.publishedAt)}
                      </span>
                      
                      {article.categories?.[0] && (
                        <span className={`
                          px-2 py-0.5 text-[10px] font-bold uppercase rounded
                          ${categoryStyle.bg} ${categoryStyle.text}
                        `}>
                          {article.categories[0].title}
                        </span>
                      )}
                      
                      {isFirst && (
                        <span className="px-2 py-0.5 bg-cyan-400 text-black text-[10px] font-bold rounded uppercase">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Main Content Row */}
                    <div className="flex gap-3">
                      {/* Thumbnail */}
                      <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-900">
                        <img
                          src={article.mainImage?.asset?._ref || `https://picsum.photos/100/100?random=${index}`}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title + Action */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <h3 className="text-white font-medium text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {article.title}
                        </h3>
                        
                        {/* Mobile: Inline button */}
                        <div className="mt-2 sm:mt-0">
                          <a 
                            href={`/article/${article.slug?.current}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 rounded-full text-white text-xs font-medium transition-colors"
                          >
                            <span>Lire</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Desktop: Trending indicator */}
                      {index < 3 && (
                        <div className="hidden sm:flex items-center justify-center flex-shrink-0">
                          <div className="p-2 bg-orange-500/20 rounded-full">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Footer - Mobile Optimized */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Live Status */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>{recentArticles.length} nouveaux articles aujourd'hui</span>
            </div>

            {/* View All Link */}
            <a 
              href="/articles" 
              className="group inline-flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white font-medium text-sm transition-all"
            >
              <span>Voir tous les articles</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default RecentArticlesSection;