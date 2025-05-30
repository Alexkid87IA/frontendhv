import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stats = [
  { icon: Users, value: '50K+', label: 'Entrepreneurs' },
  { icon: Star, value: '4.9', label: 'Rating' }
];

export const AboutRogerSection = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Column */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative"
        >
          <div className="relative aspect-square rounded-3xl overflow-hidden group">
            {/* Main Image */}
            <img
              src="https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj"
              alt="Roger Ormières"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            
            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Play size={24} className="text-white ml-1" />
            </motion.button>

            {/* Stats */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <stat.icon size={16} className="text-accent-blue" />
                  <div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-tertiary">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Text Content Column */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="space-y-8"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6"
            >
              À propos
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Qui est Roger Ormières ?
            </h2>
          </div>
          
          <div className="prose prose-invert prose-lg">
            <p className="text-xl leading-relaxed">
              Je suis Roger Ormières, entrepreneur, investisseur, producteur et accompagnateur 
              d'entrepreneurs ambitieux à travers le monde. Je suis le créateur du podcast High 
              Value Entrepreneurs, où je donne la parole à des personnalités inspirantes et authentiques.
            </p>
            <p className="text-tertiary">
              L'objectif ? Montrer que l'entrepreneuriat est une voie accessible à tous, quel que 
              soit le contexte, et qu'il n'existe pas de formule unique pour réussir. À travers 
              ces entretiens, j'explore les récits de ceux qui innovent, qui osent, et qui 
              transforment leur vision en réalité.
            </p>
          </div>

          <motion.div
            whileHover={{ x: 10 }}
            className="relative group inline-block"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Link
              to="/about"
              className="relative flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg"
            >
              <span>En savoir plus sur Roger</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};