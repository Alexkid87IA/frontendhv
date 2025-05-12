import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import { ArticleHeader } from "../components/sections/ArticleHeader";
import { ArticleContent } from "../components/sections/ArticleContent";
import { AuthorBox } from "../components/common/AuthorBox";
import { RelatedArticles } from "../components/sections/RelatedArticles";
import { ExploreArticlesSection } from "../components/sections/ExploreArticlesSection";
import { ArticleActions } from "../components/sections/ArticleActions";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI"; // Remplacer par Sanity

// Définir les types pour les données Sanity (à affiner selon vos schémas)
interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface SanitySlug {
  _type: "slug";
  current: string;
}

interface SanityAuthor {
  name: string;
  slug: SanitySlug;
  image?: SanityImage; // Supposant que vous avez un champ image pour l'auteur
  bio?: any; // Portable Text ou string
}

interface SanityCategory {
  title: string;
  slug: SanitySlug;
}

interface SanityTag {
  title: string;
  slug: SanitySlug;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: any[]; // Portable Text
  publishedAt?: string;
  category?: SanityCategory;
  author?: SanityAuthor;
  tags?: SanityTag[];
  // Ajoutez d'autres champs si nécessaire
}

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(128); // Logique de like à revoir/connecter
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

        const fetchedArticle = await getArticleBySlug(slug);

        if (!fetchedArticle) {
          setError("Article non trouvé");
          setArticle(null);
        } else {
          setArticle(fetchedArticle);
          // Charger les articles liés (exemple simple : tous les autres articles pour l'instant)
          // Vous devrez affiner cette logique pour des articles réellement "liés"
          const allArticles = await getAllArticles();
          setRelatedArticles(
            allArticles.filter((a: SanityArticle) => a._id !== fetchedArticle._id).slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Error loading article:", err);
        setError("Une erreur est survenue lors du chargement de l'article.");
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container py-20"><LoadingSpinner /></div>
    );
  }

  if (error || !article) {
    return (
      <div className="container py-20">
        <ErrorMessage
          title={error === "Article non trouvé" ? "Article non trouvé" : "Erreur"}
          message={error || "L'article n'a pas pu être chargé."}
        />
      </div>
    );
  }

  // Adapter les données pour les composants enfants
  const headerData = {
    title: article.title,
    description: article.excerpt || "",
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' }) : "Date inconnue",
    readingTime: "10 min", // À calculer dynamiquement
    category: article.category?.title || "Non catégorisé",
    image: article.mainImage // Transmettre l'objet image Sanity, le composant ArticleHeader devra utiliser urlFor
  };

  const authorData = article.author ? {
    name: article.author.name,
    role: "Auteur", // Ou un champ spécifique si vous l'avez
    image: article.author.image, // Transmettre l'objet image Sanity
    bio: article.author.bio || ""
  } : null;
  
  const relatedArticlesData = relatedArticles.map(relArt => ({
    slug: relArt.slug?.current || "#",
    title: relArt.title,
    image: relArt.mainImage, // Transmettre l'objet image Sanity
    summary: relArt.excerpt || "",
    date: relArt.publishedAt ? new Date(relArt.publishedAt).toLocaleDateString("fr-FR") : ""
  }));

  const handleLike = () => {
    setHasLiked(!hasLiked);
    setLikes(prev => hasLiked ? prev - 1 : prev + 1);
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        // image={article.mainImage} // Adapter pour obtenir l'URL de l'image Sanity
      />
      <div className="relative pb-32">
        <ArticleProgress />

        <div className="container relative">
          <div className="flex gap-12">
            <div className="flex-1 max-w-3xl mx-auto">
              <ArticleHeader article={headerData} />
              {/* Le composant ArticleContent devra être adapté pour rendre le Portable Text de Sanity */}
              <ArticleContent content={article.body} /> 
              {authorData && <AuthorBox {...authorData} />}
              
              {relatedArticlesData.length > 0 && (
                <RelatedArticles articles={relatedArticlesData} />
              )}
              
              <ExploreArticlesSection />

              {showComments && (
                <div className="mt-12 border-t border-white/5 pt-8">
                  <h3 className="text-2xl font-bold mb-6">Discussion</h3>
                  {/* Composant de commentaires à implémenter */}
                </div>
              )}

              <section className="container mt-20">
                <NewsletterForm />
              </section>
            </div>
          </div>
        </div>

        <ArticleActions
          title={article.title}
          likes={likes}
          hasLiked={hasLiked}
          isBookmarked={isBookmarked}
          onLike={handleLike}
          onBookmark={() => setIsBookmarked(!isBookmarked)}
          onShowComments={() => setShowComments(!showComments)}
        />
      </div>
    </>
  );
};

export default ArticlePage;


