import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Award, Star } from 'lucide-react';

const metrics = [
  {
    icon: Users,
    value: "150+",
    label: "Entrepreneurs accompagnés",
    description: "De tous horizons et secteurs"
  },
  {
    icon: TrendingUp,
    value: "15M€+",
    label: "Levés par nos clients",
    description: "En financement et investissement"
  },
  {
    icon: Target,
    value: "92%",
    label: "Taux de satisfaction",
    description: "Sur les 12 derniers mois"
  },
  {
    icon: Award,
    value: "85%",
    label: "Objectifs atteints",
    description: "En moyenne par client"
  }
];

const successStories = [
  {
    company: "TechInno",
    result: "De 0 à 1M€ de CA en 8 mois",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
  },
  {
    company: "EcoFlow",
    result: "Levée de fonds de 2.5M€",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
  },
  {
    company: "DigitalNow",
    result: "Expansion internationale réussie",
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&q=80"
  }
];

export const CreateWithRogerResultsSection = () => {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
        >
          Résultats
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Des résultats qui parlent d'eux-mêmes
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-tertiary text-lg max-w-2xl mx-auto"
        >
          L'impact de notre accompagnement se mesure en chiffres et en réussites
        </motion.p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-accent-violet to-accent-fuchsia rounded-xl flex items-center justify-center mx-auto mb-4">
              <metric.icon size={24} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent-violet to-accent-fuchsia bg-clip-text text-transparent">
              {metric.value}
            </h3>
            <p className="font-medium mb-2">{metric.label}</p>
            <p className="text-sm text-tertiary">{metric.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {successStories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group overflow-hidden rounded-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={story.image}
                alt={story.company}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} className="text-accent-violet" />
                <span className="text-sm font-medium text-accent-violet">Success Story</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{story.company}</h3>
              <p className="text-accent-violet font-medium">{story.result}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};