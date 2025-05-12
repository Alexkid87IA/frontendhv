import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, TrendingUp, Target, Globe, Shield, Zap } from 'lucide-react';

const businessIdeas = [
  {
    title: "SaaS IA pour PME",
    category: "Tech/IA",
    description: "Solution d'automatisation intelligente pour les PME",
    metrics: [
      { icon: Globe, value: '€5B', label: 'Marché EU' },
      { icon: TrendingUp, value: '45%', label: 'Croissance' }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    link: "/business-idea/saas-ia-pme"
  },
  {
    title: "Marketplace Impact",
    category: "GreenTech",
    description: "Place de marché dédiée aux produits éco-responsables",
    metrics: [
      { icon: Users, value: '120M', label: 'Clients' },
      { icon: Shield, value: '35%', label: 'Marge' }
    ],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
    link: "/business-idea/marketplace-impact"
  },
  {
    title: "EdTech Métavers",
    category: "Education",
    description: "Formation professionnelle en réalité virtuelle",
    metrics: [
      { icon: Target, value: '€8B', label: 'Marché' },
      { icon: Zap, value: '85%', label: 'Rétention' }
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    link: "/business-idea/edtech-metavers"
  }
];

export const HomeBusinessIdeasSection = () => {
  return (
    <section className="container py-20">
      <div className="flex justify-between items-end mb-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
          >
            Opportunités 2025
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Business Ideas
          </h2>
          <p className="text-tertiary text-lg">
            Les opportunités business à fort potentiel pour 2025
          </p>
        </div>
        <Link
          to="/business-ideas"
          className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <span>Toutes les opportunités</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {businessIdeas.map((idea, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <Link to={idea.link}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                  <span className="text-white font-medium">{idea.category}</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {idea.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <metric.icon size={16} className="text-accent-violet" />
                        <div>
                          <div className="text-sm font-bold text-white">{metric.value}</div>
                          <div className="text-xs text-gray-300">{metric.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-accent-fuchsia transition-colors">
                {idea.title}
              </h3>
              
              <p className="text-tertiary mb-4">
                {idea.description}
              </p>

              <span className="inline-flex items-center gap-2 text-accent-fuchsia group-hover:text-accent-cyan transition-colors">
                <span>Explorer l'opportunité</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};