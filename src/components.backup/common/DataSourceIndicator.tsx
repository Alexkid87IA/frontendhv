import React from 'react';
import { motion } from 'framer-motion';

interface DataSourceIndicatorProps {
  dataSource: 'cms' | 'mock';
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'inline';
  className?: string;
}

export const DataSourceIndicator: React.FC<DataSourceIndicatorProps> = ({
  dataSource,
  position = 'top-right',
  className = ''
}) => {
  // Ne rien afficher si les données viennent du CMS
  if (dataSource === 'cms') return null;
  
  // Définir les classes de position
  const positionClasses = {
    'top-right': 'absolute top-2 right-2',
    'bottom-right': 'absolute bottom-2 right-2',
    'top-left': 'absolute top-2 left-2',
    'bottom-left': 'absolute bottom-2 left-2',
    'inline': 'inline-block ml-2'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        ${position !== 'inline' ? positionClasses[position] : ''}
        text-xs text-amber-500 bg-black/50 px-2 py-1 rounded z-10
        ${className}
      `}
      aria-label="Données de démonstration"
    >
      {position === 'inline' ? '(démo)' : 'Données de démonstration'}
    </motion.div>
  );
};

export default DataSourceIndicator;
