import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';

const featuredArticles = [
  {
    slug: 'culture-startup-francaise',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80',
    title: "La culture startup à la française",
    tag: "Société",
    summary: "Comment les startups françaises réinventent la culture d'entreprise."
  },
  {
    slug: 'art-digital',
    image: 'https://images.unsplash.com/photo-1561998338-13ad7883b20f?auto=format&fit=crop&q=80',
    title: "L'art à l'ère du digital",
    tag: "Art",
    summary: "Quand la technologie révolutionne la création artistique."
  },
  {
    slug: 'musique-innovation',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80',
    title: "La musique réinventée",
    tag: "Musique",
    summary: "Les nouvelles frontières de l'industrie musicale."
  }
];

export const CultureFeaturedSection = () => {
  return (
    <section className="container mb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Articles à la une</h2>
          <p className="text-tertiary">Les analyses culturelles du moment</p>
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