// src/components/article/sections/RelatedArticles.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SanityArticle, VerticalColors } from "../../../types/article.types";
import { getVerticalColors } from "../../../utils/articleUtils";

interface RelatedArticlesProps {
  articles: SanityArticle[];
  colors: VerticalColors;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ articles, colors }) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Continuez votre lecture
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez d'autres articles qui pourraient vous intéresser
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((related, index) => {
            // Déterminer les couleurs pour chaque article selon SA catégorie
            const getCardColors = () => {
              const cardCategory = related.categories?.[0]?.slug?.current?.toLowerCase();
              
              switch(cardCategory) {
                case 'story':
                case 'recits':
                  return {
                    gradient: 'from-amber-500 to-orange-500',
                    primary: '#f59e0b',
                    textColor: '#fbbf24',
                    borderColor: 'rgba(245, 158, 11, 0.3)'
                  };
                case 'business':
                  return {
                    gradient: 'from-blue-500 to-cyan-500',
                    primary: '#3b82f6',
                    textColor: '#60a5fa',
                    borderColor: 'rgba(59, 130, 246, 0.3)'
                  };
                case 'mental':
                case 'psycho':
                  return {
                    gradient: 'from-purple-500 to-violet-500',
                    primary: '#a855f7',
                    textColor: '#c084fc',
                    borderColor: 'rgba(168, 85, 247, 0.3)'
                  };
                case 'society':
                  return {
                    gradient: 'from-emerald-500 to-teal-500',
                    primary: '#10b981',
                    textColor: '#34d399',
                    borderColor: 'rgba(16, 185, 129, 0.3)'
                  };
                default:
                  return {
                    gradient: 'from-gray-500 to-gray-600',
                    primary: '#6b7280',
                    textColor: '#9ca3af',
                    borderColor: 'rgba(107, 114, 128, 0.3)'
                  };
              }
            };
            
            const cardColors = getCardColors();
            
            return (
              <motion.article 
                key={related._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/article/${related.slug.current}`}>
                  <div 
                    className="relative overflow-hidden rounded-xl bg-white/5 border transition-all hover:transform hover:scale-105"
                    style={{
                      borderColor: cardColors.borderColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = cardColors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = cardColors.borderColor;
                    }}
                  >
                    {related.mainImage && related.mainImage.asset && related.mainImage.asset._ref && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={`https://cdn.sanity.io/images/z9wsynas/production/${related.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=400&h=250&fit=crop&auto=format`}
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        
                        {/* Badge de catégorie avec gradient */}
                        {related.categories && related.categories[0] && (
                          <div className="absolute top-4 left-4">
                            <span 
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${cardColors.gradient}`}
                            >
                              {related.categories[0].title}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mt-2 mb-3 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {related.excerpt}
                      </p>
                      
                      {/* Ligne de progression colorée au survol */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r"
                        style={{
                          background: `linear-gradient(to right, ${cardColors.primary}, ${cardColors.textColor})`
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/articles"
            className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white rounded-lg font-medium transition-all`}
          >
            Voir tous les articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;