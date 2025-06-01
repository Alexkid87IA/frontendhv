import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  description?: string;
  centered?: boolean;
  showDataSourceIndicator?: boolean;
  dataSource?: 'cms' | 'mock';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  description,
  centered = true,
  showDataSourceIndicator = false,
  dataSource = 'cms',
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${centered ? 'text-center' : ''} mb-8 md:mb-12 ${className}`}
    >
      {badge && (
        <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-4 md:mb-6">
          {badge}
        </span>
      )}
      
      <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 relative">
        {title}
        {showDataSourceIndicator && dataSource === 'mock' && (
          <span className="text-sm text-amber-500 ml-2">(démo)</span>
        )}
      </h2>
      
      {subtitle && (
        <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-200">
          {subtitle}
        </h3>
      )}
      
      {description && (
        <p className={`text-base md:text-lg text-gray-300 ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {description}
        </p>
      )}
      
      {showDataSourceIndicator && dataSource === 'mock' && !centered && (
        <div className="mt-2 text-xs text-amber-500">
          (Données de démonstration)
        </div>
      )}
    </motion.div>
  );
};

export default SectionHeader;
