import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { ArticlesHeroSection } from '../components/sections/ArticlesHeroSection';
import { ArticlesFeaturedSection } from '../components/sections/ArticlesFeaturedSection';
import { ArticlesFilterSection } from '../components/sections/ArticlesFilterSection';
import { ArticlesGridSection } from '../components/sections/ArticlesGridSection';
import { ArticlesTopicsSection } from '../components/sections/ArticlesTopicsSection';
import { ArticlesStatsSection } from '../components/sections/ArticlesStatsSection';
import { ArticlesContributorsSection } from '../components/sections/ArticlesContributorsSection';
import { ArticlesBookmarksSection } from '../components/sections/ArticlesBookmarksSection';

export const AllArticlesPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('date');
  const [bookmarkedArticles, setBookmarkedArticles] = React.useState<string[]>([]);

  const handleBookmark = (slug: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  return (
    <>
      <SEO
        title="Tous les articles | Roger Ormières"
        description="Explorez notre collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      />
      <div className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative pb-20">
          <ArticlesHeroSection />
          
          <ArticlesStatsSection />
          
          <ArticlesFeaturedSection />
          
          <ArticlesTopicsSection />
          
          <ArticlesFilterSection
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortBy}
          />
          
          <ArticlesGridSection
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            bookmarkedArticles={bookmarkedArticles}
            onBookmark={handleBookmark}
          />

          {bookmarkedArticles.length > 0 && (
            <ArticlesBookmarksSection
              bookmarkedArticles={bookmarkedArticles}
              onBookmark={handleBookmark}
            />
          )}

          <ArticlesContributorsSection />

          {/* Newsletter */}
          <section className="container mt-20">
            <NewsletterForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default AllArticlesPage;