// src/components/sections/ArticlesGridSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { ArticleCard } from "../common/ArticleCard";
import { urlFor } from "../../lib/sanityClient"; // Ajustez le chemin si votre sanityClient.ts est ailleurs

// Interface pour la structure d'un article venant de Sanity (doit correspondre à celle de AllArticlesPage)
interface SanityArticle {
  slug: string;
  title: string;
  mainImage?: any; 
  tag?: string;
  summary?: string;
  // Ajoutez d'autres champs si ArticleCard en a besoin ou si vous les utilisez ici
}

interface ArticlesGridSectionProps {
  articles: SanityArticle[]; // Attend maintenant un tableau d'articles de Sanity
  bookmarkedArticles: string[];
  onBookmark: (slug: string) => void;
}

export const ArticlesGridSection = ({
  articles,
  bookmarkedArticles,
  onBookmark
}: ArticlesGridSectionProps) => {

  if (!articles || articles.length === 0) {
    // Ce message s'affichera si aucun article n'est chargé ou si le filtre ne retourne rien.
    // Si isLoading est géré dans le parent (AllArticlesPage), ce message est pour "aucun résultat après chargement".
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
          // Génération de l'URL de l'image avec la fonction urlFor
          // Prévoyez une image de remplacement si mainImage n'est pas définie
          const imageUrl = article.mainImage 
            ? urlFor(article.mainImage).width(400).height(300).fit("crop").url() 
            : "/path/to/default-placeholder-image.jpg"; // REMPLACEZ par une vraie URL d'image placeholder

          return (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              image={imageUrl} // URL de l'image générée ou placeholder
              title={article.title}
              tag={article.tag || "Non défini"} // Valeur par défaut pour le tag
              summary={article.summary || ""} // Valeur par défaut pour le résumé
            />
          );
        })}
      </div>
    </motion.section>
  );
};

