import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CategoryFilter } from "../common/CategoryFilter";
import { ArticleCard } from "../common/ArticleCard";
import { sanityClient, urlFor } from "../../lib/sanityClient"; // Importer le vrai client Sanity et urlFor
import type { SanityArticle, SanityCategory, SanityImage } from "../../pages/ArticlePage";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface UICategory {
  id: string;
  name: string;
  color: string;
}

export const HomeArticlesSection = () => {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [sortBy, setSortBy] = useState("publishedAt");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        
        // Requête GROQ pour récupérer les articles avec les détails de mainImage.asset
        const articlesQuery = `*[_type == "article"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage { asset-> },
          "category": category->{_id, title}
        }`;
        
        // Requête GROQ pour récupérer les catégories
        const categoriesQuery = `*[_type == "category"] {
          _id,
          title
        }`;
        
        // Exécuter les deux requêtes en parallèle
        const [fetchedArticles, fetchedCategories] = await Promise.all([
          sanityClient.fetch(articlesQuery),
          sanityClient.fetch(categoriesQuery)
        ]);

        console.log("Articles récupérés:", fetchedArticles);
        setArticles(fetchedArticles || []);
        
        // Formater les catégories pour l'UI
        const uiCategories: UICategory[] = [
          { id: "all", name: "Tous les articles", color: "bg-accent-violet" },
          ...(fetchedCategories?.map((cat: SanityCategory, index: number) => ({
            id: cat._id,
            name: cat.title,
            color: ["bg-accent-fuchsia", "bg-accent-cyan", "bg-accent-pink", "bg-emerald-500"][index % 4],
          })) || []),
        ];
        setCategories(uiCategories);
        setError(null);
      } catch (err) {
        console.error("Erreur HomeArticlesSection:", err);
        setError("Impossible de charger les articles.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  const filteredArticles = articles
    .filter((article) => {
      const matchesCategory =
        selectedCategoryId === "all" || article.category?._id === selectedCategoryId;
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "publishedAt") {
        return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
      }
      return 0;
    });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const regularArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 text-center"><p>Chargement des articles...</p></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20 text-center text-red-500"><p>{error}</p></div>;
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex justify-between items-end mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
            >
              Articles
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Explorer nos articles</h2>
            <p className="text-hv-white/80 text-lg">
              Découvrez nos derniers articles sur l'entrepreneuriat, l'innovation et le développement personnel
            </p>
          </div>
          <Link
            to="/articles"
            className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
          >
            <span>Tous les articles</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 pl-10 text-white placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
          </div>

          <div className="flex-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-hv-white/80" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-accent-violet"
            >
              <option value="publishedAt">Plus récents</option>
            </select>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-8">
        {featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-12 lg:col-span-8"
          >
            <Link to={`/article/${featuredArticle.slug?.current}`} className="group block">
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                <img
                  src={featuredArticle.mainImage && featuredArticle.mainImage.asset 
                    ? urlFor(featuredArticle.mainImage).width(800).height(450).fit("crop").url() 
                    : "https://via.placeholder.com/800x450?text=Image+Indisponible"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    {featuredArticle.category?.title &&
                        <span className="px-3 py-1 bg-accent-violet text-white text-sm font-medium rounded-full">
                            {featuredArticle.category.title}
                        </span>
                    }
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-white group-hover:text-accent-fuchsia transition-colors">
                    {featuredArticle.title}
                  </h3>
                  {featuredArticle.excerpt && 
                    <p className="text-gray-300 mb-6 line-clamp-2 hidden md:block">
                        {featuredArticle.excerpt}
                    </p>
                  }
                  <div className="flex items-center gap-4">
                    {featuredArticle.author && (
                        <div className="flex items-center gap-3">
                        <img
                            src={featuredArticle.author.image && featuredArticle.author.image.asset
                              ? urlFor(featuredArticle.author.image).width(32).height(32).fit("crop").url()
                              : "https://via.placeholder.com/32x32?text=A"}
                            alt={featuredArticle.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-white">{featuredArticle.author.name}</span>
                        </div>
                    )}
                    <time className="text-sm text-gray-300">
                      {formatDate(featuredArticle.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <h3 className="text-lg font-semibold mb-4 text-white">Derniers articles</h3>
          {regularArticles.slice(0, 4).map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/article/${article.slug?.current}`} className="group flex gap-4 p-2 -mx-2 rounded-lg hover:bg-white/5">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={article.mainImage && article.mainImage.asset 
                      ? urlFor(article.mainImage).width(96).height(96).fit("crop").url() 
                      : "https://via.placeholder.com/96x96?text=Image+Indisponible"}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {article.category?.title && 
                        <span className="text-xs font-medium text-accent-violet">
                            {article.category.title}
                        </span>
                    }
                  </div>
                  <h4 className="text-sm font-semibold mb-2 text-white line-clamp-2 group-hover:text-accent-fuchsia transition-colors">
                    {article.title}
                  </h4>
                  {article.author && (
                    <div className="flex items-center gap-2">
                        <img
                        src={article.author.image && article.author.image.asset
                          ? urlFor(article.author.image).width(20).height(20).fit("crop").url()
                          : "https://via.placeholder.com/20x20?text=A"}
                        alt={article.author.name}
                        className="w-5 h-5 rounded-full"
                        />
                        <span className="text-xs text-hv-white/80 truncate">
                        {article.author.name}
                        </span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {regularArticles.length > 4 && (
          <div className="col-span-12 mt-12">
            <h3 className="text-lg font-semibold mb-8 text-white">Plus d'articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.slice(4).map((article, index) => (
                <motion.div
                  key={article._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ArticleCard article={article} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
