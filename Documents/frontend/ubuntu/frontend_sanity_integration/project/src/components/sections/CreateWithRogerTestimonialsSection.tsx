import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

const testimonialVideos = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    title: "De cadre à entrepreneur",
    author: "Marie Laurent",
    role: "Fondatrice & CEO",
    company: "TechInno",
    duration: "3:24",
    videoUrl: "https://www.youtube.com/watch?v=example1"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    title: "Pivot et réinvention",
    author: "Thomas Dubois",
    role: "Entrepreneur Tech",
    company: "DigitalFlow",
    duration: "2:56",
    videoUrl: "https://www.youtube.com/watch?v=example2"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    title: "Leadership authentique",
    author: "Sophie Bernard",
    role: "Directrice Marketing",
    company: "GrowthLab",
    duration: "4:12",
    videoUrl: "https://www.youtube.com/watch?v=example3"
  }
];

export const CreateWithRogerTestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-neutral-900 py-20">
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
            >
              Témoignages
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold"
            >
              Ils parlent de leur transformation
            </motion.h2>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Précédent"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
              aria-label="Suivant"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonialVideos.map((video, index) => (
              <div key={video.id} className="min-w-0 flex-[0_0_280px] sm:flex-[0_0_320px] md:flex-[0_0_360px] pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-[9/16] bg-neutral-800 rounded-xl overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-violet"
                      >
                        <Play size={24} className="text-white ml-1" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                      <p className="text-sm text-accent-violet mb-1">{video.duration}</p>
                      <h3 className="text-lg font-bold mb-1 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center gap-2">
                        <img
                          src={video.thumbnail}
                          alt={video.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">{video.author}</p>
                          <p className="text-xs text-tertiary">{video.role} · {video.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};