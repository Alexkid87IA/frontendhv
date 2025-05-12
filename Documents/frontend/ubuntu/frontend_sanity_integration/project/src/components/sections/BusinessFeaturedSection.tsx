import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';

const featuredArticles = [
  {
    slug: 'innovation-frugale-2024',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    title: "L'innovation frugale : une nécessité pour 2024",
    tag: "Innovation",
    summary: "Dans un monde en mutation, l'innovation frugale redéfinit les règles du jeu entrepreneurial."
  },
  {
    slug: 'startup-scaling',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80',
    title: "De 0 à 100M€ : Les secrets du scaling",
    tag: "Startup",
    summary: "Les étapes clés pour faire passer votre startup à l'échelle supérieure."
  },
  {
    slug: 'digital-transformation',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    title: "Transformation digitale : Au-delà du buzz",
    tag: "Digital",
    summary: "Comment mener une vraie transformation digitale qui crée de la valeur."
  }
];

export const BusinessFeaturedSection = () => {
  return (
    <section className="container mb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Articles à la une</h2>
          <p className="text-tertiary">Les analyses et décryptages essentiels</p>
        </div>
        <Link
          to="/articles"
          className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <span>Tous les articles</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredArticles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ArticleCard {...article} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};