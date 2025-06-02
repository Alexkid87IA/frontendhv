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
import { getArticlesByCategory, getCategoryBySlug } from "../utils/sanityAPI";
import { SanityArticle } from "../types/sanity";

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<SanityArticle[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const fetchCategoryAndArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!categorySlug) {
          setError('Catégorie non spécifiée');
          return;
        }

        // Récupérer les informations de la catégorie
        const categoryData = await getCategoryBySlug(categorySlug);
        if (categoryData) {
          setCategory(categoryData);
        }

        // Récupérer les articles de cette catégorie depuis Sanity
        const sanityArticles = await getArticlesByCategory(categorySlug);
        
        if (sanityArticles && sanityArticles.length > 0) {
          setArticles(sanityArticles);
          setDisplayedArticles(sanityArticles.slice(0, articlesPerPage));
          console.log(`Articles de la catégorie ${categorySlug} récupérés depuis Sanity`);
        } else {
          setArticles([]);
          setDisplayedArticles([]);
          console.log(`Aucun article trouvé pour la catégorie ${categorySlug}`);
        }
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des articles.');
        console.error('Error fetching articles:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryAndArticles();
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

  // Obtenir le titre de la catégorie
  const categoryTitle = category?.title || categorySlug?.charAt(0).toUpperCase() + categorySlug?.slice(1);
  const categoryDescription = category?.description || "Explorez nos articles sur le développement personnel, le business et l'innovation.";

  return (
    <ErrorBoundary>
      <SEO
        title={`${categoryTitle} | Roger Ormières`}
        description={categoryDescription}
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
          
          {filteredArticles.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="container py-20">
              <div className="text-center">
                <p className="text-gray-400 text-lg">
                  Aucun article trouvé dans cette catégorie pour le moment.
                </p>
              </div>
            </div>
          )}

          <NewsletterFooterSection />
        </div>
      </div>
    </ErrorBoundary>
  );
}