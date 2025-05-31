import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Données de démonstration
  const items = [
    {
      id: '1',
      title: "Comment développer un mindset d'exception",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      description: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible."
    },
    {
      id: '2',
      title: "L'art de la résilience entrepreneuriale",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
      description: "Comment transformer les obstacles en opportunités et rebondir face aux défis."
    },
    {
      id: '3',
      title: "Les clés d'une communication impactante",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
      description: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence."
    },
    {
      id: '4',
      title: "Innovation et développement durable",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
      description: "Concilier croissance et responsabilité environnementale dans l'entrepreneuriat moderne."
    }
  ];

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
  }, []);

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

  return (
    <ErrorBoundary>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
        
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-4">
              {sectionType === 'emission' 
                ? 'Émissions'
                : sectionType === 'business-idea'
                ? 'Idées Business'
                : 'Success Stories'
              }
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
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
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content Grid */}
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-none w-[300px]"
                >
                  <Link 
                    to={`/${sectionType}/${item.id}`} 
                    className="block group"
                  >
                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:scale-[1.02]">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <SafeImage
                          image={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          fallbackText={item.title}
                        />
                        
                        {/* Overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold tracking-tight leading-tight mb-3 text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-end">
                          <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                            <span>Découvrir</span>
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