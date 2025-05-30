import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CaseStudiesGrid, type CaseStudy } from '../common/CaseStudiesGrid';

const caseStudies: CaseStudy[] = [
  {
    slug: 'qonto-scale',
    company: 'Qonto',
    title: 'Comment Qonto est devenue une licorne',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    tag: 'Fintech',
    summary: "De startup à leader européen de la finance d'entreprise"
  },
  {
    slug: 'back-market-success',
    company: 'Back Market',
    title: 'Back Market : Disruption du reconditionné',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
    tag: 'E-commerce',
    summary: "Leader européen du reconditionné"
  },
  {
    slug: 'alan-innovation',
    company: 'Alan',
    title: "Alan : Réinventer l'assurance santé",
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
    tag: 'HealthTech',
    summary: "Une approche tech-first de l'assurance"
  }
];

export const HomeCaseStudiesSection = () => {
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
            Success Stories
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Parcours d'exception
          </h2>
          <p className="text-tertiary text-lg">
            Découvrez les parcours exceptionnels d'entreprises innovantes
          </p>
        </div>
        <Link
          to="/success-stories"
          className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <span>Toutes les success stories</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <CaseStudiesGrid studies={caseStudies} />
    </section>
  );
};