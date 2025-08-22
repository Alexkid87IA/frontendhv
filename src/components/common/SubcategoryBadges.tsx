// Créer ce nouveau fichier : src/components/common/SubcategoryBadges.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Subcategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  parentCategory?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
}

interface SubcategoryBadgesProps {
  subcategories: Subcategory[];
  variant?: 'default' | 'compact' | 'overlay';
  maxVisible?: number;
  className?: string;
}

export const SubcategoryBadges: React.FC<SubcategoryBadgesProps> = ({
  subcategories,
  variant = 'default',
  maxVisible = 2,
  className = ''
}) => {
  if (!subcategories || subcategories.length === 0) return null;

  // Limiter le nombre de badges visibles
  const visibleSubcategories = subcategories.slice(0, maxVisible);
  const remainingCount = subcategories.length - maxVisible;

  // Styles selon le variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return 'px-2 py-1 text-[10px]';
      case 'overlay':
        return 'px-2.5 py-1 text-[11px]';
      default:
        return 'px-3 py-1.5 text-xs';
    }
  };

  const badgeStyles = getVariantStyles();

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {visibleSubcategories.map((subcategory, index) => (
        <motion.div
          key={subcategory._id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link
            to={`/rubrique/${subcategory.parentCategory?.slug?.current || 'story'}/${subcategory.slug.current}`}
            onClick={(e) => e.stopPropagation()}
            className="group inline-block"
          >
            <div 
              className={`
                ${badgeStyles}
                bg-black/70 backdrop-blur-sm 
                rounded-full border border-white/20 
                font-medium text-white/90 
                transition-all duration-300
                group-hover:bg-black/90 
                group-hover:border-white/30 
                group-hover:text-white
                group-hover:scale-105
              `}
            >
              {subcategory.title}
            </div>
          </Link>
        </motion.div>
      ))}
      
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: visibleSubcategories.length * 0.05 }}
          className={`
            ${badgeStyles}
            bg-black/50 backdrop-blur-sm 
            rounded-full border border-white/10 
            font-medium text-white/60
          `}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
};

export default SubcategoryBadges;