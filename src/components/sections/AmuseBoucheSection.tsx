import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Clock, Sparkles, TrendingUp } from "lucide-react";
import { getAmuseBouches } from "../../utils/sanityAPI";
import { SanityArticle } from "../../types/sanity";
import { LoadingSpinner } from "../common/LoadingSpinner";
import SafeImage from "../common/SafeImage";
import ErrorBoundary from "../common/ErrorBoundary";

// Données mockées pour fallback
const mockAmuseBouches: SanityArticle[] = [
  {
    _id: '1',
    title: "Comment développer un mindset d'exception",
    slug: { _type: "slug", current: 'mindset-exception' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/600?random=1',
        _type: "reference"
      }
    },
    excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
    publishedAt: "2024-03-20",
    duration: "3 min"
  },
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { _type: "slug", current: 'resilience-entrepreneuriale' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/600?random=2',
        _type: "reference"
      }
    },
    excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
    publishedAt: "2024-03-19",
    duration: "4 min"
  },
  {
    _id: '3',
    title: "Les clés d'une communication impactante",
    slug: { _type: "slug", current: 'communication-impactante' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/600?random=3',
        _type: "reference"
      }
    },
    excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
    publishedAt: "2024-03-18",
    duration: "2 min"
  },
  {
    _id: '4',
    title: "Développer sa créativité au quotidien",
    slug: { _type: "slug", current: 'creativite-quotidien' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/600?random=4',
        _type: "reference"
      }
    },
    excerpt: "Techniques et habitudes pour stimuler votre créativité et innover constamment.",
    publishedAt: "2024-03-17",
    duration: "5 min"
  },
  {
    _id: '5',
    title: "Les habitudes des entrepreneurs à succès",
    slug: { _type: "slug", current: 'habitudes-entrepreneurs' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/600?random=5',
        _type: "reference"
      }
    },
    excerpt: "Découvrez les routines quotidiennes qui font la différence dans votre parcours entrepreneurial.",
    publishedAt: "2024-03-16",
    duration: "3 min"
  }
];

export const AmuseBoucheSection = ({
  title = "Amuses-bouches",
  description = "Des conseils percutants en format court",
}: {
  title?: string;
  description?: string;
}) => {
  const [videos, setVideos] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmuseBouches = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const amuseBouchesData = await getAmuseBouches(10);
        
        if (amuseBouchesData && amuseBouchesData.length > 0) {
          setVideos(amuseBouchesData);
          setDataSource('cms');
        } else {
          setVideos(mockAmuseBouches);
          setDataSource('mock');
        }
      } catch (error) {
        console.error("Erreur lors du chargement des amuses-bouches:", error);
        setError("Impossible de charger les amuses-bouches");
        setVideos(mockAmuseBouches);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAmuseBouches();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      const timeoutId = setTimeout(checkScrollButtons, 500);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(timeoutId);
      };
    }
  }, [videos, isLoading]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <section className="relative py-24 overflow-hidden bg-black">
        {/* Fond animé avec particules et gradients */}
        <div className="absolute inset-0">
          {/* Gradient mesh animé */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-full blur-[120px] animate-pulse animation-delay-2000" />
          
          {/* Particules flottantes */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Grille de points subtile */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="container relative z-10">
          {/* En-tête de section amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Badge avec effet glow */}
            <div className="inline-block relative mb-8">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
              <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-black/80 backdrop-blur-sm rounded-full border border-white/10">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">Format court • Haute valeur</span>
                <TrendingUp className="w-4 h-4 text-violet-400" />
              </div>
            </div>

            {/* Titre avec gradient animé */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Amuses</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 animate-gradient">
                -bouches
              </span>
              {dataSource === 'mock' && (
                <span className="inline-block ml-3 px-3 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded-full border border-yellow-500/20">
                  Démo
                </span>
              )}
            </h2>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
          </motion.div>

          <div className="relative">
            {/* Boutons de navigation repositionnés */}
            <div className="absolute -top-20 right-0 z-20 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Voir les amuses-bouches précédents"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="group p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Voir les amuses-bouches suivants"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Carrousel de cartes */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-none scroll-smooth"
              role="region"
              aria-label="Carrousel d'amuses-bouches"
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex-none w-[320px]"
                  onMouseEnter={() => setHoveredCard(video._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <Link to={`/article/${video.slug?.current || '#'}`} className="block group">
                    <div className="relative h-full">
                      {/* Effet de glow au hover */}
                      <AnimatePresence>
                        {hoveredCard === video._id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute -inset-1 bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-pink-500/50 rounded-3xl blur-xl"
                          />
                        )}
                      </AnimatePresence>

                      {/* Carte principale */}
                      <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:transform group-hover:scale-[1.02]">
                        {/* Image avec overlay */}
                        <div className="relative aspect-[9/16] w-full overflow-hidden">
                          <SafeImage
                            source={video.coverImage}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                          
                          {/* Badge durée */}
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                            <Clock className="w-3 h-3 text-blue-400" />
                            <span className="text-xs font-medium text-white">
                              {video.duration || '3 min'}
                            </span>
                          </div>

                          {/* Bouton play au centre */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="p-5 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/30">
                              <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                          </motion.div>

                          {/* Contenu en bas de l'image */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                              {video.title}
                            </h3>

                            {/* Footer de la carte */}
                            <div className="flex items-center justify-between mt-4">
                              <time className="text-xs text-gray-400">
                                {new Date(video.publishedAt || '').toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'short'
                                })}
                              </time>
                              
                              <motion.span 
                                className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400"
                                animate={{ opacity: hoveredCard === video._id ? 1 : 0.7 }}
                              >
                                Découvrir →
                              </motion.span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Indicateurs de progression */}
            <div className="flex justify-center gap-2 mt-8">
              {videos.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const cardWidth = 320 + 24; // width + gap
                      scrollRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-gradient-to-r from-blue-400 to-violet-400' 
                      : 'w-2 bg-white/20 hover:bg-white/30'
                  }`}
                  aria-label={`Aller à l'amuse-bouche ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Ajout du style pour l'animation du gradient */}
        <style jsx>{`
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    </ErrorBoundary>
  );
};

export default AmuseBoucheSection;