import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getContentItems } from '../../utils/sanityAPI';
import { SanityPodcast, SanityCaseStudy, SanitySuccessStory } from '../../types/sanity';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

type ContentItem = SanityPodcast | SanityCaseStudy | SanitySuccessStory;

// Données mockées pour fallback
const mockItems = {
  'emission': [
    {
      _id: '1',
      title: "Comment développer un mindset d'exception",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=1',
          _type: "reference"
        }
      },
      excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
      slug: { _type: "slug", current: 'mindset-exception' }
    },
    // ... autres items mockés
  ],
  'business-idea': [
    {
      _id: '6',
      title: "Étude de cas : La transformation digitale de Carrefour",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-6',
          _type: "reference"
        }
      },
      excerpt: "Comment le géant de la distribution a réinventé son modèle commercial face à Amazon.",
      slug: { _type: "slug", current: 'transformation-digitale-carrefour' }
    },
    // ... autres items mockés
  ],
  'success-story': [
    {
      _id: '11',
      title: "De l'échec à la réussite : l'histoire de Michel et Augustin",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=11',
          _type: "reference"
        }
      },
      excerpt: "Comment deux amis ont créé une marque alimentaire iconique après plusieurs échecs.",
      slug: { _type: "slug", current: 'michel-augustin-success' }
    },
    // ... autres items mockés
  ]
};

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await getContentItems(sectionType, 5);
        
        if (result && result.length > 0) {
          setItems(result);
          setDataSource('cms');
          console.log(`Contenu ${sectionType} récupéré depuis Sanity CMS`);
        } else {
          setItems(mockItems[sectionType] as ContentItem[]);
          setDataSource('mock');
          console.log(`Aucun contenu trouvé dans Sanity pour ${sectionType}, utilisation des données mockées`);
        }
      } catch (err) {
        console.error(`Erreur lors de la récupération du contenu ${sectionType}:`, err);
        setError(`Impossible de charger le contenu ${sectionType}`);
        
        setItems(mockItems[sectionType] as ContentItem[]);
        setDataSource('mock');
        console.log(`Erreur de chargement depuis Sanity pour ${sectionType}, utilisation des données mockées`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [sectionType]);

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
  }, [items]);

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

  const getSectionLabel = (type: string) => {
    switch (type) {
      case 'emission':
        return 'Le podcast High Value';
      case 'business-idea':
        return 'Des études de cas';
      case 'success-story':
        return 'Des parcours incroyables';
      default:
        return '';
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        <div className="container relative flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error && !items.length) {
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

  if (!items.length) {
    return null;
  }

  return (
    <ErrorBoundary>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Enhanced Badge */}
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
              <span className="relative inline-block px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
                {getSectionLabel(sectionType)}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4">
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
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-full blur opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative p-3 bg-black rounded-full text-white hover:text-accent-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-5 h-5" />
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-full blur opacity-50 group-hover:opacity-75 transition-all duration-300"></div>
                <div className="relative p-3 bg-black rounded-full text-white hover:text-accent-blue disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.button>
            </div>

            {/* Content Grid */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
              role="region"
              aria-label={`Carrousel de ${sectionType === 'emission' ? 'podcasts' : sectionType === 'business-idea' ? 'études de cas' : 'success stories'}`}
            >
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-none w-[400px]"
                >
                  <Link 
                    to={`/${sectionType}/${item.slug?.current}`} 
                    className="group relative block"
                    aria-label={item.title}
                  >
                    {/* Enhanced Card Design */}
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-2xl blur opacity-50 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative bg-black rounded-2xl overflow-hidden">
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden">
                          <SafeImage
                            source={item.mainImage}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            fallbackText={item.title}
                          />
                          {/* Enhanced Overlay Effects */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        
                        {/* Content */}
                        <div className="p-8">
                          <h3 className="text-xl font-bold mb-4 text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          
                          <p className="text-gray-300 text-base mb-6 line-clamp-3">
                            {item.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                              <span>Découvrir</span>
                              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                            </span>
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
    </ErrorBoundary>
  );
};

export default ContentSection;