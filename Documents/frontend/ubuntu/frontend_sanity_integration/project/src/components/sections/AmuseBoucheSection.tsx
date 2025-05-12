import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { getAmuseBouches } from "../../utils/sanityAPI"; // Adapter le chemin
import type { SanityArticle, SanityImage } from "../../pages/ArticlePage"; // Réutiliser les types

// Simuler urlFor pour l'instant, à remplacer par une vraie implémentation
const urlFor = (source: SanityImage | string | undefined): string => {
  if (!source) return "https://via.placeholder.com/280x498?text=Image+non+disponible";
  if (typeof source === "string") return source;
  // Vraie implémentation avec @sanity/image-url
  // Exemple: return `https://cdn.sanity.io/images/YOUR_PROJECT_ID/YOUR_DATASET/${source.asset._ref.replace("image-", "").replace("-jpg", ".jpg")}`;
  return "https://via.placeholder.com/280x498?text=Image+Sanity";
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
      // Attendre que les images soient potentiellement chargées pour un calcul correct
      const timeoutId = setTimeout(checkScrollButtons, 500);
      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollButtons);
        clearTimeout(timeoutId);
      };
    }
  }, [videos, isLoading]); // Recalculer si les vidéos ou l'état de chargement changent

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
    return <div className="container mx-auto px-4 py-10 text-center"><p>Chargement des amuses-bouches...</p></div>;
  }

  if (!videos.length) {
    return null; // Ne rien afficher si pas d'amuses-bouches
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tighter mb-2 text-white">{title}</h2>
          <p className="text-hv-white/80">{description}</p>
        </div>
        <div className="hidden sm:flex space-x-3">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-3 rounded-full bg-hv-dark/80 border border-hv-white/10 text-hv-white/80 hover:text-hv-white hover:border-hv-turquoise disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-3 rounded-full bg-hv-dark/80 border border-hv-white/10 text-hv-white/80 hover:text-hv-white hover:border-hv-turquoise disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
              <div className="h-full bg-hv-dark/30 backdrop-blur-sm rounded-xl border border-hv-white/10 overflow-hidden">
                <div className="relative aspect-[9/16] w-full overflow-hidden">
                  <img
                    src={urlFor(video.mainImage)}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-hv-dark/90 via-hv-dark/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-hv-dark/80 backdrop-blur-sm flex items-center justify-center border-2 border-hv-turquoise transform transition-all duration-300 group-hover:scale-110 group-hover:border-hv-blue">
                      <Play className="w-6 h-6 text-hv-turquoise group-hover:text-hv-blue transition-colors" fill="currentColor" />
                    </div>
                  </div>
                  
                  {/* Simuler une durée ou l'extraire si disponible dans Sanity Article */}
                  {/* <div className="absolute bottom-4 right-4 bg-hv-dark/90 backdrop-blur-sm px-3 py-1.5 text-sm font-medium rounded-lg border border-hv-white/10">
                    2:45 
                  </div> */}
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold tracking-tighter leading-tight mb-2 text-white group-hover:text-hv-turquoise transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  {video.excerpt && (
                    <p className="text-hv-white/80 text-sm line-clamp-3 mb-3">{video.excerpt}</p>
                  )}
                  {/* Simuler des vues ou les extraire si disponible */}
                  {/* <span className="text-sm text-hv-white/60">45K vues</span> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AmuseBoucheSection;


