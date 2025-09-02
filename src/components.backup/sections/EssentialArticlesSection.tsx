import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Crown, Sparkles, Zap, Target, Clock, Eye, Bookmark } from 'lucide-react';
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
        // SOLUTION SIMPLE : Récupérer directement les articles marqués comme essentiels
        const query = `*[_type == "article" && isEssential == true] | order(publishedAt desc)[0...5] {
          _id,
          title,
          slug,
          mainImage,
          categories[0]->{
            title,
            slug
          },
          excerpt,
          isEssential
        }`;
        
        const articles = await sanityClient.fetch(query);
        
        if (articles && articles.length > 0) {
          // Mapper categories vers category pour uniformiser
          const mappedArticles = articles.map((article: any) => ({
            ...article,
            category: article.categories
          }));
          
          setEssentialArticles(mappedArticles);
          console.log('Articles essentiels récupérés:', mappedArticles.length);
        } else {
          // Si pas d'articles essentiels, récupérer les 5 articles les plus récents comme fallback
          console.log('Aucun article essentiel trouvé, utilisation du fallback');
          
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
          
          // Mapper categories vers category pour uniformiser
          const mappedArticles = fallbackArticles.map((article: any) => ({
            ...article,
            category: article.categories
          }));
          
          setEssentialArticles(mappedArticles);
          console.log('Articles de fallback récupérés:', mappedArticles.length);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles essentiels:', error);
        setEssentialArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEssentialArticles();
  }, []);

  if (isLoading || essentialArticles.length === 0) {
    return null;
  }

  // Séparer le premier article (featured) des autres
  const [featuredArticle, ...otherArticles] = essentialArticles;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/30 to-transparent" />
      
      <div className="container relative">
        {/* Header de section amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                Les incontournables
              </span>
              <span className="text-xs text-gray-500 ml-2">
                • Sélection éditoriale
              </span>
            </div>
          </div>
          
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Les </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                5 essentiels
              </span>
              <span className="text-white"> à lire absolument</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Les articles incontournables qui ont déjà transformé des milliers d'entrepreneurs. 
              Des contenus intemporels à lire, relire et appliquer.
            </p>
          </div>
        </motion.div>

        {/* Grid layout : 1 grand article à gauche, 4 petits à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Article principal (featured) */}
          {featuredArticle && (
            <motion.article
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group lg:row-span-2"
            >
              <Link to={`/article/${featuredArticle.slug?.current || featuredArticle.slug}`} className="block h-full">
                <div className="relative h-full bg-neutral-900 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                  {/* Grande image avec aspect ratio adaptatif */}
                  <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full">
                    <SafeImage
                      source={featuredArticle.mainImage}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Badge "À la une" */}
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-amber-500 rounded-full">
                      <Star className="w-4 h-4 text-white fill-white" />
                      <span className="text-sm font-medium text-white">Article essentiel #1</span>
                    </div>

                    {/* Contenu en overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8">
                      {featuredArticle.category && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${categoryGradients[featuredArticle.category.title] || 'from-gray-500 to-gray-600'}`}>
                            {React.createElement(categoryIcons[featuredArticle.category.title] || Star, { className: "w-5 h-5 text-white" })}
                          </div>
                          <span className="text-sm font-medium text-white bg-white/20 px-3 py-1 rounded-full">
                            {featuredArticle.category.title}
                          </span>
                        </div>
                      )}
                      
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-amber-400 transition-colors">
                        {featuredArticle.title}
                      </h3>
                      
                      {featuredArticle.excerpt && (
                        <p className="text-gray-300 mb-6 line-clamp-2">
                          {featuredArticle.excerpt}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-amber-400">
                        <span>Lire maintenant</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Ligne dorée au hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Link>
            </motion.article>
          )}

          {/* Grille des 4 autres articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {otherArticles.map((article, index) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group"
              >
                <Link to={`/article/${article.slug?.current || article.slug}`} className="block h-full">
                  <div className="relative h-full bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300">
                    {/* Image plus petite */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SafeImage
                        source={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      
                      {/* Numéro de l'article essentiel */}
                      <div className="absolute top-3 left-3 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">#{index + 2}</span>
                      </div>
                    </div>

                    {/* Contenu compact */}
                    <div className="p-5">
                      {article.category && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${categoryGradients[article.category.title] || 'from-gray-500 to-gray-600'}`}>
                            {React.createElement(categoryIcons[article.category.title] || Star, { className: "w-3 h-3 text-white" })}
                          </div>
                          <span className="text-xs font-medium text-gray-400">
                            {article.category.title}
                          </span>
                        </div>
                      )}

                      <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-amber-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      {article.excerpt && (
                        <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Flèche discrète */}
                      <div className="flex items-center justify-end">
                        <ArrowRight className="w-4 h-4 text-amber-400 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* CTA discret */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/articles?filter=essentials"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">Voir toute notre bibliothèque d'essentiels</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EssentialArticlesSection;