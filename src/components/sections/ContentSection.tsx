import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, TrendingUp, Users, Clock, Eye, Calendar, Sparkles, Zap, Trophy } from 'lucide-react';
import { getAllArticles } from '../../utils/sanityAPI'; // CORRECTION: Import direct
import { SanityArticle } from '../../types/sanity';
import { LoadingSpinner } from '../common/LoadingSpinner';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ContentSectionProps {
  title?: string;
  description?: string;
  sectionType?: 'emission' | 'business-idea' | 'success-story';
}

// Données mockées pour fallback (inchangées)
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
      categories: [{ title: 'Podcast' }],
      guest: 'Roger Ormières',
      duration: '45 min'
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
      categories: [{ title: 'Podcast' }],
      guest: 'Sarah Chen',
      duration: '38 min'
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
      categories: [{ title: 'Podcast' }],
      guest: 'Marc Dubois',
      duration: '52 min'
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
      categories: [{ title: 'Business' }],
      readingTime: 8
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
      categories: [{ title: 'Business' }],
      readingTime: 12
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
      categories: [{ title: 'Business' }],
      readingTime: 10
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
      categories: [{ title: 'Parcours' }],
      readingTime: 15
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
      categories: [{ title: 'Parcours' }],
      readingTime: 12
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
      categories: [{ title: 'Parcours' }],
      readingTime: 18
    }
  ]
};

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  sectionType = 'emission'
}) => {
  const [items, setItems] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  // Configuration selon le type avec design amélioré
  const getTypeConfig = () => {
    switch (sectionType) {
      case 'emission':
        return {
          icon: PlayCircle,
          accentIcon: Sparkles,
          color: 'violet',
          gradient: 'from-violet-500 to-purple-600',
          bgGradient: 'from-violet-900/20 via-purple-900/10 to-transparent',
          borderColor: 'border-violet-500/20',
          link: '/emissions',
          label: 'Podcasts & Émissions',
          title: title || 'Nos émissions exclusives',
          description: description || 'Interviews inspirantes avec les leaders qui transforment le monde',
          emptyMessage: 'Nouvelles émissions en préparation'
        };
      case 'business-idea':
        return {
          icon: TrendingUp,
          accentIcon: Zap,
          color: 'blue',
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'from-blue-900/20 via-cyan-900/10 to-transparent',
          borderColor: 'border-blue-500/20',
          link: '/business-ideas',
          label: 'Études de cas',
          title: title || 'Business Ideas qui cartonnent',
          description: description || 'Décryptage des stratégies gagnantes des entreprises qui dominent leur marché',
          emptyMessage: 'Nouvelles analyses en cours'
        };
      case 'success-story':
        return {
          icon: Users,
          accentIcon: Trophy,
          color: 'emerald',
          gradient: 'from-emerald-500 to-green-500',
          bgGradient: 'from-emerald-900/20 via-green-900/10 to-transparent',
          borderColor: 'border-emerald-500/20',
          link: '/success-stories',
          label: 'Success Stories',
          title: title || 'Parcours extraordinaires',
          description: description || 'Les histoires inspirantes de ceux qui ont défié l\'impossible',
          emptyMessage: 'Nouvelles histoires bientôt'
        };
      default:
        return {
          icon: PlayCircle,
          accentIcon: Sparkles,
          color: 'blue',
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'from-blue-900/20 via-cyan-900/10 to-transparent',
          borderColor: 'border-blue-500/20',
          link: '/articles',
          label: 'Articles',
          title: title || 'Nos derniers articles',
          description: description || 'Analyses et insights pour votre croissance',
          emptyMessage: 'Aucun article disponible'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;
  const AccentIcon = config.accentIcon;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        console.log(`📊 Récupération des contenus pour: ${sectionType}`);
        
        // CORRECTION: Récupération directe depuis Sanity
        const sanityArticles = await getAllArticles();
        
        if (sanityArticles && sanityArticles.length > 0) {
          const contentTypeMapping: Record<string, string> = {
            'emission': 'emission',
            'business-idea': 'case-study',
            'success-story': 'success-story'
          };
          
          const targetContentType = contentTypeMapping[sectionType];
          
          const filteredItems = sanityArticles
            .filter(article => article.contentType === targetContentType)
            .slice(0, 3);
          
          console.log(`✅ ${filteredItems.length} articles trouvés pour ${sectionType}`);
          
          if (filteredItems.length > 0) {
            setItems(filteredItems);
            setDataSource('cms');
          } else {
            console.log(`⚠️ Utilisation des données mockées pour ${sectionType}`);
            setItems(mockItems[sectionType] || []);
            setDataSource('mock');
          }
        } else {
          setItems(mockItems[sectionType] || []);
          setDataSource('mock');
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
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

  if (items.length === 0) {
    return (
      <section className="relative py-16 overflow-hidden">
        <div className="container">
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-r ${config.gradient} mb-4`}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">{config.emptyMessage}</h3>
            <p className="text-gray-500">Revenez bientôt pour découvrir nos nouveaux contenus</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="relative py-20 overflow-hidden">
        {/* Background amélioré avec gradient subtil */}
        <div className={`absolute inset-0 bg-gradient-to-b ${config.bgGradient} pointer-events-none`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(0,0,0,0.5))] pointer-events-none" />
        
        <div className="container relative">
          {/* Header redesigné */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1 max-w-3xl">
                {/* Badge animé */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${config.gradient} shadow-xl`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    {config.label}
                  </span>
                  <AccentIcon className={`w-4 h-4 text-${config.color}-400`} />
                </motion.div>
                
                {/* Titre avec effet */}
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">{config.title}</span>
                </h2>
                
                <p className="text-lg text-gray-400 leading-relaxed">
                  {config.description}
                </p>
              </div>

              {/* Indicateur live si données CMS */}
              {dataSource === 'cms' && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-400 font-medium">Live</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Grille redesignée avec meilleur spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {items.map((item, index) => (
              <motion.article
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
              >
                <Link 
                  to={`/article/${item.slug?.current}`}
                  className="block h-full"
                >
                  <div className={`relative h-full bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border ${config.borderColor} hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-${config.color}-500/20 hover:-translate-y-1`}>
                    
                    {/* Image avec overlay amélioré */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SafeImage
                        source={item.mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                      />
                      
                      {/* Gradient overlay subtil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                      
                      {/* Play button pour émissions */}
                      {sectionType === 'emission' && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1.1 }}
                          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className={`p-5 rounded-full bg-gradient-to-r ${config.gradient} shadow-2xl`}>
                            <PlayCircle className="w-10 h-10 text-white" />
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Badge durée/temps */}
                      {(item.duration || item.readingTime) && (
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-lg border border-white/10">
                            <span className="text-xs text-white font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.duration || `${item.readingTime} min`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Contenu amélioré */}
                    <div className="p-6 space-y-4">
                      {/* Guest/Category */}
                      {(item.guest || item.categories?.[0]) && (
                        <div className={`text-xs font-semibold text-${config.color}-400 uppercase tracking-wider`}>
                          {item.guest ? `Avec ${item.guest}` : item.categories[0].title}
                        </div>
                      )}
                      
                      {/* Titre avec hover effect */}
                      <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </p>

                      {/* Footer avec meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <time className="text-xs text-gray-500">
                          {new Date(item.publishedAt || '').toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long'
                          })}
                        </time>
                        
                        <motion.span 
                          className={`flex items-center gap-2 text-xs font-medium text-${config.color}-400`}
                          whileHover={{ x: 5 }}
                        >
                          {sectionType === 'emission' ? 'Écouter' : 'Découvrir'} 
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.span>
                      </div>
                    </div>

                    {/* Accent line animée */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* CTA redesigné */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link
              to={config.link}
              className={`group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${config.gradient} rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-${config.color}-500/30 transition-all duration-300 hover:-translate-y-0.5`}
            >
              <span>Voir tous les {config.label.toLowerCase()}</span>
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default ContentSection;