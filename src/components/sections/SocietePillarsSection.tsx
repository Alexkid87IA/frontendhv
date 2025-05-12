import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, Lightbulb, Target } from 'lucide-react';

const societePillars = [
  {
    icon: Globe,
    title: "Mutations sociales",
    description: "Les transformations qui façonnent notre époque."
  },
  {
    icon: Users,
    title: "Communautés",
    description: "Les nouveaux modes d'organisation collective."
  },
  {
    icon: Lightbulb,
    title: "Innovation sociale",
    description: "Les solutions aux défis contemporains."
  },
  {
    icon: Target,
    title: "Impact",
    description: "Les initiatives qui changent la donne."
  }
];

export const SocietePillarsSection = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {societePillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-neutral-800/50 transition-colors"
          >
            <div className="w-12 h-12 bg-accent-blue rounded-xl flex items-center justify-center mb-4">
              <pillar.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
              {pillar.title}
            </h3>
            <p className="text-tertiary">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};