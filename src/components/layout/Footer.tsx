import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
// Import de tous les logos
import logoMedia from '../../assets/logos/LOGO_HV_MEDIA.svg';
import logoBusiness from '../../assets/logos/LOGO_HV_BUSINESS.svg';
import logoMental from '../../assets/logos/LOGO_HV_PSYCHO.svg';
import logoSociety from '../../assets/logos/LOGO_HV_SOCIETY.svg';
import logoStory from '../../assets/logos/LOGO_HV_STORY.svg';

export const Footer = () => {
  const mainLinks = [
    { label: 'Story', path: '/rubrique/story' },
    { label: 'Business', path: '/rubrique/business' },
    { label: 'Mental', path: '/rubrique/mental' },
    { label: 'Society', path: '/rubrique/society' }
  ];
  const location = useLocation();
  
  // Fonction pour obtenir le logo selon la page
  const getCurrentLogo = () => {
    const path = location.pathname;
    
    if (path.includes('/story')) return logoStory;
    if (path.includes('/business')) return logoBusiness;
    if (path.includes('/mental')) return logoMental;
    if (path.includes('/society')) return logoSociety;
    
    return logoMedia;
  };
  const legalLinks = [
    { label: 'Mentions légales', path: '/mentions-legales' },
    { label: 'Politique de confidentialité', path: '/confidentialite' },
    { label: 'CGV', path: '/cgv' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Youtube, url: '#', label: 'Youtube' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-6">
              <motion.img 
                src={getCurrentLogo()}
                alt="High Value Media"
                className="h-16 w-auto"
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.2)",
                  transition: { duration: 0.2 }
                }}
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Développez votre mindset d'exception et transformez votre vision du possible.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-accent-blue/20 hover:text-accent-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold mb-6">Navigation</h5>
              <ul className="space-y-4">
                {mainLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-6">Contact</h5>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:contact@highvalue.fr" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2">
                    <Mail size={16} />
                    <span>contact@highvalue.fr</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+33600000000" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2">
                    <Phone size={16} />
                    <span>+33 6 00 00 00 00</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} />
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h5 className="font-semibold mb-4">Créez avec nous</h5>
              <p className="text-gray-400 text-sm mb-6">
                Transformez votre expertise en contenu premium qui inspire et convertit.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
                <Link
                  to="/create-with-roger"
                  className="relative flex items-center justify-center gap-2 bg-black px-6 py-3 rounded-lg text-white group-hover:text-white/90 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Commencer</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} High Value Media. Tous droits réservés.
            </p>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;