import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Star, Zap } from 'lucide-react';

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
    icon: Zap,
    description: 'Voir tous les articles'
  },
  { 
    id: 'recent', 
    name: 'Plus récents',
    icon: Clock,
    description: 'Articles les plus récents'
  },
  { 
    id: 'popular', 
    name: 'Plus populaires',
    icon: TrendingUp,
    description: 'Articles les plus lus'
  },
  { 
    id: 'featured', 
    name: 'À la une',
    icon: Star,
    description: 'Articles mis en avant'
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
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Search Input with Enhanced Design */}
          <div className="relative w-full md:w-64">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
                />
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-blue" 
                  size={18} 
                />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`relative group ${
                    selectedFilter === filter.id 
                      ? 'bg-accent-blue text-white' 
                      : 'bg-black/50 hover:bg-black/70 text-gray-300 hover:text-white'
                  } backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <filter.icon 
                      size={20} 
                      className={`${
                        selectedFilter === filter.id 
                          ? 'text-white' 
                          : 'text-accent-blue group-hover:text-white'
                      } transition-colors`}
                    />
                    <span className="text-sm font-medium">{filter.name}</span>
                  </div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {filter.description}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-black"></div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedFilter !== 'all') && (
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4">
            <span className="text-sm text-gray-400">Filtres actifs:</span>
            <div className="flex gap-2">
              {searchTerm && (
                <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm">
                  <Search size={14} />
                  <span>"{searchTerm}"</span>
                </div>
              )}
              {selectedFilter !== 'all' && (
                <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-3 py-1 rounded-full text-sm">
                  <Filter size={14} />
                  <span>{filters.find(f => f.id === selectedFilter)?.name}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};