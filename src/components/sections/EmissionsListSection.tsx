import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { VideoCard } from '../common/VideoCard';
import { CategoryFilter } from '../common/CategoryFilter';

const categories = [
  { id: 'all', name: 'Toutes les émissions' },
  { id: 'Business', name: 'Business' },
  { id: 'Innovation', name: 'Innovation' },
  { id: 'Mindset', name: 'Mindset' },
  { id: 'Culture', name: 'Culture' },
  { id: 'Récits', name: 'Récits' }
];

const allEpisodes = [
  {
    id: 'ophgTaLUWeU',
    title: "Innovation & Entrepreneuriat",
    guest: "Thomas Dubois",
    duration: "45 min",
    date: "2024-03-13",
    category: "Business",
    thumbnail: `https://img.youtube.com/vi/ophgTaLUWeU/maxresdefault.jpg`,
    videoUrl: `https://youtube.com/watch?v=ophgTaLUWeU`
  },
  // ... autres épisodes
];

interface EmissionsListSectionProps {
  searchTerm: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
}

export const EmissionsListSection = ({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange
}: EmissionsListSectionProps) => {
  const filteredEpisodes = allEpisodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.guest.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || episode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="container mb-20">
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Rechercher un épisode..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 pl-10 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
        </div>

        <div className="flex-1">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={onCategoryChange}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-8">Tous les épisodes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEpisodes.map((episode, index) => (
          <motion.div
            key={episode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <VideoCard {...episode} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};