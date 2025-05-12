import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Target, Compass } from 'lucide-react';

const psychologiePillars = [
  {
    icon: Brain,
    title: "Croissance continue",
    description: "Adopter une mentalité d'apprentissage permanent."
  },
  {
    icon: Heart,
    title: "Résilience",
    description: "Transformer les obstacles en opportunités."
  },
  {
    icon: Target,
    title: "Vision claire",
    description: "Définir et poursuivre des objectifs ambitieux."
  },
  {
    icon: Compass,
    title: "Authenticité",
    description: "Rester fidèle à ses valeurs et sa mission."
  }
];

export const MindsetPillarsSection = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {psychologiePillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
              <pillar.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
            <p className="text-tertiary">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};