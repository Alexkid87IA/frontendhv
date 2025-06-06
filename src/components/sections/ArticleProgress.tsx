import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ArticleProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent-blue z-50 origin-left"
      style={{ scaleX }}
    />
  );
};