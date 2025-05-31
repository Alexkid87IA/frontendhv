import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Filter, ChevronDown } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { getSEOForCategory } from "../utils/seo.config";
import { CategoryFilter } from "../components/common/CategoryFilter";
import { getArticlesByCategory, getCategoryBySlug } from "../utils/sanityAPI";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { urlFor } from "../utils/sanityImage";

// Catégories pour le filtre
const categories = [
  { id: 'all', name: 'Tous les articles' },
  { id: 'recent', name: 'Plus récents' },
  { id: 'popular', name: 'Plus populaires' },
  { id: 'featured', name: 'À la une' }
];

// Données de secours en cas d'erreur
const fallbackCategoryDetails = {
  "mental": {
    title: "Mental",
    description: "Développez une psychologie de champion. Stratégies mentales, résilience et développement personnel.",
    image: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80",
    color: "from-purple-600 to-indigo-600"
  },
  "business": {
    title: "Business & Innovation",
    description: "Explorez les nouvelles frontières du business et de l'innovation. Analyses, success stories et insights.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    color: "from-blue-600 to-cyan-600"
  },
  "recits": {
    title: "Récits",
    description: "Des histoires authentiques qui redéfinissent le possible. Parcours inspirants et transformations remarquables.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    color: "from-amber-600 to-orange-600"
  },
  "culture": {
    title: "Culture & Société",
    description: "Décryptez les tendances culturelles et les mouvements qui façonnent notre société contemporaine.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    color: "from-emerald-600 to-teal-600"
  }
};

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<any[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [useFallback, setUseFallback] = useState(false);

  // Charger les données de catégorie et les articles depuis Sanity
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categorySlug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`Chargement des données pour la catégorie: ${categorySlug}`);
        
        // Récupérer les détails de la catégorie
        const categoryData = await getCategoryBySlug(categorySlug);
        
        if (!categoryData && !fallbackCategoryDetails[categorySlug as keyof typeof fallbackCategoryDetails]) {
          setError(`La catégorie "${categorySlug}" n'existe pas.`);
          setIsLoading(false);
          return;
        }
        
        // Utiliser les données de secours si nécessaire
        if (!categoryData) {
          console.log(`Utilisation des données de secours pour la catégorie: ${categorySlug}`);
          setCategoryDetails(fallbackCategoryDetails[categorySlug as keyof typeof fallbackCategoryDetails]);
          setUseFallback(true);
        } else {
          console.log(`Données de catégorie récupérées avec succès: ${categoryData.title}`);
          setCategoryDetails({
            ...categoryData,
            color: fallbackCategoryDetails[categorySlug as keyof typeof fallbackCategoryDetails]?.color || "from-blue-600 to-cyan-600"
          });
        }
        
        // Récupérer les articles de la catégorie
        const articlesData = await getArticlesByCategory(categorySlug);
        console.log(`${articlesData.length} articles récupérés pour la catégorie: ${categorySlug}`);
        
        if (articlesData.length === 0) {
          console.warn(`Aucun article trouvé pour la catégorie: ${categorySlug}`);
        }
        
        setArticles(articlesData);
      } catch (err) {
        console.error(`Erreur lors du chargement des données pour la catégorie ${categorySlug}:`, err);
        setError(`Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.`);
        
        // Utiliser les données de secours en cas d'erreur
        if (fallbackCategoryDetails[categorySlug as keyof typeof fallbackCategoryDetails]) {
          setCategoryDetails(fallbackCategoryDetails[categorySlug as keyof typeof fallbackCategoryDetails]);
          setUseFallback(true);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categorySlug]);

  // Filtrer les articles en fonction de la recherche et du filtre sélectionné
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
    return 0;
  });

  // Formater la date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh]">
        <ErrorMessage title="Catégorie non trouvée" message={error} />
      </div>
    );
  }

  if (!categoryDetails) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh]">
        <ErrorMessage title="Erreur" message="Impossible de charger les détails de la catégorie." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title={`${categoryDetails.title} | Roger Ormières`}
        description={categoryDetails.description || `Articles sur ${categoryDetails.title}`}
        image={categoryDetails.image ? urlFor(categoryDetails.image) : undefined}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
          <SafeImage 
            image={categoryDetails.image}
            alt={categoryDetails.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            fallbackText={categoryDetails.title}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${categoryDetails.color} opacity-5`} />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${categoryDetails.color} text-white text-sm font-medium mb-6`}>
              {categoryDetails.title}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {categoryDetails.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {categoryDetails.description || `Découvrez tous nos articles sur ${categoryDetails.title}`}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="container mb-12">
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            
            <div className="flex-1">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedFilter}
                onSelect={setSelectedFilter}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors appearance-none pr-10"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '20px' }}
              >
                <option value="date">Plus récents</option>
                <option value="popular">Plus populaires</option>
                <option value="title">Alphabétique</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Message si utilisation des données de secours */}
      {useFallback && (
        <div className="container mb-8">
          <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4 text-amber-200">
            <p>Affichage des données de secours. La connexion au CMS est temporairement indisponible.</p>
          </div>
        </div>
      )}
      
      {/* Featured Article */}
      {filteredArticles.length > 0 ? (
        <section className="container mb-12">
          <Link to={`/article/${filteredArticles[0].slug.current}`} className="group">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden"
            >
              <SafeImage
                image={filteredArticles[0].mainImage}
                alt={filteredArticles[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackText={filteredArticles[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <SafeImage
                    image={filteredArticles[0].author?.image}
                    alt={filteredArticles[0].author?.name || "Auteur"}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    fallbackText={filteredArticles[0].author?.name?.charAt(0) || "A"}
                  />
                  <div>
                    <span className="text-sm text-gray-300">{filteredArticles[0].author?.name || "Auteur inconnu"}</span>
                    <span className="text-xs text-gray-400 block">{formatDate(filteredArticles[0].publishedAt)}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                  {filteredArticles[0].title}
                </h2>
                
                <p className="text-gray-300 mb-6 line-clamp-2">
                  {filteredArticles[0].excerpt}
                </p>
                
                <div className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                  <span>Lire l'article</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        </section>
      ) : (
        <section className="container mb-12">
          <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Aucun article trouvé</h3>
            <p className="text-gray-400">Aucun article ne correspond à votre recherche.</p>
          </div>
        </section>
      )}
      
      {/* Articles Grid */}
      {filteredArticles.length > 1 && (
        <section className="container mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article, index) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/article/${article.slug.current}`} className="group block h-full">
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-xl">
                    <div className="relative aspect-[16/9]">
                      <SafeImage
                        image={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackText={article.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                      
                      {article.categories && article.categories[0] && (
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-xs font-medium border border-white/10">
                          {article.categories[0].title}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <SafeImage
                            image={article.author?.image}
                            alt={article.author?.name || "Auteur"}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover border border-white/20"
                            fallbackText={article.author?.name?.charAt(0) || "A"}
                          />
                          <span className="text-sm text-gray-400">{article.author?.name || "Auteur inconnu"}</span>
                        </div>
                        
                        <span className="text-xs text-gray-500">
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
      
      {/* Newsletter Section */}
      <section className="container mb-20">
        <NewsletterForm />
      </section>
    </ErrorBoundary>
  );
};

export default CategoryPage;
