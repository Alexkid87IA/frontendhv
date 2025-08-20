import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, TrendingUp, Users, Clock, Eye, Calendar } from 'lucide-react';
import { getAllArticles } from '../../utils/sanityAPI';
import { SanityArticle } from '../../types/sanity';
import { LoadingSpinner } from '../common/LoadingSpinner';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ContentSectionProps {
  title?: string;
  description?: string;
  sectionType?: 'emission' | 'business-idea' | 'success-story';
}

// Données mockées pour fallback
const mockItems = {
  emission: [
    {
      _id: '1',
      title: 'Roger Ormières - Créer un empire média moderne',
      slug: { current: 'roger-ormieres-empire-media' },
      excerpt: 'Comment construire une audience engagée et monétiser sa passion à l\'ère digitale',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=10' }
      },
      publishedAt: '2024-03-20',
      categories: [{ title: 'Podcast' }]
    },
    {
      _id: '2',
      title: 'Sarah Chen - L\'IA au service de l\'impact social',
      slug: { current: 'sarah-chen-ia-humain' },
      excerpt: 'Utiliser l\'intelligence artificielle pour résoudre des problèmes sociétaux majeurs',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=11' }
      },
      publishedAt: '2024-03-19',
      categories: [{ title: 'Podcast' }]
    },
    {
      _id: '3',
      title: 'Marc Dubois - Web3 et créateurs de contenu',
      slug: { current: 'marc-dubois-web3' },
      excerpt: 'Les nouvelles opportunités de monétisation pour les créateurs',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=12' }
      },
      publishedAt: '2024-03-18',
      categories: [{ title: 'Podcast' }]
    }
  ],
  'business-idea': [
    {
      _id: '1',
      title: 'Spotify : La disruption de l\'industrie musicale',
      slug: { current: 'spotify-startup-geant' },
      excerpt: 'Comment Daniel Ek a transformé notre façon de consommer la musique et créé un empire de 70 milliards',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=13' }
      },
      publishedAt: '2024-03-20',
      categories: [{ title: 'Business' }]
    },
    {
      _id: '2',
      title: 'Airbnb : Réinventer le voyage post-pandémie',
      slug: { current: 'airbnb-crise-opportunite' },
      excerpt: 'La stratégie audacieuse qui a permis à Airbnb de rebondir et atteindre des sommets historiques',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=14' }
      },
      publishedAt: '2024-03-19',
      categories: [{ title: 'Business' }]
    },
    {
      _id: '3',
      title: 'Notion : De side-project à licorne SaaS',
      slug: { current: 'notion-licorne-saas' },
      excerpt: 'Comment une petite équipe a créé l\'outil de productivité valorisé 10 milliards',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=15' }
      },
      publishedAt: '2024-03-18',
      categories: [{ title: 'Business' }]
    }
  ],
  'success-story': [
    {
      _id: '1',
      title: 'Chris Gardner : De SDF à millionnaire de Wall Street',
      slug: { current: 'chris-gardner-story' },
      excerpt: 'Le parcours extraordinaire qui a inspiré "À la recherche du bonheur" - Une leçon de résilience absolue',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=16' }
      },
      publishedAt: '2024-03-20',
      categories: [{ title: 'Parcours' }]
    },
    {
      _id: '2',
      title: 'Sara Blakely : Spanx et le pouvoir de l\'autodétermination',
      slug: { current: 'sara-blakely-spanx' },
      excerpt: 'De vendeuse porte-à-porte à plus jeune milliardaire self-made avec 5000$ de capital',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=17' }
      },
      publishedAt: '2024-03-19',
      categories: [{ title: 'Parcours' }]
    },
    {
      _id: '3',
      title: 'Patrick Bet-David : De réfugié à titan des médias',
      slug: { current: 'patrick-bet-david-valuetainment' },
      excerpt: 'Comment un immigrant iranien a bâti un empire médiatique de 100M$ en partant de zéro',
      mainImage: {
        asset: { _ref: 'https://picsum.photos/600/400?random=18' }
      },
      publishedAt: '2024-03-18',
      categories: [{ title: 'Parcours' }]
    }
  ]
};

