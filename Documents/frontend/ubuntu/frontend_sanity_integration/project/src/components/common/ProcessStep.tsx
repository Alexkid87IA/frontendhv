import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const ProcessStep = ({ number, title, description, icon: Icon }: ProcessStepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex gap-6"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-accent-violet flex items-center justify-center text-white font-bold">
          {number}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Icon size={20} className="text-accent-fuchsia" />
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-tertiary">{description}</p>
      </div>
    </motion.div>
  );
};