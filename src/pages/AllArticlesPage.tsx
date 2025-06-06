import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '../components/common/SEO';
import { ArticlesHeroSection } from '../components/sections/ArticlesHeroSection';
import { ArticlesFilterSection } from '../components/sections/ArticlesFilterSection';
import { ArticlesGridSection } from '../components/sections/ArticlesGridSection';
import { ArticlesTopicsSection } from '../components/sections/ArticlesTopicsSection';
import { ArticlesStatsSection } from '../components/sections/ArticlesStatsSection';
import { ArticlesBookmarksSection } from '../components/sections/ArticlesBookmarksSection';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { NewsletterFooterSection } from '../components/sections/NewsletterFooterSection';
import { getAllArticles } from '../utils/sanityAPI';
import { SanityArticle } from '../types/sanity';

export const AllArticlesPage = () => {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const sanityArticles = await getAllArticles();
        
        if (sanityArticles && sanityArticles.length > 0) {
          setArticles(sanityArticles);
          console.log(`${sanityArticles.length} articles récupérés depuis Sanity`);
        } else {
          setArticles([]);
          console.log('Aucun article trouvé dans Sanity');
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des articles.');
        console.error('Erreur lors de la récupération des articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  if (error) {
    return (
      <div className="container py-20">
        <ErrorMessage message={error} />
      </div>
    );
  }

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

        <div className="relative">
          {/* Hero Section */}
          <ArticlesHeroSection />
          
          {/* Topics Section - Directly after Hero */}
          <div className="py-12 md:py-20">
            <ArticlesTopicsSection />
          </div>
          
          {/* Filters & Grid */}
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
            ) : filteredAndSortedArticles.length > 0 ? (
              <ArticlesGridSection
                articles={filteredAndSortedArticles}
                bookmarkedArticles={bookmarkedArticles}
                onBookmark={handleBookmark}
              />
            ) : (
              <div className="container py-20">
                <p className="text-center text-gray-400 text-lg">
                  {searchTerm || selectedCategory !== 'all' 
                    ? "Aucun article ne correspond à vos critères de recherche."
                    : "Aucun article disponible pour le moment."}
                </p>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="py-12 md:py-20">
            <ArticlesStatsSection />
          </div>

          {/* Bookmarks Section - Only shown if there are bookmarks */}
          {bookmarkedArticles.length > 0 && (
            <div className="py-12 md:py-20">
              <ArticlesBookmarksSection
                bookmarkedArticles={bookmarkedArticles}
                onBookmark={handleBookmark}
              />
            </div>
          )}

          {/* Newsletter Footer Section */}
          <NewsletterFooterSection />
        </div>
      </div>
    </>
  );
};

export default AllArticlesPage;