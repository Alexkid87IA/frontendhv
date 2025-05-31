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

// Mapping des couleurs par catégorie
const categoryColors: Record<string, string> = {
  "mental": "from-purple-600 to-indigo-600",
  "business": "from-blue-600 to-cyan-600",
  "recits": "from-amber-600 to-orange-600",
  "culture": "from-emerald-600 to-teal-600",
  // Couleur par défaut si la catégorie n'est pas dans la liste
  "default": "from-blue-600 to-cyan-600"
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

  // Charger les données de catégorie et les articles depuis Sanity
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categorySlug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Récupérer les détails de la catégorie
        const categoryData = await getCategoryBySlug(categorySlug);
        
        if (!categoryData) {
          setError(`La catégorie "${categorySlug}" n'existe pas.`);
          setIsLoading(false);
          return;
        }
        
        // Ajouter la couleur à la catégorie
        const categoryColor = categoryColors[categorySlug] || categoryColors.default;
        setCategoryDetails({
          ...categoryData,
          color: categoryColor
        });
        
        // Récupérer les articles de cette catégorie
        const categoryArticles = await getArticlesByCategory(categorySlug);
        setArticles(categoryArticles);
      } catch (err) {
        console.error("Erreur lors du chargement de la catégorie:", err);
        setError("Une erreur est survenue lors du chargement des données. Veuillez réessayer.");
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
      
      {/* Featured Article */}
      {filteredArticles.length > 0 && (
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
      )}
      
      {/* Articles Grid */}
      <section className="container mb-20">
        {filteredArticles.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.slice(1).map((article, index) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent-blue/5"
              >
                <Link to={`/article/${article.slug.current}`} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <SafeImage
                      image={article.mainImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      fallbackText={article.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {article.categories && article.categories.length > 0 && (
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {article.categories.map((category: any, idx: number) => (
                          category.slug?.current && (
                            <Link 
                              key={category._id || idx} 
                              to={`/rubrique/${category.slug.current}`} 
                              className={`px-3 py-1 text-xs font-semibold text-white rounded-md hover:opacity-90 transition-opacity ${
                                categoryColors[category.slug.current] ? 
                                `bg-gradient-to-r ${categoryColors[category.slug.current]}` : 
                                'bg-accent-blue'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {category.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent-blue transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SafeImage
                          image={article.author?.image}
                          alt={article.author?.name || "Auteur"}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                          fallbackText={article.author?.name?.charAt(0) || "A"}
                        />
                        <span className="text-xs text-gray-400">{formatDate(article.publishedAt)}</span>
                      </div>
                      
                      <span className="text-accent-blue group-hover:text-accent-turquoise transition-colors">
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">Aucun article trouvé pour cette catégorie.</p>
            </div>
          )
        )}
      </section>
      
      {/* Newsletter Section */}
      <section className="container mb-20">
        <div className="bg-gradient-to-r from-accent-blue/20 to-accent-turquoise/20 backdrop-blur-sm rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-gray-300 mb-8">
              Recevez les derniers articles et actualités directement dans votre boîte mail.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};
