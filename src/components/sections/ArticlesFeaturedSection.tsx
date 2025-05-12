import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';

const featuredArticles = [
  {
    slug: 'innovation-frugale-2024',
    title: "L'innovation frugale : une nécessité pour 2024",
    excerpt: "Dans un monde en mutation, l'innovation frugale redéfinit les règles du jeu entrepreneurial.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    category: "innovation",
    readTime: "8 min",
    date: "2024-03-15",
    featured: true
  }
];

export const ArticlesFeaturedSection = () => {
  return (
    <section className="container mb-20">
      <div className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Article à la une</h2>
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
          >
            <span>Voir plus</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
};