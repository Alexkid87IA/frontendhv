import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', animate = true }) => {
  const baseClass = "bg-neutral-800 rounded-lg overflow-hidden relative";
  
  if (!animate) {
    return <div className={`${baseClass} ${className}`} />;
  }

  return (
    <motion.div
      className={`${baseClass} ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{
        opacity: [0.5, 0.8, 0.5],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 -translate-x-full animate-[shimmer_2s_infinite]" />
    </motion.div>
  );
};

export const ArticleCardSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="w-full aspect-[16/9]" />
    <Skeleton className="h-4 w-20" />
    <Skeleton className="h-6 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

export const PodcastCardSkeleton: React.FC = () => (
  <div className="flex gap-4">
    <Skeleton className="w-48 h-48 flex-shrink-0" />
    <div className="flex-1 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  </div>
);

export const VideoCardSkeleton: React.FC = () => (
  <div className="space-y-4">
    <Skeleton className="w-full aspect-video" />
    <div className="p-4 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  </div>
);