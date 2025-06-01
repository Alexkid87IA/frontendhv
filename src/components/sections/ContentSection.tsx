import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';
import { sanityClient } from '../../utils/sanityClient';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

interface ContentItem {
  _id: string;
  title: string;
  mainImage?: any;
  excerpt?: string;
  slug?: {
    current: string;
  };
}

// Données mockées pour fallback
const mockItems = {
  'emission': [
    {
      _id: '1',
      title: "Comment développer un mindset d'exception",
      mainImage: {
        asset: {
          _ref: 'image-1',
          url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
      slug: { current: 'mindset-exception' }
    },
    {
      _id: '2',
      title: "L'art de la résilience entrepreneuriale",
      mainImage: {
        asset: {
          _ref: 'image-2',
          url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
      slug: { current: 'resilience-entrepreneuriale' }
    },
    {
      _id: '3',
      title: "Les clés d'une communication impactante",
      mainImage: {
        asset: {
          _ref: 'image-3',
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
      slug: { current: 'communication-impactante' }
    },
    {
      _id: '4',
      title: "Innovation et développement durable",
      mainImage: {
        asset: {
          _ref: 'image-4',
          url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Concilier croissance et responsabilité environnementale dans l'entrepreneuriat moderne.",
      slug: { current: 'innovation-developpement-durable' }
    },
    {
      _id: '5',
      title: "Leadership et management d'équipe",
      mainImage: {
        asset: {
          _ref: 'image-5',
          url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Les meilleures pratiques pour inspirer et diriger des équipes performantes.",
      slug: { current: 'leadership-management' }
    }
  ],
  'business-idea': [
    {
      _id: '6',
      title: "Étude de cas : La transformation digitale de Carrefour",
      mainImage: {
        asset: {
          _ref: 'image-6',
          url: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Comment le géant de la distribution a réinventé son modèle commercial face à Amazon.",
      slug: { current: 'transformation-digitale-carrefour' }
    },
    {
      _id: '7',
      title: "Comment Decathlon a conquis le marché mondial",
      mainImage: {
        asset: {
          _ref: 'image-7',
          url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Stratégie d'expansion et innovation produit : les clés du succès international.",
      slug: { current: 'decathlon-marche-mondial' }
    },
    {
      _id: '8',
      title: "Le modèle disruptif de Free dans les télécoms",
      mainImage: {
        asset: {
          _ref: 'image-8',
          url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Comment Xavier Niel a bouleversé le marché des télécommunications en France.",
      slug: { current: 'modele-disruptif-free' }
    },
    {
      _id: '9',
      title: "La stratégie de contenu de Michelin",
      mainImage: {
        asset: {
          _ref: 'image-9',
          url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Du guide gastronomique aux pneus : l'histoire d'une stratégie de contenu centenaire.",
      slug: { current: 'strategie-contenu-michelin' }
    },
    {
      _id: '10',
      title: "Comment BlaBlaCar a créé un nouveau marché",
      mainImage: {
        asset: {
          _ref: 'image-10',
          url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "L'histoire de la licorne française qui a révolutionné le covoiturage en Europe.",
      slug: { current: 'blablacar-nouveau-marche' }
    }
  ],
  'success-story': [
    {
      _id: '11',
      title: "De l'échec à la réussite : l'histoire de Michel et Augustin",
      mainImage: {
        asset: {
          _ref: 'image-11',
          url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Comment deux amis ont créé une marque alimentaire iconique après plusieurs échecs.",
      slug: { current: 'michel-augustin-success' }
    },
    {
      _id: '12',
      title: "Le parcours inspirant de Maud Fontenoy",
      mainImage: {
        asset: {
          _ref: 'image-12',
          url: "https://images.unsplash.com/photo-1484627147104-f5197bcd6651?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "De la traversée des océans à la défense de l'environnement : un leadership exemplaire.",
      slug: { current: 'parcours-maud-fontenoy' }
    },
    {
      _id: '13',
      title: "Comment Octave Klaba a bâti OVH",
      mainImage: {
        asset: {
          _ref: 'image-13',
          url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "L'histoire du champion français du cloud computing qui défie les géants américains.",
      slug: { current: 'octave-klaba-ovh' }
    },
    {
      _id: '14',
      title: "Catherine Barba : pionnière du e-commerce français",
      mainImage: {
        asset: {
          _ref: 'image-14',
          url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Le parcours d'une entrepreneuse visionnaire qui a su anticiper la révolution digitale.",
      slug: { current: 'catherine-barba-ecommerce' }
    },
    {
      _id: '15',
      title: "Marc Simoncini : de Meetic à Angell Bike",
      mainImage: {
        asset: {
          _ref: 'image-15',
          url: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80"
        }
      },
      excerpt: "Le parcours d'un serial entrepreneur français qui réinvente la mobilité urbaine.",
      slug: { current: 'marc-simoncini-parcours' }
    }
  ]
};

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('mock');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        
        // Requête Sanity adaptée au type de contenu
        let query = '';
        
        switch(sectionType) {
          case 'emission':
            query = `*[_type == "podcast"] | order(publishedAt desc)[0...5] {
              _id,
              title,
              mainImage,
              excerpt,
              slug
            }`;
            break;
          case 'business-idea':
            query = `*[_type == "caseStudy"] | order(publishedAt desc)[0...5] {
              _id,
              title,
              mainImage,
              excerpt,
              slug
            }`;
            break;
          case 'success-story':
            query = `*[_type == "successStory"] | order(publishedAt desc)[0...5] {
              _id,
              title,
              mainImage,
              excerpt,
              slug
            }`;
            break;
        }
        
        const result = await sanityClient.fetch(query);
        
        if (result && result.length > 0) {
          setItems(result);
          setDataSource('sanity');
          console.log(`Contenu ${sectionType} récupéré depuis Sanity CMS`);
        } else {
          // Fallback vers les données mockées
          setItems(mockItems[sectionType]);
          setDataSource('mock');
          console.log(`Utilisation des données mockées pour ${sectionType} (fallback)`);
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération du contenu ${sectionType}:`, error);
        // Fallback vers les données mockées en cas d'erreur
        setItems(mockItems[sectionType]);
        setDataSource('mock');
        console.log(`Utilisation des données mockées pour ${sectionType} suite à une erreur`);
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
        <div className="container relative flex justify-center items-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

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
              {getSectionLabel(sectionType)}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title}
              {dataSource === 'mock' && <span className="text-sm text-gray-400 ml-2">(démo)</span>}
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
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-none w-[300px]"
                >
                  <Link 
                    to={`/${sectionType}/${item.slug?.current}`} 
                    className="block group"
                  >
                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:scale-[1.02]">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <SafeImage
                          image={item.mainImage}
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
                          {item.excerpt}
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
