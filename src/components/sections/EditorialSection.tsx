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
            gradient: "from-amber-500/20 to-orange-500/20"
          },
          {
            title: "Business",
            icon: Briefcase,
            tag: "Innovation",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
            excerpt: "Les nouvelles frontières de l'entrepreneuriat",
            link: "/rubrique/business",
            gradient: "from-blue-500/20 to-cyan-500/20"
          },
          {
            title: "Mental",
            icon: Brain,
            tag: "Psychologie",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
            excerpt: "Développer une psychologie de champion",
            link: "/rubrique/mental",
            gradient: "from-purple-500/20 to-violet-500/20"
          },
          {
            title: "Society",
            icon: Users,
            tag: "Culture",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
            excerpt: "Décrypter les mutations de notre époque",
            link: "/rubrique/society",
            gradient: "from-emerald-500/20 to-teal-500/20"
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
            <Link to={category.link}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white/80">
                      {category.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent-blue transition-colors">
                    {category.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm line-clamp-2">
                    {category.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-accent-blue group-hover:text-accent-cyan transition-colors">
                <span>Explorer</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorialSection;