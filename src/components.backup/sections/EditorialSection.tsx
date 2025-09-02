import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { getUniverses, getSubcategoriesGrouped } from '../../utils/sanityAPI';
import { LoadingSpinner } from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

// Données mockées pour fallback
const mockUniverses = [
  {
    _id: '1',
    title: 'Story',
    subtitle: 'Pour t\'inspirer',
    description: 'Plonge dans les récits authentiques d\'entrepreneurs et de visionnaires. Chaque histoire est une leçon, chaque parcours une source d\'inspiration.',
    atomicNumber: '01',
    symbol: 'St',
    slug: { current: 'story' },
    stats: '120+ récits'
  },
  {
    _id: '2',
    title: 'Business',
    subtitle: 'Pour faire du chiffre',
    description: 'Stratégies concrètes, études de cas détaillées et insights exclusifs pour dominer ton marché.',
    atomicNumber: '02',
    symbol: 'Bu',
    slug: { current: 'business' },
    stats: '200+ guides'
  },
  {
    _id: '3',
    title: 'Mental',
    subtitle: 'Pour ta tête',
    description: 'Développe une psychologie de champion et optimise tes performances cognitives.',
    atomicNumber: '03',
    symbol: 'Mt',
    slug: { current: 'mental' },
    stats: '80+ articles'
  },
  {
    _id: '4',
    title: 'Society',
    subtitle: 'Pour ta culture',
    description: 'Décrypte les mutations sociétales et anticipe les tendances de demain.',
    atomicNumber: '04',
    symbol: 'Sc',
    slug: { current: 'society' },
    stats: '150+ analyses'
  }
];

const mockSubcategories = {
  story: [
    { title: 'Parcours inspirants', slug: 'parcours', symbol: 'Pi' },
    { title: 'Success stories', slug: 'success', symbol: 'Ss' },
    { title: 'Échecs formateurs', slug: 'echecs', symbol: 'Ef' },
    { title: 'Transformations', slug: 'transformations', symbol: 'Tr' },
    { title: 'Entrepreneuriat', slug: 'entrepreneuriat', symbol: 'Ep' }
  ],
  business: [
    { title: 'Stratégie', slug: 'strategie', symbol: 'Sr' },
    { title: 'Innovation', slug: 'innovation', symbol: 'In' },
    { title: 'Leadership', slug: 'leadership', symbol: 'Ld' },
    { title: 'Croissance', slug: 'croissance', symbol: 'Cr' },
    { title: 'Finance', slug: 'finance', symbol: 'Fi' }
  ],
  mental: [
    { title: 'Mindset', slug: 'mindset', symbol: 'Ms' },
    { title: 'Productivité', slug: 'productivite', symbol: 'Pr' },
    { title: 'Résilience', slug: 'resilience', symbol: 'Rs' },
    { title: 'Focus', slug: 'focus', symbol: 'Fc' },
    { title: 'Bien-être', slug: 'bien-etre', symbol: 'Be' }
  ],
  society: [
    { title: 'Tendances', slug: 'tendances', symbol: 'Td' },
    { title: 'Impact social', slug: 'impact', symbol: 'Is' },
    { title: 'Futur du travail', slug: 'futur', symbol: 'Ft' },
    { title: 'Tech & IA', slug: 'tech', symbol: 'Ti' },
    { title: 'Environnement', slug: 'environnement', symbol: 'Ev' }
  ]
};

// Styles fixes pour chaque univers avec plus de couleur
const universeStyles = {
  story: {
    gradient: 'from-orange-500 via-pink-500 to-red-500',
    lightGradient: 'from-orange-500/30 via-pink-500/30 to-red-500/30',
    cardBg: 'bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-red-500/20',
    border: 'border-orange-500/50',
    activeBorder: 'border-orange-400',
    text: 'text-orange-400',
    subBg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10'
  },
  business: {
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    lightGradient: 'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
    cardBg: 'bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20',
    border: 'border-blue-500/50',
    activeBorder: 'border-blue-400',
    text: 'text-blue-400',
    subBg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10'
  },
  mental: {
    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
    lightGradient: 'from-purple-500/30 via-violet-500/30 to-indigo-500/30',
    cardBg: 'bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-indigo-500/20',
    border: 'border-purple-500/50',
    activeBorder: 'border-purple-400',
    text: 'text-purple-400',
    subBg: 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10'
  },
  society: {
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    lightGradient: 'from-green-500/30 via-emerald-500/30 to-teal-500/30',
    cardBg: 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20',
    border: 'border-green-500/50',
    activeBorder: 'border-green-400',
    text: 'text-green-400',
    subBg: 'bg-gradient-to-br from-green-500/10 to-teal-500/10'
  }
};

