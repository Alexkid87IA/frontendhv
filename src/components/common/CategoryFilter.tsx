import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-accent-violet text-white'
              : 'bg-neutral-900 text-tertiary hover:text-white'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};