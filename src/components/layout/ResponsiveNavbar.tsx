import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { visible } = useScrollDirection();

  const menuItems = [
    { 
      label: 'Story', 
      subtitle: 'Pour t\'inspirer',
      path: '/rubrique/recits', 
      logo: '/src/assets/logos/LOGO_HV STORY.svg', 
      slug: 'recits' 
    },
    { 
      label: 'Business', 
      subtitle: 'Pour faire du chiffre',
      path: '/rubrique/business', 
      logo: '/src/assets/logos/LOGO_HV BUSINESS.svg', 
      slug: 'business' 
    },
    { 
      label: 'Mental', 
      subtitle: 'Pour ta tête',
      path: '/rubrique/mental', 
      logo: '/src/assets/logos/LOGO_HV PSYCHO.svg', 
      slug: 'mental' 
    },
    { 
      label: 'Society', 
      subtitle: 'Pour ta culture',
      path: '/rubrique/society', 
      logo: '/src/assets/logos/LOGO_HV SOCIETY.svg', 
      slug: 'society' 
    }
  ];

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex-shrink-0 flex items-center" 
          onClick={handleLogoClick}
        >
          <motion.div
            animate={isAnimating ? { 
              scale: [1, 1.05, 1], 
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] 
            } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            className="relative h-10 md:h-12"
          >
            <img 
              src="/src/assets/logos/LOGO_HV MEDIA.svg"
              alt="High Value Media"
              className="h-full w-auto object-contain" 
            />
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex flex-col items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? "bg-white/10" 
                        : "hover:bg-white/5"
                    }`}
                  >
                    <img 
                      src={item.logo} 
                      alt={item.label}
                      className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-medium text-white">{item.label}</span>
                      <span className="text-xs text-gray-400">{item.subtitle}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* Coaching Button */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <Link
                to="/coaching"
                className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/coaching" 
                  ? "bg-accent-blue text-white"
                  : "bg-white/10 hover:bg-accent-blue/20 text-white hover:text-accent-blue"
                }`}
              >
                <span className="relative z-10">Coaching</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent-blue/0 via-accent-blue/0 to-accent-blue/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </motion.div>
            
            {/* Votre Histoire Button */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
              <Link
                to="/create-with-roger"
                className="relative flex items-center gap-2 bg-black px-6 py-3 rounded-lg text-white group-hover:text-white/90 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Votre histoire</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            id="menu-button"
            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Menu principal"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/10 z-40 overflow-y-auto pb-6"
          >
            <div className="px-4 pt-6 pb-4 space-y-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <img 
                      src={item.logo} 
                      alt={item.label}
                      className="h-10 w-10"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{item.label}</span>
                      <span className="text-sm text-gray-400">{item.subtitle}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="px-4 space-y-4 pt-4 border-t border-white/10">
              <Link
                to="/coaching"
                className={`flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === '/coaching' 
                  ? 'bg-accent-blue text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Coaching
              </Link>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
                <Link
                  to="/create-with-roger"
                  className="relative flex items-center justify-center gap-2 bg-black w-full px-6 py-3 rounded-lg font-medium text-white group-hover:text-white/90 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Votre histoire</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ResponsiveNavbar;