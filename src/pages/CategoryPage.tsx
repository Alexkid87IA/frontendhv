import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart, ArrowRight } from 'lucide-react';
import SafeImage from '../components/common/SafeImage';
import { formatDate } from '../utils/dateUtils';

export function CategoryPage() {
  return (
    <>
      {featuredArticles.length > 0 && (
        <section className="container mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <Link 
                key={article._id}
                to={`/article/${article.slug.current}`}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[21/9] rounded-2xl overflow-hidden"
                >
                  <SafeImage
                    source={article.mainImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                    {article.categories && article.categories.length > 0 && (
                      <div className="flex gap-3 mb-4">
                        {article.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className={`px-4 py-2 rounded-full text-sm font-medium text-white ${
                              ["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][idx % 4]
                            }`}
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-4">
                      <SafeImage
                        source={article.author?.image}
                        alt={article.author?.name || "Auteur"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <span className="text-sm text-gray-300">{article.author?.name}</span>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{article.readingTime}</span>
                          <span>•</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-300 text-lg mb-6 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span>{article.views} vues</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={16} />
                          <span>{article.likes} likes</span>
                        </div>
                      </div>
                      
                      <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                        <span>Lire l'article</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}