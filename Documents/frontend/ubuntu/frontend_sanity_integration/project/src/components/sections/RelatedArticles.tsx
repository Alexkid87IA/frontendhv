import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RelatedArticle {
  slug: string;
  title: string;
  image: string;
  summary: string;
  date: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export const RelatedArticles = ({ articles = [] }: RelatedArticlesProps) => {
  if (!articles.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg mb-4">Articles similaires</h3>
      {articles.map((article, index) => (
        <motion.div
          key={article.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link 
            to={`/article/${article.slug}`}
            className="flex gap-4 group hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors"
          >
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-2 line-clamp-2 group-hover:text-accent-blue transition-colors">
                {article.title}
              </h4>
              <p className="text-sm text-tertiary line-clamp-2 mb-2">
                {article.summary}
              </p>
              <time className="text-xs text-tertiary">
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};