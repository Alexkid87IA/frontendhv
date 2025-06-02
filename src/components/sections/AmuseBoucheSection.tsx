import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        _ref: 'https://picsum.photos/400/300?random=1',
        _type: "reference"
      }
    },
    excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
    publishedAt: "2024-03-20"
  },
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { _type: "slug", current: 'resilience-entrepreneuriale' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'image-2',
        _type: "reference"
      }
    },
    excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
    publishedAt: "2024-03-19"
  },
  {
    _id: '3',
    title: "Les clés d'une communication impactante",
    slug: { _type: "slug", current: 'communication-impactante' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'image-3',
        _type: "reference"
      }
    },
    excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
    publishedAt: "2024-03-18"
  },
  {
    _id: '4',
    title: "Développer sa créativité au quotidien",
    slug: { _type: "slug", current: 'creativite-quotidien' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'image-4',
        _type: "reference"
      }
    },
    excerpt: "Techniques et habitudes pour stimuler votre créativité et innover constamment.",
    publishedAt: "2024-03-17"
  },
  {
    _id: '5',
    title: "Les habitudes des entrepreneurs à succès",
    slug: { _type: "slug", current: 'habitudes-entrepreneurs' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'image-5',
        _type: "reference"
      }
    },
    excerpt: "Découvrez les routines quotidiennes qui font la différence dans votre parcours entrepreneurial.",
    publishedAt: "2024-03-16"
  },
  {
    _id: '6',
    title: "Le pouvoir du storytelling en business",
    slug: { _type: "slug", current: 'storytelling-business' },
    coverImage: {
      _type: "image",
      asset: {
        _ref: 'image-6',
        _type: "reference"
      }
    },
    excerpt: "Comment utiliser les histoires pour captiver votre audience et développer votre marque.",
    publishedAt: "2024-03-15"
  }
];

const AmuseBoucheSection = ({
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

  useEffect(() => {
    const fetchAmuseBouches = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const amuseBouchesData = await getAmuseBouches(6);
        
        if (amuseBouchesData && amuseBouchesData.length > 0) {
          setVideos(amuseBouchesData);
          setDataSource('cms');
          console.log("Amuses-bouches récupérés depuis Sanity CMS");
        } else {
          setVideos(mockAmuseBouches);
          setDataSource('mock');
          console.log("Aucun amuse-bouche trouvé dans Sanity, utilisation des données mockées");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des amuses-bouches:", error);
        setError("Impossible de charger les amuses-bouches");
        
        setVideos(mockAmuseBouches);
        setDataSource('mock');
        console.log("Erreur de chargement depuis Sanity, utilisation des données mockées");
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
      <section className="relative py-20 overflow-hidden">
        <div className="container flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error && !videos.length) {
    return (
      <section className="py-20">
        <div className="container">
          <div className="text-center text-red-500">
            <p>{error}</p>
            <p className="mt-2">Veuillez réessayer ultérieurement.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!videos.length) {
    return null;
  }

  return (
    <ErrorBoundary>
      <section className="relative py-20 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
              <span className="relative inline-block px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
                Format court
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              {title}
              {dataSource === 'mock' && <span className="text-sm text-gray-400 ml-2">(démo)</span>}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {description}
            </p>
          </motion.div>

          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute -top-20 right-0 flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Voir les amuses-bouches précédents"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Voir les amuses-bouches suivants"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Videos Grid */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
              role="region"
              aria-label="Carrousel d'amuses-bouches"
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-none w-[400px]"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Link to={`/article/${video.slug?.current || '#'}`} className="block group">
                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:scale-[1.02]">
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <SafeImage
                          source={video.coverImage}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          fallbackText={video.title}
                          width={400}
                          height={225}
                        />
                        
                        {/* Enhanced Overlay Effects */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold tracking-tight leading-tight mb-3 text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        
                        {video.excerpt && (
                          <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                            {video.excerpt}
                          </p>
                        )}
                        
                        {/* Progress Bar */}
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: activeIndex === index ? "30%" : "0%" }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-accent-blue"
                          />
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
    </ErrorBoundary>
  );
};

export default AmuseBoucheSection;

export { AmuseBoucheSection };