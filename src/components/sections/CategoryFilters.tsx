import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Clock, Star, Zap, Sparkles, BookOpen, Flame, Crown } from 'lucide-react';

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
  },
  { 
    id: 'featured', 
    name: 'À la une',
    icon: Crown,
    description: 'Articles mis en avant',
    gradient: 'from-amber-500 to-yellow-500'
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute -inset-[1px] bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-2xl blur opacity-50"></div>
        <div className="relative bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Search Input with Enhanced Design */}
            <div className="relative w-full lg:w-80">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
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
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => onFilterChange(filter.id)}
                    className={`relative group overflow-hidden ${
                      selectedFilter === filter.id 
                        ? 'bg-gradient-to-r from-accent-blue to-accent-turquoise text-white'
                        : 'bg-black/50 hover:bg-black/70 text-gray-300 hover:text-white'
                    } backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background Gradient Effect */}
                    {selectedFilter !== filter.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/0 via-accent-blue/5 to-accent-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    )}
                    
                    <div className="relative flex flex-col items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        selectedFilter === filter.id
                          ? 'bg-white/20'
                          : 'bg-accent-blue/20 group-hover:bg-accent-blue/30'
                      } transition-colors`}>
                        <filter.icon 
                          size={24} 
                          className={`${
                            selectedFilter === filter.id 
                              ? 'text-white' 
                              : 'text-accent-blue group-hover:text-white'
                          } transition-colors`}
                        />
                      </div>
                      <span className="text-sm font-medium">{filter.name}</span>
                    </div>
                    
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
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
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4"
            >
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <Filter size={16} />
                Filtres actifs:
              </span>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-4 py-2 rounded-full text-sm">
                    <Search size={14} />
                    <span>"{searchTerm}"</span>
                    <button
                      onClick={() => onSearchChange('')}
                      className="ml-2 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                {selectedFilter !== 'all' && (
                  <div className="flex items-center gap-2 bg-accent-blue/20 text-accent-blue px-4 py-2 rounded-full text-sm">
                    <Filter size={14} />
                    <span>{filters.find(f => f.id === selectedFilter)?.name}</span>
                    <button
                      onClick={() => onFilterChange('all')}
                      className="ml-2 hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};