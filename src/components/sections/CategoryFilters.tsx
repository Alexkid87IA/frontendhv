import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Sparkles, Flame } from 'lucide-react';

interface CategoryFiltersProps {
  searchTerm: string;
  selectedFilter: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { 
    id: 'all', 
    name: 'Tous les articles',
    icon: Sparkles,
    description: 'Voir tous les articles',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'recent', 
    name: 'Plus récents',
    icon: Clock,
    description: 'Articles les plus récents',
    gradient: 'from-violet-500 to-purple-500'
  },
  { 
    id: 'trending', 
    name: 'Tendances',
    icon: Flame,
    description: 'Articles en tendance',
    gradient: 'from-orange-500 to-red-500'
  }
];

export const CategoryFilters = ({
  searchTerm,
  selectedFilter,
  onSearchChange,
  onFilterChange
}: CategoryFiltersProps) => {
  return (
    <section className="container mb-12">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
          />
          <Search 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent-blue" 
            size={20} 
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`relative group ${
                  selectedFilter === filter.id 
                    ? 'bg-accent-blue text-white'
                    : 'bg-black/20 hover:bg-black/30 text-gray-300 hover:text-white'
                } backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedFilter === filter.id
                      ? 'bg-white/20'
                      : 'bg-accent-blue/20'
                  } transition-colors`}>
                    <filter.icon 
                      size={20} 
                      className={selectedFilter === filter.id ? 'text-white' : 'text-accent-blue'} 
                    />
                  </div>
                  <span className="text-sm font-medium">{filter.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedFilter !== 'all') && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex items-center gap-4"
        >
          <span className="text-sm text-gray-400">Filtres actifs:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm">
                <Search size={14} />
                <span>"{searchTerm}"</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            {selectedFilter !== 'all' && (
              <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm">
                <Filter size={14} />
                <span>{filters.find(f => f.id === selectedFilter)?.name}</span>
                <button
                  onClick={() => onFilterChange('all')}
                  className="ml-1 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </section>
  );
};