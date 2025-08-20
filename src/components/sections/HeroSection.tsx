import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Quote, Calendar, Clock, User, Sparkles, TrendingUp, Star, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getAllArticles } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { SanityArticle } from '../../types/sanity';

const mockFeaturedArticle: SanityArticle = {
  _id: '1',
  title: "Comment développer un mindset d'exception",
  slug: { _type: "slug", current: 'mindset-exception' },
  mainImage: {
    _type: "image",
    asset: {
      _ref: 'https://picsum.photos/1200/800?random=1',
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
  ],
  readingTime: '12 min'
};

const mockRecentArticles: SanityArticle[] = [
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale face aux défis",
    slug: { _type: "slug", current: 'resilience-entrepreneuriale' },
    mainImage: {
      _type: "image",
      asset: { _ref: 'https://picsum.photos/600/400?random=2', _type: "reference" }
    },
    excerpt: "Découvrez comment transformer les obstacles en opportunités",
    publishedAt: "2024-03-19",
    categories: [{ _id: 'cat2', title: 'Mental', slug: { _type: "slug", current: 'mental' } }],
    readingTime: '8 min'
  },
  {
    _id: '3',
    title: "Comment développer son leadership authentique",
    slug: { _type: "slug", current: 'developper-leadership' },
    mainImage: {
      _type: "image",
      asset: { _ref: 'https://picsum.photos/600/400?random=3', _type: "reference" }
    },
    excerpt: "Les qualités essentielles d'un leader moderne",
    publishedAt: "2024-03-18",
    categories: [{ _id: 'cat3', title: 'Leadership', slug: { _type: "slug", current: 'leadership' } }],
    readingTime: '10 min'
  },
  {
    _id: '4',
    title: "Les clés d'une communication impactante",
    slug: { _type: "slug", current: 'communication-impactante' },
    mainImage: {
      _type: "image",
      asset: { _ref: 'https://picsum.photos/600/400?random=4', _type: "reference" }
    },
    excerpt: "Techniques pour captiver votre audience",
    publishedAt: "2024-03-17",
    categories: [{ _id: 'cat4', title: 'Skills', slug: { _type: "slug", current: 'skills' } }],
    readingTime: '6 min'
  },
  {
    _id: '5',
    title: "Innovation et développement durable : le duo gagnant",
    slug: { _type: "slug", current: 'innovation-durable' },
    mainImage: {
      _type: "image",
      asset: { _ref: 'https://picsum.photos/600/400?random=5', _type: "reference" }
    },
    excerpt: "Concilier croissance et responsabilité",
    publishedAt: "2024-03-16",
    categories: [{ _id: 'cat5', title: 'Business', slug: { _type: "slug", current: 'business' } }],
    readingTime: '9 min'
  },
  {
    _id: '6',
    title: "Le pouvoir du storytelling dans le business",
    slug: { _type: "slug", current: 'pouvoir-storytelling' },
    mainImage: {
      _type: "image",
      asset: { _ref: 'https://picsum.photos/600/400?random=6', _type: "reference" }
    },
    excerpt: "L'art de raconter des histoires qui marquent",
    publishedAt: "2024-03-15",
    categories: [{ _id: 'cat6', title: 'Marketing', slug: { _type: "slug", current: 'marketing' } }],
    readingTime: '7 min'
  }
];

const dailyQuotes = [
  {
    text: "Le succès n'est pas une destination, c'est un voyage constant d'apprentissage et de dépassement de soi.",
    author: "Roger Ormières",
    role: "Fondateur High Value"
  },
  {
    text: "L'excellence n'est jamais un accident. C'est toujours le résultat d'une intention élevée et d'une exécution intelligente.",
    author: "Sarah Mitchell",
    role: "CEO Fortune 500"
  },
  {
    text: "Votre mindset détermine votre plafond. Élevez vos pensées, élevez votre vie.",
    author: "Marcus Chen",
    role: "Serial Entrepreneur"
  }
];

