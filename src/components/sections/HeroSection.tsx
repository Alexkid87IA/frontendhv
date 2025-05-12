import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react"; // Clock a été retiré car non utilisé
import { getAllArticles, getLatestQuote } from "../../utils/sanityAPI";
import type { SanityArticle, SanityImage } from "../../pages/ArticlePage";
import imageUrlBuilder from "@sanity/image-url"; // Importation du builder
import { sanityClient } from "../../utils/sanityClient"; // Importer le client Sanity pour le builder

// Configurer le builder d'URL d'image
const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImage | string | undefined) {
  if (!source) {
    // Retourner une URL de placeholder ou gérer l'absence d'image
    return "https://via.placeholder.com/800x450?text=Image+non+disponible";
  }
  if (typeof source === 'string'){
    return source; // Si c'est déjà une URL complète
  }
  // Vérifier si source.asset existe avant de l'utiliser
  if ((source as SanityImage).asset) {
    return builder.image(source).auto('format').fit('max').url();
  }
  // Fallback si la source n'est pas une URL et n'a pas de .asset (cas peu probable avec SanityImage)
  return "https://via.placeholder.com/800x450?text=Source+image+invalide";
}

interface SanityQuote {
  text: string;
  author: string;
  role?: string;
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const HeroSection = () => {
  const [mainArticle, setMainArticle] = useState<SanityArticle | null>(null);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState<SanityQuote | null>(null);
  const [latestArticles, setLatestArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("HeroSection: Début de la récupération des données...");
        const articles = await getAllArticles();
        const quote = await getLatestQuote();

        console.log("HeroSection: Articles récupérés:", articles);
        console.log("HeroSection: Citation récupérée:", quote);

        if (articles && articles.length > 0) {
          console.log("HeroSection: Article principal (articles[0]):", articles[0]);
          console.log("HeroSection: Image de l'article principal (articles[0].mainImage):", articles[0]?.mainImage);
          setMainArticle(articles[0]);
          setLatestArticles(articles.slice(1, 5));
        } else {
          console.log("HeroSection: Aucun article trouvé ou tableau vide.");
          setMainArticle(null);
          setLatestArticles([]);
        }
        setQuoteOfTheDay(quote);
        setError(null);
      } catch (err) {
        console.error("HeroSection: Erreur lors de la récupération des données:", err);
        setError("Impossible de charger le contenu principal.");
      } finally {
        setIsLoading(false);
        console.log("HeroSection: Fin de la récupération des données.");
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-24 container mx-auto px-4 min-h-[60vh] flex items-center justify-center">
        <p>Chargement du contenu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-24 container mx-auto px-4 min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }
  
  // Les données mockées ne seront plus utilisées si mainArticle est chargé
  // const defaultMainArticle = { ... }; 

  // Si mainArticle est null après le chargement et sans erreur, cela signifie qu'aucun article n'a été récupéré
  if (!mainArticle) {
    console.log("HeroSection: Aucun article principal à afficher (mainArticle est null après chargement).");
    // Afficher un message ou un état vide au lieu des données mockées si aucun article n'est VRAIMENT disponible
    // Pour l'instant, pour éviter une page vide si Sanity ne renvoie rien, on peut garder un fallback
    // ou mieux, afficher un message clair à l'utilisateur.
    // Pour le débogage, on va laisser la section se rendre potentiellement vide si aucun article n'est là.
  }

  const displayMainArticle = mainArticle; // Utiliser directement mainArticle, qui peut être null
  console.log("HeroSection: displayMainArticle avant rendu:", displayMainArticle);
  if (displayMainArticle) {
      console.log("HeroSection: displayMainArticle.mainImage avant rendu:", displayMainArticle.mainImage);
  }

  return (
    <section className="pt-24 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {displayMainArticle && (
          <div className="lg:col-span-8">
            <article className="group h-full">
              <Link to={`/article/${displayMainArticle.slug?.current || '#'}`} className="block h-full">
                <div className="relative aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <img
                    src={urlFor(displayMainArticle.mainImage)}
                    alt={displayMainArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/90 via-hv-dark/40 to-transparent"></div>
                  {displayMainArticle.category?.title && (
                    <span className="absolute top-6 left-6 bg-hv-blue px-4 py-2 text-sm font-medium text-hv-white rounded-lg">
                      {displayMainArticle.category.title}
                    </span>
                  )}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter leading-tight mb-4 text-white group-hover:text-hv-turquoise transition-colors">
                      {displayMainArticle.title}
                    </h2>
                    {displayMainArticle.excerpt && 
                        <p className="text-white/90 text-lg mb-4 line-clamp-2 max-w-3xl">
                            {displayMainArticle.excerpt}
                        </p>
                    }
                    <div className="flex items-center justify-between">
                      <span className="text-white/70">{formatDate(displayMainArticle.publishedAt)}</span>
                      <span className="inline-flex items-center text-hv-turquoise group-hover:text-hv-blue transition-colors">
                        Lire l'article
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}

        {quoteOfTheDay && (
          <div className="lg:col-span-4">
            <div className="h-full bg-hv-dark/30 backdrop-blur-sm rounded-xl border border-hv-white/10 p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <QuoteIcon className="w-5 h-5 text-hv-turquoise" />
                  Citation du jour
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-hv-blue to-hv-turquoise rounded-full"></div>
              </div>
              <blockquote className="flex-grow flex flex-col justify-center">
                <p className="text-2xl font-medium leading-relaxed text-white/90 mb-6">
                  "{quoteOfTheDay.text}"
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-lg font-semibold text-hv-turquoise">
                      {quoteOfTheDay.author}
                    </span>
                    {quoteOfTheDay.role && (
                      <span className="text-white/60">{quoteOfTheDay.role}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        )}

        {latestArticles.length > 0 && (
          <div className="lg:col-span-12 mt-6 lg:mt-0">
            <div className="bg-hv-dark/30 backdrop-blur-sm p-6 rounded-xl border border-hv-white/10">
              <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-hv-white/10">
                Derniers articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {latestArticles.map((article) => (
                  <article key={article._id} className="group">
                    <Link to={`/article/${article.slug?.current || '#'}`} className="block">
                      {article.category?.title && (
                        <span className="inline-block bg-hv-blue/90 px-2 py-1 text-xs font-medium text-hv-white rounded mb-3">
                          {article.category.title}
                        </span>
                      )}
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-hv-turquoise transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      {article.excerpt && 
                        <p className="text-sm text-white/70 mb-3 line-clamp-2">
                            {article.excerpt}
                        </p>
                      }
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">{formatDate(article.publishedAt)}</span>
                        <span className="text-sm text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center">
                          Lire
                          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;

