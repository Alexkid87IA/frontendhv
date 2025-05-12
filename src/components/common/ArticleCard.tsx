import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  slug: string;
  image: string;
  title: string;
  tag: string;
  summary: string;
}

export const ArticleCard = ({ slug, image, title, tag, summary }: ArticleCardProps) => {
  return (
    <motion.article
      whileHover={{ scale: 1.05 }}
      className="group cursor-pointer"
    >
      <Link to={`/article/${slug}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-4">
          <span className="text-accent-violet text-sm font-inter uppercase tracking-wider">
            {tag}
          </span>
          <h3 className="mt-2 text-xl font-montserrat font-bold line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-tertiary line-clamp-3">
            {summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};