import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoCardProps {
  title: string;
  guest: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  articleSlug?: string;
}

export const VideoCard = ({
  title,
  guest,
  duration,
  date,
  thumbnail,
  videoUrl,
  articleSlug,
}: VideoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-neutral-900 rounded-lg overflow-hidden"
    >
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity"
          aria-label={`Regarder ${title}`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-violet"
          >
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
          </motion.div>
        </a>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-accent-fuchsia font-inter mb-4">{guest}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-sm text-tertiary">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </div>
          {articleSlug && (
            <Link
              to={`/article/${articleSlug}`}
              className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
              aria-label={`Lire l'article lié à ${title}`}
            >
              <span>Article lié</span>
              <ExternalLink size={16} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};