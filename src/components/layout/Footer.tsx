import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Mail,
  Heart,
  CheckCircle,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Send,
  Sparkles
} from 'lucide-react';

// Import de tous les logos
import logoMedia from '../../assets/logos/LOGO_HV_MEDIA.svg';
import logoBusiness from '../../assets/logos/LOGO_HV_BUSINESS.svg';
import logoMental from '../../assets/logos/LOGO_HV_PSYCHO.svg';
import logoSociety from '../../assets/logos/LOGO_HV_SOCIETY.svg';
import logoStory from '../../assets/logos/LOGO_HV_STORY.svg';

export const Footer = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const getCurrentLogo = () => {
    const path = location.pathname;
    
    if (path.includes('/story')) return logoStory;
    if (path.includes('/business')) return logoBusiness;
    if (path.includes('/mental')) return logoMental;
    if (path.includes('/society')) return logoSociety;
    
    return logoMedia;
  };

  const socialLinks = [
    { icon: Twitter, url: 'https://twitter.com/highvalue' },
    { icon: Instagram, url: 'https://instagram.com/highvalue' },
    { icon: Youtube, url: 'https://youtube.com/highvalue' },
    { icon: Linkedin, url: 'https://linkedin.com/company/highvalue' }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Background avec effet argent métallique subtil */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-black" />
        {/* Mesh gradient argent très subtil */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]">
          <div className="absolute inset-0 bg-gradient-radial from-gray-400/[0.03] via-gray-500/[0.02] to-transparent blur-3xl" />
          {/* Effet de brillance métallique */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.01)_50%,transparent)] animate-shimmer" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION PRINCIPALE : Newsletter + Navigation */}
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* GAUCHE : Newsletter avec effet argent */}
            <div>
              {/* Header newsletter avec badge argent */}
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-gradient-to-br from-gray-300/20 to-gray-400/20 rounded-lg backdrop-blur-sm">
                  <Mail className="w-4 h-4 text-gray-300" />
                </div>
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400 uppercase tracking-wider">
                  Newsletter Premium
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                Une longueur d'avance, chaque semaine
              </h3>
              
              <p className="text-gray-400 text-sm mb-6">
                Rejoignez 15,000+ leaders qui reçoivent nos analyses exclusives et insights premium.
              </p>

              {/* Formulaire avec effet métallique */}
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre meilleur email"
                    required
                    className="flex-1 px-4 py-2.5 bg-white/[0.02] border border-gray-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:bg-white/[0.03] transition-all text-sm"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubscribed}
                    className="relative px-5 py-2.5 rounded-lg text-white font-medium text-sm disabled:opacity-50 overflow-hidden group"
                  >
                    {/* Background métallique animé */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 animate-shimmer-slow" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent opacity-50" />
                    <span className="relative flex items-center gap-2">
                      {isSubscribed ? <CheckCircle className="w-4 h-4" /> : 'S\'inscrire'}
                    </span>
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {isSubscribed ? (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-green-400 text-xs"
                    >
                      ✓ Inscription confirmée !
                    </motion.p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      Zéro spam. Désinscription en 1 clic.
                    </p>
                  )}
                </AnimatePresence>
              </form>

              {/* Points clés avec checks argentés */}
              <div className="flex flex-wrap gap-4 mt-6">
                {['Analyses exclusives', 'Cas pratiques', 'Accès communauté'].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DROITE : Navigation structurée */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6">
              {/* Rubriques */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Rubriques</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Story', path: '/rubrique/story' },
                    { label: 'Business', path: '/rubrique/business' },
                    { label: 'Mental', path: '/rubrique/mental' },
                    { label: 'Society', path: '/rubrique/society' }
                  ].map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contenus */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Contenus</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Tous les articles', path: '/articles' },
                    { label: 'Podcasts', path: '/podcasts', isNew: true },
                    { label: 'Vidéos', path: '/videos' },
                    { label: 'Guides premium', path: '/guides' }
                  ].map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <span>{item.label}</span>
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Communauté */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Communauté</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Le Club Elite', path: '/club', isNew: true },
                    { label: 'Events', path: '/events' },
                    { label: 'Masterclass', path: '/masterclass' },
                    { label: 'Forums', path: '/forums' }
                  ].map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        <span>{item.label}</span>
                        {item.isNew && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* À propos */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">À propos</h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Notre mission', path: '/mission' },
                    { label: 'L\'équipe', path: '/team' },
                    { label: 'Contact', path: '/contact' },
                    { label: 'Carrières', path: '/careers' }
                  ].map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION BOTTOM : Logo, Stats, Socials et Legal */}
        <div className="py-8 border-t border-white/5">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            
            {/* Logo et social */}
            <div className="flex items-center gap-6">
              <Link to="/" className="inline-block">
                <img 
                  src={getCurrentLogo()}
                  alt="High Value Media"
                  className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              
              <div className="flex gap-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Stats centrées avec effet métallique */}
            <div className="flex justify-center gap-8">
              {[
                { value: '50K+', label: 'LECTEURS ACTIFS' },
                { value: '500+', label: 'ARTICLES PREMIUM' }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-500">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Copyright et legal */}
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-2">
                © {new Date().getFullYear()} High Value Media • Built with ❤️ by 
                <a
                  href="https://www.instagram.com/alex______kid/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-300 transition-colors ml-1"
                >
                  @alexkid
                </a>
              </div>
              <div className="flex justify-end gap-4">
                {['Mentions légales', 'Confidentialité', 'CGV'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour l'animation shimmer métallique */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer {
          animation: shimmer 8s infinite;
        }
        .animate-shimmer-slow {
          background-size: 200% 100%;
          animation: shimmer-gradient 3s linear infinite;
        }
        @keyframes shimmer-gradient {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;