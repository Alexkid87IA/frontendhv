import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Données de démonstration
  const items = [
    {
      id: '1',
      title: sectionType === 'emission' 
        ? "Comment développer un mindset d'exception" 
        : sectionType === 'business-idea'
        ? "SaaS IA pour la vente B2B"
        : "De 0 à 1M€ en 8 mois",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
      excerpt: sectionType === 'emission'
        ? "Une conversation inspirante sur le développement personnel et la réussite"
        : sectionType === 'business-idea'
        ? "Une opportunité dans le marché en pleine expansion de l'IA pour les ventes"
        : "L'histoire de TechInno, une startup qui a su trouver son product-market fit",
      author: {
        name: "Roger Ormières",
        image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj"
      },
      duration: "45:00",
      date: "2024-03-15",
      metrics: sectionType === 'business-idea' 
        ? { market: "€8.5B", growth: "45%", margin: "89%" }
        : sectionType === 'success-story'
        ? { revenue: "1M€", time: "8 mois", team: "5" }
        : undefined
    },
    {
      id: '2',
      title: sectionType === 'emission'
        ? "L'art de la résilience entrepreneuriale"
        : sectionType === 'business-idea'
        ? "Marketplace Impact Environnemental"
        : "Levée de fonds de 2.5M€",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
      excerpt: sectionType === 'emission'
        ? "Comment transformer les obstacles en opportunités"
        : sectionType === 'business-idea'
        ? "Une plateforme B2B pour la transition écologique des entreprises"
        : "Comment EcoFlow a convaincu les investisseurs en série A",
      author: {
        name: "Sarah Chen",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
      },
      duration: "52:00",
      date: "2024-03-08",
      metrics: sectionType === 'business-idea'
        ? { market: "€12B", growth: "35%", margin: "75%" }
        : sectionType === 'success-story'
        ? { revenue: "2.5M€", time: "12 mois", team: "12" }
        : undefined
    },
    {
      id: '3',
      title: sectionType === 'emission'
        ? "Innovation et développement durable"
        : sectionType === 'business-idea'
        ? "EdTech Métavers"
        : "Expansion internationale réussie",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
      excerpt: sectionType === 'emission'
        ? "Concilier croissance et responsabilité environnementale"
        : sectionType === 'business-idea'
        ? "Formation professionnelle en réalité virtuelle"
        : "Comment DigitalNow s'est développé dans 5 pays en 18 mois",
      author: {
        name: "Thomas Martin",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      },
      duration: "38:00",
      date: "2024-03-01",
      metrics: sectionType === 'business-idea'
        ? { market: "€5B", growth: "55%", margin: "82%" }
        : sectionType === 'success-story'
        ? { revenue: "5M€", time: "18 mois", team: "25" }
        : undefined
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
                ? 'Émission'
                : sectionType === 'business-idea'
                ? 'Opportunité Business'
                : 'Success Story'
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
                  className="flex-none w-[400px]"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Link 
                    to={`/${sectionType === 'emission' 
                      ? 'emission' 
                      : sectionType === 'business-idea'
                      ? 'business-idea'
                      : 'success-story'}/${item.id}`} 
                    className="block group"
                  >
                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:scale-[1.02]">
                      <div className="relative aspect-video w-full overflow-hidden">
                        <SafeImage
                          image={item.image}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          fallbackText={item.title}
                        />
                        
                        {/* Overlay gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity" />

                        {/* Play button for emissions */}
                        {sectionType === 'emission' && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-blue"
                            >
                              <Play size={24} className="text-white ml-1" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-6">
                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                          <SafeImage
                            image={item.author.image}
                            alt={item.author.name}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                            fallbackText={item.author.name.charAt(0)}
                          />
                          <div>
                            <span className="block text-sm font-medium text-white">
                              {item.author.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(item.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold tracking-tight leading-tight mb-2 text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                          {item.excerpt}
                        </p>

                        {/* Metrics */}
                        {item.metrics && (
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            {Object.entries(item.metrics).map(([key, value], idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-lg font-bold text-accent-blue">
                                  {value}
                                </div>
                                <div className="text-xs text-gray-400 capitalize">
                                  {key}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Duration for emissions */}
                        {sectionType === 'emission' && (
                          <div className="text-sm text-gray-400">
                            Durée : {item.duration}
                          </div>
                        )}

                        {/* Progress bar */}
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden mt-4">
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

export default ContentSection;