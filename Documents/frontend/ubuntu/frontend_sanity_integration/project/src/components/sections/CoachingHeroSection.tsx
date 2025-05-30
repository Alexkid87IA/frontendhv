import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { VideoEmbed } from '../common/VideoEmbed';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const CoachingHeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-40">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
          alt="Coaching avec Roger"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6"
            >
              Coaching stratégique
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-montserrat font-bold leading-tight mb-6">
              Et si cette fois,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">
                c'était vous ?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-tertiary max-w-2xl mb-8">
              Un accompagnement sur-mesure pour transformer vos ambitions en réalisations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#booking"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                <span>Réserver une session</span>
                <Calendar size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#offers"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                <span>Découvrir les offres</span>
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <VideoEmbed
              url="https://www.youtube.com/embed/Xa-BHbzBqBU"
              title="Présentation du coaching"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};