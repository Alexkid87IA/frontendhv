import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { CategoryFilter } from "../components/common/CategoryFilter";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { getCategoryBySlug, getArticlesByCategory } from "../utils/sanityAPI";
import { formatDate } from "../utils/dateUtils";

// Données mockées pour le développement
const mockCategories = {
  story: {
    title: "Story",
    description: "Des histoires authentiques qui redéfinissent le possible",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    color: "from-amber-500 to-orange-500"
  },
  business: {
    title: "Business",
    description: "Les stratégies qui font la différence",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    color: "from-blue-500 to-cyan-500"
  },
  mental: {
    title: "Mental",
    description: "Développe une psychologie de champion",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    color: "from-purple-500 to-violet-500"
  },
  society: {
    title: "Society",
    description: "Comprendre les mutations de notre époque",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
    color: "from-emerald-500 to-teal-500"
  }
};

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
    author: {
      name: "Roger Ormières",
      image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj"
    },
    readingTime: "5 min",
    views: 1234
  },
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { current: 'resilience-entrepreneuriale' },
    mainImage: {
      asset: {
        _ref: 'https://picsum.photos/400/300?random=2',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
    publishedAt: "2024-03-19",
    author: {
      name: "Marie Laurent",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    readingTime: "8 min",
    views: 2345
  }
];

const filters = [
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
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
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

  const toggleArticleExpansion = (articleId: string) => {
    setExpandedArticles(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Utiliser categoryDetails s'il est disponible, sinon utiliser mockCategories
  const category = categoryDetails || (categorySlug ? mockCategories[categorySlug as keyof typeof mockCategories] : null);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorMessage
          title="Catégorie non trouvée"
          message="La catégorie que vous recherchez n'existe pas."
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title={`${category.title} | Roger Ormières`}
        description={category.description}
        source={category.image}
      />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
          <img
            src={category.image}
            alt={category.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5`} />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${category.color} text-white text-sm font-medium mb-6`}>
              {category.title}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {category.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {category.description}
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
                categories={filters}
                selectedCategory={selectedFilter}
                onSelect={setSelectedFilter}
              />
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
                source={filteredArticles[0].mainImage}
                alt={filteredArticles[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                fallbackText={filteredArticles[0].title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <SafeImage
                    source={filteredArticles[0].author?.image}
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
                        source={article.mainImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackText={article.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                      
                      {article.categories && article.categories[0] && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-accent-blue/80 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                          {article.categories[0].title}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-blue transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-500" />
                          <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                        </div>
                        
                        <ArrowRight size={16} className="text-accent-blue transform group-hover:translate-x-1 transition-transform" />
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
        <div className="bg-gradient-to-br from-accent-blue/20 to-accent-turquoise/10 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Restez inspiré, chaque semaine
              </h2>
              <p className="text-gray-300 mb-6">
                Abonnez-vous à notre newsletter pour recevoir une dose hebdomadaire d'inspiration, les meilleurs articles, des conseils exclusifs et les actualités de notre communauté.
              </p>
            </div>
            
            <div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};