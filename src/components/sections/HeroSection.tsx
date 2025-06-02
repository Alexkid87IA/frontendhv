import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getAllArticles, getLatestQuote } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { formatDate } from '../../utils/dateUtils';

export const HeroSection = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [quote, setQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [articlesData, quoteData] = await Promise.all([
          getAllArticles(),
          getLatestQuote()
        ]);

        if (articlesData && articlesData.length > 0) {
          setArticles(articlesData.slice(0, 7)); // Article à la une + 6 articles récents
          setDataSource('cms');
        }

        if (quoteData) {
          setQuote(quoteData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container py-12 md:py-20 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const featuredArticle = articles[0];
  const recentArticles = articles.slice(1, 7);

  return (
    <ErrorBoundary>
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="container relative px-4 md:px-6">
          {/* Featured Article + Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <Link to={`/article/${featuredArticle.slug?.current}`} className="block">
                  <div className="relative aspect-[16/9] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
                    <SafeImage
                      image={featuredArticle.mainImage}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {featuredArticle.categories?.[0] && (
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 px-3 md:px-4 py-1 md:py-2 bg-accent-blue text-white rounded-full text-xs md:text-sm font-medium">
                        {featuredArticle.categories[0].title}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 group-hover:text-accent-blue transition-colors line-clamp-3 md:line-clamp-2">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 md:line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-400" dateTime={featuredArticle.publishedAt}>
                      {formatDate(featuredArticle.publishedAt)}
                    </time>
                    <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                      <span className="text-sm md:text-base">Lire l'article</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Quote of the Day */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 flex flex-col justify-center h-full"
            >
              <Quote size={36} className="text-accent-blue mb-4 md:mb-6 opacity-20" />
              <blockquote className="text-xl md:text-2xl font-playfair italic mb-4 md:mb-6">
                "{quote?.text || "Le succès n'est pas une destination, c'est un voyage constant d'apprentissage et de dépassement de soi."}"
              </blockquote>
              <cite className="text-accent-blue font-medium block text-sm md:text-base">
                {quote?.author || "Roger Ormières"}
              </cite>
            </motion.div>
          </div>

          {/* Recent Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {recentArticles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <Link to={`/article/${article.slug?.current}`} className="block">
                  <div className="relative aspect-[16/9] rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
                    <SafeImage
                      image={article.mainImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {article.categories?.[0] && (
                      <div className="absolute top-2 md:top-4 left-2 md:left-4 px-2 md:px-3 py-1 bg-accent-blue/80 text-white rounded-full text-xs">
                        {article.categories[0].title}
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <time className="text-xs md:text-sm text-gray-500" dateTime={article.publishedAt}>
                    {formatDate(article.publishedAt)}
                  </time>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;