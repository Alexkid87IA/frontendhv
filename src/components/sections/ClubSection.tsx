import React, { useState } from 'react';
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
  Star,
  Lock
} from 'lucide-react';

export const ClubSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleWaitlist = () => {
    if (email && email.includes('@')) {
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
      gradient: 'from-emerald-300 to-teal-500'
    },
    {
      icon: Users,
      title: 'Communauté privée',
      description: 'Rejoignez un cercle fermé d\'entrepreneurs ambitieux et engagés',
      gradient: 'from-teal-300 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'Events mensuels',
      description: 'Masterclass live, Q&A exclusifs et networking de haut niveau',
      gradient: 'from-emerald-400 to-teal-400'
    },
    {
      icon: Zap,
      title: 'Outils & ressources',
      description: 'Templates, frameworks et méthodes utilisés par les leaders du marché',
      gradient: 'from-teal-400 to-emerald-600'
    }
  ];

  const stats = [
    { value: '500+', label: 'Sur liste d\'attente' },
    { value: '100', label: 'Places fondateurs' },
    { value: '7J', label: 'Avant lancement' },
    { value: '50%', label: 'Réduction' }
  ];

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .glow-emerald {
          box-shadow: 0 0 60px rgba(16, 185, 129, 0.3);
        }
        
        .text-gradient-emerald {
          background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        .feature-card {
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(16, 185, 129, 0.3);
        }
      `}</style>

      <section className="relative py-32 overflow-hidden bg-black">
        {/* Background avec gradients émeraude */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
          
          {/* Gradient mesh vert émeraude */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}} />
          </div>
          
          {/* Pattern de fond subtil */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Header de section */}
          <div className="text-center mb-20">
            {/* Badge premium */}
            <div className="inline-block mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-60 animate-pulse-slow" />
                <div className="relative flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full border border-emerald-500/30">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-gradient-emerald uppercase tracking-wider">
                    Liste d'attente ouverte
                  </span>
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Titre principal */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Le </span>
              <span className="relative inline-block">
                <span className="relative z-10 text-gradient-emerald">
                  Club Élite
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 blur-xl animate-pulse-slow" />
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4">
              L'écosystème premium pour les entrepreneurs d'exception qui transforment leur vision en empire
            </p>
            <p className="text-lg text-emerald-400 font-medium">
              🚀 Lancement imminent • Inscrivez-vous pour être notifié en priorité
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="relative group hover-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gradient-emerald mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Box offre spéciale */}
          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative">
              {/* Bordure émeraude animée */}
              <div className="absolute -inset-[2px] rounded-3xl opacity-80">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 animate-gradient-x" />
              </div>
              
              <div className="relative bg-black/90 backdrop-blur-2xl rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Section Pricing */}
                  <div className="text-center md:text-left">
                    {/* Badge offre fondateurs */}
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
                      <span className="text-7xl md:text-8xl font-bold text-gradient-emerald">
                        99€
                      </span>
                      <span className="text-2xl text-gray-400">/mois</span>
                    </div>

                    {/* Avantages */}
                    <div className="space-y-3 mb-6">
                      {['Accès prioritaire au lancement', 'Prix fondateur garanti à vie', 'Bonus exclusifs early adopters'].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Urgence */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full">
                      <Bell className="w-5 h-5 text-emerald-400 animate-pulse-slow" />
                      <span className="text-sm text-emerald-400 font-medium">
                        Ouverture dans <strong>7 jours</strong>
                      </span>
                    </div>
                  </div>

                  {/* Section CTA */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Votre meilleur email"
                          className="w-full px-6 py-4 bg-white/5 backdrop-blur-sm border border-emerald-500/30 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all text-lg"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleWaitlist();
                            }
                          }}
                        />
                        <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 pointer-events-none" />
                      </div>
                      
                      <button
                        onClick={handleWaitlist}
                        className="relative w-full px-8 py-5 overflow-hidden rounded-2xl font-bold text-lg group cursor-pointer hover-scale"
                        disabled={isSubscribed}
                      >
                        {/* Background animé */}
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 animate-gradient-x" />
                        
                        <span className="relative flex items-center justify-center gap-3 text-white">
                          {isSubscribed ? (
                            <>
                              <CheckCircle className="w-6 h-6" />
                              <span>Inscrit avec succès !</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-6 h-6" />
                              <span>Rejoindre la liste d'attente</span>
                              <ArrowRight className="w-6 h-6" />
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                    
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
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="relative group feature-card"
                >
                  <div className="relative h-full p-8 bg-black/40 backdrop-blur-xl border border-emerald-500/10 rounded-3xl">
                    <div className="mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Testimonials */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              {/* Avatars */}
              <div className="flex justify-center mb-8">
                <div className="flex -space-x-4">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className="relative"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-black flex items-center justify-center shadow-xl">
                        <span className="text-sm font-bold text-white">{i + 1}</span>
                      </div>
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full bg-black/80 border-2 border-emerald-500/30 flex items-center justify-center ml-2">
                    <span className="text-xs text-emerald-400 font-bold">+493</span>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              
              <p className="text-gray-400 mb-2">
                <strong className="text-white text-xl">Déjà 500+ inscrits</strong> sur la liste d'attente
              </p>
              
              <p className="text-sm text-gray-500">
                Soyez parmi les premiers à accéder au Club Élite lors du lancement
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubSection;