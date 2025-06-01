import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

export const HeroSection = () => {
  return (
    <ErrorBoundary>
      <section className="relative min-h-[40vh] flex items-center pt-6 pb-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Left Column - Text Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium">
                  Média indépendant
                </span>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold leading-tight">
                  Développe ton{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise">
                    mindset
                  </span>{' '}
                  d'exception
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl">
                  Découvre les histoires qui transforment, les stratégies qui font la différence, 
                  et développe ta psychologie de champion.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
                    <Link
                      to="/articles"
                      className="relative flex items-center justify-center gap-2 bg-black px-6 py-3 rounded-xl text-white group-hover:text-white/90 transition-colors"
                    >
                      <span>Explorer les articles</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
                    <Link
                      to="/create-with-roger"
                      className="relative flex items-center justify-center gap-2 bg-black px-6 py-3 rounded-xl text-white group-hover:text-white/90 transition-colors"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Votre histoire</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Featured Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="High Value Media"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

                {/* Featured Article Preview */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="inline-block px-3 py-1 bg-accent-blue text-white text-sm font-medium rounded-full mb-3">
                    À la une
                  </span>
                  <h2 className="text-xl font-bold text-white mb-2">
                    Comment développer un mindset d'exception
                  </h2>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                    Découvre les secrets des entrepreneurs qui réussissent et transforme ta vision du possible.
                  </p>
                  <Link
                    to="/article/mindset-exception"
                    className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-turquoise transition-colors"
                  >
                    <span>Lire l'article</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-blue to-accent-turquoise rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-turquoise to-accent-blue rounded-full blur-2xl opacity-20" />
            </motion.div>
          </div>

          {/* Latest Articles Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          >
            {[1, 2, 3].map((_, index) => (
              <Link
                key={index}
                to={`/article/exemple-${index + 1}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-accent-blue/30 transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://images.unsplash.com/photo-${[
                      "1517245386807-bb43f82c33c4",
                      "1522202176988-66273c2fd55f",
                      "1516321318423-f06f85e504b3"
                    ][index]}?auto=format&fit=crop&q=80`}
                    alt="Article"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-2 text-white group-hover:text-accent-blue transition-colors">
                    {[
                      "L'art de la résilience entrepreneuriale",
                      "Comment développer son leadership",
                      "Les clés d'une communication impactante"
                    ][index]}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {[
                      "Découvrez comment transformer les obstacles en opportunités",
                      "Les qualités essentielles d'un leader moderne",
                      "Techniques pour captiver votre audience"
                    ][index]}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Il y a 3 jours</span>
                    <ArrowRight size={16} className="text-accent-blue transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HeroSection;