import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Film, Headphones, Lightbulb } from 'lucide-react';

const recommendations = [
  {
    type: "Livre",
    icon: BookOpen,
    title: "L'Art de la Renaissance",
    author: "Marie Lambert",
    quote: "Une plongée fascinante dans l'âge d'or de l'art européen.",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-purple-500/20 to-purple-900/20"
  },
  {
    type: "Film",
    icon: Film,
    title: "Les Temps Modernes",
    author: "Charlie Chaplin",
    quote: "Un chef-d'œuvre intemporel sur la condition humaine.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-blue-500/20 to-blue-900/20"
  },
  {
    type: "Podcast",
    icon: Headphones,
    title: "Culture Monde",
    author: "France Culture",
    quote: "Une analyse brillante des enjeux culturels contemporains.",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-pink-500/20 to-pink-900/20"
  },
  {
    type: "Concept",
    icon: Lightbulb,
    title: "L'Art Total",
    author: "Richard Wagner",
    quote: "Une vision révolutionnaire de l'art qui résonne encore aujourd'hui.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-cyan-500/20 to-cyan-900/20"
  }
];

export const CultureRecommendationsSection = () => {
  return (
    <section className="container mb-20">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-neutral-800 text-accent-fuchsia text-sm font-medium mb-4">
          Sélection culturelle
        </span>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
          Ce que Roger recommande
        </h2>
        <p className="text-lg text-tertiary max-w-2xl mx-auto font-light">
          Une sélection minutieuse d'œuvres qui nourrissent l'esprit, 
          éveillent la curiosité et inspirent l'action.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative bg-neutral-900 rounded-3xl p-6 h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-6">
                <item.icon size={24} className="text-accent-fuchsia" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-sm text-accent-fuchsia font-medium">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1 group-hover:text-accent-fuchsia transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-tertiary mb-4">
                  {item.author}
                </p>
                <blockquote className="text-sm italic text-tertiary mb-6 line-clamp-3">
                  "{item.quote}"
                </blockquote>
              </div>

              {/* Image & Link */}
              <div className="mt-auto">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-sm text-accent-fuchsia group-hover:text-accent-cyan transition-colors"
                >
                  <span>Découvrir</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};