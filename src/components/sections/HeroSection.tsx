import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getAllArticles } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { urlFor } from '../../utils/sanityImage';

// Données mockées pour fallback
const mockFeaturedArticle = {
  _id: '1',
  title: "Comment développer un mindset d'exception",
  slug: { current: 'mindset-exception' },
  mainImage: {
    asset: {
      _ref: 'image-1',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
    }
  },
  excerpt: "Découvre les secrets des entrepreneurs qui réussissent et transforme ta vision du possible.",
  publishedAt: "2024-03-20",
  categories: [
    {
      _id: 'cat1',
      title: 'Mindset',
      slug: { current: 'mindset' }
    }
  ]
};

const mockRecentArticles = [
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { current: 'resilience-entrepreneuriale' },
    mainImage: {
      asset: {
        _ref: 'image-2',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Découvrez comment transformer les obstacles en opportunités",
    publishedAt: "2024-03-19",
  },
  {
    _id: '3',
    title: "Comment développer son leadership",
    slug: { current: 'developper-leadership' },
    mainImage: {
      asset: {
        _ref: 'image-3',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Les qualités essentielles d'un leader moderne",
    publishedAt: "2024-03-18",
  },
  {
    _id: '4',
    title: "Les clés d'une communication impactante",
    slug: { current: 'communication-impactante' },
    mainImage: {
      asset: {
        _ref: 'image-4',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Techniques pour captiver votre audience",
    publishedAt: "2024-03-17",
  }
];

export const HeroSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState(mockFeaturedArticle);
  const [recentArticles, setRecentArticles] = useState(mockRecentArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('mock');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const sanityArticles = await getAllArticles();
        
        if (sanityArticles && sanityArticles.length > 0) {
          // Utiliser le premier article comme article vedette
          setFeaturedArticle(sanityArticles[0]);
          
          // Utiliser les 3 articles suivants pour la grille
          setRecentArticles(sanityArticles.slice(1, 4));
          
          setDataSource('sanity');
          console.log('Articles HeroSection récupérés depuis Sanity CMS');
        } else {
          // Fallback vers les données mockées
          setFeaturedArticle(mockFeaturedArticle);
          setRecentArticles(mockRecentArticles);
          setDataSource('mock');
          console.log('Utilisation des articles mockés dans HeroSection (fallback)');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles pour HeroSection:', error);
        // Fallback vers les données mockées en cas d'erreur
        setFeaturedArticle(mockFeaturedArticle);
        setRecentArticles(mockRecentArticles);
        setDataSource('mock');
        console.log('Utilisation des articles mockés dans HeroSection suite à une erreur');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Formatage de la date relative
  const formatRelativeDate = (dateString?: string) => {
    if (!dateString) return "Il y a quelques jours";
    
    const publishDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaine${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} an${Math.floor(diffDays / 365) > 1 ? 's' : ''}`;
  };

  if (isLoading) {
    return (
      <section className="relative min-h-[40vh] flex items-center justify-center pt-6 pb-8">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="relative min-h-[40vh] flex items-center pt-6 pb-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Column - Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium">
                  {dataSource === 'sanity' ? 'Média indépendant' : 'Média indépendant (démo)'}
                </span>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold leading-tight">
                  Développe ton{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise">
                    mindset
                  </span>{' '}
                  d'exception
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl">
                  Découvre les histoires qui transforment, les stratégies qui font la différence, 
                  et développe ta psychologie de champion.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
                    <Link
                      to="/articles"
                      className="relative flex items-center justify-center gap-2 bg-black px-6 py-3 rounded-xl text-white group-hover:text-white/90 transition-colors"
                    >
                      <span>Explorer les articles</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/create-with-roger"
                      className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-colors"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Créer avec Roger</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Featured Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <SafeImage
                  image={featuredArticle.mainImage}
                  alt={featuredArticle.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  fallbackText={featuredArticle.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

                {/* Featured Article Preview */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="inline-block px-3 py-1 bg-accent-blue text-white text-sm font-medium rounded-full mb-3">
                    À la une
                  </span>
                  <h2 className="text-xl font-bold text-white mb-2">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    {featuredArticle.excerpt}
                  </p>
                  <Link
                    to={`/article/${featuredArticle.slug?.current}`}
                    className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-turquoise transition-colors"
                  >
                    <span>Lire l'article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-turquoise rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-turquoise to-accent-blue rounded-full blur-2xl opacity-20" />
            </motion.div>
          </div>

          {/* Latest Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          >
            {recentArticles.map((article, index) => (
              <Link
                key={article._id}
                to={`/article/${article.slug?.current}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent-blue/30 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <SafeImage
                    image={article.mainImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackText={article.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 text-white group-hover:text-accent-blue transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{formatRelativeDate(article.publishedAt)}</span>
                    <ArrowRight size={16} className="text-accent-blue transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;