export const EditorialSection = () => {
  const [universes, setUniverses] = useState(mockUniverses);
  const [subcategories, setSubcategories] = useState(mockSubcategories);
  const [selectedUniverse, setSelectedUniverse] = useState<string | null>(null);
  const [hoveredUniverse, setHoveredUniverse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const sanityUniverses = await getUniverses();
        if (sanityUniverses && sanityUniverses.length > 0) {
          setUniverses(sanityUniverses.map((u: any, i: number) => ({
            ...u,
            atomicNumber: mockUniverses[i]?.atomicNumber || `0${i+1}`,
            symbol: mockUniverses[i]?.symbol || u.title.substring(0, 2),
            description: u.description || mockUniverses[i]?.description,
            stats: mockUniverses[i]?.stats
          })));
        }

        const sanitySubcategories = await getSubcategoriesGrouped();
        if (sanitySubcategories && sanitySubcategories.length > 0) {
          const subcatMap: any = {};
          sanitySubcategories.forEach((cat: any) => {
            if (cat.subcategories && cat.subcategories.length > 0) {
              subcatMap[cat.slug.current] = cat.subcategories.map((sub: any, i: number) => ({
                title: sub.title,
                slug: sub.slug.current,
                symbol: mockSubcategories[cat.slug.current]?.[i]?.symbol || sub.title.substring(0, 2)
              }));
            }
          });
          
          setSubcategories({
            ...mockSubcategories,
            ...subcatMap
          });
          
          // Forcer l'ajout d'Entrepreneuriat si Story n'a que 4 sous-catégories
          if (subcatMap.story && subcatMap.story.length === 4) {
            subcatMap.story.push({
              title: 'Entrepreneuriat',
              slug: 'entrepreneuriat',
              symbol: 'Ep'
            });
          }
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="relative py-20 flex items-center justify-center bg-black">
        <LoadingSpinner />
      </section>
    );
  }

  const getStyle = (slug: string) => {
    return universeStyles[slug as keyof typeof universeStyles] || universeStyles.story;
  };

  return (
    <ErrorBoundary>
      <section className="relative py-16 md:py-24 overflow-hidden bg-black">
        {/* Background avec particules colorées */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
          
          {/* Orbes de couleur flottants */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-white">Explore nos </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">
                4 univers
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Story, Business, Mental et Society - Choisis ta verticale pour transformer ta vision
            </p>
          </motion.div>

          {/* Grille principale avec design coloré */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {universes.map((universe, index) => {
              const isSelected = selectedUniverse === universe.slug.current;
              const isHovered = hoveredUniverse === universe.slug.current;
              const style = getStyle(universe.slug.current);
              const subcats = subcategories[universe.slug.current] || [];
              
              return (
                <Link
                  key={universe._id}
                  to={`/rubrique/${universe.slug.current}`}
                  className="group block h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onMouseEnter={() => setHoveredUniverse(universe.slug.current)}
                    onMouseLeave={() => setHoveredUniverse(null)}
                    className="h-full"
                  >
                    <div className={`
                      relative overflow-hidden rounded-3xl transition-all duration-500
                      ${style.cardBg} ${isSelected || isHovered ? style.activeBorder : style.border}
                      border-2 backdrop-blur-sm h-full flex flex-col
                      ${isSelected || isHovered ? 'shadow-2xl' : 'shadow-lg'}
                    `}>
                      {/* Effet de brillance animé */}
                      <div className="absolute inset-0 opacity-50">
                        <div className={`absolute inset-0 bg-gradient-to-br ${style.lightGradient}`} />
                        {(isSelected || isHovered) && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                            animate={{ x: [-200, 200] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>

                      <div className="relative p-8 flex flex-col h-full">
                        {/* Header avec symbole périodique stylisé */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            {/* Badge numéro atomique */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm mb-4">
                              <span className="text-xs font-mono text-white/60">Element</span>
                              <span className="text-xs font-bold text-white">{universe.atomicNumber}</span>
                            </div>
                            
                            {/* Titre XXL */}
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                              {universe.title}
                            </h3>
                            
                            {/* Subtitle avec stats */}
                            <div className="flex items-center gap-3">
                              <p className="text-white/90 font-medium">{universe.subtitle}</p>
                              <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white/80">
                                {universe.stats}
                              </span>
                            </div>
                          </div>
                          
                          {/* Symbole périodique géant avec effet 3D */}
                          <motion.div
                            className="relative flex-shrink-0"
                            animate={{ rotateY: isHovered ? 10 : 0 }}
                          >
                            {/* Ombre portée pour créer de la profondeur */}
                            <div className="absolute -inset-2 bg-black/30 rounded-3xl blur-xl" />
                            
                            {/* Glow coloré */}
                            <div className={`absolute -inset-4 bg-gradient-to-br ${style.gradient} opacity-30 rounded-3xl blur-2xl`} />
                            
                            {/* Carte principale avec élévation */}
                            <div className="relative w-28 h-28 rounded-2xl bg-black/50 backdrop-blur-md border-2 border-white/30 flex flex-col items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                              {/* Numéro atomique en haut */}
                              <span className="absolute top-2 left-2 text-[10px] font-mono text-white/50">
                                {universe.atomicNumber}
                              </span>
                              
                              {/* Symbole central */}
                              <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${style.gradient}`}>
                                {universe.symbol}
                              </span>
                              
                              {/* Nom de l'élément en bas */}
                              <span className="absolute bottom-2 text-[10px] font-medium text-white/50 uppercase tracking-wider">
                                {universe.title}
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-6 min-h-[60px] line-clamp-3">
                          {universe.description}
                        </p>

                        {/* Sous-catégories avec design périodique amélioré */}
                        <div className="space-y-3 flex-grow flex flex-col">
                          <div className="grid grid-cols-2 gap-2">
                            {subcats.slice(0, 4).map((subcat, idx) => (
                              <Link
                                key={subcat.slug}
                                to={`/rubrique/${universe.slug.current}/${subcat.slug}`}
                                onClick={(e) => e.stopPropagation()}
                                className="group/sub"
                              >
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: isSelected ? idx * 0.05 : 0 }}
                                  whileHover={{ scale: 1.05 }}
                                  className={`
                                    relative p-3 rounded-xl ${style.subBg} 
                                    border border-white/10 hover:border-white/30
                                    transition-all overflow-hidden
                                  `}
                                >
                                  {/* Mini symbole périodique */}
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                                      <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-br ${style.gradient}`}>
                                        {subcat.symbol}
                                      </span>
                                    </div>
                                    <span className="text-xs text-white/80 font-medium flex-1 line-clamp-1">
                                      {subcat.title}
                                    </span>
                                    <ArrowUpRight className="w-3 h-3 text-white/40 opacity-0 group-hover/sub:opacity-100 transition-opacity flex-shrink-0" />
                                  </div>
                                </motion.div>
                              </Link>
                            ))}
                          </div>

                          {/* 5ème sous-catégorie en pleine largeur si existe */}
                          {subcats[4] && (
                            <Link
                              to={`/rubrique/${universe.slug.current}/${subcats[4].slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="group/sub block"
                            >
                              <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`
                                  relative p-3 rounded-xl ${style.subBg}
                                  border border-white/10 hover:border-white/30
                                  transition-all
                                `}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center flex-shrink-0">
                                    <span className={`text-xs font-bold text-transparent bg-clip-text bg-gradient-to-br ${style.gradient}`}>
                                      {subcats[4].symbol}
                                    </span>
                                  </div>
                                  <span className="text-xs text-white/80 font-medium flex-1">
                                    {subcats[4].title}
                                  </span>
                                  <ArrowUpRight className="w-3 h-3 text-white/40 opacity-0 group-hover/sub:opacity-100 transition-opacity flex-shrink-0" />
                                </div>
                              </motion.div>
                            </Link>
                          )}
                          
                          {/* Spacer pour pousser le CTA en bas */}
                          <div className="flex-grow"></div>
                        </div>

                        {/* CTA principal */}
                        <div 
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 mt-auto pt-6 text-white font-medium hover:gap-3 transition-all"
                        >
                          <span>Explorer tout l'univers</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Barre de progression colorée en bas */}
                      {(isSelected || isHovered) && (
                        <motion.div
                          layoutId="active-indicator"
                          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${style.gradient}`}
                        />
                      )}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Indicateurs de navigation colorés */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-3 mt-12"
          >
            {universes.map((universe) => {
              const isActive = selectedUniverse === universe.slug.current;
              const style = getStyle(universe.slug.current);
              
              return (
                <button
                  key={universe._id}
                  onClick={() => setSelectedUniverse(universe.slug.current)}
                  className={`
                    relative px-4 py-2 rounded-full font-mono text-xs transition-all
                    ${isActive 
                      ? `bg-gradient-to-r ${style.gradient} text-white shadow-lg` 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }
                  `}
                >
                  {universe.symbol}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;