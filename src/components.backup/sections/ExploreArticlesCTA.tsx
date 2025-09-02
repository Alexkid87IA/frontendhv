import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, Sparkles } from 'lucide-react';

export const ExploreArticlesCTA = () => {
  return (
    <section className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl"
      >
        {/* Enhanced Background with Multiple Gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative p-12 md:p-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block relative mb-6"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-full blur opacity-75"></div>
              <div className="relative inline-flex items-center gap-2 px-6 py-3 bg-black rounded-full text-accent-blue font-medium">
                <Star className="w-4 h-4" />
                <span>Bibliothèque d'articles</span>
              </div>
            </motion.div>

            {/* Title with Gradient */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              Explorez notre collection d'articles{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue">
                inspirants
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12"
            >
              Découvrez des histoires authentiques, des analyses approfondies et des insights stratégiques pour développer votre mindset d'exception.
            </motion.p>

            {/* Enhanced CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/articles"
                className="group relative inline-flex items-center gap-3"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center gap-3 bg-black px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300">
                  <BookOpen className="w-5 h-5" />
                  <span>Explorer tous les articles</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                to="/create-with-roger"
                className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl text-white font-semibold transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <span>Créer avec Roger</span>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise mb-2">250+</div>
                <div className="text-gray-400">Articles publiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise mb-2">50k+</div>
                <div className="text-gray-400">Lecteurs mensuels</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise mb-2">15h+</div>
                <div className="text-gray-400">De lecture</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise mb-2">98%</div>
                <div className="text-gray-400">Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreArticlesCTA;