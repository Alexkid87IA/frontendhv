import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, ArrowRight, ChevronDown, ChevronUp, Calendar, Eye, Heart } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { NewsletterFooterSection } from "../components/sections/NewsletterFooterSection";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { getCategoryBySlug, getArticlesByCategory } from "../utils/sanityAPI";
import { formatDate } from "../utils/dateUtils";

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
    views: 1234,
    likes: 456
  },
];

const sortOptions = [
  { value: 'recent', label: 'Plus récents' },
  { value: 'popular', label: 'Plus populaires' },
  { value: 'oldest', label: 'Plus anciens' }
];

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showMore, setShowMore] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!categorySlug) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const [categoryData, articlesData] = await Promise.all([
          getCategoryBySlug(categorySlug),
          getArticlesByCategory(categorySlug)
        ]);
        
        if (categoryData) {
          setCategoryDetails({
            ...categoryData,
            color: mockCategories[categorySlug as keyof typeof mockCategories]?.color || "from-blue-500 to-cyan-500"
          });
        } else {
          setCategoryDetails(mockCategories[categorySlug as keyof typeof mockCategories]);
        }
        
        if (articlesData && articlesData.length > 0) {
          setArticles(articlesData);
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError("Une erreur est survenue lors du chargement des données.");
        setCategoryDetails(mockCategories[categorySlug as keyof typeof mockCategories]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryData();
  }, [categorySlug]);

  const sortArticles = (articles: any[]) => {
    return [...articles].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        default: // 'recent'
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });
  };

  const filteredAndSortedArticles = sortArticles(
    articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const featuredArticles = filteredAndSortedArticles.slice(0, 2);
  const regularArticles = filteredAndSortedArticles.slice(2);
  const displayedArticles = showMore ? regularArticles : regularArticles.slice(0, 15);

  if (!categoryDetails) {
    return (
      <div className="container mx-auto px-4 py-20">
        <ErrorMessage
          message="Catégorie non trouvée"
          suggestion="La catégorie que vous recherchez n'existe pas."
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title={`${categoryDetails.title} | Roger Ormières`}
        description={categoryDetails.description}
        image={categoryDetails.image}
      />

      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-transparent" />
          <img
            src={categoryDetails.image}
            alt={categoryDetails.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${categoryDetails.color} opacity-5`} />
          <div className="absolute inset-0 backdrop-blur-sm" />
        </div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${categoryDetails.color} text-white text-sm font-medium mb-6`}>
              {categoryDetails.title}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {categoryDetails.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              {categoryDetails.description}
            </p>
          </motion.div>
        </div>
      </section>

      {featuredArticles.length > 0 && (
        <section className="container mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <Link 
                key={article._id}
                to={`/article/${article.slug.current}`}
                className="group relative"
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
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <SafeImage
                        source={article.author?.image}
                        alt={article.author?.name || "Auteur"}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <div>
                        <span className="text-sm text-gray-300">{article.author?.name}</span>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{article.readingTime}</span>
                          <span>•</span>
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Eye size={16} />
                        <span>{article.views} vues</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart size={16} />
                        <span>{article.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

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

            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="container mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article, index) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/article/${article.slug.current}`} className="group block h-full">
                <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-xl">
                  <div className="relative aspect-[16/9]">
                    <SafeImage
                      source={article.mainImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
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

        {regularArticles.length > 15 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue hover:bg-accent-blue/80 text-white rounded-lg transition-colors"
            >
              <span>{showMore ? 'Voir moins' : 'Voir plus'}</span>
              {showMore ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        )}
      </section>

      <NewsletterFooterSection />
    </ErrorBoundary>
  );
};

export default CategoryPage;