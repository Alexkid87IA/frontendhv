import React from 'react';
import { motion } from 'framer-motion';
import { VideoEmbed } from '../common/VideoEmbed';

export const CreateWithRogerShowreelSection = () => {
  return (
    <section id="showreel" className="container py-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }}
        className="bg-neutral-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5"
      >
        <div className="aspect-video">
          <VideoEmbed
            url="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Showreel Roger Ormières Production"
          />
        </div>
      </motion.div>
    </section>
  );
};