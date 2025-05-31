import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { getAmuseBouches } from "../../utils/sanityAPI";
import type { SanityArticle } from "../../pages/ArticlePage";
import { urlFor } from "../../utils/sanityImage";
import SafeImage from "../common/SafeImage";
import ErrorBoundary from "../common/ErrorBoundary";

const AmuseBoucheSection = ({
  title = "Amuses-bouches",
  description = "Des conseils percutants en format court",
}: {
  title?: string;
  description?: string;
}) => {
  const [videos, setVideos] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchAmuseBouches = async () => {
      try {
        setIsLoading(true);
        const amuseBouchesData = await getAmuseBouches(10);
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
      setCanScrollLeft(scrollLeft > 5);
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
    return <div className="container mx-auto px-4 py-10 text-center text-hv-text-primary-maquette">
      <p>Chargement des amuses-bouches...</p>
    </div>;
  }

  if (!videos.length) {
    return null;
  }

  return (
    <ErrorBoundary>
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-4">
            Format court
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -top-20 right-0 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Videos Grid */}
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-none w-[280px]"
              >
                <Link to={`/article/${video.slug?.current || '#'}`} className="block group">
                  <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-accent-blue/30">
                    <div className="relative aspect-[9/16] w-full overflow-hidden">
                      <SafeImage
                        image={video.mainImage}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        fallbackText={video.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 bg-accent-blue/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-accent-blue transform transition-all duration-300 group-hover:bg-accent-blue/40"
                        >
                          <Play className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-semibold tracking-tight leading-tight mb-2 text-white group-hover:text-accent-blue transition-colors line-clamp-2">
                        {video.title}
                      </h3>
                      {video.excerpt && (
                        <p className="text-gray-400 text-sm line-clamp-3">
                          {video.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default AmuseBoucheSection;

export { AmuseBoucheSection };