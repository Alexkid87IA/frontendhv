import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  TrendingUp,
  Mail,
  MapPin,
  Heart,
  Star,
  Send,
  ChevronRight,
  Globe,
  Users,
  Award,
  BookOpen,
  Headphones,
  MessageCircle,
  CheckCircle
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  
  // Fonction pour obtenir le logo selon la page
  const getCurrentLogo = () => {
    const path = location.pathname;
    
    if (path.includes('/story')) return logoStory;
    if (path.includes('/business')) return logoBusiness;
    if (path.includes('/mental')) return logoMental;
    if (path.includes('/society')) return logoSociety;
    
    return logoMedia;
  };

  // Navigation principale avec stats dynamiques
  const mainNav = [
    { 
      label: 'Story', 
      path: '/rubrique/story',
      icon: Sparkles,
      description: 'Parcours & réussites',
      gradient: 'from-amber-400 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      stats: { articles: '267', trending: '+12%' },
      featured: 'Nouveau : Success Stories'
    },
    { 
      label: 'Business', 
      path: '/rubrique/business',
      icon: TrendingUp,
      description: 'Stratégies & croissance',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      stats: { articles: '189', trending: '+8%' },
      featured: 'Dossier : Scale-ups 2025'
    },
    { 
      label: 'Mental', 
      path: '/rubrique/mental',
      icon: Crown,
      description: 'Mindset & performance',
      gradient: 'from-purple-400 to-violet-500',
      bgGradient: 'from-purple-500/10 to-violet-500/10',
      stats: { articles: '156', trending: '+15%' },
      featured: 'Guide : Focus Extrême'
    },
    { 
      label: 'Society', 
      path: '/rubrique/society',
      icon: Rocket,
      description: 'Futur & innovations',
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      stats: { articles: '134', trending: '+10%' },
      featured: 'Spécial : IA & Société'
    }
  ];

  // Réseaux sociaux redesignés
  const socialLinks = [
    { 
      icon: Twitter, 
      url: 'https://twitter.com/highvalue',
      label: 'Twitter',
      handle: '@highvalue',
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      icon: Instagram, 
      url: 'https://instagram.com/highvalue',
      label: 'Instagram',
      handle: '@highvalue',
      gradient: 'from-pink-500 to-purple-600'
    },
    { 
      icon: Youtube, 
      url: 'https://youtube.com/highvalue',
      label: 'Youtube',
      handle: 'High Value',
      gradient: 'from-red-500 to-red-700'
    },
    { 
      icon: Linkedin, 
      url: 'https://linkedin.com/company/highvalue',
      label: 'LinkedIn',
      handle: 'High Value Media',
      gradient: 'from-blue-600 to-blue-800'
    }
  ];

  // Quick links organisés
  const quickLinks = {
    'Contenus': [
      { label: 'Tous les articles', path: '/articles', isNew: false },
      { label: 'Podcasts', path: '/podcasts', isNew: true },
      { label: 'Vidéos', path: '/videos', isNew: false },
      { label: 'Guides premium', path: '/guides', isNew: false }
    ],
    'Communauté': [
      { label: 'Le Club Elite', path: '/club', isNew: true },
      { label: 'Events', path: '/events', isNew: false },
      { label: 'Masterclass', path: '/masterclass', isNew: false },
      { label: 'Newsletter', path: '/newsletter', isNew: false }
    ],
    'À propos': [
      { label: 'Notre mission', path: '/mission', isNew: false },
      { label: 'L\'équipe', path: '/team', isNew: false },
      { label: 'Contact', path: '/contact', isNew: false },
      { label: 'Carrières', path: '/careers', isNew: true }
    ]
  };

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
    <footer className="relative overflow-hidden bg-black">
      {/* Background avec effets ultra premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950" />
        
        {/* Mesh gradient animé */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grille de points lumineux */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Lignes animées */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ top: `${30 + i * 30}%` }}
              animate={{
                x: [-1000, 1000],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container pt-24 pb-12">
        {/* Logo et tagline premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Link to="/" className="inline-block mb-8 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <img 
                src={getCurrentLogo()}
                alt="High Value Media"
                className="h-16 w-auto mx-auto relative z-10"
              />
            </motion.div>
          </Link>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">L'excellence </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              comme standard
            </span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Rejoignez 50,000+ entrepreneurs qui développent leur mindset d'exception avec nos contenus premium
          </p>
        </motion.div>

        {/* Newsletter Section Ultra Premium - Alignée avec les cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 px-6"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl opacity-50" />
            
            <div className="relative bg-gradient-to-br from-neutral-900/90 to-black/90 backdrop-blur-2xl rounded-3xl border border-white/10 p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 uppercase tracking-wider">
                      Newsletter Premium
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Une longueur d'avance, chaque semaine
                  </h3>
                  
                  <ul className="space-y-3 mb-6">
                    {['Analyses exclusives', 'Cas pratiques détaillés', 'Accès anticipé aux contenus'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-black flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      <strong className="text-white">15,000+</strong> leaders inscrits
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre meilleur email"
                      required
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all group-hover:border-white/20"
                    />
                    
                    <AnimatePresence>
                      {isSubscribed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          <Send className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubscribed}
                    className="relative w-full group overflow-hidden rounded-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity" />
                    
                    <div className="relative px-6 py-4 flex items-center justify-center gap-2 text-white font-bold">
                      {isSubscribed ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Inscription confirmée !</span>
                        </>
                      ) : (
                        <>
                          <span>Recevoir la newsletter</span>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Zéro spam. Désinscription en 1 clic.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Cards Ultra Design - Même padding */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 px-6"
        >
          {mainNav.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.label)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link to={item.path}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative h-full group"
                  >
                    {/* Card avec effet de profondeur */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl" />
                    <div className="relative h-full p-8 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
                      {/* Background gradient animé */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Particules flottantes au hover */}
                      <AnimatePresence>
                        {hoveredCard === item.label && (
                          <>
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
                                initial={{ 
                                  x: Math.random() * 100 + '%',
                                  y: 100 + '%',
                                  opacity: 0
                                }}
                                animate={{ 
                                  y: -20 + '%',
                                  opacity: [0, 1, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.2,
                                  ease: "easeOut"
                                }}
                              />
                            ))}
                          </>
                        )}
                      </AnimatePresence>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon avec effet de glow */}
                        <div className="relative inline-block mb-6">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                          <div className={`relative p-3 bg-gradient-to-br ${item.gradient} rounded-2xl`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                          {item.label}
                        </h3>
                        
                        <p className="text-gray-400 mb-4">
                          {item.description}
                        </p>
                        
                        {/* Stats avec animation */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-gray-500" />
                            <span className="text-sm text-gray-300 font-medium">{item.stats.articles}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-sm text-green-400 font-medium">{item.stats.trending}</span>
                          </div>
                        </div>
                        
                        {/* Featured content */}
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                            {item.featured}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Links Section - Alignée et centrée avec les cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8 mb-20 px-6"
        >
          {/* Company Info - Centré */}
          <div className="text-center">
            <h4 className="text-white font-bold mb-6">High Value Media</h4>
            <p className="text-gray-400 text-sm mb-6">
              L'écosystème média de référence pour les entrepreneurs ambitieux.
            </p>
            
            <div className="space-y-3 flex flex-col items-center">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Paris, France</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                <span>Disponible mondialement</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>50K+ membres actifs</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Centrés */}
          {Object.entries(quickLinks).map(([category, links]) => (
            <div key={category} className="text-center">
              <h4 className="text-white font-bold mb-6">{category}</h4>
              <ul className="space-y-3 flex flex-col items-center">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      {link.isNew && (
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                          NEW
                        </span>
                      )}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Social Links Premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredSocial(social.label)}
                onMouseLeave={() => setHoveredSocial(null)}
                className="relative group"
              >
                <div className="relative px-6 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/[0.05] transition-all">
                  {/* Glow effect on hover */}
                  <AnimatePresence>
                    {hoveredSocial === social.label && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-10 rounded-2xl`}
                      />
                    )}
                  </AnimatePresence>
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">{social.label}</p>
                      <p className="text-sm text-white font-medium">{social.handle}</p>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} High Value Media</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Crafted with
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                </motion.div>
                in Paris
              </span>
            </div>

            <div className="flex items-center gap-6">
              {['Mentions légales', 'Confidentialité', 'CGV', 'Cookies'].map((item) => (
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
      </div>
    </footer>
  );
};

export default Footer;