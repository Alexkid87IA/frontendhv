import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Crown, Sparkles, Zap, Target } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import { sanityClient } from '../../utils/sanityClient';

// Icons mapping pour les catégories
const categoryIcons = {
  'Mental': Crown,
  'Business': Target,
  'Productivité': Zap,
  'Leadership': Star,
  'Négociation': Sparkles
};

const categoryGradients = {
  'Mental': "from-purple-500 to-violet-500",
  'Business': "from-blue-500 to-cyan-500",
  'Productivité': "from-amber-500 to-orange-500",
  'Leadership': "from-pink-500 to-rose-500",
  'Négociation': "from-emerald-500 to-teal-500"
};

export const EssentialArticlesSection = () => {
  const [essentialArticles, setEssentialArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEssentialArticles = async () => {
      try {
        // Requête pour récupérer les articles marqués comme "essentiel"
        const query = `*[_type == "essentiel"] | order(order asc, _createdAt desc)[0...5] {
          _id,
          title,
          slug,
          mainImage,
          category->{
            title,
            slug
          },
          excerpt,
          order
        }`;
        
        const articles = await sanityClient.fetch(query);
        
        if (articles && articles.length > 0) {
          setEssentialArticles(articles);
          console.log('Articles essentiels récupérés:', articles.length);
        } else {
          // Si pas d'articles essentiels, récupérer les 5 articles les plus récents
          const fallbackQuery = `*[_type == "article"] | order(publishedAt desc)[0...5] {
            _id,
            title,
            slug,
            mainImage,
            categories[0]->{
              title,
              slug
            },
            excerpt
          }`;
          
          const fallbackArticles = await sanityClient.fetch(fallbackQuery);
          setEssentialArticles(fallbackArticles);
          console.log('Articles de fallback récupérés:', fallbackArticles.length);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles essentiels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEssentialArticles();
  }, []);

  if (isLoading || essentialArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
            <span className="relative inline-block px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
              À ne pas manquer
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-accent-blue to-accent-turquoise bg-clip-text text-transparent">
            Les 5 Essentiels
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Les articles incontournables qui ont déjà transformé des milliers d'entrepreneurs
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          {essentialArticles[0] && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:row-span-2 group"
            >
              <Link to={`/article/${essentialArticles[0].slug.current}`} className="block h-full">
                <div className="relative h-full bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                  <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full">
                    <SafeImage
                      source={essentialArticles[0].mainImage}
                      alt={essentialArticles[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      <div className="flex items-center gap-2 mb-4">
                        {essentialArticles[0].category && (
                          <>
                            <div className={`p-2 rounded-xl bg-gradient-to-br ${categoryGradients[essentialArticles[0].category.title] || 'from-gray-500 to-gray-600'}`}>
                              {React.createElement(categoryIcons[essentialArticles[0].category.title] || Star, { className: "w-6 h-6 text-white" })}
                            </div>
                            <span className="text-sm font-medium text-white bg-white/20 px-3 py-1 rounded-full">
                              {essentialArticles[0].category.title}
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                        {essentialArticles[0].title}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                        <span>Lire maintenant</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Other Articles */}
          <div className="grid grid-cols-1 gap-8">
            {essentialArticles.slice(1).map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/article/${article.slug.current}`} className="block">
                  <div className="relative bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <div className="relative aspect-square">
                          <SafeImage
                            source={article.mainImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {article.category && (
                            <>
                              <div className={`p-1.5 rounded-lg bg-gradient-to-br ${categoryGradients[article.category.title] || 'from-gray-500 to-gray-600'}`}>
                                {React.createElement(categoryIcons[article.category.title] || Star, { className: "w-4 h-4 text-white" })}
                              </div>
                              <span className="text-xs font-medium text-white bg-white/20 px-2 py-0.5 rounded-full">
                                {article.category.title}
                              </span>
                            </>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-bold mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        
                        <div className="flex items-center gap-1 text-sm text-accent-blue group-hover:text-accent-turquoise transition-colors">
                          <span>Lire</span>
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EssentialArticlesSection;