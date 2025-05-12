import React from 'react';
import { motion } from 'framer-motion';
import { ArticleCard } from '../common/ArticleCard';

// Articles enrichis avec plus de métadonnées
const articles = [
  {
    slug: 'innovation-frugale-2024',
    title: "L'innovation frugale : une nécessité pour 2024",
    excerpt: "Dans un monde en mutation, l'innovation frugale redéfinit les règles du jeu entrepreneurial.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    category: "innovation",
    readTime: "8 min",
    date: "2024-03-15",
    author: {
      name: "Roger Ormières",
      image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj"
    },
    featured: true,
    views: 1250,
    tags: ["innovation", "entrepreneuriat", "stratégie"]
  },
  {
    slug: 'mindset-entrepreneur',
    title: "Cultiver un mindset d'entrepreneur",
    excerpt: "Les clés psychologiques qui font la différence entre réussite et échec.",
    image: "https://images.unsplash.com/photo-1507099985735-0016e4366d2e?auto=format&fit=crop&q=80",
    category: "mindset",
    readTime: "6 min",
    date: "2024-03-14",
    author: {
      name: "Marie Lambert",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    featured: false,
    views: 980,
    tags: ["mindset", "développement personnel", "leadership"]
  },
  {
    slug: 'tech-ethique',
    title: "Tech éthique : Les nouveaux défis",
    excerpt: "Comment concilier innovation technologique et responsabilité sociale ?",
    image: "https://images.unsplash.com/photo-1518107616985-bd48230d3b20?auto=format&fit=crop&q=80",
    category: "tech",
    readTime: "10 min",
    date: "2024-03-13",
    author: {
      name: "Thomas Martin",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
    },
    featured: true,
    views: 1500,
    tags: ["technologie", "éthique", "innovation"]
  }
];

interface ArticlesGridSectionProps {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  bookmarkedArticles: string[];
  onBookmark: (slug: string) => void;
}

export const ArticlesGridSection = ({
  searchTerm,
  selectedCategory,
  sortBy,
  bookmarkedArticles,
  onBookmark
}: ArticlesGridSectionProps) => {
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.views - a.views;
  });

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
      }}
      className="container"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            onBookmark={onBookmark}
            isBookmarked={bookmarkedArticles.includes(article.slug)}
          />
        ))}
      </div>
    </motion.section>
  );
};