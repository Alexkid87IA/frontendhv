import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isAnimating, setIsAnimating] = useState(false);
  const location = useLocation();
  const { visible } = useScrollDirection();
// Fonction pour obtenir le logo selon la page
const getCurrentLogo = () => {
  const path = location.pathname;
  
  if (path.includes('/story')) return logoStory;
  if (path.includes('/business')) return logoBusiness;
  if (path.includes('/mental')) return logoMental;
  if (path.includes('/society')) return logoSociety;
  
  // Logo par défaut
  return logoMedia;
};
  const menuItems = [
    { label: 'Story', path: '/rubrique/story', slug: 'story' },
    { label: 'Business', path: '/rubrique/business', slug: 'business' },
    { label: 'Mental', path: '/rubrique/mental', slug: 'mental' },
    { label: 'Society', path: '/rubrique/society', slug: 'society' },
    { 
      label: 'Le Club', 
      path: '/club', 
      slug: 'club',
      badge: 'Bientôt disponible'
    },
    { label: 'Coaching', path: '/coaching', slug: 'coaching' }
  ];

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo with Glow Effect */}
        <Link 
          to="/" 
          className="flex-shrink-0 flex items-center relative group" 
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
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-turquoise opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <img 
              src={getCurrentLogo()}
              alt="High Value Media"
              className="h-full w-auto object-contain relative z-10" 
            />
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                
                return (
                  <div key={item.path} className="relative group">
                    <Link
                      to={item.path}
                      className={`text-lg font-medium transition-colors ${
                        isActive 
                          ? "text-accent-blue" 
                          : "text-white hover:text-accent-blue"
                      }`}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-0.5 rounded-full ml-1">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-blue transition-all duration-300 group-hover:w-full" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-20 bg-black/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors relative group ${
                      isActive 
                        ? 'text-accent-blue bg-accent-blue/10' 
                        : 'text-white hover:text-accent-blue hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      {item.label}
                      {item.badge && (
                        <span className="text-xs bg-accent-blue/20 text-accent-blue px-2 py-0.5 rounded-full ml-2">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}

              <Link
                to="/create-with-roger"
                className="block w-full px-4 py-3 text-center bg-accent-blue hover:bg-accent-blue/90 text-white rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Votre histoire
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ResponsiveNavbar;