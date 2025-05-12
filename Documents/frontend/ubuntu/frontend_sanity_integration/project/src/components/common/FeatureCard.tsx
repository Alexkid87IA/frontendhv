import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const FeatureCard = ({ title, description, icon: Icon, className = '' }: FeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-neutral-900 p-6 rounded-lg ${className}`}
    >
      <div className="w-12 h-12 bg-accent-violet rounded-lg flex items-center justify-center mb-4">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-tertiary">{description}</p>
    </motion.div>
  );
};