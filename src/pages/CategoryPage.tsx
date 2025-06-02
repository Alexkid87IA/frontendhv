import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SEO } from "../components/common/SEO";
import { NewsletterFooterSection } from "../components/sections/NewsletterFooterSection";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { CategoryHeroSection } from "../components/sections/CategoryHeroSection";
import { CategoryFeaturedArticles } from "../components/sections/CategoryFeaturedArticles";
import { CategoryFilters } from "../components/sections/CategoryFilters";
import { CategoryArticlesGrid } from "../components/sections/CategoryArticlesGrid";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  excerpt: string;
  publishedAt: string;
  categories: Array<{ title: string; slug: { current: string } }>;
}

// Générer plus d'articles mockés pour la pagination
const generateMockArticles = (count: number): Article[] => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `${i + 1}`,
    title: `Article ${i + 1} : ${['Le mindset des champions', 'Innovation et leadership', 'Stratégies de croissance', 'Transformation digitale'][i % 4]}`,
    slug: { current: `article-${i + 1}` },
    mainImage: `https://images.unsplash.com/photo-${['1533227268428-f9ed0900fb3b', '1517245386807-bb43f82c33c4', '1522202176988-66273c2fd55f', '1516321318423-f06f85e504b3'][i % 4]}?auto=format&fit=crop&q=80`,
    excerpt: "Une analyse approfondie des stratégies qui font la différence entre la réussite et l'excellence dans le monde professionnel moderne.",
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(),
    categories: [{ title: 'Mental', slug: { current: 'mental' } }]
  }));
};

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // TODO: Replace with actual Sanity query
        const mockArticles = generateMockArticles(20);
        setArticles(mockArticles);
        setDisplayedArticles(mockArticles.slice(0, articlesPerPage));
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des articles.');
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [categorySlug]);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const loadMoreArticles = () => {
    const nextPage = page + 1;
    const startIndex = 0;
    const endIndex = nextPage * articlesPerPage;
    setDisplayedArticles(filteredArticles.slice(startIndex, endIndex));
    setPage(nextPage);
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title={`${categorySlug?.charAt(0).toUpperCase()}${categorySlug?.slice(1)} | Roger Ormières`}
        description="Explorez nos articles sur le développement personnel, le business et l'innovation."
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
          <CategoryHeroSection categorySlug={categorySlug} />
          
          <CategoryFeaturedArticles articles={filteredArticles.slice(0, 2)} />
          
          <CategoryFilters
            searchTerm={searchTerm}
            selectedFilter={selectedFilter}
            onSearchChange={setSearchTerm}
            onFilterChange={setSelectedFilter}
          />
          
          <CategoryArticlesGrid
            articles={displayedArticles.slice(2)}
            onLoadMore={loadMoreArticles}
            hasMore={displayedArticles.length < filteredArticles.length}
          />

          <NewsletterFooterSection />
        </div>
      </div>
    </ErrorBoundary>
  );
}