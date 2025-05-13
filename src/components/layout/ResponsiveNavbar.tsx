import React, { useState } from 'react';
import { Menu, X, Sparkles, BookOpen, Briefcase, Brain, Users, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // Pour l'animation du logo
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
      setTimeout(() => setIsAnimating(false), 600); // Durée de l'animation
    }
  };

  const getCurrentLogo = () => {
    // Pour simplifier, utilisons un logo générique pour l'instant ou le logo par défaut.
    // La logique de changement de logo peut être réintroduite plus tard si nécessaire.
    return "https://26.staticbtf.eno.do/v1/24-default/c6447f1810fadbb886029b7c212d9d98/media.jpg"; // Logo par défaut
  };

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

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }} // Ajusté pour la hauteur de la navbar
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-hv-dark/80 border-b border-white/10 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex-shrink-0 flex items-center" 
          onClick={handleLogoClick}
        >
          <motion.img 
            src={getCurrentLogo()}
            alt="High Value Media Logo"
            className="h-10 md:h-12 w-auto object-contain" // Hauteur fixe, largeur auto
            animate={isAnimating ? { scale: [1, 1.05, 1], filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          />
        </Link>
        
        {/* Navigation and Actions - Desktop */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          {/* Conteneur pour centrer le bloc compact des liens de menu */}
          <div className="flex-1 flex justify-center">
            {/* Bloc compact des liens de menu */}
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path) || (item.path === '/emissions' && location.pathname === '/emissions');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-1.5 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                      isActive 
                        ? 'text-hv-turquoise bg-hv-blue/20' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} className={`transition-colors duration-200 ${
                      isActive ? 'text-hv-turquoise' : 'text-neutral-400 group-hover:text-hv-turquoise'
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Boutons d'action */} 
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/coaching"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                  location.pathname === '/coaching' 
                  ? 'bg-hv-blue text-white shadow-lg'
                  : 'bg-neutral-700/50 hover:bg-neutral-600/70 text-neutral-200 hover:text-white border border-transparent hover:border-hv-blue/50'
                }`}
              >
                Coaching
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/create-with-roger"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap shadow-md ${
                  location.pathname === '/create-with-roger'
                  ? 'bg-gradient-to-r from-hv-turquoise to-hv-blue text-white ring-2 ring-hv-turquoise'
                  : 'bg-gradient-to-r from-hv-blue to-hv-turquoise hover:from-hv-turquoise hover:to-hv-blue text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Votre histoire
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Button */} 
        <div className="lg:hidden flex items-center">
          <button
            id="menu-button"
            className="p-2 text-neutral-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
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
            className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-hv-dark/95 backdrop-blur-xl border-t border-white/10 z-40 overflow-y-auto pb-6"
          >
            <div className="px-4 pt-6 pb-4 space-y-3">
              {menuItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path) || (item.path === '/emissions' && location.pathname === '/emissions');
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-base font-medium ${
                      isActive 
                        ? 'text-hv-turquoise bg-hv-blue/20' 
                        : 'text-neutral-200 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} className={isActive ? 'text-hv-turquoise' : 'text-neutral-400'} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="px-4 space-y-3 pt-3 border-t border-white/10">
              <Link
                to="/coaching"
                className={`block w-full text-center px-4 py-3 rounded-lg font-medium transition-all duration-200 text-base ${
                  location.pathname === '/coaching' 
                  ? 'bg-hv-blue text-white shadow-lg'
                  : 'bg-neutral-700/70 hover:bg-neutral-600 text-neutral-100 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Coaching
              </Link>
              <Link
                to="/create-with-roger"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-hv-blue to-hv-turquoise hover:from-hv-turquoise hover:to-hv-blue text-white w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 text-base shadow-md"
                onClick={() => setIsOpen(false)}
              >
                <Sparkles className="w-5 h-5" />
                <span>Votre histoire</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
