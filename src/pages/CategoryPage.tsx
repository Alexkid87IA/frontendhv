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

// Données de démonstration pour le design
const mockArticles = [
  {
    _id: "1",
    title: "Comment développer une psychologie d'entrepreneur",
    slug: { current: "psychologie-entrepreneur" },
    excerpt: "Les clés psychologiques qui font la différence entre réussite et échec dans l'entrepreneuriat moderne.",
    mainImage: "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&q=80",
    publishedAt: "2024-05-01",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Roger Ormières", image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj" }
  },
  {
    _id: "2",
    title: "La résilience face à l'échec : transformer les obstacles en opportunités",
    slug: { current: "resilience-echec" },
    excerpt: "Comment les entrepreneurs à succès utilisent les échecs comme tremplins vers la réussite et développent une mentalité de croissance.",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    publishedAt: "2024-04-28",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Alexia Delvaux", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" }
  },
  {
    _id: "3",
    title: "Les habitudes quotidiennes des leaders exceptionnels",
    slug: { current: "habitudes-leaders" },
    excerpt: "Découvrez les routines matinales, techniques de productivité et pratiques mentales qui distinguent les grands leaders.",
    mainImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    publishedAt: "2024-04-25",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Victor Sorel", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" }
  },
  {
    _id: "4",
    title: "Méditation et performance : le secret des entrepreneurs zen",
    slug: { current: "meditation-performance" },
    excerpt: "Comment la pratique régulière de la méditation peut transformer votre leadership et booster votre productivité.",
    mainImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
    publishedAt: "2024-04-22",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Roger Ormières", image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj" }
  },
  {
    _id: "5",
    title: "L'intelligence émotionnelle : le superpower des leaders modernes",
    slug: { current: "intelligence-emotionnelle" },
    excerpt: "Pourquoi la capacité à comprendre et gérer ses émotions est devenue indispensable pour diriger efficacement.",
    mainImage: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&q=80",
    publishedAt: "2024-04-18",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Lila Moreno", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" }
  },
  {
    _id: "6",
    title: "Le pouvoir de la visualisation pour atteindre ses objectifs",
    slug: { current: "pouvoir-visualisation" },
    excerpt: "Comment programmer votre cerveau pour le succès grâce à des techniques de visualisation utilisées par les athlètes de haut niveau.",
    mainImage: "https://images.unsplash.com/photo-1506377711776-dbdc2f3c20d9?auto=format&fit=crop&q=80",
    publishedAt: "2024-04-15",
    categories: [{ _id: "cat1", title: "Mental", slug: { current: "mental" } }],
    author: { name: "Émile Chazal", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" }
  }
];

// Catégories pour le filtre
const categories = [
  { id: 'all', name: 'Tous les articles' },
  { id: 'recent', name: 'Plus récents' },
  { id: 'popular', name: 'Plus populaires' },
  { id: 'featured', name: 'À la une' }
];

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState(mockArticles);
  const [categoryDetails, setCategoryDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Simuler le chargement des données de catégorie
  useEffect(() => {
    setIsLoading(true);
    
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Définir les détails de la catégorie en fonction du slug
      const categoryMap: Record<string, any> = {
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
      
      if (categorySlug && categoryMap[categorySlug]) {
        setCategoryDetails(categoryMap[categorySlug]);
        setError(null);
      } else {
        setError(`La catégorie "${categorySlug}" n'existe pas.`);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
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
    <>
      <SEO
        title={`${categoryDetails.title} | Roger Ormières`}
        description={categoryDetails.description}
        image={categoryDetails.image}
      />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent" />
          <img 
            src={categoryDetails.image} 
            alt={categoryDetails.title}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
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
              {categoryDetails.description}
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
              <img
                src={filteredArticles[0].mainImage}
                alt={filteredArticles[0].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={filteredArticles[0].author.image}
                    alt={filteredArticles[0].author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <span className="text-sm text-gray-300">{filteredArticles[0].author.name}</span>
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
                  <img
                    src={article.mainImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  {article.categories && article.categories.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      {article.categories.map((category) => (
                        <span
                          key={category._id}
                          className={`px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded-full`}
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={article.author.image}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">{article.author.name}</span>
                      <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                    <span>Lire l'article</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="container mb-20">
        <NewsletterForm />
      </section>
    </>
  );
};

export default CategoryPage;