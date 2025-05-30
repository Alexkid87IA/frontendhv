import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Building2, Users, TrendingUp, Target, Globe, Shield, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CategoryFilter } from '../components/common/CategoryFilter';
import { NewsletterForm } from '../components/common/NewsletterForm';

const categories = [
  { id: 'all', name: 'Toutes les opportunités' },
  { id: 'tech', name: 'Tech/IA' },
  { id: 'greentech', name: 'GreenTech' },
  { id: 'edtech', name: 'EdTech' },
  { id: 'fintech', name: 'FinTech' },
  { id: 'healthtech', name: 'HealthTech' }
];

const businessIdeas = [
  {
    slug: 'saas-ia-pme',
    title: "SaaS IA pour PME",
    category: "tech",
    description: "Solution d'automatisation intelligente pour les PME",
    metrics: [
      { icon: Globe, value: '€5B', label: 'Marché EU' },
      { icon: TrendingUp, value: '45%', label: 'Croissance' }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    tags: ['IA', 'SaaS', 'Automatisation'],
    investment: '€500K - €1M',
    summary: "Une solution SaaS basée sur l'IA pour automatiser les processus métier des PME"
  },
  {
    slug: 'marketplace-impact',
    title: "Marketplace Impact",
    category: "greentech",
    description: "Place de marché dédiée aux produits éco-responsables",
    metrics: [
      { icon: Users, value: '120M', label: 'Clients' },
      { icon: Shield, value: '35%', label: 'Marge' }
    ],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80",
    tags: ['E-commerce', 'Impact', 'Développement Durable'],
    investment: '€750K - €1.5M',
    summary: "Une marketplace qui connecte les consommateurs responsables aux marques éco-engagées"
  },
  {
    slug: 'edtech-metavers',
    title: "EdTech Métavers",
    category: "edtech",
    description: "Formation professionnelle en réalité virtuelle",
    metrics: [
      { icon: Target, value: '€8B', label: 'Marché' },
      { icon: Zap, value: '85%', label: 'Rétention' }
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
    tags: ['VR/AR', 'Formation', 'Métavers'],
    investment: '€1M - €2M',
    summary: "Plateforme de formation immersive utilisant la réalité virtuelle pour maximiser l'engagement"
  }
];

export const BusinessIdeasPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('market');

  const filteredIdeas = businessIdeas.filter(idea => {
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Opportunités Business 2025 | Idées à fort potentiel"
        description="Découvrez les opportunités business à fort potentiel pour 2025. Analyses détaillées, métriques clés et guides de mise en œuvre."
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
      />
      <div className="relative">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-primary">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Content */}
        <div className="relative pb-20">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container pt-48 pb-8"
          >
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold leading-tight mb-4">
              Opportunités Business 2025
            </h1>
            <p className="text-tertiary text-lg max-w-3xl">
              Explorez les opportunités business à fort potentiel pour 2025, avec analyses détaillées et guides de mise en œuvre.
            </p>
          </motion.header>

          {/* Filters */}
          <section className="container mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher une opportunité..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 pl-10 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={18} />
              </div>

              {/* Categories */}
              <div className="flex-1">
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-tertiary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-neutral-900/30 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-2 text-secondary focus:outline-none focus:border-accent-violet"
                >
                  <option value="market">Taille de marché</option>
                  <option value="investment">Investissement</option>
                  <option value="growth">Croissance</option>
                </select>
              </div>
            </div>
          </section>

          {/* Ideas Grid */}
          <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredIdeas.map((idea, index) => (
                <motion.div
                  key={idea.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link to={`/business-idea/${idea.slug}`}>
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

                      <div className="absolute top-4 right-4 flex gap-2">
                        {idea.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
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

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-accent-violet">
                        Investissement: {idea.investment}
                      </span>
                      <span className="inline-flex items-center gap-2 text-accent-fuchsia group-hover:text-accent-cyan transition-colors">
                        <span>Explorer</span>
                        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Newsletter */}
          <section className="container mt-20">
            <NewsletterForm />
          </section>
        </div>
      </div>
    </>
  );
};

export default BusinessIdeasPage;