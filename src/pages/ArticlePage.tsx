// src/pages/ArticlePage.tsx - Version complète avec débogage et améliorations

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark, MessageSquare, Calendar, Clock, User, Heart, Eye } from "lucide-react";

// Imports de vos composants existants
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import ArticleContent from "../components/sections/ArticleContent";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { ArticleSidebar } from "../components/sections/ArticleSidebar";
import { ShareButtons } from "../components/common/ShareButtons";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";

// Système de données local
import { LocalDataAPI, useLocalArticle, Article } from "../utils/localDataSystem";

// Fallback vers Sanity
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI";

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [dataSource, setDataSource] = useState<'local' | 'sanity'>('local');

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setError("Slug de l'article manquant.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Détecter si on est en mode preview
        const urlParams = new URLSearchParams(window.location.search);
        const isPreview = urlParams.get('preview') === 'true';
        
        // Essayer d'abord Sanity, puis fallback sur données locales
        let fetchedArticle = null;
        
        try {
          // Passer le paramètre preview à la fonction
          fetchedArticle = await getArticleBySlug(slug, isPreview);
          if (fetchedArticle) {
            setDataSource('sanity');
            console.log(isPreview ? "✅ Article preview chargé depuis Sanity" : "✅ Article chargé depuis Sanity");
            
            // DÉBOGAGE COMPLET
            console.log("🔍 DÉBOGAGE COMPLET DE L'ARTICLE:");
            console.log("Article complet:", fetchedArticle);
            console.log("🔑 keyPoints:", fetchedArticle.keyPoints);
            console.log("📝 body:", fetchedArticle.body);
            console.log("📝 content:", fetchedArticle.content);
            
            // Analyser la structure du body
            console.log("📊 ANALYSE DU BODY:");
            if (fetchedArticle.body && Array.isArray(fetchedArticle.body)) {
              fetchedArticle.body.forEach((block, index) => {
                console.log(`Block ${index} - Type: ${block._type}`, block);
                
                // Si c'est un bloc avec des enfants
                if (block.children && Array.isArray(block.children)) {
                  block.children.forEach((child, childIndex) => {
                    console.log(`  └─ Child ${childIndex}:`, child);
                  });
                }
                
                // Si c'est une image
                if (block._type === 'image') {
                  console.log("🖼️ IMAGE TROUVÉE:", {
                    type: block._type,
                    asset: block.asset,
                    alt: block.alt,
                    caption: block.caption,
                    fullBlock: block
                  });
                }
              });
            } else {
              console.log("⚠️ Le body n'est pas un tableau ou est vide");
            }
          }
        } catch (sanityError) {
          console.log("⚠️ Sanity non disponible, utilisation des données locales");
          console.error("Erreur Sanity:", sanityError);
        }
        
        // Si Sanity échoue, utiliser les données locales
        if (!fetchedArticle) {
          fetchedArticle = await LocalDataAPI.getArticleBySlug(slug);
          setDataSource('local');
          console.log("✅ Article chargé depuis les données locales");
        }
        
        if (!fetchedArticle) {
          setError("Article non trouvé");
        } else {
          setArticle(fetchedArticle);
          setLocalLikes(fetchedArticle.likes || 0);
          
          // Vérifier les bookmarks sauvegardés
          const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
          setIsBookmarked(savedBookmarks.includes(fetchedArticle._id));
          
          // Charger les articles liés
          try {
            const relatedData = dataSource === 'sanity' 
              ? await getAllArticles()
              : await LocalDataAPI.getAllArticles();
              
            setRelatedArticles(
              relatedData
                .filter((a: any) => a._id !== fetchedArticle._id)
                .slice(0, 3)
            );
          } catch (err) {
            console.error("Erreur lors du chargement des articles liés:", err);
            setRelatedArticles([]);
          }
        }
      } catch (err) {
        console.error("Erreur générale:", err);
        setError("Erreur lors du chargement de l'article.");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  // Fonction utilitaire pour formater la date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long", 
        day: "numeric"
      });
    } catch (err) {
      console.error("Erreur de formatage de date:", err);
      return dateString;
    }
  };

  // Gestion des bookmarks
  const toggleBookmark = () => {
    if (!article) return;
    
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (newBookmarkState) {
      bookmarks.push(article._id);
    } else {
      const index = bookmarks.indexOf(article._id);
      if (index > -1) {
        bookmarks.splice(index, 1);
      }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  };

  // Gestion des likes
  const toggleLike = async () => {
    if (!article) return;
    
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    setLocalLikes(prev => newLikeState ? prev + 1 : prev - 1);
    
    // Mettre à jour les likes dans le système local
    if (dataSource === 'local') {
      try {
        await LocalDataAPI.toggleLike(article._id);
      } catch (err) {
        console.error("Erreur lors de la mise à jour des likes:", err);
        // Revenir à l'état précédent en cas d'erreur
        setIsLiked(!newLikeState);
        setLocalLikes(prev => newLikeState ? prev - 1 : prev + 1);
      }
    }
  };

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Article non trouvé</h2>
          <p className="text-gray-400 mb-6">{error || "L'article demandé n'existe pas."}</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  // Détecter si on est en mode preview
  const urlParams = new URLSearchParams(window.location.search);
  const isPreviewMode = urlParams.get('preview') === 'true';

  // DÉBOGAGE FINAL - Ce qui est passé à ArticleContent
  console.log("📤 PROPS PASSÉES À ARTICLECONTENT:", {
    content: article.body || article.content,
    keyPoints: article.keyPoints,
    "article.body existe?": !!article.body,
    "article.content existe?": !!article.content,
    "article.keyPoints existe?": !!article.keyPoints,
    "Type de content": Array.isArray(article.body) ? 'array' : typeof article.body
  });

  return (
    <ErrorBoundary>
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags?.map((tag: any) => tag.title).join(', ')}
        author={article.author?.name}
        publishedTime={article.publishedAt}
        image={article.mainImage}
      />

      {/* Indicateur de source de données */}
      {dataSource === 'local' && (
        <div className="bg-yellow-500 text-black p-2 text-center font-medium text-sm">
          ⚠️ Mode démo - Données locales utilisées
        </div>
      )}

      {/* Indicateur de mode preview */}
      {isPreviewMode && (
        <div className="bg-purple-600 text-white p-3 text-center font-medium">
          👁️ Mode preview - Vous visualisez un brouillon non publié
        </div>
      )}

      <div className="min-h-screen bg-black text-white">
        <ArticleProgress />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />
          
          <div className="container mx-auto px-4 relative">
            {/* Navigation */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Retour aux articles</span>
            </Link>

            {/* Catégories */}
            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.categories.map((category: any, idx: number) => (
                  <span
                    key={category._id || idx}
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium text-white ${
                      ["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][idx % 4]
                    }`}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Titre principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Résumé */}
            {article.excerpt && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-300 mb-8 max-w-3xl"
              >
                {article.excerpt}
              </motion.p>
            )}

            {/* Meta données */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-gray-400 mb-8"
            >
              {article.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{article.author.name}</p>
                    <p className="text-sm text-gray-400">Auteur</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{article.readingTime || 5} min de lecture</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Eye size={18} />
                <span>{article.views || 0} vues</span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isLiked 
                    ? "bg-red-500 text-white" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={isLiked ? "Retirer le j'aime" : "J'aime"}
              >
                <Heart size={20} className={isLiked ? "fill-current" : ""} />
                <span>{localLikes}</span>
              </button>
              
              <button
                onClick={toggleBookmark}
                className={`p-3 rounded-full transition-all ${
                  isBookmarked 
                    ? "bg-blue-500 text-white" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Bookmark size={20} className={isBookmarked ? "fill-current" : ""} />
              </button>
              
              <ShareButtons title={article.title} />
            </motion.div>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article Content */}
            <main className="flex-1 max-w-4xl">
              {/* Featured Image */}
              {article.mainImage && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12 rounded-2xl overflow-hidden"
                >
                  <SafeImage
                    source={article.mainImage}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}

              {/* Article Body - Utilisation du composant ArticleContent */}
              <ArticleContent 
                content={article.body || article.content} 
                keyPoints={article.keyPoints} 
              />

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <h3 className="text-lg font-medium mb-4">Tags :</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: any, idx: number) => (
                      <Link
                        key={tag._id || idx}
                        to={`/tags/${tag.slug?.current || tag.title.toLowerCase()}`}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
                      >
                        #{tag.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Auteur */}
              {article.author && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 p-6 bg-white/5 rounded-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <User size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">À propos de {article.author.name}</h3>
                      <p className="text-gray-300 mb-3">{article.author.bio || "Auteur passionné par la technologie et l'innovation."}</p>
                      {article.author.email && (
                        <a 
                          href={`mailto:${article.author.email}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          Contacter l'auteur
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </main>

            {/* Sidebar */}
            <aside className="lg:w-80 xl:w-96">
              <ArticleSidebar
                author={article.author}
                relatedArticles={relatedArticles}
              />
            </aside>
          </div>
        </section>

        {/* Articles liés */}
        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Articles similaires</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedArticles.map((relatedArticle: any) => (
                <motion.article
                  key={relatedArticle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all group relative"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {relatedArticle.categories?.slice(0, 1).map((cat: any, idx: number) => (
                      <span 
                        key={cat._id || idx} 
                        className="text-xs px-2 py-1 rounded-full text-white bg-blue-500"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{relatedArticle.readingTime || 5} min</span>
                    <span>{relatedArticle.views || 0} vues</span>
                  </div>
                  <Link
                    to={`/article/${relatedArticle.slug?.current || relatedArticle.slug}`}
                    className="absolute inset-0"
                    aria-label={`Lire l'article: ${relatedArticle.title}`}
                  />
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="container mx-auto px-4 py-20">
          <NewsletterForm />
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default ArticlePage;