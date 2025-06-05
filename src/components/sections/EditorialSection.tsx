import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUniverses } from '../../utils/sanityAPI';
import { SanityUniverse } from '../../types/sanity';
import { urlFor } from '../../utils/sanityImage';
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
          setUniverses(mockedUniverses);
          setDataSource('mock');
          console.log("Aucun univers trouvé dans Sanity, utilisation des données mockées");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des univers:", err);
        setError("Impossible de charger les univers éditoriaux");
        
        setUniverses(mockedUniverses);
        setDataSource('mock');
        console.log("Erreur de chargement depuis Sanity, utilisation des données mockées");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUniverses();
  }, []);

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
                Univers éditoriaux
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
              Explorez nos univers
              {dataSource === 'mock' && <span className="text-sm text-gray-400 ml-2">(démo)</span>}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Plongez dans nos thématiques phares et découvrez des contenus qui vous inspirent et vous transforment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list" aria-label="Univers éditoriaux">
            {universes.map((universe, index) => (
              <motion.div
                key={universe._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                role="listitem"
                className="group relative"
              >
                <Link 
                  to={`/rubrique/${universe.slug.current}`}
                  className="relative block h-full"
                >
                  {/* Animated Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black to-neutral-900 rounded-2xl overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${getGradient(universe.slug.current)} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className="absolute inset-0 animate-gradient-xy bg-[length:400%_400%]" style={{
                      backgroundImage: `linear-gradient(45deg, 
                        rgba(0,0,0,0) 0%,
                        rgba(255,255,255,0.05) 25%,
                        rgba(255,255,255,0.1) 50%,
                        rgba(255,255,255,0.05) 75%,
                        rgba(0,0,0,0) 100%
                      )`
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col justify-end">
                    {/* Universe Title with Hover Effect */}
                    <div className="mb-6">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform">
                        {universe.title}
                      </h3>
                      <p className="text-xl text-accent-blue transform group-hover:translate-x-2 transition-transform delay-75">
                        {getSubtitle(universe.slug.current)}
                      </p>
                    </div>

                    {/* Description with Hover Effect */}
                    <p className="text-gray-300 text-lg max-w-xl transform group-hover:translate-x-2 transition-transform delay-100">
                      {universe.description}
                    </p>

                    {/* Animated Line */}
                    <div className="mt-6 h-0.5 w-12 bg-accent-blue transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;