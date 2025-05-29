import React, { useState, useEffect } from 'react';
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
    { label: 'Story', path: '/rubrique/story', icon: BookOpen, slug: 'story' },
    { label: 'Business', path: '/rubrique/business', icon: Briefcase, slug: 'business' },
    { label: 'Mental', path: '/rubrique/mental', icon: Brain, slug: 'mental' },
    { label: 'Society', path: '/rubrique/society', icon: Users, slug: 'society' },
    { label: 'Émissions', path: '/emissions', icon: Film, slug: 'emissions' }
  ];

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getCurrentLogo = () => {
    return "https://26.staticbtf.eno.do/v1/24-default/c6447f1810fadbb886029b7c212d9d98/media.jpg";
  };

  useEffect(( ) => {
    const handleClickOutside = (e) => {
      const target = e.target;
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-hv-card-bg/60 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="flex-shrink-0 flex items-center" 
          onClick={handleLogoClick}
        >
          <motion.img 
            src={getCurrentLogo()}
            alt="High Value Media Logo"
            className="h-10 md:h-12 w-auto object-contain" 
            animate={isAnimating ? { scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          />
        </Link>
        
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-2">
              {menuItems.map((item) => {
                const isActive = item.path.startsWith('/rubrique/') 
                  ? location.pathname === `/rubrique/${item.slug}` 
                  : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium ${
                      isActive 
                        ? "text-white bg-gradient-to-r from-hv-blue-accent/80 to-accent-turquoise/80 shadow-md" 
                        : "text-hv-text-primary-maquette hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon size={18} className={`transition-all duration-300 ${
                      isActive ? "text-white" : "text-hv-text-secondary-maquette group-hover:text-white"
                    }`} />
                    <span className="relative">
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/coaching"
                className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap border ${
                  location.pathname === "/coaching" 
                  ? "bg-hv-blue-accent text-white border-hv-blue-accent shadow-lg shadow-hv-blue-accent/20"
                  : "bg-hv-card-bg/50 hover:bg-white/10 text-hv-text-primary-maquette hover:text-white border-white/10 hover:border-white/30"
                }`}
              >
                Coaching
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/create-with-roger"
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap shadow-lg ${
                  location.pathname === "/create-with-roger"
                  ? "bg-gradient-to-r from-hv-blue-accent to-accent-turquoise text-white ring-2 ring-hv-blue-accent/50"
                  : "bg-gradient-to-r from-accent-blue/90 to-accent-turquoise/90 hover:from-hv-blue-accent hover:to-accent-turquoise text-white shadow-accent-blue/30"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Votre histoire
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="lg:hidden flex items-center">
          <button
            id="menu-button"
            className="p-2.5 text-white bg-hv-blue-accent/80 hover:bg-hv-blue-accent rounded-lg transition-colors shadow-md"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Menu principal"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-hv-dark/95 backdrop-blur-xl border-t border-white/10 z-40 overflow-y-auto pb-6"
          >
            <div className="px-4 pt-6 pb-4 space-y-2">
              {menuItems.map((item) => {
                const isActive = item.path.startsWith('/rubrique/') 
                  ? location.pathname === `/rubrique/${item.slug}` 
                  : location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 p-3.5 rounded-lg transition-all duration-300 text-base font-medium ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-hv-blue-accent/80 to-accent-turquoise/80 shadow-md' 
                          : 'text-neutral-200 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon size={22} className={isActive ? 'text-white' : 'text-neutral-400'} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-indicator"
                          className="ml-auto h-2 w-2 rounded-full bg-white"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="px-4 space-y-3 pt-4 border-t border-white/10">
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/coaching"
                  className={`block w-full text-center px-4 py-3.5 rounded-lg font-medium transition-all duration-300 text-base ${
                    location.pathname === '/coaching' 
                    ? 'bg-hv-blue-accent text-white shadow-lg shadow-hv-blue-accent/20'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Coaching
                </Link>
              </motion.div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to="/create-with-roger"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-hv-blue-accent to-accent-turquoise hover:from-accent-blue hover:to-hv-blue-accent text-white w-full px-4 py-3.5 rounded-lg font-medium transition-all duration-300 text-base shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Votre histoire</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ResponsiveNavbar;
