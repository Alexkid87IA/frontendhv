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
  Lock
} from 'lucide-react';

export const ClubSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Connecter à votre service d'email
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
      description: 'Articles exclusifs, podcasts en avant-première et analyses approfondies'
    },
    {
      icon: Users,
      title: 'Communauté privée',
      description: 'Rejoignez un cercle fermé d\'entrepreneurs ambitieux et engagés'
    },
    {
      icon: Calendar,
      title: 'Events mensuels',
      description: 'Masterclass live, Q&A exclusifs et networking de haut niveau'
    },
    {
      icon: Zap,
      title: 'Outils & ressources',
      description: 'Templates, frameworks et méthodes utilisés par les leaders du marché'
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.15),transparent_70%)]" />
        
        {/* Particules dorées animées */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                y: [null, -30, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10">
        {/* Header de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge "Bientôt disponible" */}
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.05, 1] }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full mb-6"
          >
            <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span className="text-sm font-medium text-yellow-400">Lancement imminent</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Rejoignez le </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
              Club Élite
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Accédez à un écosystème exclusif conçu pour les entrepreneurs qui visent l'excellence 
            et veulent passer au niveau supérieur
          </p>
        </motion.div>

        {/* Box offre spéciale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-3xl blur-lg opacity-30 animate-pulse" />
            
            <div className="relative bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border border-yellow-500/20 rounded-3xl p-8 md:p-12">
              {/* Ruban "Offre limitée" */}
              <div className="absolute -top-4 right-8 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 Offre de lancement limitée
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Pricing */}
                <div className="text-center md:text-left">
                  <div className="mb-4">
                    <span className="text-gray-400 line-through text-2xl">199€</span>
                    <span className="text-red-500 text-sm font-bold ml-2">-50%</span>
                  </div>
                  <div className="flex items-baseline gap-2 justify-center md:justify-start mb-2">
                    <span className="text-6xl md:text-7xl font-bold text-white">99€</span>
                    <span className="text-gray-400 text-xl">/mois</span>
                  </div>
                  <p className="text-yellow-400 font-medium mb-6">
                    Prix exclusif pour les 100 premiers membres
                  </p>
                  
                  {/* Countdown urgence */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Bell className="w-4 h-4 text-yellow-400" />
                    <span>Limité aux <strong className="text-white">100 premiers</strong> inscrits</span>
                  </div>
                </div>

                {/* CTA Waitlist */}
                <div className="space-y-4">
                  <form onSubmit={handleWaitlist} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre meilleur email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-bold rounded-xl shadow-lg hover:shadow-yellow-400/20 transition-all duration-300 flex items-center justify-center gap-2"
                      disabled={isSubscribed}
                    >
                      {isSubscribed ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          <span>Inscrit sur la liste !</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-5 h-5" />
                          <span>Rejoindre la liste d'attente</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                  
                  <p className="text-xs text-gray-500 text-center">
                    <Lock className="w-3 h-3 inline mr-1" />
                    Vos données sont sécurisées. Zéro spam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-6 bg-neutral-900/50 backdrop-blur-sm border border-yellow-500/10 rounded-2xl hover:border-yellow-500/30 transition-all duration-300">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials / Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400 border-2 border-black flex items-center justify-center"
                >
                  <span className="text-xs font-bold text-black">{i + 1}</span>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white">+500 entrepreneurs</strong> déjà inscrits
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm">
            Rejoignez l'élite entrepreneuriale française
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubSection;