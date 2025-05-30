import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, Rocket } from 'lucide-react';

const keyTrends = [
  {
    icon: Lightbulb,
    title: "IA Générative",
    description: "L'IA générative révolutionne les processus créatifs et opérationnels."
  },
  {
    icon: Target,
    title: "Tech for Good",
    description: "L'innovation responsable devient un impératif stratégique."
  },
  {
    icon: TrendingUp,
    title: "Économie circulaire",
    description: "Les business models évoluent vers plus de durabilité."
  },
  {
    icon: Rocket,
    title: "Deep Tech",
    description: "Les innovations de rupture façonnent les marchés de demain."
  }
];

export const BusinessTrendsSection = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyTrends.map((trend, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900 p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
              <trend.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{trend.title}</h3>
            <p className="text-tertiary">{trend.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};