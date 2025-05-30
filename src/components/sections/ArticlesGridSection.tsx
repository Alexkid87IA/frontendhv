import React from "react";
import { motion } from "framer-motion";
import { ArticleCard } from "../common/ArticleCard";
import { urlFor } from "../../utils/sanityClient"; // Fixed import path

interface SanityArticle {
  slug: string;
  title: string;
  mainImage?: any; 
  tag?: string;
  summary?: string;
}

interface ArticlesGridSectionProps {
  articles: SanityArticle[];
  bookmarkedArticles: string[];
  onBookmark: (slug: string) => void;
}

export const ArticlesGridSection = ({
  articles,
  bookmarkedArticles,
  onBookmark
}: ArticlesGridSectionProps) => {

  if (!articles || articles.length === 0) {
    return <p className="container text-center text-tertiary">Aucun article à afficher pour le moment.</p>;
  }

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
      }}
      className="container"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => {
          const imageUrl = article.mainImage 
            ? urlFor(article.mainImage).width(400).height(300).fit("crop").url() 
            : "https://via.placeholder.com/400x300?text=Image+Indisponible";

          return (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              image={imageUrl}
              title={article.title}
              tag={article.tag || "Non défini"}
              summary={article.summary || ""}
            />
          );
        })}
      </div>
    </motion.section>
  );
};