const ContentSection: React.FC<ContentSectionProps> = ({
  title = "Découvrez nos contenus",
  description = "Explorer notre sélection de contenus exclusifs",
  sectionType = 'emission'
}) => {
  const [items, setItems] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const sanityArticles = await getAllArticles();
        
        // Si on a des articles depuis Sanity
        if (sanityArticles && sanityArticles.length > 0) {
          // TODO: Filtrer par catégorie/type quand les métadonnées seront disponibles dans Sanity
          // Pour l'instant, on divise les articles disponibles entre les sections
          let filteredItems: SanityArticle[] = [];
          
          // Distribution temporaire des articles entre les sections
          // pour éviter d'avoir les mêmes partout
          if (sectionType === 'emission') {
            // Prendre les articles 0, 3, 6, 9... (tous les 3 en partant de 0)
            filteredItems = sanityArticles.filter((_, index) => index % 3 === 0).slice(0, 3);
          } else if (sectionType === 'business-idea') {
            // Prendre les articles 1, 4, 7, 10... (tous les 3 en partant de 1)
            filteredItems = sanityArticles.filter((_, index) => index % 3 === 1).slice(0, 3);
          } else if (sectionType === 'success-story') {
            // Prendre les articles 2, 5, 8, 11... (tous les 3 en partant de 2)
            filteredItems = sanityArticles.filter((_, index) => index % 3 === 2).slice(0, 3);
          }
          
          // Si on a trouvé des articles après filtrage, les utiliser
          if (filteredItems.length > 0) {
            setItems(filteredItems);
            setDataSource('cms');
            console.log(`${filteredItems.length} articles récupérés depuis Sanity pour ${sectionType}`);
          } else {
            // Sinon utiliser les données mockées
            setItems(mockItems[sectionType] || []);
            setDataSource('mock');
            console.log(`Pas d'articles Sanity pour ${sectionType}, utilisation des données mockées`);
          }
        } else {
          // Pas d'articles du tout, utiliser les données mockées
          setItems(mockItems[sectionType] || []);
          setDataSource('mock');
          console.log(`Utilisation des données mockées pour ${sectionType}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setItems(mockItems[sectionType] || []);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [sectionType]);

  if (isLoading) {
    return (
      <section className="relative py-20 flex items-center justify-center">
        <LoadingSpinner />
      </section>
    );
  }

  // Configuration selon le type
  const getTypeConfig = () => {
    switch (sectionType) {
      case 'emission':
        return {
          icon: PlayCircle,
          color: 'violet',
          gradient: 'from-violet-500 to-purple-500',
          link: '/emissions',
          label: 'Podcast'
        };
      case 'business-idea':
        return {
          icon: TrendingUp,
          color: 'blue',
          gradient: 'from-blue-500 to-cyan-500',
          link: '/business-ideas',
          label: 'Étude de cas'
        };
      case 'success-story':
        return {
          icon: Users,
          color: 'emerald',
          gradient: 'from-emerald-500 to-green-500',
          link: '/success-stories',
          label: 'Parcours'
        };
      default:
        return {
          icon: PlayCircle,
          color: 'blue',
          gradient: 'from-blue-500 to-cyan-500',
          link: '/articles',
          label: 'Article'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <ErrorBoundary>
      <section className="relative py-16 overflow-hidden">
        {/* Background très subtil */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/20 to-transparent" />
        
        <div className="container relative">
          {/* Header de section amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Badge et label du type */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${config.gradient} shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className={`text-xs font-medium text-${config.color}-400 uppercase tracking-wider`}>
                  {config.label}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  • {items.length} nouveaux contenus
                </span>
              </div>
            </div>
            
            {/* Titre et description avec meilleure hiérarchie */}
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  {title}
                </span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>

          {/* Grille de contenu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {items.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link 
                  to={`/${sectionType}/${item.slug?.current}`}
                  className="block h-full"
                >
                  <div className="relative h-full bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SafeImage
                        source={item.mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Badge type */}
                      {sectionType === 'emission' && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="p-4 rounded-full bg-black/60 backdrop-blur-sm">
                            <PlayCircle className="w-12 h-12 text-white" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contenu */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent-cyan transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {item.excerpt}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <time>
                            {new Date(item.publishedAt || '').toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </time>
                        </div>
                        <span className="flex items-center gap-1">
                          Lire plus
                          <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* Ligne colorée au hover */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA plus discret mais élégant */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-end"
          >
            <Link
              to={config.link}
              className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <span className="text-sm">Explorer tous les {config.label.toLowerCase()}s</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default ContentSection;