import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';

export const EditorialSection = () => {
  return (
    <section className="container">
      <SectionHeader
        title="Explorer les univers éditoriaux"
        subtitle="Plongez dans nos thématiques phares"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Récits de vie",
            tag: "Récits",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
            excerpt: "Des parcours inspirants qui redéfinissent le possible",
            link: "/rubrique/story"
          },
          {
            title: "Business & innovation",
            tag: "Innovation",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
            excerpt: "Les nouvelles frontières de l'entrepreneuriat",
            link: "/rubrique/business"
          },
          {
            title: "Mental",
            tag: "Mental",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
            excerpt: "Développer une psychologie de champion",
            link: "/rubrique/mental"
          },
          {
            title: "Culture & société",
            tag: "Culture",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
            excerpt: "Décrypter les mutations de notre époque",
            link: "/rubrique/society"
          }
        ].map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <Link to={category.link}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-accent-violet text-white text-sm font-inter uppercase tracking-wider rounded-full mb-3">
                    {category.tag}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-tertiary">{category.excerpt}</p>
                </div>
              </div>
              <motion.span
                className="inline-flex items-center gap-2 text-accent-fuchsia group-hover:text-accent-cyan transition-colors"
                whileHover={{ x: 10 }}
              >
                <span>Voir la rubrique</span>
                <ArrowRight size={18} />
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EditorialSection;