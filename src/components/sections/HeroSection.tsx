import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Quote, Calendar, Clock, User, Sparkles, TrendingUp, Star, Play, Pause, Volume2, VolumeX, Share2, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { sanityClient } from '../../utils/sanityClient';
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
    role: "Fondateur High Value",
    avatar: "RO"
  },
  {
    text: "L'excellence n'est jamais un accident. C'est toujours le résultat d'une intention élevée et d'une exécution intelligente.",
    author: "Sarah Mitchell",
    role: "CEO Fortune 500",
    avatar: "SM"
  },
  {
    text: "Votre mindset détermine votre plafond. Élevez vos pensées, élevez votre vie.",
    author: "Marcus Chen",
    role: "Serial Entrepreneur",
    avatar: "MC"
  }
];

export const HeroSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState<SanityArticle>(mockFeaturedArticle);
  const [recentArticles, setRecentArticles] = useState<SanityArticle[]>(mockRecentArticles);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  // Motion values pour l'effet 3D
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const currentQuote = dailyQuotes[currentQuoteIndex];

  // Effet typewriter pour la citation
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    
    const text = currentQuote.text;
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentQuoteIndex, currentQuote.text]);

  // Rotation automatique des citations
  useEffect(() => {
    if (isAutoPlay && !isTyping) {
      const timeout = setTimeout(() => {
        handleNextQuote();
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlay, isTyping, currentQuoteIndex]);

  const handleNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % dailyQuotes.length);
  };

  const handlePrevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + dailyQuotes.length) % dailyQuotes.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // MODIFICATION ICI : Utilisation des champs isFeatured et isTrending
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer l'article à la une (featured)
        const featuredQuery = `*[_type == "article" && isFeatured == true][0] {
          _id,
          title,
          slug,
          mainImage,
          excerpt,
          publishedAt,
          readingTime,
          categories[0]->{
            title,
            slug
          }
        }`;
        
        // Récupérer les articles tendances
        const trendingQuery = `*[_type == "article" && isTrending == true] | order(trendingOrder asc, publishedAt desc)[0...6] {
          _id,
          title,
          slug,
          mainImage,
          excerpt,
          publishedAt,
          readingTime,
          categories[0]->{
            title,
            slug
          },
          trendingOrder
        }`;
        
        // Exécuter les deux requêtes en parallèle
        const [featuredResult, trendingResult] = await Promise.all([
          sanityClient.fetch(featuredQuery),
          sanityClient.fetch(trendingQuery)
        ]);
        
        // Gérer l'article à la une
        if (featuredResult) {
          setFeaturedArticle(featuredResult);
          console.log('Article à la une récupéré depuis Sanity');
        } else {
          // Fallback : prendre le premier article récent si pas d'article featured
          console.log('Pas d\'article featured, utilisation du fallback');
          const fallbackFeaturedQuery = `*[_type == "article"] | order(publishedAt desc)[0] {
            _id,
            title,
            slug,
            mainImage,
            excerpt,
            publishedAt,
            readingTime,
            categories[0]->{
              title,
              slug
            }
          }`;
          const fallbackFeatured = await sanityClient.fetch(fallbackFeaturedQuery);
          if (fallbackFeatured) {
            setFeaturedArticle(fallbackFeatured);
          } else {
            setFeaturedArticle(mockFeaturedArticle);
          }
        }
        
        // Gérer les articles tendances
        if (trendingResult && trendingResult.length > 0) {
          setRecentArticles(trendingResult);
          console.log(`${trendingResult.length} articles tendances récupérés depuis Sanity`);
          setDataSource('cms');
        } else {
          // Fallback : prendre les 6 articles les plus récents
          console.log('Pas d\'articles tendances, utilisation du fallback');
          const fallbackQuery = `*[_type == "article"] | order(publishedAt desc)[0...6] {
            _id,
            title,
            slug,
            mainImage,
            excerpt,
            publishedAt,
            readingTime,
            categories[0]->{
              title,
              slug
            }
          }`;
          
          const fallbackArticles = await sanityClient.fetch(fallbackQuery);
          
          if (fallbackArticles && fallbackArticles.length > 0) {
            setRecentArticles(fallbackArticles);
            console.log('Utilisation du fallback : articles récents');
            setDataSource('cms');
          } else {
            setRecentArticles(mockRecentArticles);
            setDataSource('mock');
            console.log('Utilisation des articles mockés');
          }
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

            {/* Citation du jour - VERSION AMÉLIORÉE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="relative h-full">
                <div className="sticky top-8">
                  {/* Header amélioré */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {/* Badge animé */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse" />
                        <div className="relative flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm rounded-full border border-blue-500/30">
                          <Quote className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-medium text-white uppercase tracking-wider">
                            Inspirations du jour
                          </span>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Contrôles */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all hover:scale-110"
                      >
                        {isAutoPlay ? (
                          <Pause className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Play className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Carte 3D avec effet de perspective */}
                  <motion.div
                    className="relative perspective-1000"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Bordure animée gradient */}
                    <div className="absolute -inset-[1px] rounded-3xl opacity-60">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500" />
                    </div>

                    {/* Carte principale */}
                    <div className="relative bg-black/40 backdrop-blur-2xl border border-blue-500/20 rounded-3xl p-8 overflow-hidden">
                      {/* Particules flottantes dans la carte - SIMPLIFIÉ */}
                      <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                            initial={{
                              x: Math.random() * 100 + '%',
                              y: Math.random() * 100 + '%',
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                              duration: 8 + i * 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      {/* Background pattern */}
                      <div 
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Effet de lumière qui suit le curseur */}
                      <motion.div
                        className="absolute w-32 h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
                        style={{
                          x: mouseX,
                          y: mouseY,
                        }}
                      />
                      
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentQuoteIndex}
                          initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                          exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                          transition={{ duration: 0.5, type: "spring" }}
                          className="relative z-10"
                        >
                          {/* Guillemets stylisés */}
                          <div className="relative mb-6">
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              <Quote className="w-10 h-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400" />
                            </motion.div>
                          </div>
                          
                          {/* Citation avec effet typewriter */}
                          <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-8 min-h-[120px]">
                            {displayedText}
                            {isTyping && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-0.5 h-6 bg-blue-400 ml-1"
                              />
                            )}
                          </blockquote>
                          
                          {/* Auteur avec avatar animé */}
                          <motion.div 
                            className="flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {/* Avatar avec effet glow */}
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-lg opacity-60 animate-pulse" />
                              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                  {currentQuote.avatar}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex-1">
                              <cite className="block text-white font-semibold not-italic">
                                {currentQuote.author}
                              </cite>
                              <span className="text-sm text-gray-400">
                                {currentQuote.role}
                              </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsLiked(!isLiked)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <Heart 
                                  className={`w-4 h-4 transition-all ${
                                    isLiked ? 'text-red-500 fill-red-500' : 'text-gray-400'
                                  }`}
                                />
                              </motion.button>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                              >
                                <Share2 className="w-4 h-4 text-gray-400" />
                              </motion.button>
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation arrows */}
                      <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePrevQuote}
                          className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-white/10 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNextQuote}
                          className="p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 pointer-events-auto hover:bg-white/10 transition-all"
                        >
                          <ChevronRight className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Progress bar avec animation */}
                  <div className="relative mt-6">
                    <div className="flex gap-2">
                      {dailyQuotes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuoteIndex(index)}
                          className="relative flex-1 h-1 bg-blue-400/20 rounded-full overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400"
                            initial={{ scaleX: 0 }}
                            animate={{ 
                              scaleX: index === currentQuoteIndex ? 1 : 0
                            }}
                            transition={{ 
                              duration: index === currentQuoteIndex && isAutoPlay && !isTyping ? 5 : 0.3,
                              ease: "linear"
                            }}
                            style={{ transformOrigin: "left" }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stats avec animation */}
                  <motion.div 
                    className="grid grid-cols-3 gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[
                      { label: 'Inspirés', value: '12K+', icon: Sparkles },
                      { label: 'Partagés', value: '3.5K', icon: Share2 },
                      { label: 'Aimés', value: '8.2K', icon: Heart }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="relative text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <stat.icon className="w-4 h-4 text-blue-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
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

        {/* Styles pour les animations */}
        <style jsx>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;