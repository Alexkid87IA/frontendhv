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
        {/* Background with gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 to-accent-turquoise/10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        {/* Content */}
        <div className="relative p-12 md:p-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4 text-accent-blue" />
              <span>Bibliothèque d'articles</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Explorez notre collection d'articles inspirants
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/articles"
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explorer tous les articles</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/create-with-roger"
                className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-xl text-white font-semibold transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                <span>Créer avec Roger</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-white mb-2">250+</div>
                <div className="text-gray-400">Articles publiés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">50k+</div>
                <div className="text-gray-400">Lecteurs mensuels</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">15h+</div>
                <div className="text-gray-400">De lecture</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">98%</div>
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