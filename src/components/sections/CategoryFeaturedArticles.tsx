import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  excerpt: string;
  publishedAt: string;
  categories: Array<{ title: string; slug: { current: string } }>;
}

interface CategoryFeaturedArticlesProps {
  articles: Article[];
}

export const CategoryFeaturedArticles = ({ articles }: CategoryFeaturedArticlesProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="container mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.slice(0, 2).map((article, index) => (
          <Link 
            key={article._id}
            to={`/article/${article.slug.current}`}
            className="group"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[16/9] rounded-2xl overflow-hidden"
            >
              <SafeImage
                source={article.mainImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-300 mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                  <span>Lire l'article</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};