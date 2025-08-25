import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Brain, Users, ArrowRight, BookOpenCheck, Sparkles, Target, Heart, Globe } from 'lucide-react';
import { getUniverses, getSubcategoriesGrouped } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

// Données mockées pour fallback
const mockUniverses = [
  {
    _id: '1',
    title: 'Story',
    subtitle: 'Pour t\'inspirer',
    description: 'Des histoires authentiques qui redéfinissent le possible',
    slug: { current: 'story' },
    icon: 'book',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    stats: { articles: '67', growth: '+12%' }
  },
  {
    _id: '2',
    title: 'Business',
    subtitle: 'Pour faire du chiffre',
    description: 'Les stratégies qui font la différence',
    slug: { current: 'business' },
    icon: 'trending',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    stats: { articles: '89', growth: '+8%' }
  },
  {
    _id: '3',
    title: 'Mental',
    subtitle: 'Pour ta tête',
    description: 'Développe une psychologie de champion',
    slug: { current: 'mental' },
    icon: 'brain',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    stats: { articles: '56', growth: '+15%' }
  },
  {
    _id: '4',
    title: 'Society',
    subtitle: 'Pour ta culture',
    description: 'Comprendre les mutations de notre époque',
    slug: { current: 'society' },
    icon: 'users',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    stats: { articles: '34', growth: '+10%' }
  }
];

// Données mockées pour les sous-catégories
const mockSubcategories = {
  story: [
    { title: 'Parcours inspirants', slug: 'parcours', articleCount: 47 },
    { title: 'Success stories', slug: 'success', articleCount: 23 },
    { title: 'Échecs formateurs', slug: 'echecs', articleCount: 18 },
    { title: 'Transformations', slug: 'transformations', articleCount: 31 }
  ],
  business: [
    { title: 'Stratégie', slug: 'strategie', articleCount: 52 },
    { title: 'Innovation', slug: 'innovation', articleCount: 38 },
    { title: 'Leadership', slug: 'leadership', articleCount: 29 },
    { title: 'Croissance', slug: 'croissance', articleCount: 44 },
    { title: 'Finance', slug: 'finance', articleCount: 26 }
  ],
  mental: [
    { title: 'Mindset', slug: 'mindset', articleCount: 41 },
    { title: 'Productivité', slug: 'productivite', articleCount: 35 },
    { title: 'Résilience', slug: 'resilience', articleCount: 22 },
    { title: 'Focus', slug: 'focus', articleCount: 19 },
    { title: 'Bien-être', slug: 'bien-etre', articleCount: 28 }
  ],
  society: [
    { title: 'Tendances', slug: 'tendances', articleCount: 33 },
    { title: 'Impact social', slug: 'impact', articleCount: 27 },
    { title: 'Futur du travail', slug: 'futur', articleCount: 24 },
    { title: 'Tech & IA', slug: 'tech', articleCount: 45 },
    { title: 'Environnement', slug: 'environnement', articleCount: 21 }
  ]
};

const iconMap = {
  book: BookOpen,
  trending: TrendingUp,
  brain: Brain,
  users: Users
};

const categoryColors = {
  amber: {
    gradient: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-500/10',
    bgMedium: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    borderHover: 'hover:border-amber-500/50',
    text: 'text-amber-400',
    shadow: 'hover:shadow-amber-500/25'
  },
  blue: {
    gradient: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-500/10',
    bgMedium: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    borderHover: 'hover:border-blue-500/50',
    text: 'text-blue-400',
    shadow: 'hover:shadow-blue-500/25'
  },
  purple: {
    gradient: 'from-purple-500 to-violet-500',
    bgLight: 'bg-purple-500/10',
    bgMedium: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    borderHover: 'hover:border-purple-500/50',
    text: 'text-purple-400',
    shadow: 'hover:shadow-purple-500/25'
  },
  emerald: {
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-500/10',
    bgMedium: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    borderHover: 'hover:border-emerald-500/50',
    text: 'text-emerald-400',
    shadow: 'hover:shadow-emerald-500/25'
  }
};

