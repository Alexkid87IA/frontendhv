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
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-1.5 px-4 py-3 rounded-md transition-all duration-300 text-sm font-medium ${
                      isActive 
                        ? "text-white bg-gradient-to-r from-accent-blue/20 to-transparent" 
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} className={`transition-colors duration-200 ${
                      isActive ? "text-accent-blue" : "text-gray-400 group-hover:text-accent-blue"
                    }`} />
                    <span>{item.label}</span>
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
                className="relative inline-flex items-center justify-center overflow-hidden rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300"
              >
                {/* Animated gradient border */}
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-accent-blue to-accent-turquoise opacity-70 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"></span>
                
                {/* Background with glass effect */}
                <span className={`absolute inset-[1.5px] rounded-md bg-black/80 z-0 ${
                  location.pathname === "/coaching" 
                  ? "bg-gradient-to-r from-accent-blue/20 to-accent-turquoise/20"
                  : ""
                }`}></span>
                
                {/* Text with shadow for better readability */}
                <span className="relative z-10 flex items-center gap-1.5 text-white drop-shadow-sm">
                  Coaching
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
                className="relative inline-flex items-center justify-center overflow-hidden rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300"
              >
                {/* Animated gradient background */}
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-accent-blue to-accent-turquoise opacity-100"></span>
                
                {/* Animated glow effect */}
                <span className="absolute inset-0 rounded-md bg-gradient-to-r from-accent-blue to-accent-turquoise blur-[2px] opacity-50 animate-pulse"></span>
                
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="font-medium">Votre histoire</span>
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
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-base font-medium ${
                      isActive 
                        ? 'text-accent-blue bg-accent-blue/10' 
                        : 'text-white hover:text-accent-blue hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={20} className={isActive ? 'text-accent-blue' : 'text-gray-400'} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="px-4 space-y-4 pt-4 border-t border-white/10">
              {/* Mobile Coaching Button */}
              <div className="relative overflow-hidden rounded-lg group">
                {/* Animated gradient border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-lg opacity-70 group-hover:opacity-100 blur-sm transition-all duration-300 group-hover:blur"></div>
                
                <Link
                  to="/coaching"
                  className="relative flex items-center justify-center w-full px-6 py-3.5 bg-black text-white font-medium rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Subtle animated background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-turquoise/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  
                  {/* Text with subtle animation */}
                  <span className="relative z-10 text-base">Coaching</span>
                </Link>
              </div>
              
              {/* Mobile Votre Histoire Button */}
              <div className="relative overflow-hidden rounded-lg group">
                {/* Animated gradient background */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-lg opacity-80 group-hover:opacity-100 blur-sm transition-all duration-300 animate-pulse"></div>
                
                <Link
                  to="/create-with-roger"
                  className="relative flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-black text-white font-medium rounded-lg overflow-hidden group-hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {/* Subtle animated background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-accent-turquoise/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  
                  {/* Icon and text with subtle animation */}
                  <Sparkles className="w-5 h-5 text-white" />
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