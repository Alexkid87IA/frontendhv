import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin,
  ArrowUpRight,
  Sparkles,
  Zap,
  Crown,
  Rocket,
  TrendingUp
} from 'lucide-react';

// Import de tous les logos
import logoMedia from '../../assets/logos/LOGO_HV_MEDIA.svg';
import logoBusiness from '../../assets/logos/LOGO_HV_BUSINESS.svg';
import logoMental from '../../assets/logos/LOGO_HV_PSYCHO.svg';
import logoSociety from '../../assets/logos/LOGO_HV_SOCIETY.svg';
import logoStory from '../../assets/logos/LOGO_HV_STORY.svg';

export const Footer = () => {
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

  // Navigation principale avec icônes
  const mainNav = [
    { 
      label: 'Story', 
      path: '/rubrique/story',
      icon: Sparkles,
      description: 'Histoires inspirantes',
      gradient: 'from-amber-500 to-orange-500'
    },
    { 
      label: 'Business', 
      path: '/rubrique/business',
      icon: TrendingUp,
      description: 'Stratégies gagnantes',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      label: 'Mental', 
      path: '/rubrique/mental',
      icon: Crown,
      description: 'Mindset d\'exception',
      gradient: 'from-purple-500 to-violet-500'
    },
    { 
      label: 'Society', 
      path: '/rubrique/society',
      icon: Rocket,
      description: 'Mutations sociétales',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  // Liens ressources
  const resourceLinks = [
    { label: 'Tous les articles', path: '/articles' },
    { label: 'Podcasts', path: '/emissions' },
    { label: 'Newsletter', path: '#newsletter' },
    { label: 'Le Club', path: '#club' }
  ];

  // Réseaux sociaux
  const socialLinks = [
    { 
      icon: Twitter, 
      url: 'https://twitter.com/highvalue',
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com/highvalue',
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
    { 
      icon: Youtube, 
      url: 'https://youtube.com/highvalue',
      label: 'Youtube',
      color: 'hover:text-red-500'
    },
    { 
      icon: Linkedin, 
      url: 'https://linkedin.com/company/highvalue',
      label: 'LinkedIn',
      color: 'hover:text-blue-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/5">
      {/* Background avec effet de mesh gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-black to-black" />
        
        {/* Mesh gradient animé */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse animation-delay-4000" />
        </div>

        {/* Grille décorative */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Top Section avec Logo et Tagline */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-20"
          >
            <Link to="/" className="inline-block mb-6">
              <motion.img 
                src={getCurrentLogo()}
                alt="High Value Media"
                className="h-20 w-auto mx-auto"
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.3)"
                }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            
            <p className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-white">Développez votre</span>
              <span className="text-accent-turquoise ml-2">mindset d'exception</span>
            </p>
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              Rejoignez une communauté d'entrepreneurs ambitieux qui transforment leurs idées en empire
            </p>
          </motion.div>

          {/* Navigation Cards - Disposition en grille */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
          >
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative h-full p-6 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20"
                  >
                    {/* Gradient overlay au hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                        {item.label}
                      </h3>
                      
                      <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        {item.description}
                      </p>
                      
                      {/* Arrow indicator */}
                      <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-gray-600 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          {/* Middle Section - Ressources et Social */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
          >
            {/* Ressources */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                Ressources
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                Suivez-nous
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center text-gray-400 transition-all hover:bg-white/10 hover:border-white/20 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright avec animation */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>&copy; {new Date().getFullYear()}</span>
                <span className="text-gray-600">•</span>
                <span>High Value Media</span>
                <span className="text-gray-600">•</span>
                <span className="flex items-center gap-1">
                  Crafted with
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="w-3 h-3 text-yellow-400" />
                  </motion.div>
                  in Paris
                </span>
              </div>

              {/* Legal Links */}
              <div className="flex gap-6">
                {['Mentions légales', 'Confidentialité', 'CGV'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;