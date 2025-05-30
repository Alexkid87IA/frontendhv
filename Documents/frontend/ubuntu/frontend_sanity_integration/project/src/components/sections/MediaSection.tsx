import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Play, Music2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const videos = [
  {
    id: 'ATdwzR78in0',
    title: 'Mindset & Leadership',
    category: 'Mindset'
  },
  {
    id: 'ophgTaLUWeU',
    title: 'Innovation & Entrepreneuriat',
    category: 'Business'
  },
  {
    id: 'iY4VGzZHr2k',
    title: 'Transformation Digitale',
    category: 'Innovation'
  },
  {
    id: 'YWJJ1TGGrFA',
    title: 'Success Stories',
    category: 'Récits'
  },
  {
    id: 'GhrdEDwz4f8',
    title: 'Tech & Société',
    category: 'Culture'
  },
  {
    id: '0bUqQ5ivpz0',
    title: 'Future of Work',
    category: 'Innovation'
  },
  {
    id: 'd7DM0x-M9XM',
    title: 'Startup Nation',
    category: 'Business'
  },
  {
    id: 'uQAArLzYx6I',
    title: 'Business Impact',
    category: 'Business'
  },
  {
    id: '6m6Hy5Wnfy0',
    title: 'Innovation Frugale',
    category: 'Innovation'
  }
];

const VideoCard = ({ id, title, category }: { id: string; title: string; category: string }) => {
  return (
    <motion.a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 shadow-md">
        <img
          src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <span role="img" aria-label="video">📹</span>
          <span>{category}</span>
        </div>

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-accent-violet rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[16px] border-transparent border-l-white ml-1" />
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">
            {title}
          </h3>
          <span className="inline-flex items-center gap-1 text-xs text-accent-fuchsia mt-2 group-hover:text-accent-cyan transition-colors">
            <span>▶️ Regarder</span>
            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

export const MediaSection = () => {
  return (
    <section className="container">
      <SectionHeader
        title="Derniers formats audio & vidéo"
        subtitle="À voir et à écouter"
      />

      {/* Latest Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <VideoCard {...video} />
          </motion.div>
        ))}
      </div>

      {/* Latest Podcast */}
      <div className="bg-neutral-900 p-6 rounded-lg space-y-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80"
              alt="Podcast cover"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <span className="text-accent-fuchsia text-sm font-inter uppercase tracking-wider">
              Nouveau podcast
            </span>
            <h3 className="text-xl font-bold mt-2">Le futur de l'entrepreneuriat</h3>
            <p className="text-tertiary mt-2">
              Une conversation passionnante sur les nouvelles frontières de l'entrepreneuriat.
            </p>
          </div>
        </div>

        {/* Audio Player Mockup */}
        <div className="bg-neutral-800 h-12 rounded-lg flex items-center justify-center">
          <Play size={24} className="text-accent-violet" />
        </div>

        <Link
          to="/podcasts"
          className="inline-flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <Music2 size={20} />
          <span>Tous les podcasts</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};