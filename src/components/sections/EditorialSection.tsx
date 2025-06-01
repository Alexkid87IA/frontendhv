import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, Brain, Globe } from 'lucide-react';
import { getUniverses } from '../../utils/sanityAPI';
import { SanityUniverse } from '../../types/sanity';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';
import SafeImage from '../common/SafeImage';

// Données mockées pour fallback
const mockedUniverses: SanityUniverse[] = [
  {
    _id: "mock-story",
    title: "Story",
    description: "Des histoires authentiques qui redéfinissent le possible",
    image: {
      _type: "image",
      asset: {
        _ref: "image-mock-story",
        _type: "reference"
      }
    },
    slug: {
      _type: "slug",
      current: "recits"
    },
    order: 1
  },
  {
    _id: "mock-business",
    title: "Business",
    description: "Les stratégies qui font la différence",
    image: {
      _type: "image",
      asset: {
        _ref: "image-mock-business",
        _type: "reference"
      }
    },
    slug: {
      _type: "slug",
      current: "business"
    },
    order: 2
  },
  {
    _id: "mock-mental",
    title: "Mental",
    description: "Développe une psychologie de champion",
    image: {
      _type: "image",
      asset: {
        _ref: "image-mock-mental",
        _type: "reference"
      }
    },
    slug: {
      _type: "slug",
      current: "mental"
    },
    order: 3
  },
  {
    _id: "mock-society",
    title: "Society",
    description: "Comprendre les mutations de notre époque",
    image: {
      _type: "image",
      asset: {
        _ref: "image-mock-society",
        _type: "reference"
      }
    },
    slug: {
      _type: "slug",
      current: "society"
    },
    order: 4
  }
];

// Mapping des gradients pour les univers
const universeGradients: Record<string, string> = {
  "story": "from-amber-500 to-orange-500",
  "recits": "from-amber-500 to-orange-500",
  "business": "from-blue-500 to-cyan-500",
  "mental": "from-purple-500 to-violet-500",
  "society": "from-emerald-500 to-teal-500",
  "default": "from-accent-blue to-accent-turquoise"
};

// Mapping des sous-titres pour les univers
const universeSubtitles: Record<string, string> = {
  "story": "Pour t'inspirer",
  "recits": "Pour t'inspirer",
  "business": "Pour faire du chiffre",
  "mental": "Pour ta tête",
  "society": "Pour ta culture",
  "default": "Pour t'enrichir"
};

// Fonction pour obtenir l'icône appropriée pour un univers
const getUniverseIcon = (slug: string) => {
  switch (slug) {
    case 'recits':
    case 'story':
      return <BookOpen size={24} className="text-white" />;
    case 'business':
      return <Briefcase size={24} className="text-white" />;
    case 'mental':
      return <Brain size={24} className="text-white" />;
    case 'society':
      return <Globe size={24} className="text-white" />;
    default:
      return <BookOpen size={24} className="text-white" />;
  }
};

export const EditorialSection = () => {
  const [universes, setUniverses] = useState<SanityUniverse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const result = await getUniverses();
        
        if (result && result.length > 0) {
          setUniverses(result);
          setDataSource('cms');
          console.log("Univers éditoriaux chargés depuis Sanity CMS");
        } else {
          // Fallback vers les données mockées si aucun résultat
          setUniverses(mockedUniverses);
          setDataSource('mock');
          console.log("Aucun univers trouvé dans Sanity, utilisation des données mockées");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des univers:", err);
        setError("Impossible de charger les univers éditoriaux");
        
        // Fallback vers les données mockées en cas d'erreur
        setUniverses(mockedUniverses);
        setDataSource('mock');
        console.log("Erreur de chargement depuis Sanity, utilisation des données mockées");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUniverses();
  }, []);

  // Fonction pour obtenir le gradient approprié pour un univers
  const getGradient = (slug: string): string => {
    return universeGradients[slug] || universeGradients.default;
  };

  // Fonction pour obtenir le sous-titre approprié pour un univers
  const getSubtitle = (slug: string): string => {
    return universeSubtitles[slug] || universeSubtitles.default;
  };

  if (isLoading) {
    return (
      <section className="container py-12 md:py-20 flex justify-center items-center">
        <LoadingSpinner />
      </section>
    );
  }

  if (error && universes.length === 0) {
    return (
      <section className="container py-12 md:py-20">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2">Veuillez réessayer ultérieurement.</p>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="container py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-4 md:mb-6">
            Univers éditoriaux
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Explorez nos univers
          </h2>
          <p className="text-base md:text-lg text-tertiary max-w-2xl mx-auto px-4 md:px-0">
            Plongez dans nos thématiques phares et découvrez des contenus qui vous inspirent et vous transforment
          </p>
          {dataSource === 'mock' && (
            <div className="mt-2 text-xs text-amber-500">
              (Données de démonstration)
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0" role="list" aria-label="Univers éditoriaux">
          {universes.map((universe, index) => (
            <motion.div
              key={universe._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              role="listitem"
            >
              <Link 
                to={`/rubrique/${universe.slug.current}`}
                className="group relative block aspect-[3/2] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden"
                aria-label={`Univers ${universe.title}: ${universe.description}`}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <SafeImage 
                    image={universe.image}
                    alt={universe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    fallbackText={universe.title}
                    width={600}
                    height={338}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(universe.slug.current)} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative h-full p-4 md:p-8 flex flex-col">
                  {/* Logo - Remplacé par une icône Lucide */}
                  <div className="mb-auto">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                      {getUniverseIcon(universe.slug.current)}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                      {universe.title}
                    </h3>
                    <h4 className="text-lg font-medium text-white/80 mb-1">
                      {getSubtitle(universe.slug.current)}
                    </h4>
                    <p className="text-white/80 text-sm mb-3 md:mb-4 line-clamp-2 group-hover:text-white transition-colors">
                      {universe.description}
                    </p>
                    
                    {/* Hover Effect Line */}
                    <div className="h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full" aria-hidden="true" />
                  </div>
                </div>

                {/* Touch Overlay for Mobile */}
                <div className="absolute inset-0 bg-black/0 active:bg-black/10 md:hidden transition-colors" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;