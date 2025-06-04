import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: BookOpen,
    value: '250+',
    label: 'Articles publiés'
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Lecteurs mensuels'
  },
  {
    icon: Clock,
    value: '15h+',
    label: 'De lecture'
  },
  {
    icon: TrendingUp,
    value: '98%',
    label: 'Satisfaction'
  }
];

export const ArticlesStatsSection = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-xl p-4 md:p-6 text-center"
          >
            <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mx-auto mb-4">
              <stat.icon size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-tertiary">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ArticlesStatsSection;