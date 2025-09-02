import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const videoCapsules = [
  {
    title: "Le secret de la motivation",
    duration: "3 min",
    date: "2024-03-19",
    thumbnail: "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/shorts/example1"
  },
  // ... autres capsules
];

export const EmissionsCapsuleSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 3
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="container mb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Capsules vidéo</h2>
        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            className="p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
            aria-label="Précédent"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="p-2 rounded-full bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors"
            aria-label="Suivant"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {videoCapsules.map((capsule, index) => (
            <div key={index} className="min-w-0 flex-[0_0_33.33%] pl-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="aspect-[9/16] bg-neutral-900/30 backdrop-blur-sm rounded-lg overflow-hidden border border-white/5"
              >
                <a
                  href={capsule.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-full group"
                >
                  <img
                    src={capsule.thumbnail}
                    alt={capsule.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-violet"
                    >
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-lg font-bold mb-2">{capsule.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-tertiary">
                      <span>{capsule.duration}</span>
                      <time dateTime={capsule.date}>
                        {new Date(capsule.date).toLocaleDateString('fr-FR', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};