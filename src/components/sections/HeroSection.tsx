import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getAllArticles, getLatestQuote } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { SanityArticle } from '../../types/sanity';

// Données mockées pour fallback
const mockFeaturedArticle: SanityArticle = {
  _id: '1',
  title: "Comment développer un mindset d'exception",
  slug: { _type: "slug", current: 'mindset-exception' },
  mainImage: {
    _type: "image",
    asset: {
      _ref: 'https://picsum.photos/800/600?random=1',
      _type: "reference"
    }
  },
  excerpt: "Découvre les secrets des entrepreneurs qui réussissent et transforme ta vision du possible.",
  publishedAt: "2024-03-20",
  categories: [
    {
      _id: 'cat1',
      title: 'Mindset',
      slug: { _type: "slug", current: 'mindset' }
    }
  ]
};

const mockRecentArticles: SanityArticle[] = [
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { _type: "slug", current: 'resilience-entrepreneuriale' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-2',
        _type: "reference"
      }
    },
    excerpt: "Découvrez comment transformer les obstacles en opportunités",
    publishedAt: "2024-03-19",
  },
  {
    _id: '3',
    title: "Comment développer son leadership",
    slug: { _type: "slug", current: 'developper-leadership' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-3',
        _type: "reference"
      }
    },
    excerpt: "Les qualités essentielles d'un leader moderne",
    publishedAt: "2024-03-18",
  },
  {
    _id: '4',
    title: "Les clés d'une communication impactante",
    slug: { _type: "slug", current: 'communication-impactante' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-4',
        _type: "reference"
      }
    },
    excerpt: "Techniques pour captiver votre audience",
    publishedAt: "2024-03-17",
  },
  {
    _id: '5',
    title: "Innovation et développement durable",
    slug: { _type: "slug", current: 'innovation-durable' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-5',
        _type: "reference"
      }
    },
    excerpt: "Concilier croissance et responsabilité",
    publishedAt: "2024-03-16",
  },
  {
    _id: '6',
    title: "Le pouvoir du storytelling",
    slug: { _type: "slug", current: 'pouvoir-storytelling' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-6',
        _type: "reference"
      }
    },
    excerpt: "L'art de raconter des histoires qui marquent",
    publishedAt: "2024-03-15",
  },
  {
    _id: '7',
    title: "Stratégies de growth hacking",
    slug: { _type: "slug", current: 'growth-hacking' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'image-7',
        _type: "reference"
      }
    },
    excerpt: "Les techniques de croissance rapide",
    publishedAt: "2024-03-14",
  }
];

const mockQuote = {
  text: "Le succès n'est pas une destination, c'est un voyage constant d'apprentissage et de dépassement de soi.",
  author: "Roger Ormières",
  role: "Fondateur"
};

export const HeroSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState<SanityArticle>(mockFeaturedArticle);
  const [recentArticles, setRecentArticles] = useState<SanityArticle[]>(mockRecentArticles);
  const [quote, setQuote] = useState(mockQuote);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [sanityArticles, sanityQuote] = await Promise.all([
          getAllArticles(),
          getLatestQuote()
        ]);
        
        if (sanityArticles && sanityArticles.length > 0) {
          // Utiliser le premier article comme article vedette
          setFeaturedArticle(sanityArticles[0]);
          
          // Utiliser les 6 articles suivants pour la grille
          setRecentArticles(sanityArticles.slice(1, 7));
          
          setDataSource('cms');
          console.log('Articles HeroSection récupérés depuis Sanity CMS');
        } else {
          // Fallback vers les données mockées
          setFeaturedArticle(mockFeaturedArticle);
          setRecentArticles(mockRecentArticles);
          setDataSource('mock');
          console.log('Aucun article trouvé dans Sanity, utilisation des articles mockés dans HeroSection');
        }

        if (sanityQuote) {
          setQuote(sanityQuote);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données pour HeroSection:', error);
        setError("Impossible de charger les articles vedettes");
        
        // Fallback vers les données mockées en cas d'erreur
        setFeaturedArticle(mockFeaturedArticle);
        setRecentArticles(mockRecentArticles);
        setDataSource('mock');
        console.log('Utilisation des données mockées dans HeroSection suite à une erreur');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="relative min-h-[40vh] flex items-center justify-center pt-6 pb-8">
        <LoadingSpinner />
      </section>
    );
  }

  if (error && !featuredArticle && recentArticles.length === 0) {
    return (
      <section className="relative min-h-[40vh] flex items-center justify-center pt-6 pb-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2">Veuillez réessayer ultérieurement.</p>
        </div>
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
          {dataSource === 'mock' && (
            <div className="absolute top-0 right-0 text-xs text-amber-500 bg-black/50 px-2 py-1 rounded z-10">
              Données de démonstration
            </div>
          )}
          
          {/* Featured Article and Quote */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Featured Article */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <Link to={`/article/${featuredArticle.slug?.current}`} className="group block">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <SafeImage
                    source={featuredArticle.mainImage}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fallbackText={featuredArticle.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    {featuredArticle.categories && featuredArticle.categories[0] && (
                      <span className="inline-block px-3 py-1 bg-accent-blue text-white text-sm font-medium rounded-full mb-3">
                        {featuredArticle.categories[0].title}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-accent-blue transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                      <span>Lire l'article</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Quote of the Day */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col justify-center"
            >
              <Quote size={48} className="text-accent-blue/20 mb-6" />
              <blockquote className="mb-6">
                <p className="text-2xl font-playfair italic mb-6">
                  "{quote.text}"
                </p>
                <footer className="text-lg">
                  <cite className="text-accent-blue not-italic">{quote.author}</cite>
                  {quote.role && (
                    <span className="text-gray-400 block text-sm mt-1">{quote.role}</span>
                  )}
                </footer>
              </blockquote>
            </motion.div>
          </div>

          {/* Recent Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/article/${article.slug?.current}`} className="group block">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30">
                    <div className="relative aspect-[16/9]">
                      <SafeImage
                        source={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackText={article.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.excerpt && (
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
                          {new Date(article.publishedAt || '').toLocaleDateString('fr-FR', {
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
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;