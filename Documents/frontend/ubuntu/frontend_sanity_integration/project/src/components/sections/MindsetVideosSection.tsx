import React from 'react';
import { motion } from 'framer-motion';
import { VideoCard } from '../common/VideoCard';

const latestVideos = [
  {
    title: "Le pouvoir de la visualisation",
    guest: "Sophie Martin",
    duration: "42 min",
    date: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1506377711776-dbdc2f3c20d9?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example1",
    articleSlug: "pouvoir-visualisation"
  },
  {
    title: "Développer son intelligence émotionnelle",
    guest: "Marc Dubois",
    duration: "35 min",
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    articleSlug: "intelligence-emotionnelle"
  }
];

export const MindsetVideosSection = () => {
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