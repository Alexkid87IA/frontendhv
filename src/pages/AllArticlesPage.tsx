// src/pages/AllArticlesPage.tsx
import React, { useEffect, useState } from 'react';
import { sanityClient } from '../utils/sanityClient'; // Fixed import path
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

// Définir une interface pour la structure attendue d'un article de Sanity
interface SanityArticle {
  slug: string;
  title: string;
  mainImage?: { asset?: { _ref?: string; _id?: string; [key: string]: any }; [key: string]: any };
  tag?: string;
  summary?: string;
  publishedAt: string; 
  views?: number; 
}

export const AllArticlesPage = () => {
  console.log("--- AllArticlesPage COMPOSANT EST MONTÉ ---");

  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortBy, setSortBy] = React.useState('date'); 
  const [bookmarkedArticles, setBookmarkedArticles] = React.useState<string[]>([]);

  useEffect(() => {
    console.log("--- AllArticlesPage useEffect DÉMARRE ---");

    const fetchArticles = async () => {
      console.log("--- AllArticlesPage fetchArticles DÉMARRE ---");
      setIsLoading(true);
      try {
        const query = `*[_type == "article"] | order(publishedAt desc) {
          "slug": slug.current,
          title,
          mainImage { asset-> }, // Correction ici pour récupérer les détails de l'asset
          "tag": category->title,
          "summary": excerpt,
          publishedAt
        }`;
        console.log("--- AllArticlesPage AVANT sanityClient.fetch ---");
        const sanityArticles: SanityArticle[] = await sanityClient.fetch(query);
        console.log("--- AllArticlesPage APRÈS sanityClient.fetch, articles reçus:", sanityArticles);
        setArticles(sanityArticles);
      } catch (error) {
        console.error("--- AllArticlesPage ERREUR dans fetchArticles:", error);
        setArticles([]);
      }
      setIsLoading(false);
      console.log("--- AllArticlesPage fetchArticles TERMINÉ ---");
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
      const matchesCategory = selectedCategory === 'all' || (article.tag && article.tag.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.summary && article.summary.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
      return (b.views || 0) - (a.views || 0);
    });

  console.log("--- AllArticlesPage RENDU, articles actuels:", articles);
  return (
    <>
      <SEO
        title="Tous les articles | Roger Ormières"
        description="Explorez notre collection d'articles sur l'entrepreneuriat, l'innovation et le développement personnel."
        image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
      />
      <div className="relative">
        <div className="fixed inset-0 bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

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
          
          {isLoading ? (
            <p className="container text-center text-tertiary">Chargement des articles...</p>
          ) : (
            <ArticlesGridSection
              articles={filteredAndSortedArticles}
              bookmarkedArticles={bookmarkedArticles}
              onBookmark={handleBookmark}
            />
          )}

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