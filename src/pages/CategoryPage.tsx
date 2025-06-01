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
        _ref: 'image-1',
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
        _ref: 'image-2',
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

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("recent");
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);

  const category = categorySlug ? mockCategories[categorySlug as keyof typeof mockCategories] : null;

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
        image={category.image}
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

      {/* Articles Grid */}
      <section className="container mb-20">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <motion.article
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <SafeImage
                      image={article.mainImage}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <SafeImage
                        image={article.author.image}
                        alt={article.author.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="font-medium">{article.author.name}</div>
                        <div className="text-sm text-gray-400">
                          {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 group-hover:text-accent-blue transition-colors">
                      {article.title}
                    </h2>

                    <p className={`text-gray-400 mb-4 ${
                      expandedArticles.includes(article._id) ? '' : 'line-clamp-2'
                    }`}>
                      {article.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{article.readingTime} de lecture</span>
                        <span>{article.views.toLocaleString()} vues</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleArticleExpansion(article._id)}
                          className="text-accent-blue hover:text-accent-turquoise transition-colors"
                        >
                          {expandedArticles.includes(article._id) ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>

                        <Link
                          to={`/article/${article.slug.current}`}
                          className="flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors"
                        >
                          <span>Lire l'article</span>
                          <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="container mb-20">
        <NewsletterForm />
      </section>
    </ErrorBoundary>
  );
};

export default CategoryPage;