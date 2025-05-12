import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { getAllArticles, getLatestQuote } from "../../utils/sanityAPI";
import type { SanityArticle, SanityImage } from "../../pages/ArticlePage";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../utils/sanityClient";

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: SanityImage | string | undefined) {
  if (!source) {
    return "https://via.placeholder.com/800x450?text=Image+non+disponible";
  }
  if (typeof source === 'string'){
    return source;
  }
  if ((source as SanityImage).asset) {
    return builder.image(source).auto('format').fit('max').url();
  }
  return "https://via.placeholder.com/800x450?text=Source+image+invalide";
}

interface SanityQuote {
  _id: string;
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
        const articles = await getAllArticles(); // Récupère tous les articles triés par date de publication
        const quote = await getLatestQuote();

        if (articles && articles.length > 0) {
          setMainArticle(articles[0]); // L'article le plus récent comme article principal
          // Les 3 articles suivants pour la colonne "Derniers articles", en excluant le principal
          setLatestArticles(articles.slice(1, 4)); 
        } else {
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
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-24 md:pt-32 container mx-auto px-4 min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-white/70">Chargement du contenu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-24 md:pt-32 container mx-auto px-4 min-h-[70vh] flex items-center justify-center">
        <p className="text-red-500 text-xl">{error}</p>
      </section>
    );
  }

  return (
    <section className="pt-24 md:pt-32 pb-16 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonne Article Principal (plus large) */}
        {mainArticle && (
          <div className="lg:col-span-6 xl:col-span-7">
            <article className="group h-full flex flex-col bg-hv-dark-card p-0 rounded-xl overflow-hidden shadow-lg hover:shadow-hv-blue/30 transition-all duration-300">
              <Link to={`/article/${mainArticle.slug?.current || '#'}`} className="block">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img
                    src={urlFor(mainArticle.mainImage)}
                    alt={mainArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  {mainArticle.category?.title && (
                    <span className="absolute top-4 left-4 bg-hv-blue px-3 py-1 text-xs font-semibold text-white rounded-md">
                      {mainArticle.category.title}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight mb-3 text-white group-hover:text-hv-turquoise transition-colors">
                    {mainArticle.title}
                  </h2>
                  {mainArticle.excerpt && (
                    <p className="text-white/80 text-base mb-4 line-clamp-3 flex-grow">
                      {mainArticle.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white/60 text-sm">{formatDate(mainArticle.publishedAt)}</span>
                    <span className="inline-flex items-center text-hv-turquoise group-hover:text-hv-blue font-medium transition-colors">
                      Lire l'article
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* Colonnes Citation et Derniers Articles (plus étroites) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-8">
          {/* Citation du Jour */}
          {quoteOfTheDay && (
            <div className="bg-hv-dark-card p-6 rounded-xl shadow-lg flex flex-col h-full border border-hv-white/10">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-white">
                  <QuoteIcon className="w-5 h-5 text-hv-turquoise" />
                  Citation du Jour
                </h3>
                <div className="w-10 h-0.5 bg-gradient-to-r from-hv-blue to-hv-turquoise rounded-full"></div>
              </div>
              <blockquote className="flex-grow flex flex-col justify-center mb-4">
                <p className="text-xl font-medium leading-relaxed text-white/90 mb-4">
                  "{quoteOfTheDay.text}"
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-md font-semibold text-hv-turquoise">
                      {quoteOfTheDay.author}
                    </span>
                    {quoteOfTheDay.role && (
                      <span className="text-sm text-white/60">{quoteOfTheDay.role}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
              {/* TODO: Ajouter un lien vers une page de citations si elle existe */}
              {/* <Link to="/citations" className="mt-auto self-start text-sm text-hv-blue hover:text-hv-turquoise font-medium transition-colors flex items-center">
                Découvrir nos citations <ArrowRight className="ml-1 w-4 h-4" />
              </Link> */}
            </div>
          )}

          {/* Derniers Articles (colonne) */}
          {latestArticles.length > 0 && (
            <div className="bg-hv-dark-card p-6 rounded-xl shadow-lg border border-hv-white/10">
              <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-hv-white/10 text-white">
                Derniers Articles
              </h3>
              <div className="space-y-4">
                {latestArticles.map((article) => (
                  <article key={article._id} className="group">
                    <Link to={`/article/${article.slug?.current || '#'}`} className="block p-1 hover:bg-hv-dark-hover rounded-lg transition-colors">
                      {article.category?.title && (
                        <span className="inline-block bg-hv-blue/80 px-2 py-0.5 text-xs font-medium text-white rounded mb-1.5">
                          {article.category.title}
                        </span>
                      )}
                      <h4 className="text-md font-semibold mb-1 group-hover:text-hv-turquoise transition-colors line-clamp-2 text-white">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/50">{formatDate(article.publishedAt)}</span>
                        <span className="text-xs text-hv-turquoise group-hover:text-hv-blue transition-colors flex items-center opacity-0 group-hover:opacity-100">
                          Lire
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

