import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Briefcase, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';

export const EditorialSection = () => {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-12 border border-white/10">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Explorer les univers
              <span className="bg-gradient-to-r from-accent-blue to-accent-turquoise bg-clip-text text-transparent"> éditoriaux</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Plongez dans nos thématiques phares et découvrez des contenus qui inspirent, éduquent et transforment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Récits de vie",
                icon: BookOpen,
                tag: "Récits",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
                excerpt: "Des parcours inspirants qui redéfinissent le possible",
                link: "/rubrique/recits",
                gradient: "from-accent-blue to-accent-turquoise"
              },
              {
                title: "Business & innovation",
                icon: Briefcase,
                tag: "Innovation",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
                excerpt: "Les nouvelles frontières de l'entrepreneuriat",
                link: "/rubrique/business",
                gradient: "from-accent-blue to-accent-turquoise"
              },
              {
                title: "Mental",
                icon: Brain,
                tag: "Psychologie",
                image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
                excerpt: "Développer une psychologie de champion",
                link: "/rubrique/mental",
                gradient: "from-accent-blue to-accent-turquoise"
              },
              {
                title: "Culture & société",
                icon: Users,
                tag: "Culture",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
                excerpt: "Décrypter les mutations de notre époque",
                link: "/rubrique/culture",
                gradient: "from-accent-blue to-accent-turquoise"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link 
                  to={category.link} 
                  className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 h-full"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
                      {category.tag}
                    </div>
                  </div>

                  <div className="flex gap-4 items-start mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <category.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {category.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-accent-blue group-hover:text-accent-turquoise transition-colors">
                    <span className="font-medium">Explorer</span>
                    <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;