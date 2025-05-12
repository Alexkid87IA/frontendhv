import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';

const featuredArticles = [
  {
    slug: 'psychologie-entrepreneur',
    image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80',
    title: "Cultiver une psychologie d'entrepreneur",
    tag: "Psychologie",
    summary: "Les clés psychologiques qui font la différence entre réussite et échec."
  },
  {
    slug: 'resilience-echec',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    title: "La résilience face à l'échec",
    tag: "Développement",
    summary: "Comment transformer les obstacles en opportunités de croissance."
  },
  {
    slug: 'habitudes-succes',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
    title: "Les habitudes des leaders",
    tag: "Leadership",
    summary: "Les routines quotidiennes qui forgent l'excellence."
  }
];

export const MindsetFeaturedSection = () => {
  return (
    <section className="container mb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Articles à la une</h2>
          <p className="text-tertiary">Les clés pour développer votre psychologie</p>
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