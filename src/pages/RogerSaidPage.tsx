import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { ArticleCard } from '../components/common/ArticleCard';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { CategoryFilter } from '../components/common/CategoryFilter';
import { AuthorBox } from '../components/common/AuthorBox';
import { ShareButtons } from '../components/common/ShareButtons';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

// Types de contenu
const contentTypes = [
  { id: 'all', name: 'Tous les contenus' },
  { id: 'tribune', name: 'Tribunes' },
  { id: 'lettre', name: 'Lettres' },
  { id: 'edito', name: 'Éditos' }
];

export const RogerSaidPage = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [latestEditorial] = useState({
    title: "La Tribune de Roger",
    quote: "L'innovation est la clé du progrès",
  });

  return (
    <>
      <SEO {...staticSEO.rogerSaid} />
      <div className="pb-20">
        <header className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Roger a dit</h1>
          <p className="text-xl text-gray-600">Les tribunes et réflexions de Roger Ormières</p>
        </header>

        {/* Latest Editorial */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="container mb-20"
          aria-labelledby="latest-editorial"
        >
          <h2 id="latest-editorial" className="sr-only">Dernière tribune</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ArticleCard {...latestEditorial} />
            <div className="space-y-8">
              <QuoteBlock
                quote={latestEditorial.quote}
                author="Roger Ormières"
              />
              <div>
                <h3 className="text-lg font-semibold mb-4">Partager cette tribune</h3>
                <ShareButtons title={latestEditorial.title} compact />
              </div>
            </div>
          </div>
        </motion.section>

        <section className="container mb-20">
          <CategoryFilter
            categories={contentTypes}
            selectedCategory={selectedType}
            onSelect={setSelectedType}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {/* Article cards would be mapped here */}
          </div>
        </section>

        <section className="container mb-20">
          <AuthorBox
            name="Roger Ormières"
            bio="Entrepreneur et visionnaire dans le domaine de l'innovation"
          />
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container">
            <NewsletterForm />
          </div>
        </section>
      </div>
    </>
  );
};