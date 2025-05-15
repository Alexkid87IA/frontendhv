import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ArticleCard } from '../common/ArticleCard';
import { sanityClient, urlFor } from '../../lib/sanityClient'; // Assurez-vous que ce chemin est correct

// Interface pour la structure d'un article venant de Sanity
interface SanityArticle {
  slug: string;
  title: string;
  mainImage?: { asset?: { _ref?: string; _id?: string; [key: string]: any }; [key: string]: any };
  tag?: string; // Ou le nom de votre champ catégorie si différent
  summary?: string; // Ou le nom de votre champ excerpt/description si différent
  // Ajoutez d'autres champs si ArticleCard en a besoin
}

export const ArticlesFeaturedSection = () => {
  const [featuredArticle, setFeaturedArticle] = useState<SanityArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeaturedArticle = async () => {
      setIsLoading(true);
      try {
        // Requête GROQ pour récupérer le dernier article publié
        // Vous pouvez adapter cette requête si vous avez un champ booléen "isFeatured" par exemple :
        // const query = `*[_type == "article" && isFeatured == true] | order(publishedAt desc)[0] {
        const query = `*[_type == "article"] | order(publishedAt desc)[0] { 
          "slug": slug.current,
          title,
          mainImage { asset-> },
          "tag": category->title, // Assurez-vous que 'category' est le nom de votre champ de référence de catégorie
          "summary": excerpt // Assurez-vous que 'excerpt' est le nom de votre champ de résumé
        }`;
        const article: SanityArticle = await sanityClient.fetch(query);
        setFeaturedArticle(article);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'article à la une:", error);
        setFeaturedArticle(null);
      }
      setIsLoading(false);
    };

    fetchFeaturedArticle();
  }, []);

  if (isLoading) {
    return (
      <section className="container mb-20">
        <div className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
          <p className="text-center text-tertiary">Chargement de l'article à la une...</p>
        </div>
      </section>
    );
  }

  if (!featuredArticle) {
    return (
      <section className="container mb-20">
        <div className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
          <p className="text-center text-tertiary">Aucun article à la une disponible pour le moment.</p>
        </div>
      </section>
    );
  }

  // Préparation des props pour ArticleCard
  const articleProps = {
    slug: featuredArticle.slug,
    title: featuredArticle.title,
    image: featuredArticle.mainImage 
      ? urlFor(featuredArticle.mainImage).width(800).height(450).fit("crop").url() 
      : "https://via.placeholder.com/800x450?text=Image+Indisponible", // Placeholder valide
    tag: featuredArticle.tag || "Non défini",
    summary: featuredArticle.summary || "",
    // Ajoutez d'autres props si ArticleCard les attend (ex: date, readTime, etc.)
    // Ces props devront être ajoutées à la requête GROQ si elles ne sont pas déjà présentes
  };

  return (
    <section className="container mb-20">
      <div className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Article à la une</h2>
          <motion.button
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
            // TODO: Implémenter la navigation vers la page de l'article ou une page "voir plus"
            onClick={() => console.log('Voir plus cliqué')}
          >
            <span>Voir plus</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1">
          {/* Nous n'utilisons plus .map() car nous avons un seul article à la une */}
          <ArticleCard {...articleProps} />
        </div>
      </div>
    </section>
  );
};
