import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Bell, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

// Import de tous les logos
import logoMedia from '../../assets/logos/LOGO_HV_MEDIA.svg';
import logoBusiness from '../../assets/logos/LOGO_HV_BUSINESS.svg';
import logoMental from '../../assets/logos/LOGO_HV_PSYCHO.svg';
import logoSociety from '../../assets/logos/LOGO_HV_SOCIETY.svg';
import logoStory from '../../assets/logos/LOGO_HV_STORY.svg';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { visible } = useScrollDirection();
  const { scrollY } = useScroll();
  
  // Effet de transparence basé sur le scroll
  const navbarBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.95)']
  );

  // Fonction pour obtenir le logo selon la page
  const getCurrentLogo = () => {
    const path = location.pathname;
    
    if (path.includes('/story')) return logoStory;
    if (path.includes('/business')) return logoBusiness;
    if (path.includes('/mental')) return logoMental;
    if (path.includes('/society')) return logoSociety;
    
    return logoMedia;
  };

  // Navigation avec sous-catégories
  const menuItems = [
    { 
      label: 'Story', 
      path: '/rubrique/story', 
      slug: 'story',
      color: 'amber',
      subcategories: [
        { label: 'Parcours inspirants', path: '/rubrique/story/parcours' },
        { label: 'Success stories', path: '/rubrique/story/success' },
        { label: 'Échecs formateurs', path: '/rubrique/story/echecs' },
        { label: 'Transformations', path: '/rubrique/story/transformations' }
      ]
    },
    { 
      label: 'Business', 
      path: '/rubrique/business', 
      slug: 'business',
      color: 'blue',
      subcategories: [
        { label: 'Stratégie', path: '/rubrique/business/strategie' },
        { label: 'Innovation', path: '/rubrique/business/innovation' },
        { label: 'Leadership', path: '/rubrique/business/leadership' },
        { label: 'Croissance', path: '/rubrique/business/croissance' },
        { label: 'Finance', path: '/rubrique/business/finance' }
      ]
    },
    { 
      label: 'Mental', 
      path: '/rubrique/mental', 
      slug: 'mental',
      color: 'purple',
      subcategories: [
        { label: 'Mindset', path: '/rubrique/mental/mindset' },
        { label: 'Productivité', path: '/rubrique/mental/productivite' },
        { label: 'Résilience', path: '/rubrique/mental/resilience' },
        { label: 'Focus', path: '/rubrique/mental/focus' },
        { label: 'Bien-être', path: '/rubrique/mental/bien-etre' }
      ]
    },
    { 
      label: 'Society', 
      path: '/rubrique/society', 
      slug: 'society',
      color: 'emerald',
      subcategories: [
        { label: 'Tendances', path: '/rubrique/society/tendances' },
        { label: 'Impact social', path: '/rubrique/society/impact' },
        { label: 'Futur du travail', path: '/rubrique/society/futur' },
        { label: 'Tech & IA', path: '/rubrique/society/tech' },
        { label: 'Environnement', path: '/rubrique/society/environnement' }
      ]
    }
  ];

  const specialItems = [
    { 
      label: 'Le Club', 
      path: '/club',
      isNew: true
    },
    { 
      label: 'Podcasts', 
      path: '/emissions'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getGradientByColor = (color: string) => {
    const gradients = {
      amber: 'from-amber-400 to-orange-500',
      blue: 'from-blue-400 to-cyan-500',
      purple: 'from-purple-400 to-violet-500',
      emerald: 'from-emerald-400 to-teal-500'
    };
    return gradients[color as keyof typeof gradients] || gradients.blue;
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: (!isMobile && !visible && !isOpen) ? -120 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: navbarBackground as any }}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Effet de blur premium */}
        <div className="absolute inset-0 backdrop-blur-2xl" />
        
        {/* Ligne de gradient en haut */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Contenu principal */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* CORRECTION: Container avec largeur fixe sur mobile */}
            <div className="relative flex items-center justify-between h-20">
              {/* Logo - CORRECTION: empêcher le décalage */}
              <Link 
                to="/" 
                className="relative group z-10 flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  {/* Effet de lueur */}
                  <div className="absolute inset-0 bg-white/20 blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <img 
                    src={getCurrentLogo()}
                    alt="High Value Media"
                    className="h-10 md:h-12 w-auto relative z-10 filter group-hover:brightness-125 transition-all duration-300" 
                  />
                </motion.div>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center flex-1 justify-center px-8">
                <div className="flex items-center space-x-1 relative">
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname.includes(item.slug);
                    const gradient = getGradientByColor(item.color);
                    
                    return (
                      <div
                        key={item.slug}
                        className="relative"
                        onMouseEnter={() => setActiveDropdown(item.slug)}
                      >
                        <Link
                          to={item.path}
                          className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 group ${
                            isActive 
                              ? 'text-white' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${
                            activeDropdown === item.slug ? 'rotate-180' : ''
                          }`} />
                          
                          {/* Indicateur actif */}
                          {isActive && (
                            <motion.div
                              layoutId="navbar-active"
                              className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r ${gradient}`}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </Link>
                      </div>
                    );
                  })}

                  {/* Dropdown - POSITION FIXE EN DEHORS DE LA BOUCLE */}
                  <AnimatePresence>
                    {activeDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-8 w-[480px]"
                        style={{
                          left: activeDropdown === 'story' ? '0px' :
                                activeDropdown === 'business' ? '90px' :
                                activeDropdown === 'mental' ? '200px' :
                                activeDropdown === 'society' ? '300px' : '0px'
                        }}
                      >
                        {(() => {
                          const item = menuItems.find(m => m.slug === activeDropdown);
                          if (!item) return null;
                          const gradient = getGradientByColor(item.color);
                          
                          return (
                            <div className="relative">
                              {/* Flèche avec gradient */}
                              <div className={`absolute -top-2 left-12 w-4 h-4 bg-gradient-to-br ${gradient} rotate-45 rounded-sm`} />
                              
                              {/* Container principal avec gradient border */}
                              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/5">
                                <div className="bg-black/95 backdrop-blur-2xl rounded-2xl p-6">
                                  {/* Header de la catégorie */}
                                  <div className="mb-5">
                                    <div className={`text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-2`}>
                                      Explorer {item.label}
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                  </div>
                                  
                                  {/* Grid des sous-catégories */}
                                  <div className="grid grid-cols-2 gap-2">
                                    {item.subcategories.slice(0, 4).map((sub, idx) => (
                                      <Link
                                        key={sub.path}
                                        to={sub.path}
                                        className="group relative"
                                      >
                                        <motion.div
                                          whileHover={{ scale: 1.02, x: 3 }}
                                          className="relative p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                                        >
                                          {/* Numéro stylisé */}
                                          <div className={`absolute top-3 right-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity`}>
                                            0{idx + 1}
                                          </div>
                                          
                                          {/* Contenu */}
                                          <div className="relative z-10">
                                            <h4 className="text-white font-medium text-sm mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${gradient} transition-all">
                                              {sub.label}
                                            </h4>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                              Découvrir les articles →
                                            </p>
                                          </div>
                                          
                                          {/* Hover effect gradient */}
                                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                                        </motion.div>
                                      </Link>
                                    ))}
                                    
                                    {/* 5ème élément pour Business (Finance) */}
                                    {item.subcategories.length === 5 && (
                                      <Link
                                        to={item.subcategories[4].path}
                                        className="group relative col-span-2"
                                      >
                                        <motion.div
                                          whileHover={{ scale: 1.02, x: 3 }}
                                          className="relative p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300"
                                        >
                                          <div className={`absolute top-3 right-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity`}>
                                            05
                                          </div>
                                          <div className="relative z-10">
                                            <h4 className="text-white font-medium text-sm mb-1">
                                              {item.subcategories[4].label}
                                            </h4>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                              Découvrir les articles →
                                            </p>
                                          </div>
                                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                                        </motion.div>
                                      </Link>
                                    )}
                                  </div>
                                  
                                  {/* Footer avec stats */}
                                  <div className="mt-5 pt-5 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-6">
                                        <div className="text-xs">
                                          <span className="text-gray-500">Articles</span>
                                          <span className="ml-2 font-bold text-white">247</span>
                                        </div>
                                        <div className="text-xs">
                                          <span className="text-gray-500">Auteurs</span>
                                          <span className="ml-2 font-bold text-white">18</span>
                                        </div>
                                      </div>
                                      <Link
                                        to={item.path}
                                        className={`text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r ${gradient} hover:opacity-80 transition-opacity`}
                                      >
                                        Voir tout →
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Séparateur */}
                  <div className="w-px h-6 bg-white/10 mx-2" />

                  {/* Items spéciaux */}
                  {specialItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="relative px-5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
                    >
                      <span>{item.label}</span>
                      {item.isNew && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full">
                          NEW
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions à droite - Desktop uniquement */}
              <div className="hidden lg:flex items-center gap-3">
                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Search className="w-4 h-4 text-gray-300" />
                </motion.button>

                {/* Notification */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Bell className="w-4 h-4 text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                </motion.button>

                {/* CTA Principal ULTRA PREMIUM */}
                <motion.div
                  className="relative"
                >
                  <Link
                    to="/create-with-roger"
                    className="relative block group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="relative"
                    >
                      {/* Bouton principal ULTRA PREMIUM */}
                      <div className="relative px-8 py-3 overflow-hidden">
                        {/* Fond avec effet de verre dépoli */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01] backdrop-blur-xl rounded-full" />
                        
                        {/* Bordure fine premium */}
                        <div className="absolute inset-0 rounded-full p-[0.5px] bg-gradient-to-r from-white/0 via-white/20 to-white/0">
                          <div className="w-full h-full bg-black/80 rounded-full" />
                        </div>
                        
                        {/* Effet de shine au hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
                              transform: 'translateX(-100%)',
                              animation: 'shine 1.5s ease-out'
                            }}
                          />
                        </div>
                        
                        {/* Contenu */}
                        <div className="relative flex items-center gap-4">
                          <span className="text-[13px] font-extralight text-white/90 tracking-[0.15em] uppercase">
                            Racontez votre histoire
                          </span>
                          
                          {/* Icône premium minimaliste */}
                          <svg 
                            className="w-3 h-3 text-white/50 group-hover:text-white/80 transition-colors duration-500" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="0.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button - CORRECTION: position et z-index */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative z-10 p-3 -mr-2"
                aria-label="Menu"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    className="block w-full h-0.5 bg-white rounded-full origin-left transform transition-all"
                    animate={isOpen ? {
                      rotate: 45,
                      y: -2,
                      x: 1
                    } : {
                      rotate: 0,
                      y: 0,
                      x: 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-full h-0.5 bg-white rounded-full transform transition-all"
                    animate={isOpen ? {
                      opacity: 0,
                      x: -20
                    } : {
                      opacity: 1,
                      x: 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-full h-0.5 bg-white rounded-full origin-left transform transition-all"
                    animate={isOpen ? {
                      rotate: -45,
                      y: 2,
                      x: 1
                    } : {
                      rotate: 0,
                      y: 0,
                      x: 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Search Bar Overlay - Desktop only */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10 overflow-hidden hidden lg:block"
              >
                <div className="max-w-3xl mx-auto p-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un article, un podcast, un auteur..."
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu - CORRECTION: overlay et panneau */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel - CORRECTION: largeur adaptative */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-y-0 right-0 w-full sm:max-w-md bg-black/95 backdrop-blur-2xl sm:border-l sm:border-white/10"
            >
              <div className="h-full overflow-y-auto pt-24 px-6 pb-8">
                {/* Mobile Menu Items */}
                <div className="space-y-2">
                  {menuItems.map((item) => {
                    const isActive = location.pathname.includes(item.slug);
                    const gradient = getGradientByColor(item.color);
                    
                    return (
                      <div key={item.slug} className="space-y-1">
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                            isActive 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white active:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.label}</span>
                            {isActive && (
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                            )}
                          </div>
                        </Link>
                        
                        {/* Mobile Subcategories */}
                        <div className="pl-4 space-y-1">
                          {item.subcategories.map((sub) => (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all active:bg-white/10"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Divider */}
                  <div className="my-4 h-px bg-white/10" />

                  {/* Special Items */}
                  {specialItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all font-medium active:bg-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        {item.isNew && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-amber-500 text-black rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}

                  {/* Mobile CTA ULTRA PREMIUM */}
                  <Link
                    to="/create-with-roger"
                    onClick={() => setIsOpen(false)}
                    className="block mt-6"
                  >
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      {/* Bouton premium mobile */}
                      <div className="relative overflow-hidden rounded-full p-[0.5px] bg-gradient-to-r from-white/10 via-white/20 to-white/10">
                        <div className="relative w-full px-6 py-3.5 bg-black/90 backdrop-blur-xl rounded-full">
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-[13px] font-extralight text-white/90 tracking-[0.12em] uppercase">
                              Racontez votre histoire
                            </span>
                            <svg 
                              className="w-3 h-3 text-white/50" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="0.5"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay when dropdown is open - Desktop only */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 hidden lg:block"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default ResponsiveNavbar;