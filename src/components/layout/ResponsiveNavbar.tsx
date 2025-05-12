import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, Briefcase, Brain, Users, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { visible } = useScrollDirection();

  const menuItems = [
    { label: 'Story', path: '/rubrique/story', icon: BookOpen },
    { label: 'Business', path: '/rubrique/business', icon: Briefcase },
    { label: 'Psychologie', path: '/rubrique/psychologie', icon: Brain },
    { label: 'Société', path: '/rubrique/societe', icon: Users },
    { label: 'Émissions', path: '/emissions', icon: Film }
  ];

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  // Fonction pour obtenir le bon logo en fonction de la route
  const getCurrentLogo = () => {
    if (location.pathname.includes('/rubrique/story')) {
      return "https://26.staticbtf.eno.do/v1/28-default/edcc5f103e7a372373a37d5b076cbb95/media.jpg";
    }
    if (location.pathname.includes('/rubrique/business')) {
      return "https://26.staticbtf.eno.do/v1/26-default/bbbf1fa298aa2852f57b89ed996e3abc/media.jpg";
    }
    if (location.pathname.includes('/rubrique/psychologie')) {
      return "https://26.staticbtf.eno.do/v1/27-default/56769c87961b44f9f4db440f67dc4c72/media.jpg";
    }
    if (location.pathname.includes('/rubrique/societe')) {
      return "https://26.staticbtf.eno.do/v1/25-default/4a8c9f2fbd9d4903e419404dac62fd39/media.jpg";
    }
    return "https://26.staticbtf.eno.do/v1/24-default/c6447f1810fadbb886029b7c212d9d98/media.jpg";
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -200 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-primary/80 border-b border-white/5"
    >
      <div className="max-w-[1400px] mx-auto flex items-center h-24 md:h-40">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center -ml-16 md:-ml-24 py-2" 
          onClick={handleLogoClick}
        >
          <motion.div
            className="relative w-[280px] md:w-[400px] h-[90px] md:h-[130px] overflow-hidden"
            whileHover={{
              scale: 1.02,
              filter: "brightness(1.1)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.img 
              src={getCurrentLogo()}
              alt="Roger Ormières"
              className="w-full h-full object-contain"
              animate={isAnimating ? {
                scale: [1, 1.05, 1],
                filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
              } : {}}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </Link>
        
        {/* Navigation and Actions */}
        <div className="hidden lg:flex items-center gap-6 ml-auto pr-8">
          <div className="flex items-center gap-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-white bg-white/10' 
                      : 'text-tertiary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} className={`transition-colors duration-300 ${
                    isActive ? 'text-accent-blue' : 'text-tertiary group-hover:text-accent-blue'
                  }`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Link
                to="/coaching"
                className="relative flex items-center gap-2 bg-neutral-900/80 backdrop-blur-sm px-4 py-2.5 rounded-lg font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <span>Coaching</span>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Link
                to="/create-with-roger"
                className="relative flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>Votre histoire</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors ml-auto mr-4"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Menu principal"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-24 md:top-40 bottom-0 bg-primary/95 backdrop-blur-lg border-t border-white/5 z-50 overflow-y-auto"
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'text-white bg-white/10' 
                          : 'text-tertiary hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={24} className={
                        isActive ? 'text-accent-blue' : 'text-tertiary'
                      } />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <Link
                  to="/coaching"
                  className="flex items-center justify-center gap-2 bg-neutral-900/80 backdrop-blur-sm w-full px-4 py-4 rounded-lg font-medium transition-all duration-300 border border-white/10 hover:border-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Coaching</span>
                </Link>

                <Link
                  to="/create-with-roger"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white w-full px-4 py-4 rounded-lg font-medium transition-all duration-300"
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