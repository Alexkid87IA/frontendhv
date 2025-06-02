import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  excerpt: string;
  publishedAt: string;
  categories: Array<{ title: string; slug: { current: string } }>;
}

interface CategoryArticlesGridProps {
  articles: Article[];
  onLoadMore: () => void;
  hasMore: boolean;
}

export const CategoryArticlesGrid = ({ articles, onLoadMore, hasMore }: CategoryArticlesGridProps) => {
  return (
    <section className="container mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/article/${article.slug.current}`}
              className="group block h-full"
            >
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-xl">
                <div className="relative aspect-[16/9]">
                  <SafeImage
                    source={article.mainImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    
                    <ArrowRight size={16} className="text-accent-blue transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <motion.button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-turquoise text-white rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Voir plus d'articles</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>
      )}
    </section>
  );
};