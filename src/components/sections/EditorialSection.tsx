import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Briefcase, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';

export const EditorialSection = () => {
  return (
    <section className="container py-20">
      <SectionHeader
        title="Explorer les univers éditoriaux"
        subtitle="Plongez dans nos thématiques phares"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Story",
            icon: BookOpen,
            tag: "Récits",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
            excerpt: "Des parcours inspirants qui redéfinissent le possible",
            link: "/rubrique/story",
            gradient: "from-amber-500 to-orange-500",
            overlayGradient: "from-amber-900/80 via-black/50 to-transparent"
          },
          {
            title: "Business",
            icon: Briefcase,
            tag: "Innovation",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
            excerpt: "Les nouvelles frontières de l'entrepreneuriat",
            link: "/rubrique/business",
            gradient: "from-blue-500 to-cyan-500",
            overlayGradient: "from-blue-900/80 via-black/50 to-transparent"
          },
          {
            title: "Mental",
            icon: Brain,
            tag: "Psychologie",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
            excerpt: "Développer une psychologie de champion",
            link: "/rubrique/mental",
            gradient: "from-purple-500 to-violet-500",
            overlayGradient: "from-purple-900/80 via-black/50 to-transparent"
          },
          {
            title: "Society",
            icon: Users,
            tag: "Culture",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
            excerpt: "Décrypter les mutations de notre époque",
            link: "/rubrique/society",
            gradient: "from-emerald-500 to-teal-500",
            overlayGradient: "from-emerald-900/80 via-black/50 to-transparent"
          }
        ].map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <Link to={category.link} className="block">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700 ease-out">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.overlayGradient} opacity-80`} />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Glass Effect Card */}
                <div className="absolute inset-x-0 bottom-0 p-8 backdrop-blur-sm">
                  {/* Category Tag */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-white border border-white/20">
                      {category.tag}
                    </span>
                  </div>
                  
                  {/* Title & Description */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-500">
                      {category.title}
                    </h3>
                    
                    <p className="text-white/80 text-sm leading-relaxed">
                      {category.excerpt}
                    </p>

                    {/* Call to Action */}
                    <div className="pt-4 flex items-center gap-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70">
                      <span className="font-medium">Explorer l'univers</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorialSection;