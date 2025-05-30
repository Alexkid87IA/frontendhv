import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { getAllArticles, getLatestQuote } from "../../utils/sanityAPI";
import type { SanityArticle, SanityImage, SanityCategory, SanityQuote } from "../../pages/ArticlePage";
import { urlFor } from "../../utils/sanityClient";

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
        const articles = await getAllArticles();
        console.log("Articles fetched in HeroSection (veuillez inspecter le champ 'categories'):", articles);
        const quote = await getLatestQuote();

        if (articles && articles.length > 0) {
          setMainArticle(articles[0]);
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {mainArticle && (
          <div className="lg:col-span-7 xl:col-span-8">
            <article className="group h-full flex flex-col bg-hv-card-bg p-0 rounded-xl overflow-hidden shadow-lg border border-hv-card-border transition-all duration-300 hover:border-hv-blue-accent">
              <div className="relative">
                <Link to={`/article/${mainArticle.slug?.current || '#'}`} className="block">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={urlFor(mainArticle.mainImage)}
                      alt={mainArticle.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                </Link>
                {mainArticle.categories && mainArticle.categories.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {mainArticle.categories.map((category: SanityCategory, index: number) => (
                      category.slug?.current && (
                        <Link 
                          key={category.slug.current} 
                          to={`/rubrique/${category.slug.current}`} 
                          className={`${["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][index % 4]} px-3 py-1 text-xs font-semibold text-white rounded-md hover:opacity-90 transition-opacity`}
                        >
                          {category.title}
                        </Link>
                      )
                    ))}
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <Link to={`/article/${mainArticle.slug?.current || '#'}`} className="block">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight leading-tight mb-3 text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors">
                    {mainArticle.title}
                  </h2>
                  {mainArticle.excerpt && (
                    <p className="text-hv-text-secondary-maquette text-base mb-4 line-clamp-3 flex-grow">
                      {mainArticle.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-hv-text-secondary-maquette text-sm">{formatDate(mainArticle.publishedAt)}</span>
                    <span className="inline-flex items-center text-hv-blue-accent font-medium transition-colors group-hover:text-hv-text-white">
                      Lire l'article
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            </article>
          </div>
        )}

        {quoteOfTheDay && (
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col">
            <div className="bg-hv-card-bg p-6 rounded-xl shadow-lg flex flex-col h-full border border-hv-card-border">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-hv-text-primary-maquette">
                  <QuoteIcon className="w-5 h-5 text-hv-blue-accent" />
                  Citation du Jour
                </h3>
                <div className="w-10 h-0.5 bg-hv-blue-accent rounded-full"></div>
              </div>
              <blockquote className="flex-grow flex flex-col justify-center mb-4">
                <p className="text-xl font-medium leading-relaxed text-hv-text-primary-maquette mb-4">
                  "{quoteOfTheDay.text}"
                </p>
                <footer>
                  <cite className="not-italic">
                    <span className="block text-md font-semibold text-hv-blue-accent">
                      {quoteOfTheDay.author}
                    </span>
                    {quoteOfTheDay.role && (
                      <span className="text-sm text-hv-text-secondary-maquette">{quoteOfTheDay.role}</span>
                    )}
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        )}
      </div>

      {latestArticles.length > 0 && (
        <div className="bg-hv-card-bg p-6 rounded-xl shadow-lg border border-hv-card-border">
          <h3 className="text-xl font-semibold mb-6 pb-4 border-b border-hv-card-border text-hv-text-primary-maquette">
            Derniers Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <article key={article._id} className="group">
                <div className="p-3 hover:bg-hv-card-bg/50 rounded-lg transition-colors h-full flex flex-col border border-transparent hover:border-hv-blue-accent/30">
                  <div className="flex flex-col flex-grow">
                    {article.categories && article.categories.length > 0 && (
                       <div className="flex flex-wrap gap-1 mb-2 self-start">
                        {article.categories.map((category: SanityCategory, index: number) => (
                          category.slug?.current && (
                            <Link 
                              key={category.slug.current} 
                              to={`/rubrique/${category.slug.current}`} 
                              className={`inline-block ${["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][index % 4]} px-2 py-0.5 text-xs font-medium text-white rounded hover:opacity-90 transition-opacity`}
                            >
                              {category.title}
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                    <Link to={`/article/${article.slug?.current || '#'}`} className="block">
                      <h4 className="text-md font-semibold mb-2 text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors line-clamp-2 flex-grow">
                        {article.title}
                      </h4>
                    </Link>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-hv-card-border/50">
                      <span className="text-xs text-hv-text-secondary-maquette">{formatDate(article.publishedAt)}</span>
                      <Link to={`/article/${article.slug?.current || '#'}`} className="text-xs text-hv-blue-accent group-hover:text-hv-text-white transition-colors flex items-center opacity-0 group-hover:opacity-100">
                        Lire
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;