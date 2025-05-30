import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Download, Presentation } from 'lucide-react';

const resources = [
  {
    type: "Guide",
    icon: BookOpen,
    title: "Guide du Scaling",
    description: "Les étapes clés pour passer de startup à scale-up",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-purple-500/20 to-purple-900/20"
  },
  {
    type: "Template",
    icon: FileText,
    title: "Business Model Canvas",
    description: "Template pour structurer votre modèle d'affaires",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-blue-500/20 to-blue-900/20"
  },
  {
    type: "Checklist",
    icon: Download,
    title: "Due Diligence",
    description: "Checklist pour préparer une levée de fonds",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-pink-500/20 to-pink-900/20"
  },
  {
    type: "Présentation",
    icon: Presentation,
    title: "Pitch Deck Template",
    description: "Structure et conseils pour votre pitch investisseurs",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
    link: "#",
    color: "from-cyan-500/20 to-cyan-900/20"
  }
];

export const BusinessResourcesSection = () => {
  return (
    <section className="container mb-20">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-neutral-800 text-accent-fuchsia text-sm font-medium mb-4">
          Ressources
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Outils et templates
        </h2>
        <p className="text-lg text-tertiary max-w-2xl mx-auto font-light">
          Des ressources pratiques pour vous aider à développer votre business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative bg-neutral-900 rounded-3xl p-6 h-full flex flex-col transition-transform duration-500 group-hover:-translate-y-2">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center mb-6">
                <item.icon size={24} className="text-accent-fuchsia" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-sm text-accent-fuchsia font-medium">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-1 group-hover:text-accent-fuchsia transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-tertiary mb-4">
                  {item.description}
                </p>
              </div>

              {/* Image & Link */}
              <div className="mt-auto">
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <Link
                  to={item.link}
                  className="inline-flex items-center gap-2 text-sm text-accent-fuchsia group-hover:text-accent-cyan transition-colors"
                >
                  <span>Télécharger</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};