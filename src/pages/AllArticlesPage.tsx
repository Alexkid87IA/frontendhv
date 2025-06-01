import React, { useEffect, useState } from 'react';
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
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { sanityClient } from '../utils/sanityClient';

// Données mockées pour le développement
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
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { current: 'resilience-entrepreneuriale' },
    mainImage: {
      asset: {
        _ref: 'image-2',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
    publishedAt: "2024-03-19",
    categories: [
      {
        _id: 'cat2',
        title: 'Business',
        slug: { current: 'business' }
      }
    ],
    author: {
      name: "Marie Laurent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    }
  },
  {
    _id: '3',
    title: "Les clés d'une communication impactante",
    slug: { current: 'communication-impactante' },
    mainImage: {
      asset: {
        _ref: 'image-3',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
    publishedAt: "2024-03-18",
    categories: [
      {
        _id: 'cat3',
        title: 'Communication',
        slug: { current: 'communication' }
      }
    ],
    author: {
      name: "Thomas Dubois",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    }
  }
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
          <ArticlesHeroSection />
          
          <ArticlesStatsSection />
          
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

          <ArticlesTopicsSection />

          {bookmarkedArticles.length > 0 && (
            <ArticlesBookmarksSection
              bookmarkedArticles={bookmarkedArticles}
              onBookmark={handleBookmark}
            />
          )}

          <ArticlesContributorsSection />

          <section className="container mt-20">
            <NewsletterForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default AllArticlesPage;