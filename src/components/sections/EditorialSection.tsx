import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { sanityClient } from '../../utils/sanityClient';
import { urlFor } from '../../utils/sanityImage';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

// Types pour les univers
interface Universe {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  image: any;
  logo: any;
  slug: {
    current: string;
  };
  gradient: string;
  order?: number;
}

// Données mockées pour fallback
const mockedUniverses = [
  {
    _id: "mock-story",
    title: "Story",
    subtitle: "Pour t'inspirer",
    description: "Des histoires authentiques qui redéfinissent le possible",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    logo: "/src/assets/logos/LOGO_HV STORY.svg",
    slug: {
      current: "recits"
    },
    gradient: "from-amber-500 to-orange-500"
  },
  {
    _id: "mock-business",
    title: "Business",
    subtitle: "Pour faire du chiffre",
    description: "Les stratégies qui font la différence",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    logo: "/src/assets/logos/LOGO_HV BUSINESS.svg",
    slug: {
      current: "business"
    },
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    _id: "mock-mental",
    title: "Mental",
    subtitle: "Pour ta tête",
    description: "Développe une psychologie de champion",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    logo: "/src/assets/logos/LOGO_HV PSYCHO.svg",
    slug: {
      current: "mental"
    },
    gradient: "from-purple-500 to-violet-500"
  },
  {
    _id: "mock-society",
    title: "Society",
    subtitle: "Pour ta culture",
    description: "Comprendre les mutations de notre époque",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    logo: "/src/assets/logos/LOGO_HV SOCIETY.svg",
    slug: {
      current: "society"
    },
    gradient: "from-emerald-500 to-teal-500"
  }
];

export const EditorialSection = () => {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Requête GROQ pour récupérer les univers depuis Sanity
        const query = `*[_type == "universe"] | order(order asc) {
          _id,
          title,
          subtitle,
          description,
          image,
          logo,
          "slug": slug.current,
          gradient,
          order
        }`;
        
        const result = await sanityClient.fetch(query);
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-0">
          {universes.map((universe, index) => (
            <motion.div
              key={universe._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={`/rubrique/${universe.slug.current}`}
                className="group relative block aspect-[3/2] md:aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={dataSource === 'cms' ? urlFor(universe.image) : universe.image} 
                    alt={universe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${universe.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="relative h-full p-4 md:p-8 flex flex-col">
                  {/* Logo - Taille augmentée */}
                  <div className="mb-auto">
                    <img 
                      src={dataSource === 'cms' ? urlFor(universe.logo) : universe.logo} 
                      alt={`Logo ${universe.title}`}
                      className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                      {universe.subtitle}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 md:mb-4 line-clamp-2 group-hover:text-white transition-colors">
                      {universe.description}
                    </p>
                    
                    {/* Hover Effect Line */}
                    <div className="h-0.5 w-0 bg-white transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>

                {/* Touch Overlay for Mobile */}
                <div className="absolute inset-0 bg-black/0 active:bg-black/10 md:hidden transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;
