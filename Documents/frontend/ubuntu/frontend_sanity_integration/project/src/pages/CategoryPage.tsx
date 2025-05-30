import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { sanityClient } from "../utils/sanityClient"; // Assurez-vous que le chemin est correct
import groq from "groq";
import type { SanityArticle, SanityImage, SanityCategory } from "./ArticlePage"; // Réutiliser les types existants
import imageUrlBuilder from "@sanity/image-url";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImage | string | undefined) {
  if (!source) {
    return "https://via.placeholder.com/300x200?text=Image+non+disponible";
  }
  if (typeof source === 'string'){
    if (source.startsWith('http://') || source.startsWith('https://')) return source;
    return "https://via.placeholder.com/300x200?text=Source+invalide";
  }
  if ((source as SanityImage).asset) {
    return builder.image(source).auto('format').fit('max').url();
  }
  return "https://via.placeholder.com/300x200?text=Source+image+invalide";
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fonction à ajouter dans utils/sanityAPI.ts si elle n'existe pas
async function getArticlesByCategorySlug(categorySlug: string) {
  const query = groq`*[_type == "article" && $categorySlug in categories[]->slug.current]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{title, slug},
    "author": author->{name, slug, image}
  } | order(publishedAt desc)`;
  try {
    const articles = await sanityClient.fetch(query, { categorySlug });
    return articles;
  } catch (error) {
    console.error(`Erreur lors de la récupération des articles pour la catégorie ${categorySlug}:`, error);
    return [];
  }
}

async function getCategoryDetails(categorySlug: string) {
  const query = groq`*[_type == "category" && slug.current == $categorySlug][0]{
    title,
    description
  }`;
  try {
    const category = await sanityClient.fetch(query, { categorySlug });
    return category;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails de la catégorie ${categorySlug}:`, error);
    return null;
  }
}

export const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [articles, setArticles] = useState<SanityArticle[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<SanityCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryData = async () => {
      if (!categorySlug) {
        setError("Slug de catégorie manquant.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const [fetchedArticles, fetchedCategoryDetails] = await Promise.all([
          getArticlesByCategorySlug(categorySlug),
          getCategoryDetails(categorySlug)
        ]);

        if (!fetchedCategoryDetails) {
            setError(`Catégorie "${categorySlug}" non trouvée.`);
        } else {
            setCategoryDetails(fetchedCategoryDetails);
        }
        setArticles(fetchedArticles);

      } catch (err) {
        console.error("Error loading category page data:", err);
        setError("Une erreur est survenue lors du chargement des articles de la catégorie.");
      } finally {
        setIsLoading(false);
      }
    };

    loadCategoryData();
  }, [categorySlug]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 min-h-[60vh] flex justify-center items-center"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-20 min-h-[60vh]"><ErrorMessage title="Erreur de catégorie" message={error} /></div>;
  }
  
  if (!categoryDetails) { // Vérification supplémentaire si la catégorie n'est pas trouvée mais pas d'erreur technique
    return <div className="container mx-auto px-4 py-20 min-h-[60vh]"><ErrorMessage title="Catégorie non trouvée" message={`La catégorie avec le slug "${categorySlug}" n'existe pas.`} /></div>;
  }

  return (
    <section className="pt-24 md:pt-32 pb-16 container mx-auto px-4">
      <div className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-hv-text-primary-maquette mb-4">
          Catégorie : {categoryDetails?.title || categorySlug}
        </h1>
        {categoryDetails?.description && (
          <p className="text-lg text-hv-text-secondary-maquette max-w-2xl mx-auto">
            {categoryDetails.description}
          </p>
        )}
      </div>

      {articles.length === 0 && !isLoading && (
         <div className="text-center py-10">
            <p className="text-xl text-hv-text-secondary-maquette">Aucun article trouvé dans cette catégorie pour le moment.</p>
        </div>
      )}

      {articles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article._id} className="group bg-hv-card-bg rounded-xl overflow-hidden shadow-lg border border-hv-card-border transition-all duration-300 hover:border-hv-blue-accent flex flex-col">
              <Link to={`/article/${article.slug?.current || '#'}`} className="block h-full flex flex-col">
                {article.mainImage && (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={urlFor(article.mainImage)}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                     {/* Affichage des catégories de l'article, même sur la page de catégorie principale */}
                    {article.categories && article.categories.length > 0 && (
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                        {article.categories.map((cat) => (
                            <span key={cat.slug?.current || cat.title} className={`text-xs font-semibold px-2 py-0.5 rounded-md ${cat.slug?.current === categorySlug ? 'bg-hv-blue-accent-dark text-white' : 'bg-hv-grey-accent text-hv-text-primary-maquette'}`}>
                            {cat.title}
                            </span>
                        ))}
                        </div>
                    )}
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold tracking-tight leading-tight mb-3 text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-hv-text-secondary-maquette text-sm mb-4 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-3 border-t border-hv-card-border/50">
                    <span className="text-hv-text-secondary-maquette text-xs">{formatDate(article.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryPage;