export const EditorialSection = () => {
  const [universes, setUniverses] = useState(mockUniverses);
  const [subcategories, setSubcategories] = useState(mockSubcategories);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer les univers
        const sanityUniverses = await getUniverses();
        if (sanityUniverses && sanityUniverses.length > 0) {
          setUniverses(sanityUniverses);
        }

        // Récupérer les sous-catégories groupées
        const sanitySubcategories = await getSubcategoriesGrouped();
        if (sanitySubcategories && sanitySubcategories.length > 0) {
          // Transformer les données pour correspondre à notre structure
          const subcatMap: any = {};
          sanitySubcategories.forEach((cat: any) => {
            if (cat.subcategories && cat.subcategories.length > 0) {
              subcatMap[cat.slug.current] = cat.subcategories.map((sub: any) => ({
                title: sub.title,
                slug: sub.slug.current,
                articleCount: sub.articleCount || 0
              }));
            }
          });
          
          // Fusionner avec les données mockées si nécessaire
          setSubcategories({
            ...mockSubcategories,
            ...subcatMap
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="relative py-20 flex items-center justify-center">
        <LoadingSpinner />
      </section>
    );
  }

  // Fonction pour rendre une grille Metro pour une catégorie
  const renderMetroGrid = (universe: any, subcats: any[]) => {
    const Icon = iconMap[universe.icon as keyof typeof iconMap] || BookOpen;
    const colors = categoryColors[universe.color as keyof typeof categoryColors];
    const hasExtraSubcat = subcats.length === 5;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Container avec ratio fixe pour maintenir la forme Metro */}
        <div className="grid grid-cols-4 gap-2 lg:gap-3 h-full">
          {/* Grande carte principale - 2x2 */}
          <Link
            to={`/rubrique/${universe.slug.current}`}
            className="group col-span-2 row-span-2 relative overflow-hidden rounded-2xl"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`
                h-full p-6 lg:p-8
                bg-gradient-to-br ${colors.gradient}
                backdrop-blur-sm
                transition-all duration-500
                hover:shadow-2xl ${colors.shadow}
                flex flex-col justify-between
                min-h-[250px] lg:min-h-[300px]
              `}
            >
              {/* Effet de lumière */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {universe.title}
                    </h3>
                    <p className="text-sm font-medium text-white/80">
                      {universe.subtitle}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <p className="text-white/90 text-sm lg:text-base leading-relaxed mb-4">
                  {universe.description}
                </p>

                {/* Stats de la catégorie */}
                {universe.stats && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-white/60" />
                      <span className="text-sm text-white/80 font-medium">{universe.stats.articles} articles</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-white/60" />
                      <span className="text-sm text-white/80 font-medium">{universe.stats.growth}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Arrow indicator */}
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <span>Explorer la rubrique</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Sous-catégories - Layout différent selon le nombre */}
          <div className="col-span-2 grid grid-cols-2 gap-2 lg:gap-3">
            {subcats.slice(0, hasExtraSubcat ? 2 : 4).map((subcat, idx) => (
              <Link
                key={subcat.slug}
                to={`/rubrique/${universe.slug.current}/${subcat.slug}`}
                className="group relative overflow-hidden rounded-xl"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`
                    h-full p-2.5 lg:p-3.5
                    ${colors.bgMedium} backdrop-blur-sm
                    border ${colors.border} ${colors.borderHover}
                    transition-all duration-300
                    hover:shadow-lg ${colors.shadow}
                    flex flex-col justify-between
                    min-h-[115px] lg:min-h-[140px]
                  `}
                >
                  <div>
                    <h4 className="text-white font-bold text-[11px] lg:text-[13px] leading-tight mb-1">
                      {subcat.title}
                    </h4>
                    {subcat.articleCount > 0 && (
                      <span className="text-[10px] text-white/50">{subcat.articleCount} articles</span>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.div>
              </Link>
            ))}

            {/* Pour 5 sous-catégories : Leadership/Résilience en pleine largeur */}
            {hasExtraSubcat && (
              <>
                <Link
                  to={`/rubrique/${universe.slug.current}/${subcats[2].slug}`}
                  className="group relative overflow-hidden rounded-xl col-span-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className={`
                      h-full p-4 lg:p-5
                      ${colors.bgMedium} backdrop-blur-sm
                      border ${colors.border} ${colors.borderHover}
                      transition-all duration-300
                      hover:shadow-lg ${colors.shadow}
                      flex items-center justify-between
                      min-h-[60px] lg:min-h-[70px]
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-white font-bold text-base lg:text-lg">
                        {subcats[2].title}
                      </h4>
                      {subcats[2].articleCount > 0 && (
                        <span className="text-xs text-white/50 ml-3">{subcats[2].articleCount} articles</span>
                      )}
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                  </motion.div>
                </Link>

                {/* Les 2 dernières sous-catégories */}
                {subcats.slice(3, 5).map((subcat) => (
                  <Link
                    key={subcat.slug}
                    to={`/rubrique/${universe.slug.current}/${subcat.slug}`}
                    className="group relative overflow-hidden rounded-xl"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`
                        h-full p-2.5 lg:p-3.5
                        ${colors.bgMedium} backdrop-blur-sm
                        border ${colors.border} ${colors.borderHover}
                        transition-all duration-300
                        hover:shadow-lg ${colors.shadow}
                        flex flex-col justify-between
                        min-h-[115px] lg:min-h-[140px]
                      `}
                    >
                      <div>
                        <h4 className="text-white font-bold text-[11px] lg:text-[13px] leading-tight mb-1">
                          {subcat.title}
                        </h4>
                        {subcat.articleCount > 0 && (
                          <span className="text-[10px] text-white/50">{subcat.articleCount} articles</span>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <ArrowRight className="w-3 h-3 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <ErrorBoundary>
      <section className="relative py-24 overflow-hidden">
        {/* Background effects simplifiés */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
          
          {/* Un seul orbe central subtil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/[0.03] rounded-full blur-[150px]" />
        </div>

        <div className="container relative z-10">
          {/* Header amélioré */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Badge premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                4 univers • 20 thématiques
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Explorez l'écosystème </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
                High Value
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Un contenu premium organisé en 4 univers complémentaires pour transformer votre mindset, votre business et votre vision du monde
            </p>
          </motion.div>

          {/* Metro Grids - 2x2 layout sur desktop */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {/* Story Grid */}
            {renderMetroGrid(universes[0], subcategories.story)}
            
            {/* Business Grid */}
            {renderMetroGrid(universes[1], subcategories.business)}
            
            {/* Mental Grid */}
            {renderMetroGrid(universes[2], subcategories.mental)}
            
            {/* Society Grid */}
            {renderMetroGrid(universes[3], subcategories.society)}
          </div>

          {/* Stats Section - Plus cohérentes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-3xl border border-purple-500/10 p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">500+</div>
                  <div className="text-sm text-gray-400">Articles publiés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">50K+</div>
                  <div className="text-sm text-gray-400">Lecteurs actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">4</div>
                  <div className="text-sm text-gray-400">Univers thématiques</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">98%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA amélioré */}
          <div className="text-center">
            <Link 
              to="/articles" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              <BookOpenCheck size={20} />
              <span>Explorer tous nos articles</span>
              <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              Plus de 500 articles pour nourrir votre ambition
            </p>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;