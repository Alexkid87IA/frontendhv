import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Rocket, Globe, BookOpen } from 'lucide-react';

const topics = [
  {
    icon: BookOpen,
    name: 'Story',
    description: 'Des histoires authentiques qui redéfinissent le possible',
    color: 'from-amber-500/20 to-orange-500/20',
    count: 42,
    slug: 'story'
  },
  {
    icon: Rocket,
    name: 'Business',
    description: 'Les stratégies qui font la différence',
    color: 'from-blue-500/20 to-cyan-500/20',
    count: 38,
    slug: 'business'
  },
  {
    icon: Brain,
    name: 'Mental',
    description: 'Développe une psychologie de champion',
    color: 'from-purple-500/20 to-violet-500/20',
    count: 31,
    slug: 'mental'
  },
  {
    icon: Globe,
    name: 'Society',
    description: 'Comprendre les mutations de notre époque',
    color: 'from-emerald-500/20 to-teal-500/20',
    count: 28,
    slug: 'society'
  }
];

export const ArticlesTopicsSection = () => {
  return (
    <section className="container">
      <h2 className="text-2xl font-bold mb-8">Thématiques</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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
              to={`/rubrique/${topic.slug}`}
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

export default ArticlesTopicsSection;