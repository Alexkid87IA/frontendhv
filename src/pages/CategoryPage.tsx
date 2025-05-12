import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { ArticleCard } from '../components/common/ArticleCard';
import { CategoryFilter } from '../components/common/CategoryFilter';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Mock category data
const categories = {
  mindset: {
    title: "Mindset & Développement personnel",
    description: "Explorez les clés du développement personnel et les stratégies mentales des leaders d'aujourd'hui.",
    color: "bg-accent-violet",
  },
  recits: {
    title: "Récits inspirants",
    description: "Des histoires authentiques qui inspirent et transforment notre vision du possible.",
    color: "bg-accent-fuchsia",
  },
  culture: {
    title: "Culture & Société",
    description: "Décryptage des tendances et des mutations qui façonnent notre société.",
    color: "bg-accent-pink",
  },
  innovation: {
    title: "Innovation & Technologie",
    description: "Les dernières avancées et réflexions sur l'innovation qui transforme notre monde.",
    color: "bg-accent-cyan",
  },
};

const contentTypes = [
  { id: 'all', name: 'Tous les contenus' },
  { id: 'articles', name: 'Articles longs' },
  { id: 'capsules', name: 'Capsules' },
  { id: 'tribunes', name: 'Tribunes' },
  { id: 'podcasts', name: 'Podcasts' },
];

// Mock articles data
const generateMockArticles = (category: string) => {
  return Array.from({ length: 9 }, (_, i) => ({
    slug: `${category}-article-${i + 1}`,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80`,
    title: `${categories[category as keyof typeof categories]?.title} - Article ${i + 1}`,
    tag: category,
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    type: contentTypes[i % contentTypes.length].id,
  }));
};

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedType, setSelectedType] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const categoryData = categories[category as keyof typeof categories];
  const articles = generateMockArticles(category || '');
  
  const filteredArticles = selectedType === 'all'
    ? articles
    : articles.filter(article => article.type === selectedType);

  const paginatedArticles = filteredArticles.slice(0, page * itemsPerPage);
  const hasMore = paginatedArticles.length < filteredArticles.length;

  // Update document title for SEO
  React.useEffect(() => {
    if (categoryData) {
      document.title = `${categoryData.title} | Roger Ormières`;
    }
  }, [categoryData]);

  if (!categoryData) {
    return <div className="container py-20">Catégorie non trouvée</div>;
  }

  return (
    <div className="pb-20">
      {/* Category Header */}
      <motion.header
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container pt-12 pb-8"
      >
        <span className={`inline-block px-3 py-1 ${categoryData.color} text-white text-sm font-inter rounded-full mb-6`}>
          {categoryData.title}
        </span>
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold leading-tight mb-4">
          {categoryData.title}
        </h1>
        <p className="text-tertiary text-lg max-w-3xl">
          {categoryData.description}
        </p>
      </motion.header>

      {/* Content Type Filter */}
      <section className="container mb-12">
        <CategoryFilter
          categories={contentTypes}
          selectedCategory={selectedType}
          onSelect={setSelectedType}
        />
      </section>

      {/* Articles Grid */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="container"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ArticleCard {...article} />
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPage(p => p + 1)}
              className="px-8 py-3 bg-accent-violet hover:bg-accent-fuchsia text-white rounded-lg font-inter transition-colors"
            >
              Charger plus d'articles
            </motion.button>
          </div>
        )}
      </motion.section>

      {/* Newsletter */}
      <section className="container mt-20">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <NewsletterForm />
        </motion.div>
      </section>
    </div>
  );
};