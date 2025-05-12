import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Building2, Users, TrendingUp, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { CategoryFilter } from '../components/common/CategoryFilter';
import { NewsletterForm } from '../components/common/NewsletterForm';

const categories = [
  { id: 'all', name: 'Toutes les études' },
  { id: 'fintech', name: 'Fintech' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'saas', name: 'SaaS' },
  { id: 'greentech', name: 'GreenTech' },
  { id: 'healthtech', name: 'HealthTech' }
];

const caseStudies = [
  {
    slug: 'qonto-scale',
    company: 'Qonto',
    title: 'Comment Qonto est devenue une licorne',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    stats: [
      { icon: Building2, value: '€5B', label: 'Valorisation' },
      { icon: Users, value: '300K+', label: 'Clients' },
      { icon: TrendingUp, value: '1000%', label: 'Croissance' }
    ],
    category: 'fintech',
    tags: ['Fintech', 'Scale-up', 'B2B'],
    summary: "De startup à leader européen de la finance d'entreprise en 5 ans"
  },
  {
    slug: 'back-market-success',
    company: 'Back Market',
    title: 'Back Market : Disruption du marché du reconditionné',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    stats: [
      { icon: Building2, value: '€5.1B', label: 'Valorisation' },
      { icon: Users, value: '6M+', label: 'Clients' },
      { icon: Target, value: '16', label: 'Pays' }
    ],
    category: 'ecommerce',
    tags: ['E-commerce', 'GreenTech', 'B2C'],
    summary: "Comment Back Market révolutionne le marché de l'électronique"
  },
  {
    slug: 'alan-innovation',
    company: 'Alan',
    title: "Alan : Réinventer l'assurance santé",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    stats: [
      { icon: Building2, value: '€1.4B', label: 'Valorisation' },
      { icon: Users, value: '300K+', label: 'Membres' },
      { icon: TrendingUp, value: '100%', label: 'Croissance/an' }
    ],
    category: 'healthtech',
    tags: ['HealthTech', 'InsurTech', 'B2B2C'],
    summary: "Une approche tech-first de l'assurance santé"
  }
];

export const SuccessStoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredStudies = caseStudies.filter(study => {
    const matchesCategory = selectedCategory === 'all' || study.category === selectedCategory;
    const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         study.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Success Stories | Études de cas d'entreprises innovantes"
        description="Découvrez les parcours exceptionnels d'entreprises innovantes à travers nos études de cas détaillées."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
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
              Success Stories
            </h1>
            <p className="text-tertiary text-lg max-w-3xl">
              Découvrez les parcours exceptionnels d'entreprises innovantes à travers nos études de cas détaillées.
            </p>
          </motion.header>

          {/* Filters */}
          <section className="container mb-12">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Rechercher une étude de cas..."
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
                  <option value="date">Plus récentes</option>
                  <option value="valuation">Valorisation</option>
                  <option value="growth">Croissance</option>
                </select>
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link to={`/case-study/${study.slug}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                      <img
                        src={study.image}
                        alt={study.company}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      
                      {/* Company Logo Placeholder */}
                      <div className="absolute top-4 left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                        <span className="font-bold text-white">{study.company}</span>
                      </div>

                      {/* Tags */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {study.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-4">
                        {study.stats.map((stat, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <stat.icon size={16} className="text-accent-violet" />
                            <div>
                              <div className="text-sm font-bold text-white">{stat.value}</div>
                              <div className="text-xs text-gray-300">{stat.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent-fuchsia transition-colors">
                      {study.title}
                    </h3>
                    
                    <p className="text-tertiary mb-4">
                      {study.summary}
                    </p>

                    <span className="inline-flex items-center gap-2 text-accent-fuchsia group-hover:text-accent-cyan transition-colors">
                      <span>Lire l'étude de cas</span>
                      <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </span>
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

export default SuccessStoriesPage;