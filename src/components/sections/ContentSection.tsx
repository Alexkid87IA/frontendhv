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
    {
      _id: '2',
      title: "L'art de la résilience entrepreneuriale",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-2',
          _type: "reference"
        }
      },
      excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
      slug: { _type: "slug", current: 'resilience-entrepreneuriale' }
    },
    {
      _id: '3',
      title: "Les clés d'une communication impactante",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-3',
          _type: "reference"
        }
      },
      excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
      slug: { _type: "slug", current: 'communication-impactante' }
    },
    {
      _id: '4',
      title: "Innovation et développement durable",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-4',
          _type: "reference"
        }
      },
      excerpt: "Concilier croissance et responsabilité environnementale dans l'entrepreneuriat moderne.",
      slug: { _type: "slug", current: 'innovation-developpement-durable' }
    },
    {
      _id: '5',
      title: "Leadership et management d'équipe",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-5',
          _type: "reference"
        }
      },
      excerpt: "Les meilleures pratiques pour inspirer et diriger des équipes performantes.",
      slug: { _type: "slug", current: 'leadership-management' }
    }
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
    {
      _id: '7',
      title: "Comment Decathlon a conquis le marché mondial",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-7',
          _type: "reference"
        }
      },
      excerpt: "Stratégie d'expansion et innovation produit : les clés du succès international.",
      slug: { _type: "slug", current: 'decathlon-marche-mondial' }
    },
    {
      _id: '8',
      title: "Le modèle disruptif de Free dans les télécoms",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-8',
          _type: "reference"
        }
      },
      excerpt: "Comment Xavier Niel a bouleversé le marché des télécommunications en France.",
      slug: { _type: "slug", current: 'modele-disruptif-free' }
    },
    {
      _id: '9',
      title: "La stratégie de contenu de Michelin",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'image-9',
          _type: "reference"
        }
      },
      excerpt: "Du guide gastronomique aux pneus : l'histoire d'une stratégie de contenu centenaire.",
      slug: { _type: "slug", current: 'strategie-contenu-michelin' }
    },
    {
      _id: '10',
      title: "Comment BlaBlaCar a créé un nouveau marché",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=10',
          _type: "reference"
        }
      },
      excerpt: "L'histoire de la licorne française qui a révolutionné le covoiturage en Europe.",
      slug: { _type: "slug", current: 'blablacar-nouveau-marche' }
    }
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
    {
      _id: '12',
      title: "Le parcours inspirant de Maud Fontenoy",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=12',
          _type: "reference"
        }
      },
      excerpt: "De la traversée des océans à la défense de l'environnement : un leadership exemplaire.",
      slug: { _type: "slug", current: 'parcours-maud-fontenoy' }
    },
    {
      _id: '13',
      title: "Comment Octave Klaba a bâti OVH",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=13',
          _type: "reference"
        }
      },
      excerpt: "L'histoire du champion français du cloud computing qui défie les géants américains.",
      slug: { _type: "slug", current: 'octave-klaba-ovh' }
    },
    {
      _id: '14',
      title: "Catherine Barba : pionnière du e-commerce français",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=14',
          _type: "reference"
        }
      },
      excerpt: "Le parcours d'une entrepreneuse visionnaire qui a su anticiper la révolution digitale.",
      slug: { _type: "slug", current: 'catherine-barba-ecommerce' }
    },
    {
      _id: '15',
      title: "Marc Simoncini : de Meetic à Angell Bike",
      mainImage: {
        _type: "image",
        asset: {
          _ref: 'https://picsum.photos/400/300?random=15',
          _type: "reference"
        }
      },
      excerpt: "Le parcours d'un serial entrepreneur français qui réinvente la mobilité urbaine.",
      slug: { _type: "slug", current: 'marc-simoncini-parcours' }
    }
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
          // Fallback vers les données mockées
          setItems(mockItems[sectionType] as ContentItem[]);
          setDataSource('mock');
          console.log(`Aucun contenu trouvé dans Sanity pour ${sectionType}, utilisation des données mockées`);
        }
      } catch (err) {
        console.error(`Erreur lors de la récupération du contenu ${sectionType}:`, err);
        setError(`Impossible de charger le contenu ${sectionType}`);
        
        // Fallback vers les données mockées en cas d'erreur
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
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
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
                aria-label={`Voir les ${sectionType === 'emission' ? 'podcasts' : sectionType === 'business-idea' ? 'études de cas' : 'success stories'} précédents`}
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label={`Voir les ${sectionType === 'emission' ? 'podcasts' : sectionType === 'business-idea' ? 'études de cas' : 'success stories'} suivants`}
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
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
                  className="flex-none w-[300px]"
                >
                  <Link 
                    to={`/${sectionType}/${item.slug?.current}`} 
                    className="block group"
                    aria-label={item.title}
                  >
                    <div className="relative bg-gradient-to-br from-neutral-900 to-black border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30 hover:scale-[1.02]">
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <SafeImage
                          image={item.mainImage}
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          fallbackText={item.title}
                          width={300}
                          height={225}
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
                            <ArrowRight size={16} aria-hidden="true" />
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
