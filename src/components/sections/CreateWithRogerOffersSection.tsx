import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, Sparkles, Video, Camera, Film, Podcast, Newspaper, Share2, Crown, Shield, Zap } from 'lucide-react';

export const CreateWithRogerOffersSection = () => {
  return (
    <section id="offers" className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
          Expérience Premium
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-6 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan bg-clip-text text-transparent">
          Créez votre histoire avec Roger
        </h2>
        <p className="text-xl text-tertiary max-w-2xl mx-auto">
          Une expérience de création de contenu exclusive et sur-mesure pour votre marque
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative"
        >
          {/* Animated Background Effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500 animate-tilt"></div>
          
          {/* Card Content */}
          <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-12 transition-all duration-500 hover:border-white/20">
            {/* Premium Badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-accent-violet to-accent-fuchsia rounded-full flex items-center gap-2 shadow-lg">
              <Crown size={18} className="text-white" />
              <span className="text-white font-semibold tracking-wide">Offre Exclusive</span>
              <Crown size={18} className="text-white" />
            </div>

            {/* Header */}
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Pack Création de Contenu Premium</h3>
              <p className="text-xl text-tertiary mb-6">Une expérience complète pour sublimer votre histoire</p>
              <div className="inline-flex items-baseline gap-2 bg-white/5 px-8 py-4 rounded-full">
                <span className="text-5xl font-bold bg-gradient-to-r from-accent-violet to-accent-fuchsia bg-clip-text text-transparent">
                  4 899€
                </span>
                <span className="text-lg text-tertiary">pack complet</span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Features Column */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="text-accent-violet" size={24} />
                  <h4 className="text-xl font-bold">Ce qui est inclus</h4>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group/item">
                    <Video size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Tournage Premium</span>
                      <span className="text-sm text-tertiary">Session de tournage professionnelle avec Roger en studio haute qualité</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Film size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Pack Social Media</span>
                      <span className="text-sm text-tertiary">10 contenus courts optimisés pour Instagram, TikTok, YouTube Shorts et Snapchat</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Camera size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Format Long Premium</span>
                      <span className="text-sm text-tertiary">Contenu long format exclusif hébergé sur YouTube et Spotify</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Podcast size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Distribution Podcast</span>
                      <span className="text-sm text-tertiary">Format audio optimisé et distribué sur toutes les plateformes majeures</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Benefits Column */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="text-accent-violet" size={24} />
                  <h4 className="text-xl font-bold">Avantages Premium</h4>
                </div>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4 group/item">
                    <Newspaper size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Articles SEO Optimisés</span>
                      <span className="text-sm text-tertiary">10 articles stratégiques optimisés pour maximiser votre visibilité</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Share2 size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Distribution Multi-Plateforme</span>
                      <span className="text-sm text-tertiary">Diffusion stratégique sur l'ensemble des réseaux sociaux</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Check size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Droits Complets</span>
                      <span className="text-sm text-tertiary">Propriété totale des contenus pour une utilisation illimitée</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 group/item">
                    <Star size={24} className="text-accent-violet flex-shrink-0 mt-1 group-hover/item:scale-110 transition-transform" />
                    <div>
                      <span className="block font-semibold mb-1">Support Privilégié</span>
                      <span className="text-sm text-tertiary">Accompagnement personnalisé tout au long du processus</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#booking"
                className="relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-xl text-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span>Réserver votre session</span>
                <ArrowRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};