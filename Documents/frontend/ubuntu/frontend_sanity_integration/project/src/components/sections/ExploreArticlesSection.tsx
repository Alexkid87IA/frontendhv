import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Palette, Users, Target, Globe } from 'lucide-react';

const topics = [
  {
    icon: Brain,
    name: 'Mindset',
    description: 'Développement personnel et psychologie',
    color: 'from-purple-500/20 to-purple-900/20',
    count: 42
  },
  {
    icon: Rocket,
    name: 'Innovation',
    description: 'Technologies et disruption',
    color: 'from-blue-500/20 to-blue-900/20',
    count: 38
  },
  {
    icon: Palette,
    name: 'Culture',
    description: 'Art et société',
    color: 'from-emerald-500/20 to-emerald-900/20',
    count: 25
  },
  {
    icon: Users,
    name: 'Leadership',
    description: 'Management et équipes',
    color: 'from-green-500/20 to-green-900/20',
    count: 31
  },
  {
    icon: Target,
    name: 'Business',
    description: 'Stratégie et entrepreneuriat',
    color: 'from-orange-500/20 to-orange-900/20',
    count: 45
  },
  {
    icon: Globe,
    name: 'Société',
    description: 'Tendances et mutations',
    color: 'from-cyan-500/20 to-cyan-900/20',
    count: 28
  }
];

export const ExploreArticlesSection = () => {
  return (
    <section className="container mb-20">
      <h2 className="text-2xl font-bold mb-8">Explorer par thématique</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <Link
              to={`/articles?topic=${topic.name.toLowerCase()}`}
              className="relative block bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-blue rounded-xl flex items-center justify-center">
                  <topic.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-accent-turquoise transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-sm text-tertiary">{topic.description}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-accent-blue">
                {topic.count} articles
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};