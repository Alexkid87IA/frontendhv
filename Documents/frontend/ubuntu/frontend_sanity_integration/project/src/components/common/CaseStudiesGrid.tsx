import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  image: string;
  tag: string;
  summary: string;
}

interface CaseStudiesGridProps {
  studies: CaseStudy[];
}

export const CaseStudiesGrid = ({ studies }: CaseStudiesGridProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {studies.map((study, index) => (
        <motion.div
          key={study.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group h-full"
        >
          <Link to={`/case-study/${study.slug}`} className="block h-full">
            <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2 h-full flex flex-col">
              {/* Pure Image Section - Fixed Aspect Ratio */}
              <div className="aspect-[16/9] w-full flex-shrink-0">
                <img
                  src={study.image}
                  alt={study.company}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content Section - Flex Grow to Fill Space */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold group-hover:text-accent-fuchsia transition-colors">
                    {study.company}
                  </h3>
                  <span className="px-3 py-1 bg-accent-violet/20 text-accent-violet rounded-full text-sm">
                    {study.tag}
                  </span>
                </div>

                <p className="text-tertiary">
                  {study.summary}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};