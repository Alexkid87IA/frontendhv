import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import { ArticleHeader } from "../components/sections/ArticleHeader";
import { ArticleContent } from "../components/sections/ArticleContent";
import { ExploreArticlesSection } from "../components/sections/ExploreArticlesSection";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI";
import { ArticleSidebar } from "../components/sections/ArticleSidebar"; 
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
  const [showComments, setShowComments] = useState(false); // State pour afficher/cacher les commentaires

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
      <div className="container mx-auto py-20 flex justify-center items-center min-h-screen bg-background-dark"><LoadingSpinner /></div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto py-20 min-h-screen bg-background-dark">
        <ErrorMessage
          title={error === "Article non trouvé" ? "Article non trouvé" : "Erreur"}
          message={error || "L'article n'a pas pu être chargé."}
        />
      </div>
    );
  }

  const headerData = {
    title: article.title,
    description: article.excerpt || "",
    date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' }) : "Date inconnue",
    readingTime: "~" + Math.ceil((article.body?.length || 200 * 5) / 200 / 5) + " min", // Estimation basique
    category: article.categories && article.categories.length > 0 ? article.categories[0].title : "Non catégorisé", 
    image: article.mainImage 
  };
  
  const seoImageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).height(630).fit("crop").auto("format").url() : undefined;

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        image={seoImageUrl}
      />
      <div className="relative pb-16 md:pb-24 text-white bg-background-dark overflow-x-hidden">
        <ArticleProgress />

        <div className="container mx-auto relative px-4 sm:px-6 lg:px-8 pt-0">
          {/* ArticleHeader est déjà animé en interne */}
          <ArticleHeader article={headerData} />

          <div className="flex flex-col lg:flex-row lg:gap-x-12 xl:gap-x-16">
            <motion.main 
              className="w-full lg:w-2/3 lg:max-w-3xl xl:max-w-4xl"
              custom={1} // Délai pour apparaître après le header (qui a son propre délai interne)
              initial="hidden"
              animate="visible"
              variants={sectionVariants}
            >
              <ArticleContent content={article.body} /> 
              
              <motion.div 
                className="mt-12 md:mt-16"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <ExploreArticlesSection />
              </motion.div>

              {showComments && (
                <motion.div 
                  className="mt-12 border-t border-white/10 pt-8"
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
                custom={showComments ? 4 : 3} // Ajuster le délai si les commentaires sont affichés
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <NewsletterForm />
              </motion.section>
            </motion.main>

            <motion.div 
              className="w-full lg:w-1/3 mt-12 lg:mt-0"
              custom={1.5} // Délai pour la sidebar, pour qu'elle apparaisse en même temps ou juste après le contenu principal
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
    </>
  );
};

export default ArticlePage;

