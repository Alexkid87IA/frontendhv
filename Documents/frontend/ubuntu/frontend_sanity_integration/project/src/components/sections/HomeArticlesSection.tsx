import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight } from "lucide-react"; // Clock, Calendar retirés car dates gérées par Sanity
import { Link } from "react-router-dom";
import { CategoryFilter } from "../common/CategoryFilter";
import { ArticleCard } from "../common/ArticleCard";
import { getAllArticles, getAllCategories } from "../../utils/sanityAPI"; // Adapter le chemin
import type { SanityArticle, SanityCategory, SanityImage } from "../../pages/ArticlePage"; // Réutiliser les types

// Simuler urlFor pour l'instant, à remplacer par une vraie implémentation
const urlFor = (source: SanityImage | string | undefined): string => {
  if (!source) return "https://via.placeholder.com/400x225?text=Image+non+disponible";
  if (typeof source === 'string') return source;
  // Vraie implémentation avec @sanity/image-url
  return "https://via.placeholder.com/400x225?text=Image+Sanity";
};

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
  color: string; // Garder pour l'UI si besoin, sinon simplifier
}

export const HomeArticlesSection = () => {
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all"); // Utiliser l'ID de la catégorie Sanity ou "all"
  const [sortBy, setSortBy] = useState("publishedAt"); // "publishedAt" ou "views" (si views est implémenté)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [fetchedArticles, fetchedCategories] = await Promise.all([
          getAllArticles(),
          getAllCategories(),
        ]);

        setArticles(fetchedArticles || []);
        
        const uiCategories: UICategory[] = [
          { id: "all", name: "Tous les articles", color: "bg-accent-violet" },
          ...(fetchedCategories?.map((cat: SanityCategory, index: number) => ({
            id: cat._id, // Utiliser _id de Sanity comme identifiant unique
            name: cat.title,
            // Logique de couleur à revoir si nécessaire, pour l'instant cycle simple
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
    fetchData();
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
      // Trier par "views" nécessiterait un champ views dans SanityArticle
      // Pour l'instant, on ne trie que par date
      return 0;
    });

  // Logique pour l'article mis en avant (ex: le premier après filtrage/tri)
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
            to="/articles" // Assurez-vous que cette route existe et est gérée
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
              categories={categories} // Passer les catégories formatées pour l'UI
              selectedCategory={selectedCategoryId} // Utiliser l'ID de la catégorie
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
              {/* <option value="popular">Plus populaires</option> */}
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
                  src={urlFor(featuredArticle.mainImage)}
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
                    {/* Reading time à calculer ou ajouter à Sanity */}
                    {/* <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock size={14} />
                      <span>8 min</span> 
                    </div> */}
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
                            src={urlFor(featuredArticle.author.image)}
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
                    src={urlFor(article.mainImage)}
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
                    {/* <span className="text-xs text-tertiary">
                      6 min 
                    </span> */}
                  </div>
                  <h4 className="text-sm font-semibold mb-2 text-white line-clamp-2 group-hover:text-accent-fuchsia transition-colors">
                    {article.title}
                  </h4>
                  {article.author && (
                    <div className="flex items-center gap-2">
                        <img
                        src={urlFor(article.author.image)}
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
                  {/* Le composant ArticleCard doit être adapté pour accepter SanityArticle */}
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


