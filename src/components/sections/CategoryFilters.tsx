import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Sparkles, Star, ChevronDown, ChevronUp } from 'lucide-react';

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
    gradient: 'from-accent-blue to-accent-turquoise'
  },
  { 
    id: 'mental', 
    name: 'Mental',
    icon: Star,
    gradient: 'from-purple-500 to-violet-500'
  },
  { 
    id: 'story', 
    name: 'Story',
    icon: Star,
    gradient: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'business', 
    name: 'Business',
    icon: Star,
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'society', 
    name: 'Society',
    icon: Star,
    gradient: 'from-emerald-500 to-teal-500'
  }
];

export const CategoryFilters = ({
  searchTerm,
  selectedFilter,
  onSearchChange,
  onFilterChange
}: CategoryFiltersProps) => {
  return (
    <section id="filters" className="container mb-12">
      <div className="relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50 rounded-2xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.1),transparent_70%)]" />
        <div className="absolute inset-0 backdrop-blur-sm rounded-2xl" />

        {/* Content */}
        <div className="relative bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un article..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all duration-200"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {filters.map((filter) => {
                  const isSelected = selectedFilter === filter.id;
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => onFilterChange(filter.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative group ${
                        isSelected ? 'bg-gradient-to-r ' + filter.gradient : 'bg-white/5'
                      } backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-300`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-white/20' : `bg-gradient-to-r ${filter.gradient}`
                        }`}>
                          <filter.icon 
                            size={18} 
                            className={isSelected ? 'text-white' : 'text-white'} 
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          isSelected ? 'text-white' : 'text-gray-300'
                        }`}>
                          {filter.name}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
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
                  <div className="flex items-center gap-2 bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                    <Search size={14} />
                    <span>"{searchTerm}"</span>
                    <button
                      onClick={() => onSearchChange('')}
                      className="ml-1 hover:text-accent-blue transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                {selectedFilter !== 'all' && (
                  <div className={`flex items-center gap-2 bg-gradient-to-r ${
                    filters.find(f => f.id === selectedFilter)?.gradient
                  } bg-opacity-20 px-3 py-1 rounded-full text-sm text-white`}>
                    {(() => {
                      const selectedFilterData = filters.find(f => f.id === selectedFilter);
                      if (selectedFilterData?.icon) {
                        const IconComponent = selectedFilterData.icon;
                        return <IconComponent size={14} />;
                      }
                      return null;
                    })()}
                    <span>{filters.find(f => f.id === selectedFilter)?.name}</span>
                    <button
                      onClick={() => onFilterChange('all')}
                      className="ml-1 hover:text-white/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};