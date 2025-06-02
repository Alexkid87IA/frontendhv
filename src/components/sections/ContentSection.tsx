import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { getContentItems } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
          setDataSource('mock');
          console.log(`Aucun contenu trouvé dans Sanity pour ${sectionType}`);
        }
      } catch (err) {
        console.error(`Erreur lors de la récupération du contenu ${sectionType}:`, err);
        setError(`Impossible de charger le contenu ${sectionType}`);
        setDataSource('mock');
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

  if (isLoading) {
    return (
      <section className="py-20 relative overflow-hidden">
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

  if (!items.length) return null;

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
            <div className="inline-block relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
              <span className="relative inline-block px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
                {title}
              </span>
            </div>
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
              aria-label={`Carrousel de ${sectionType === 'emission' ? 'émissions' : sectionType === 'business-idea' ? 'études de cas' : 'success stories'}`}
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
                    className="block group"
                  >
                    <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-accent-blue/30">
                      {/* Image Container */}
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <SafeImage
                          source={item.mainImage}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          fallbackText={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {item.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <time className="text-sm text-gray-400" dateTime={item.publishedAt}>
                            {new Date(item.publishedAt || '').toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          
                          <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                            <span>Lire</span>
                            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                          </span>
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