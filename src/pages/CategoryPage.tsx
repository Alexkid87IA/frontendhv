import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { NewsletterFooterSection } from "../components/sections/NewsletterFooterSection";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CategoryFilter } from "../components/common/CategoryFilter";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";

interface Article {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: string;
  excerpt: string;
  categories: Array<{ title: string; slug: { current: string } }>;
}

const filters = [
  { id: 'all', name: 'Tous les articles' },
  { id: 'recent', name: 'Plus récents' },
  { id: 'popular', name: 'Plus populaires' },
  { id: 'featured', name: 'À la une' }
];

export function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // TODO: Replace with actual Sanity query
        const mockArticles: Article[] = [
          {
            _id: '1',
            title: "Le mindset des champions : secrets et stratégies",
            slug: { current: 'mindset-champions' },
            mainImage: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80',
            excerpt: "Une plongée fascinante dans la psychologie des plus grands champions. Découvrez les habitudes mentales qui font la différence entre la réussite et l'excellence.",
            categories: [{ title: 'Mental', slug: { current: 'mental' } }]
          },
          {
            _id: '2',
            title: "La résilience : votre superpower cachée",
            slug: { current: 'resilience-superpower' },
            mainImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
            excerpt: "Comment transformer chaque obstacle en opportunité ? Un guide pratique pour développer votre résilience et rebondir plus fort après chaque épreuve.",
            categories: [{ title: 'Mental', slug: { current: 'mental' } }]
          }
        ];

        setArticles(mockArticles);
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
          {/* Hero Section */}
          <section className="container pt-40 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6">
                {categorySlug?.charAt(0).toUpperCase()}{categorySlug?.slice(1)}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {categorySlug === 'mental' ? 'Développez votre mental de champion' :
                 categorySlug === 'business' ? 'Stratégies et innovations business' :
                 categorySlug === 'story' ? 'Histoires inspirantes' :
                 categorySlug === 'society' ? 'Décryptage de notre époque' :
                 'Explorez nos articles'}
              </h1>
              <p className="text-xl text-gray-300">
                {categorySlug === 'mental' ? 'Découvrez les clés mentales qui font la différence entre réussite et échec.' :
                 categorySlug === 'business' ? 'Les dernières tendances et stratégies qui façonnent le monde des affaires.' :
                 categorySlug === 'story' ? 'Des parcours inspirants qui redéfinissent le possible.' :
                 categorySlug === 'society' ? 'Comprendre les mutations qui transforment notre société.' :
                 'Une sélection d\'articles pour vous inspirer et vous transformer.'}
              </p>
            </motion.div>
          </section>

          {/* Filters Section */}
          <section className="container mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 pl-10 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
              </div>

              <div className="flex-1">
                <CategoryFilter
                  categories={filters}
                  selectedCategory={selectedFilter}
                  onSelect={setSelectedFilter}
                />
              </div>
            </div>
          </section>

          {/* Featured Articles Section */}
          {filteredArticles.length > 0 && (
            <section className="container mb-20">
              <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black rounded-3xl border border-white/10 p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.slice(0, 2).map((article, index) => (
                    <Link 
                      key={article._id}
                      to={`/article/${article.slug.current}`}
                      className="group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative aspect-[16/9] rounded-2xl overflow-hidden"
                      >
                        <SafeImage
                          source={article.mainImage}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                        
                        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                            {article.title}
                          </h2>
                          
                          <p className="text-gray-300 mb-6 line-clamp-2">
                            {article.excerpt}
                          </p>
                          
                          <span className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                            <span>Lire l'article</span>
                            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Newsletter */}
          <NewsletterFooterSection />
        </div>
      </div>
    </ErrorBoundary>
  );
}