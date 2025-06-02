import React from 'react';
import { motion } from 'framer-motion';

interface CategoryHeroSectionProps {
  categorySlug?: string;
}

const categoryDetails = {
  mental: {
    title: "Développez votre mental de champion",
    description: "Découvrez les clés mentales qui font la différence entre réussite et échec. Stratégies mentales, résilience et développement personnel.",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80",
    gradient: "from-purple-500 to-violet-500"
  },
  business: {
    title: "Business & Innovation",
    description: "Explorez les nouvelles frontières du business et de l'innovation. Analyses, success stories et insights sur les mutations qui façonnent le monde des affaires.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    gradient: "from-blue-500 to-cyan-500"
  },
  story: {
    title: "Récits inspirants",
    description: "Des histoires authentiques qui redéfinissent le possible. Parcours inspirants et transformations remarquables.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    gradient: "from-amber-500 to-orange-500"
  },
  society: {
    title: "Culture & Société",
    description: "Décryptez les tendances culturelles et les mouvements qui façonnent notre société contemporaine.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    gradient: "from-emerald-500 to-teal-500"
  }
};

export const CategoryHeroSection = ({ categorySlug }: CategoryHeroSectionProps) => {
  const category = categorySlug ? categoryDetails[categorySlug as keyof typeof categoryDetails] : null;

  if (!category) return null;

  return (
    <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
      {/* Background Image & Effects */}
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5`} />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          {/* Category Badge */}
          <div className={`inline-block relative mb-6`}>
            <div className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-full blur opacity-75`}></div>
            <span className="relative inline-block px-6 py-3 bg-black rounded-full text-white font-medium">
              {categorySlug?.charAt(0).toUpperCase()}{categorySlug?.slice(1)}
            </span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            {category.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl">
            {category.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">150+</div>
              <div className="text-sm text-gray-400">Articles</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">50k+</div>
              <div className="text-sm text-gray-400">Lecteurs</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">15h+</div>
              <div className="text-sm text-gray-400">De lecture</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};