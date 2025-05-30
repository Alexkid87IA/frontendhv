import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';

interface ArticlesBookmarksSectionProps {
  bookmarkedArticles: string[];
  onBookmark: (slug: string) => void;
}

export const ArticlesBookmarksSection = ({
  bookmarkedArticles,
  onBookmark
}: ArticlesBookmarksSectionProps) => {
  return (
    <section className="container mb-20">
      <div className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark size={24} className="text-accent-violet" />
          <h2 className="text-2xl font-bold">Articles sauvegardés</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedArticles.map((slug) => (
            <ArticleCard
              key={slug}
              slug={slug}
              onBookmark={onBookmark}
              isBookmarked={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};