import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import { ArticleHeader } from "../components/sections/ArticleHeader";
import ArticleContent from "../components/sections/ArticleContent";
import { ExploreArticlesSection } from "../components/sections/ExploreArticlesSection";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI";
import { ArticleSidebar } from "../components/sections/ArticleSidebar"; 
import { urlFor } from "../utils/sanityClient";
import ErrorBoundary from "../components/common/ErrorBoundary";

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

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const loadArticle = async () => {
      console.log("Slug en cours de chargement:", slug);
      if (!slug) {
        setError("Slug de l'article manquant.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const fetchedArticle = await getArticleBySlug(slug);
        console.log("Article récupéré par getArticleBySlug:", fetchedArticle);

        if (!fetchedArticle) {
          setError("Article non trouvé");
          setArticle(null);
        } else {
          setArticle(fetchedArticle);
          console.log("Contenu DÉTAILLÉ du body de l'article mis dans l'état:", JSON.stringify(fetchedArticle.body, null, 2));
          const allArticles = await getAllArticles();
          setRelatedArticles(
            allArticles.filter((a: SanityArticle) => a._id !== fetchedArticle._id).slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'article spécifique:", err);
        setError("Une erreur est survenue lors du chargement de l'article.");
        setArticle(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadArticle();
    
    // Remonter en haut de la page lors du chargement d'un nouvel article
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-dark">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto py-32 min-h-screen bg-background-dark">
        <ErrorMessage
          title={error === "Article non trouvé" ? "Article non trouvé" : "Erreur"}
          message={error || "L'article n'a pas pu être chargé."}
        />
      </div>
    );
  }
  
  console.log("État 'article' avant le rendu:", article);
  if (article) {
    console.log("Contenu DÉTAILLÉ 'article.body' passé à ArticleContent:", JSON.stringify(article.body, null, 2));
  }

  const headerData = {
    title: article.title,
    description: article.excerpt || "",
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' }) : "Date inconnue",
    readingTime: "~" + Math.ceil((article.body?.length || 200 * 5) / 200 / 5) + " min",
    category: article.categories && article.categories.length > 0 ? article.categories[0].title : "Non catégorisé", 
    image: article.mainImage,
    publishedAt: article.publishedAt,
    author: article.author
  };
  
  const seoImageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).height(630).fit("crop").auto("format").url() : undefined;

  return (
    <ErrorBoundary>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={seoImageUrl}
      />
      <div className="relative text-white bg-background-dark overflow-x-hidden">
        <ArticleProgress />

        <ArticleHeader article={headerData} />

        <div className="container mx-auto relative px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="flex flex-col lg:flex-row lg:gap-x-12 xl:gap-x-16 pt-8 md:pt-12">
            <motion.main 
              className="w-full lg:w-2/3 lg:max-w-3xl xl:max-w-4xl"
              custom={1}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <ArticleContent content={article.body} /> 
              
              <motion.div 
                className="mt-16 md:mt-20"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center">
                  <span className="w-1.5 h-6 bg-accent-blue rounded-full mr-3"></span>
                  Articles similaires
                </h2>
                <ExploreArticlesSection />
              </motion.div>

              {showComments && (
                <motion.div 
                  className="mt-16 border-t border-white/10 pt-10"
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <h3 className="text-2xl font-bold mb-6">Discussion</h3>
                  <p className="text-gray-400">Les commentaires seront bientôt disponibles.</p>
                </motion.div>
              )}
              
              <motion.section 
                className="mt-16 md:mt-20"
                custom={showComments ? 4 : 3}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <NewsletterForm />
              </motion.section>
            </motion.main>

            <motion.div 
              className="w-full lg:w-1/3 mt-16 lg:mt-0"
              custom={1.5}
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <ArticleSidebar 
                author={article.author} 
                relatedArticles={relatedArticles} 
              />
            </motion.div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ArticlePage;
