import React from 'react';
import { motion } from 'framer-motion';
import { VideoCard } from '../common/VideoCard';

const latestVideos = [
  {
    title: "Culture et innovation",
    guest: "Claire Dubois",
    duration: "45 min",
    date: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example1",
    articleSlug: "culture-innovation"
  },
  {
    title: "L'art du storytelling",
    guest: "Thomas Martin",
    duration: "38 min",
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    articleSlug: "art-storytelling"
  }
];

export const CultureVideosSection = () => {
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