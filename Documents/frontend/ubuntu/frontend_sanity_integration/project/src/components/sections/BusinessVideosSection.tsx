import React from 'react';
import { motion } from 'framer-motion';
import { VideoCard } from '../common/VideoCard';

const latestVideos = [
  {
    title: "Les nouveaux modèles d'innovation",
    guest: "Marie Lambert",
    duration: "45 min",
    date: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1553484771-047a44eee27a?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example1",
    articleSlug: "nouveaux-modeles-innovation"
  },
  {
    title: "Comment lever des fonds en 2024",
    guest: "Thomas Dubois",
    duration: "38 min",
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    articleSlug: "lever-fonds-2024"
  }
];

export const BusinessVideosSection = () => {
  return (
    <section className="container mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Dernières vidéos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {latestVideos.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <VideoCard {...video} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};