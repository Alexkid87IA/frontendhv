import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, BookOpen, Briefcase, Brain, Users, Film, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useScrollDirection } from '../../hooks/useScrollDirection';

export const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { visible } = useScrollDirection();

  const menuItems = [
    { 
      label: 'Story', 
      path: '/rubrique/story', 
      icon: BookOpen, 
      slug: 'story',
      dropdown: [
        { label: 'Success Stories', path: '/rubrique/story/success-stories' },
        { label: 'Portraits', path: '/rubrique/story/portraits' },
        { label: 'Transformations', path: '/rubrique/story/transformations' }
      ]
    },
    { 
      label: 'Business', 
      path: '/rubrique/business', 
      icon: Briefcase, 
      slug: 'business',
      dropdown: [
        { label: 'Innovation', path: '/rubrique/business/innovation' },
        { label: 'Stratégie', path: '/rubrique/business/strategie' },
        { label: 'Leadership', path: '/rubrique/business/leadership' }
      ]
    },
    { 
      label: 'Mental', 
      path: '/rubrique/mental', 
      icon: Brain, 
      slug: 'mental',
      dropdown: [
        { label: 'Développement personnel', path: '/rubrique/mental/developpement' },
        { label: 'Résilience', path: '/rubrique/mental/resilience' },
        { label: 'Productivité', path: '/rubrique/mental/productivite' }
      ]
    },
    { 
      label: 'Society', 
      path: '/rubrique/society', 
      icon: Users, 
      slug: 'society',
      dropdown: [
        { label: 'Tendances', path: '/rubrique/society/tendances' },
        { label: 'Impact', path: '/rubrique/society/impact' },
        { label: 'Culture', path: '/rubrique/society/culture' }
      ]
    },
    { 
      label: 'Émissions', 
      path: '/emissions', 
      icon: Film, 
      slug: 'emissions',
      dropdown: [
        { label: 'Podcasts', path: '/podcasts' },
        { label: 'Vidéos', path: '/emissions/videos' },
        { label: 'Interviews', path: '/emissions/interviews' }
      ]
    }
  ];

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsOpen(false);
      }
      if (activeDropdown && !target.closest('.dropdown-menu') && !target.closest('.dropdown-trigger')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, activeDropdown]);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
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
              src="https://26.staticbtf.eno.do/v1/24-default/c6447f1810fadbb886029b7c212d9d98/media.jpg"
              alt="Roger Ormières"
              className="h-full w-auto object-contain" 
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 via-accent-turquoise/20 to-transparent rounded-full"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: isAnimating ? 1 : 0 }}
            />
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-6">
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                const Icon = item.icon;
                
                return (
                  <div key={item.path} className="relative group">
                    <button
                      className={`group dropdown-trigger flex items-center gap-1.5 px-4 py-3 rounded-md transition-all duration-200 text-sm font-medium ${
                        isActive 
                          ? "text-accent-blue bg-accent-blue/10" 
                          : "text-white hover:text-accent-blue hover:bg-accent-blue/5"
                      }`}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <Icon size={16} className={`transition-colors duration-200 ${
                        isActive ? "text-accent-blue" : "text-gray-400 group-hover:text-accent-blue"
                      }`} />
                      <span>{item.label}</span>
                      {item.dropdown && (
                        <ChevronDown 
                          size={14} 
                          className={`ml-1 transition-transform duration-200 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`} 
                        />
                      )}
                    </button>
                    
                    {/* Dropdown Menu */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="dropdown-menu absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-black/90 backdrop-blur-xl border border-white/10 overflow-hidden z-50"
                          >
                            <div className="py-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  to={subItem.path}
                                  className="block px-4 py-2.5 text-sm text-gray-200 hover:bg-accent-blue/10 hover:text-accent-blue transition-colors"
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
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
                className={`relative group overflow-hidden rounded-md transition-all duration-300`}
              >
                {/* Animated gradient border */}
                <span className="absolute -inset-px bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-md opacity-70 group-hover:opacity-100 blur-[1px] group-hover:blur-[2px] animate-gradient-x"></span>
                
                {/* Button content */}
                <span className="relative inline-flex items-center justify-center px-5 py-2.5 bg-black/90 rounded-[5px] text-sm font-medium text-white group-hover:text-white group-hover:bg-black/80 transition-all duration-300 z-10 shadow-inner shadow-white/5 group-hover:shadow-white/10">
                  <span className="relative z-10 flex items-center gap-1.5">
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">Coaching</span>
                  </span>
                </span>
              </Link>
            </motion.div>
            
            {/* Votre Histoire Button */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="relative"
            >
              <Link
                to="/create-with-roger"
                className="relative group overflow-hidden rounded-md"
              >
                {/* Animated glow effect */}
                <span className="absolute -inset-px bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-md opacity-100 blur-[2px] group-hover:blur-[3px] animate-gradient-x"></span>
                
                {/* Button content */}
                <span className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600/90 via-purple-500/90 to-pink-500/90 rounded-[5px] text-sm font-medium text-white shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 z-10">
                  <Sparkles className="w-4 h-4 text-white/90 animate-pulse" />
                  <span className="relative z-10">Votre histoire</span>
                </span>
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
            <span className="sr-only">{isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
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
            <div className="px-4 pt-6 pb-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path || 
                                location.pathname.startsWith(`/rubrique/${item.slug}`);
                const Icon = item.icon;
                
                return (
                  <div key={item.path} className="mb-2">
                    <button
                      className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-200 text-base font-medium ${
                        isActive 
                          ? 'text-accent-blue bg-accent-blue/10' 
                          : 'text-white hover:text-accent-blue hover:bg-white/5'
                      }`}
                      onClick={() => handleDropdownToggle(item.label)}
                      aria-expanded={activeDropdown === item.label}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-accent-blue' : 'text-gray-400'} />
                        <span>{item.label}</span>
                      </div>
                      {item.dropdown && (
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`} 
                        />
                      )}
                    </button>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-10 pr-4 mt-1 space-y-1"
                          >
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className="block py-2.5 px-3 text-sm text-gray-300 hover:text-accent-blue hover:bg-accent-blue/5 rounded-md transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="px-4 space-y-4 pt-4 border-t border-white/10">
              {/* Mobile Coaching Button */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute -inset-px bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-lg opacity-80 blur-[2px] animate-gradient-x"></div>
                
                <Link
                  to="/coaching"
                  className="relative flex items-center justify-center w-full px-6 py-3.5 bg-black/80 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 text-base bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hover:text-white transition-colors duration-300">Coaching</span>
                </Link>
              </div>
              
              {/* Mobile Votre Histoire Button */}
              <div className="relative overflow-hidden rounded-lg">
                <div className="absolute -inset-px bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-lg opacity-100 blur-[2px] animate-gradient-x"></div>
                
                <Link
                  to="/create-with-roger"
                  className="relative flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-gradient-to-r from-blue-600/90 via-purple-500/90 to-pink-500/90 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-5 h-5 text-white/90 animate-pulse" />
                  <span className="relative z-10 text-base">Votre histoire</span>
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