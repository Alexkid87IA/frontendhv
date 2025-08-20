import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Brain, Users, ArrowRight, BookOpenCheck, Users2, Clock } from 'lucide-react';
import { getUniverses } from '../../utils/sanityAPI';
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
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    _id: '2',
    title: 'Business',
    subtitle: 'Pour faire du chiffre',
    description: 'Les stratégies qui font la différence',
    slug: { current: 'business' },
    icon: 'trending',
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    _id: '3',
    title: 'Mental',
    subtitle: 'Pour ta tête',
    description: 'Développe une psychologie de champion',
    slug: { current: 'mental' },
    icon: 'brain',
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500'
  },
  {
    _id: '4',
    title: 'Society',
    subtitle: 'Pour ta culture',
    description: 'Comprendre les mutations de notre époque',
    slug: { current: 'society' },
    icon: 'users',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500'
  }
];

const iconMap = {
  book: BookOpen,
  trending: TrendingUp,
  brain: Brain,
  users: Users
};

export const EditorialSection = () => {
  const [universes, setUniverses] = useState(mockUniverses);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'cms' | 'mock'>('cms');

  useEffect(() => {
    const fetchUniverses = async () => {
      try {
        setIsLoading(true);
        const sanityUniverses = await getUniverses();
        
        if (sanityUniverses && sanityUniverses.length > 0) {
          setUniverses(sanityUniverses);
          setDataSource('cms');
          console.log('Univers récupérés depuis Sanity CMS');
        } else {
          setUniverses(mockUniverses);
          setDataSource('mock');
          console.log('Utilisation des univers mockés (fallback)');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des univers:', error);
        setUniverses(mockUniverses);
        setDataSource('mock');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniverses();
  }, []);

  if (isLoading) {
    return (
      <section className="relative py-20 flex items-center justify-center">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <ErrorBoundary>
      <section className="relative py-24 overflow-hidden">
        {/* Fond amélioré avec effets visuels subtils */}
        <div className="absolute inset-0">
          {/* Gradient de base plus subtil */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          
          {/* Grille en perspective avec opacité réduite */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(35deg)]" />
          
          {/* Orbes lumineux animés avec opacité réduite */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse animation-delay-2000" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse animation-delay-4000" />
          <div className="absolute bottom-1/2 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] animate-pulse animation-delay-6000" />
          
          {/* Particules flottantes avec opacité réduite */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${10 + Math.random() * 20}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="container relative z-10">
          {/* En-tête avec effet glow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Explorez nos </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">
                univers
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Plongez dans nos thématiques phares et découvrez des contenus qui vous inspirent et vous transforment
            </p>
          </motion.div>

          {/* Grille des univers avec effets améliorés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {universes.map((universe, index) => {
              const Icon = iconMap[universe.icon as keyof typeof iconMap] || BookOpen;
              const gradientColors = {
                amber: 'from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30',
                blue: 'from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30',
                purple: 'from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30',
                emerald: 'from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30'
              };
              const borderColors = {
                amber: 'border-amber-500/30 hover:border-amber-500/50',
                blue: 'border-blue-500/30 hover:border-blue-500/50',
                purple: 'border-purple-500/30 hover:border-purple-500/50',
                emerald: 'border-emerald-500/30 hover:border-emerald-500/50'
              };
              const glowColors = {
                amber: 'hover:shadow-amber-500/25',
                blue: 'hover:shadow-blue-500/25',
                purple: 'hover:shadow-purple-500/25',
                emerald: 'hover:shadow-emerald-500/25'
              };

              return (
                <motion.div
                  key={universe._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  {/* Effet de lumière en arrière-plan au hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${universe.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                  
                  <Link to={`/rubrique/${universe.slug.current}`}>
                    <div className={`
                      relative h-full p-8 rounded-2xl
                      bg-gradient-to-br ${gradientColors[universe.color as keyof typeof gradientColors]}
                      backdrop-blur-sm border ${borderColors[universe.color as keyof typeof borderColors]}
                      transition-all duration-500
                      hover:shadow-2xl ${glowColors[universe.color as keyof typeof glowColors]}
                      overflow-hidden
                    `}>
                      {/* Motif de fond subtil */}
                      <div className="absolute inset-0 opacity-10">
                        <div 
                          className="absolute inset-0 bg-center"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '60px 60px'
                          }}
                        />
                      </div>
                      
                      {/* Contenu */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-3xl font-bold text-white mb-2">
                              {universe.title}
                            </h3>
                            <p className={`text-sm font-medium text-${universe.color}-400`}>
                              {universe.subtitle}
                            </p>
                          </div>
                          <div className={`
                            p-3 rounded-xl
                            bg-gradient-to-br ${universe.gradient}
                            shadow-lg transform group-hover:rotate-12 transition-transform duration-300
                          `}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {universe.description}
                        </p>
                        
                        {/* Barre de progression décorative */}
                        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className={`
                            absolute inset-y-0 left-0 w-0 group-hover:w-full
                            bg-gradient-to-r ${universe.gradient}
                            transition-all duration-700 ease-out
                          `} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Section Stats et CTA fusionnée */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            {/* Statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-blue mb-2">250+</div>
                <div className="text-gray-400">Articles publiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-turquoise mb-2">50k+</div>
                <div className="text-gray-400">Lecteurs mensuels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-violet mb-2">15h+</div>
                <div className="text-gray-400">De lecture</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent-cyan mb-2">98%</div>
                <div className="text-gray-400">Satisfaction</div>
              </div>
            </div>

            {/* CTA centré */}
            <div className="text-center">
              <Link 
                to="/articles" 
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-full text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/25 hover:scale-105"
              >
                <BookOpenCheck size={20} />
                <span>Explorer tous les articles</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default EditorialSection;