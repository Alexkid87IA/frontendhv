import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { getAmuseBouches } from "../../utils/sanityAPI";
import type { SanityArticle, SanityImage } from "../../pages/ArticlePage";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../utils/sanityClient";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source: SanityImage | string | undefined): string => {
  if (!source) return "https://via.placeholder.com/280x498?text=Image+non+disponible";
  // Si c'est déjà une URL complète (par exemple, un placeholder externe ou une URL stockée directement)
  if (typeof source === "string" && (source.startsWith('http://') || source.startsWith('https://'))) return source;
  // Si c'est une chaîne mais pas une URL valide, c'est peut-être une ancienne valeur placeholder, on retourne un placeholder par défaut
  if (typeof source === "string") return "https://via.placeholder.com/280x498?text=Source+invalide";
  
  // Assumant que 'source' est un objet SanityImage valide
  if (source && typeof source === 'object' && (source as SanityImage).asset) {
    return builder.image(source).auto('format').fit('crop').width(280).height(498).url();
  }
  // Fallback pour tout autre cas non géré
  return "https://via.placeholder.com/280x498?text=Erreur+Image";
};

interface AmuseBoucheSectionProps {
  title?: string;
  description?: string;
}

export const AmuseBoucheSection = ({
  title = "Amuses-bouches",
  description = "Des conseils percutants en format court",
}: AmuseBoucheSectionProps) => {
  const [videos, setVideos] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchAmuseBouches = async () => {
      try {
        setIsLoading(true);
        const amuseBouchesData = await getAmuseBouches(10); // Récupérer jusqu'à 10 amuse-bouches
        setVideos(amuseBouchesData || []);
      } catch (error) {
        console.error("Erreur lors du chargement des amuses-bouches:", error);
        setVideos([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAmuseBouches();
  }, []);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5); // Marge pour éviter la sensibilité extrême
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollButtons);
      const timeoutId = setTimeout(checkScrollButtons, 500);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(timeoutId);
      };
    }
  }, [videos, isLoading]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-10 text-center text-hv-text-primary-maquette"><p>Chargement des amuses-bouches...</p></div>;
  }

  if (!videos.length) {
    return null; 
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter mb-2 text-hv-text-primary-maquette">{title}</h2>
          <p className="text-hv-text-secondary-maquette">{description}</p>
        </div>
        <div className="hidden sm:flex space-x-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-3 rounded-full bg-hv-card-bg/80 border border-hv-card-border text-hv-text-secondary-maquette hover:text-hv-blue-accent hover:border-hv-blue-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-3 rounded-full bg-hv-card-bg/80 border border-hv-card-border text-hv-text-secondary-maquette hover:text-hv-blue-accent hover:border-hv-blue-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
      >
        {videos.map((video) => (
          <div key={video._id} className="flex-none w-[280px]">
            <Link to={`/article/${video.slug?.current || '#'}`} className="group h-full block">
              <div className="h-full bg-hv-card-bg rounded-xl border border-hv-card-border overflow-hidden transition-all duration-300 hover:border-hv-blue-accent">
                <div className="relative aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={urlFor(video.mainImage)}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hv-card-bg/90 via-hv-card-bg/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-hv-card-bg/80 backdrop-blur-sm flex items-center justify-center border-2 border-hv-blue-accent transform transition-all duration-300 group-hover:scale-110 group-hover:border-hv-text-white">
                      <Play className="w-6 h-6 text-hv-blue-accent group-hover:text-hv-text-white transition-colors" fill="currentColor" />
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold tracking-tighter leading-tight mb-2 text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.excerpt && (
                    <p className="text-hv-text-secondary-maquette text-sm line-clamp-3 mb-3">{video.excerpt}</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};export default AmuseBoucheSection;


