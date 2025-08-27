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
      {/* NAVBAR SIMPLIFIÉE POUR ANDROID */}
      <nav
        className="fixed top-0 left-0 right-0 w-full h-20 bg-black/90 backdrop-blur-xl"
        style={{ 
          zIndex: 999999,
          position: 'fixed !important',
          display: 'block !important',
          visibility: 'visible !important',
          opacity: '1 !important',
          transform: 'none !important'
        }}
      >
        {/* Effet de blur premium */}
        <div className="absolute inset-0 backdrop-blur-2xl" />
        
        {/* Ligne de gradient en haut */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Container simple sans animation complexe */}
        <div className="relative h-full">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-full flex items-center justify-between">
              {/* Logo fixe */}
              <Link 
                to="/" 
                className="block"
                style={{ zIndex: 10 }}
              >
                <img 
                  src={getCurrentLogo()}
                  alt="High Value Media"
                  className="h-10 md:h-12 w-auto" 
                />
              </Link>
              
              {/* Desktop Navigation - INCHANGÉ */}
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

                  {/* Dropdown - INCHANGÉ */}
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
                              <div className={`absolute -top-2 left-12 w-4 h-4 bg-gradient-to-br ${gradient} rotate-45 rounded-sm`} />
                              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/20 to-white/5">
                                <div className="bg-black/95 backdrop-blur-2xl rounded-2xl p-6">
                                  <div className="mb-5">
                                    <div className={`text-xs font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-2`}>
                                      Explorer {item.label}
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                  </div>
                                  
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
                                          <div className={`absolute top-3 right-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${gradient} opacity-20 group-hover:opacity-40 transition-opacity`}>
                                            0{idx + 1}
                                          </div>
                                          
                                          <div className="relative z-10">
                                            <h4 className="text-white font-medium text-sm mb-1">
                                              {sub.label}
                                            </h4>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                                              Découvrir les articles →
                                            </p>
                                          </div>
                                          
                                          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity`} />
                                        </motion.div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="w-px h-6 bg-white/10 mx-2" />

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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Search className="w-4 h-4 text-gray-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <Bell className="w-4 h-4 text-gray-300" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                </motion.button>

                <Link
                  to="/create-with-roger"
                  className="px-6 py-2.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white hover:bg-white/20 transition-all"
                >
                  Racontez votre histoire
                </Link>
              </div>

              {/* BURGER MOBILE ULTRA SIMPLE - SANS FRAMER MOTION */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden block w-12 h-12 relative"
                style={{ 
                  zIndex: 999999,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px'
                }}
              >
                {!isOpen ? (
                  <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU MOBILE SIMPLE SANS ANIMATION COMPLEXE */}
      {isOpen && (
        <div 
          className="fixed inset-0 lg:hidden"
          style={{ 
            zIndex: 999998,
            backgroundColor: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* Panneau de menu simple */}
          <div 
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-black/95"
            style={{ zIndex: 999999 }}
          >
            <div className="h-full overflow-y-auto pt-24 px-6 pb-8">
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
                            : 'text-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.label}</span>
                          {isActive && (
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradient}`} />
                          )}
                        </div>
                      </Link>
                      
                      <div className="pl-4 space-y-1">
                        {item.subcategories.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-400 rounded-lg"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="my-4 h-px bg-white/10" />

                {specialItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-gray-300 font-medium"
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

                <Link
                  to="/create-with-roger"
                  onClick={() => setIsOpen(false)}
                  className="block mt-6 w-full py-3.5 bg-white/10 rounded-full text-center text-white"
                >
                  Racontez votre histoire
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveNavbar;