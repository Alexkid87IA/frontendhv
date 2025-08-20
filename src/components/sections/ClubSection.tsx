import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  Sparkles, 
  Users, 
  Zap, 
  Calendar,
  Bell,
  CheckCircle,
  ArrowRight,
  Clock,
  Trophy,
  Star,
  Lock,
  Diamond,
  Gem,
  Award
} from 'lucide-react';

export const ClubSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Email ajouté à la liste d\'attente:', email);
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const features = [
    {
      icon: Crown,
      title: 'Accès VIP aux contenus',
      description: 'Articles exclusifs, podcasts en avant-première et analyses approfondies',
      gradient: 'from-yellow-300 to-amber-500'
    },
    {
      icon: Users,
      title: 'Communauté privée',
      description: 'Rejoignez un cercle fermé d\'entrepreneurs ambitieux et engagés',
      gradient: 'from-amber-300 to-yellow-500'
    },
    {
      icon: Calendar,
      title: 'Events mensuels',
      description: 'Masterclass live, Q&A exclusifs et networking de haut niveau',
      gradient: 'from-yellow-400 to-amber-400'
    },
    {
      icon: Zap,
      title: 'Outils & ressources',
      description: 'Templates, frameworks et méthodes utilisés par les leaders du marché',
      gradient: 'from-amber-400 to-yellow-600'
    }
  ];

  const stats = [
    { value: '500+', label: 'Sur liste d\'attente' },
    { value: '100', label: 'Places fondateurs' },
    { value: '7J', label: 'Avant lancement' },
    { value: '50%', label: 'Réduction' }
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background ultra premium avec effets dorés */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
        
        {/* Gradient mesh doré */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full blur-[150px] animate-pulse animation-delay-2000" />
        </div>

        {/* Rayons de lumière dorée */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 w-px h-[200vh] bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"
              style={{
                transform: `rotate(${i * 36}deg)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </div>
        
        {/* Particules dorées flottantes */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{ 
                y: [0, -50, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              <div className="w-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
            </motion.div>
          ))}
        </div>

        {/* Pattern de fond subtil */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, gold 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header de section amélioré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge premium animé */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full blur-2xl opacity-60 animate-pulse" />
              <div className="relative flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-yellow-500/30">
                <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
                <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 uppercase tracking-wider">
                  Liste d'attente ouverte
                </span>
                <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Titre principal avec effet métallique */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">Le </span>
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 animate-gradient">
                Club Élite
              </span>
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
            L'écosystème premium pour les entrepreneurs d'exception qui transforment leur vision en empire
          </p>
          <p className="text-lg text-yellow-400 font-medium">
            🚀 Lancement imminent • Inscrivez-vous pour être notifié en priorité
          </p>
        </motion.div>

        {/* Stats premium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Box offre spéciale SANS effet 3D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-20"
        >
          <div className="relative">
            {/* Bordure dorée animée */}
            <div className="absolute -inset-[2px] rounded-3xl opacity-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 animate-gradient-x" />
            </div>
            
            <div className="relative bg-black/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12">
              {/* Pattern de luxe */}
              <div className="absolute inset-0 opacity-5 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,215,0,0.1)_10px,rgba(255,215,0,0.1)_20px)]" />
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Section Pricing */}
                <div className="text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    {/* Badge offre fondateurs DANS LE FLUX */}
                    <div className="mb-6">
                      <span className="inline-block px-5 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold rounded-full">
                        OFFRE FONDATEURS -50%
                      </span>
                    </div>
                    
                    {/* Prix barré */}
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                      <span className="text-3xl text-gray-500 line-through">199€</span>
                    </div>
                    
                    {/* Prix principal */}
                    <div className="flex items-baseline gap-3 justify-center md:justify-start mb-6">
                      <span className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
                        99€
                      </span>
                      <span className="text-2xl text-gray-400">/mois</span>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-3 mb-6">
                      {['Accès prioritaire au lancement', 'Prix fondateur garanti à vie', 'Bonus exclusifs early adopters'].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-yellow-400" />
                          <span className="text-gray-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Urgence */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full">
                      <Bell className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <span className="text-sm text-yellow-400 font-medium">
                        Ouverture dans <strong>7 jours</strong>
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Section CTA */}
                <div className="space-y-6">
                  <form onSubmit={handleWaitlist} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre meilleur email"
                        required
                        className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-yellow-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:bg-white/10 transition-all text-lg"
                      />
                      <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400 pointer-events-none" />
                    </div>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative w-full px-8 py-5 overflow-hidden rounded-2xl font-bold text-lg group"
                      disabled={isSubscribed}
                    >
                      {/* Background animé */}
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 animate-gradient-x" />
                      
                      {/* Effet de shine */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: [-1000, 1000],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                      
                      <span className="relative flex items-center justify-center gap-3 text-black">
                        {isSubscribed ? (
                          <>
                            <CheckCircle className="w-6 h-6" />
                            <span>Inscrit avec succès !</span>
                          </>
                        ) : (
                          <>
                            <Bell className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                            <span>Rejoindre la liste d'attente</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                  
                  {/* Garanties */}
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Paiement sécurisé
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Sans engagement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid amélioré */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className="relative group"
              >
                {/* Glow effect on hover */}
                {hoveredFeature === index && (
                  <motion.div
                    layoutId="feature-glow"
                    className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 to-amber-400/30 rounded-3xl blur-xl"
                  />
                )}
                
                <div className="relative h-full p-8 bg-black/40 backdrop-blur-xl border border-yellow-500/10 rounded-3xl hover:border-yellow-500/30 transition-all duration-300">
                  <motion.div
                    className="mb-6"
                    animate={hoveredFeature === index ? { rotate: 360 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-black" />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials premium */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="max-w-3xl mx-auto">
            {/* Avatars */}
            <div className="flex justify-center mb-8">
              <div className="flex -space-x-4">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 border-2 border-black flex items-center justify-center shadow-xl">
                      <span className="text-sm font-bold text-black">{i + 1}</span>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="w-12 h-12 rounded-full bg-black/80 border-2 border-yellow-500/30 flex items-center justify-center ml-2"
                >
                  <span className="text-xs text-yellow-400 font-bold">+493</span>
                </motion.div>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            <p className="text-gray-400 mb-2">
              <strong className="text-white text-xl">Déjà 500+ inscrits</strong> sur la liste d'attente
            </p>
            
            <p className="text-sm text-gray-500">
              Soyez parmi les premiers à accéder au Club Élite lors du lancement
            </p>
          </div>
        </motion.div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default ClubSection;