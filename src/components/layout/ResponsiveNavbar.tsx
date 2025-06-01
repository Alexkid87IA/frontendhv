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
    { label: 'Story', path: '/rubrique/story', slug: 'story' },
    { label: 'Business', path: '/rubrique/business', slug: 'business' },
    { label: 'Mental', path: '/rubrique/mental', slug: 'mental' },
    { label: 'Society', path: '/rubrique/society', slug: 'society' }
  ];

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
        <Link to="/" className="flex-shrink-0">
          <motion.img 
            src="/src/assets/logos/LOGO_HV MEDIA.svg"
            alt="High Value Media"
            className="h-12 w-auto"
            whileHover={{ scale: 1.05 }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between ml-6 flex-1">
          <div className="flex justify-center flex-1">
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-lg font-medium transition-colors ${
                    location.pathname === item.path || location.pathname.includes(item.slug)
                      ? "text-accent-blue" 
                      : "text-white hover:text-accent-blue"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/coaching"
              className={`px-6 py-3 rounded-lg transition-colors ${
                location.pathname === "/coaching"
                  ? "bg-accent-blue text-white"
                  : "bg-white/10 hover:bg-accent-blue/20 text-white hover:text-accent-blue"
              }`}
            >
              Coaching
            </Link>
            
            <Link
              to="/create-with-roger"
              className="flex items-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              <span>Votre histoire</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-x-0 top-20 bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                    location.pathname === item.path || location.pathname.includes(item.slug)
                      ? "text-accent-blue"
                      : "text-white hover:text-accent-blue"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 space-y-4 border-t border-white/10">
                <Link
                  to="/coaching"
                  className="block w-full text-center px-6 py-3 rounded-lg bg-white/10 text-white hover:bg-accent-blue hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Coaching
                </Link>
                
                <Link
                  to="/create-with-roger"
                  className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-turquoise text-white hover:opacity-90 transition-opacity"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Votre histoire</span>
                  </span>
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