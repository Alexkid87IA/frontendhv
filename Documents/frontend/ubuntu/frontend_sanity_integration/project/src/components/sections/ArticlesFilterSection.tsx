import React from 'react';
import { Search, Filter } from 'lucide-react';
import { CategoryFilter } from '../common/CategoryFilter';

// Catégories améliorées avec des couleurs et des descriptions
const categories = [
  { 
    id: 'all', 
    name: 'Tous les articles',
    color: 'bg-accent-violet'
  },
  { 
    id: 'case-studies', 
    name: 'Études de cas',
    color: 'bg-accent-cyan',
    description: 'Success stories et retours d\'expérience'
  },
  { 
    id: 'mindset', 
    name: 'Mindset',
    color: 'bg-accent-fuchsia',
    description: 'Développement personnel et psychologie'
  },
  { 
    id: 'innovation', 
    name: 'Innovation',
    color: 'bg-accent-cyan',
    description: 'Technologies et disruption'
  },
  { 
    id: 'business', 
    name: 'Business',
    color: 'bg-accent-pink',
    description: 'Stratégie et entrepreneuriat'
  },
  { 
    id: 'culture', 
    name: 'Culture',
    color: 'bg-emerald-500',
    description: 'Art et société'
  },
  { 
    id: 'tech', 
    name: 'Tech',
    color: 'bg-blue-500',
    description: 'Nouvelles technologies'
  }
];

interface ArticlesFilterSectionProps {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (value: string) => void;
}

export const ArticlesFilterSection = ({
  searchTerm,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange
}: ArticlesFilterSectionProps) => {
  return (
    <section className="container mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 pl-10 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
        </div>

        {/* Categories */}
        <div className="flex-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-tertiary" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 text-secondary focus:outline-none focus:border-accent-violet"
          >
            <option value="date">Plus récents</option>
            <option value="popular">Plus populaires</option>
            {selectedCategory === 'case-studies' && (
              <option value="valuation">Valorisation</option>
            )}
          </select>
        </div>
      </div>
    </section>
  );
};