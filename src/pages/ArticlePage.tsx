import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Bookmark, MessageSquare, Calendar, Clock, User } from "lucide-react";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import ArticleContent from "../components/sections/ArticleContent";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI";
import { ArticleSidebar } from "../components/sections/ArticleSidebar";
import { ShareButtons } from "../components/common/ShareButtons";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { urlFor } from "../utils/sanityImage";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityAuthor {
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  bio?: any;
}

export interface SanityCategory {
  title: string;
  slug: SanitySlug;
}

export interface SanityTag {
  title: string;
  slug: SanitySlug;
}

export interface SanityArticle {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: any[];
  publishedAt?: string;
  categories?: SanityCategory[];
  author?: SanityAuthor;
  tags?: SanityTag[];
}

export interface SanityQuote {
  _id: string;
  text: string;
  author: string;
  role?: string;
}

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

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
          const allArticles = await getAllArticles();
          setRelatedArticles(
            allArticles.filter((a: SanityArticle) => a._id !== fetchedArticle._id).slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'article:", err);
        setError("Une erreur est survenue lors du chargement de l'article.");
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadArticle();
  }, [slug]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const calculateReadingTime = (content?: any[]) => {
    if (!content) return "5 min";
    const wordsPerMinute = 200;
    const words = content.reduce((acc, block) => {
      if (block._type === "block" && block.children) {
        return acc + block.children.reduce((count: number, child: any) => 
          count + (child.text ? child.text.split(" ").length : 0), 0);
      }
      return acc;
    }, 0);
    return `${Math.max(1, Math.ceil(words / wordsPerMinute))} min`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto py-20 min-h-screen">
        <ErrorMessage
          title={error === "Article non trouvé" ? "Article non trouvé" : "Erreur"}
          message={error || "L'article n'a pas pu être chargé."}
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.mainImage ? urlFor(article.mainImage).width(1200).height(630).url() : undefined}
      />

      <div className="relative min-h-screen bg-black">
        <ArticleProgress />

        {/* Hero Section */}
        <section className="relative pt-32 pb-16">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/90" />
            {article.mainImage && (
              <SafeImage
                image={article.mainImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          </div>

          <div className="container relative">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Retour aux articles</span>
            </Link>

            {/* Categories */}
            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {article.categories.map((category, idx) => (
                  category.slug?.current && (
                    <Link
                      key={idx}
                      to={`/rubrique/${category.slug.current}`}
                      className={`inline-block px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        ["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][idx % 4]
                      } text-white hover:opacity-90`}
                    >
                      {category.title}
                    </Link>
                  )
                ))}
              </div>
            )}

            {/* Title & Excerpt */}
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {article.title}
              </h1>
              {article.excerpt && (
                <p className="text-xl text-gray-300 mb-8">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              {article.author && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <SafeImage
                      image={article.author.image}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span>{article.author.name}</span>
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
                <span>{calculateReadingTime(article.body)} de lecture</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ShareButtons title={article.title} />
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  isBookmarked 
                    ? "bg-accent-blue text-white" 
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={isBookmarked ? "Retirer des favoris" : "Ajouter aux favoris"}
              >
                <Bookmark size={20} />
              </button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Article Content */}
            <main className="flex-1 max-w-4xl">
              {/* Featured Image */}
              {article.mainImage && (
                <div className="mb-12 rounded-2xl overflow-hidden">
                  <SafeImage
                    image={article.mainImage}
                    alt={article.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article Body */}
              <div className="prose prose-invert prose-lg max-w-none">
                <ArticleContent content={article.body} />
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, idx) => (
                      <Link
                        key={idx}
                        to={`/tag/${tag.slug.current}`}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm transition-colors"
                      >
                        {tag.title}
                      </Link>
                    ))}
                  </div>
                </div>
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
        </div>

        {/* Newsletter */}
        <section className="container py-20">
          <NewsletterForm />
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default ArticlePage;