export const HeroSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState<SanityArticle>(mockFeaturedArticle);
  const [recentArticles, setRecentArticles] = useState<SanityArticle[]>(mockRecentArticles);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Rotation automatique des citations
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % dailyQuotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const sanityArticles = await getAllArticles();
        
        if (sanityArticles && sanityArticles.length > 0) {
          setFeaturedArticle(sanityArticles[0]);
          setRecentArticles(sanityArticles.slice(1, 7));
          setDataSource('cms');
        } else {
          setFeaturedArticle(mockFeaturedArticle);
          setRecentArticles(mockRecentArticles);
          setDataSource('mock');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setFeaturedArticle(mockFeaturedArticle);
        setRecentArticles(mockRecentArticles);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </section>
    );
  }

  const currentQuote = dailyQuotes[currentQuoteIndex];
  const categoryColors = {
    'Story': 'from-amber-500 to-orange-500',
    'Business': 'from-blue-500 to-cyan-500',
    'Mental': 'from-purple-500 to-violet-500',
    'Society': 'from-emerald-500 to-teal-500',
    'Mindset': 'from-purple-500 to-violet-500',
    'Leadership': 'from-pink-500 to-rose-500',
    'Skills': 'from-amber-500 to-orange-500',
    'Marketing': 'from-blue-500 to-cyan-500',
    'Productivité': 'from-amber-500 to-orange-500'
  };

  return (
    <ErrorBoundary>
      <section className="relative min-h-screen flex items-center py-12">
        {/* Background animé spectaculaire */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black" />
          
          {/* Particules animées */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight 
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                transition={{
                  duration: 20 + Math.random() * 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Mesh gradient */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px] animate-pulse animation-delay-2000" />
          </div>
        </div>

        <div className="container relative z-10">
          {/* Hero Principal avec Featured Article */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Article Principal - Plus grand */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-8"
            >
              <Link to={`/article/${featuredArticle.slug?.current}`} className="group block relative h-full">
                <div className="relative h-full min-h-[500px] lg:min-h-[600px] rounded-3xl overflow-hidden">
                  {/* Image de fond */}
                  <SafeImage
                    source={featuredArticle.mainImage}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Overlay gradient amélioré */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                  
                  {/* Badge "À LA UNE" plus élégant */}
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-8 left-8"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full">
                      <Sparkles className="w-4 h-4 text-accent-cyan animate-pulse" />
                      <span className="text-sm font-medium text-white uppercase tracking-wider">À la une</span>
                      <div className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                  
                  {/* Contenu */}
                  <div className="absolute inset-x-0 bottom-0 p-8 lg:p-12">
                    {featuredArticle.categories?.[0] && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-block mb-4"
                      >
                        <span className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${categoryColors[featuredArticle.categories[0].title] || 'from-gray-500 to-gray-600'} rounded-full`}>
                          <Star className="w-4 h-4 text-white fill-white" />
                          <span className="text-sm font-medium text-white">
                            {featuredArticle.categories[0].title}
                          </span>
                        </span>
                      </motion.div>
                    )}
                    
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
                    >
                      {featuredArticle.title}
                    </motion.h1>
                    
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span>{featuredArticle.readingTime || '10 min'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredArticle.publishedAt || '').toLocaleDateString('fr-FR')}</span>
                      </div>
                      <motion.span 
                        className="inline-flex items-center gap-2 text-white font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Lire l'article
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Citation du jour - Améliorée */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="relative h-full">
                <div className="sticky top-8">
                  {/* Header de la citation */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Quote className="w-5 h-5 text-accent-violet" />
                      <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                        Citation du jour
                      </span>
                    </div>
                    <button
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {isAutoPlay ? (
                        <Pause className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Play className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Citation Card */}
                  <div className="relative bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl border border-violet-500/20 rounded-2xl p-8 overflow-hidden">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuoteIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                      >
                        <Quote className="w-8 h-8 text-violet-400/30 mb-4" />
                        
                        <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-6">
                          {currentQuote.text}
                        </blockquote>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <cite className="block text-white font-semibold not-italic">
                              {currentQuote.author}
                            </cite>
                            <span className="text-sm text-gray-400">
                              {currentQuote.role}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Progress dots */}
                    <div className="flex gap-2 mt-6">
                      {dailyQuotes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuoteIndex(index)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index === currentQuoteIndex 
                              ? 'w-8 bg-violet-400' 
                              : 'w-4 bg-violet-400/30 hover:bg-violet-400/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Stats rapides */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    {[
                      { label: 'Articles', value: '500+' },
                      { label: 'Lecteurs', value: '12K+' },
                      { label: 'Minutes', value: '50K+' }
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section titre pour les articles récents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Articles </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                tendances
              </span>
            </h2>
            <p className="text-gray-400">Les contenus qui font parler la communauté</p>
          </motion.div>

          {/* Grille d'articles récents - Design cards modernes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentArticles.map((article, index) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/article/${article.slug?.current}`} className="block h-full">
                  <div className="relative h-full bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300">
                    {/* Image avec ratio 16:9 */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SafeImage
                        source={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Badge catégorie */}
                      {article.categories?.[0] && (
                        <div className="absolute top-4 left-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full`}>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${categoryColors[article.categories[0].title] || 'from-gray-400 to-gray-500'}`} />
                            <span className="text-xs font-medium text-white">
                              {article.categories[0].title}
                            </span>
                          </span>
                        </div>
                      )}

                      {/* Reading time overlay */}
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                          <Clock className="w-3 h-3 text-white" />
                          <span className="text-xs font-medium text-white">
                            {article.readingTime || '5 min'}
                          </span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <time className="text-xs text-gray-500">
                          {new Date(article.publishedAt || '').toLocaleDateString('fr-FR')}
                        </time>
                        
                        <motion.div 
                          className="flex items-center gap-1 text-blue-400 text-sm"
                          whileHover={{ x: 3 }}
                        >
                          <span>Lire</span>
                          <ArrowRight className="w-3 h-3" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA vers tous les articles - Amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link 
              to="/articles" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Découvrir tous les articles</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="mt-4 text-gray-500 text-sm">
              Plus de 500 articles pour nourrir votre ambition
            </p>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;