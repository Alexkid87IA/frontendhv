import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { ArticlesHeroSection } from '../components/sections/ArticlesHeroSection';
import { ArticlesFilterSection } from '../components/sections/ArticlesFilterSection';
import { ArticlesGridSection } from '../components/sections/ArticlesGridSection';
import { ArticlesTopicsSection } from '../components/sections/ArticlesTopicsSection';
import { ArticlesStatsSection } from '../components/sections/ArticlesStatsSection';
import { ArticlesContributorsSection } from '../components/sections/ArticlesContributorsSection';
import { ArticlesBookmarksSection } from '../components/sections/ArticlesBookmarksSection';
import { EssentialArticlesSection } from '../components/sections/EssentialArticlesSection';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';

const mockArticles = [
  {
    _id: '1',
    title: "Comment développer un mindset d'exception",
    slug: { current: 'mindset-exception' },
    mainImage: {
      asset: {
        _ref: 'https://picsum.photos/400/300?random=1',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
    publishedAt: "2024-03-20",
    categories: [
      {
        _id: 'cat1',
        title: 'Mindset',
        slug: { current: 'mindset' }
      }
    ],
    author: {
      name: "Roger Ormières",
      image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj"
    }
  },
  // ... other mock articles
];

export const AllArticlesPage = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  const handleBookmark = (slug: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const filteredAndSortedArticles = articles
    .filter(article => {
      const matchesCategory = selectedCategory === 'all' || 
        article.categories?.some(cat => cat.slug.current === selectedCategory);
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return 0;
    });

  return (
    <>
      <SEO
        title="Tous les articles | Roger Ormières"
        description="Explorez notre collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      />
      <div className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="relative pb-20">
          {/* Hero Section */}
          <ArticlesHeroSection />
          
          {/* Stats Section - Mobile Optimized */}
          <div className="py-12 md:py-20">
            <ArticlesStatsSection />
          </div>
          
          {/* Essential Articles - Mobile Optimized */}
          <div className="py-12 md:py-20 bg-black/30">
            <EssentialArticlesSection />
          </div>
          
          {/* Topics Section - Mobile Optimized */}
          <div className="py-12 md:py-20">
            <ArticlesTopicsSection />
          </div>
          
          {/* Filters & Grid - Mobile Optimized */}
          <div className="py-12 md:py-20 bg-black/30">
            <ArticlesFilterSection
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              sortBy={sortBy}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onSortChange={setSortBy}
            />
            
            {isLoading ? (
              <div className="container py-20">
                <LoadingSpinner />
              </div>
            ) : (
              <ArticlesGridSection
                articles={filteredAndSortedArticles}
                bookmarkedArticles={bookmarkedArticles}
                onBookmark={handleBookmark}
              />
            )}
          </div>

          {/* Contributors Section - Mobile Optimized */}
          <div className="py-12 md:py-20">
            <ArticlesContributorsSection />
          </div>

          {/* Bookmarks Section - Mobile Optimized */}
          {bookmarkedArticles.length > 0 && (
            <div className="py-12 md:py-20 bg-black/30">
              <ArticlesBookmarksSection
                bookmarkedArticles={bookmarkedArticles}
                onBookmark={handleBookmark}
              />
            </div>
          )}

          {/* Newsletter Section */}
          <section className="container mt-20">
            <NewsletterForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default AllArticlesPage;