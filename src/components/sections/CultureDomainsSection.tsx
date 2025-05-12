import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Book, Palette, Music } from 'lucide-react';

const culturalDomains = [
  {
    icon: Globe,
    title: "Société",
    description: "Les mutations sociales qui façonnent notre époque."
  },
  {
    icon: Book,
    title: "Littérature",
    description: "Les mots qui changent notre vision du monde."
  },
  {
    icon: Palette,
    title: "Arts",
    description: "L'expression créative sous toutes ses formes."
  },
  {
    icon: Music,
    title: "Musique",
    description: "Les sons qui définissent notre temps."
  }
];

export const CultureDomainsSection = () => {
  return (
    <section className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {culturalDomains.map((domain, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900 p-6 rounded-xl"
          >
            <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
              <domain.icon size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
            <p className="text-tertiary">{domain.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};