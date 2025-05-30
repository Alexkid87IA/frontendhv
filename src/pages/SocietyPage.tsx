import React from 'react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Lightbulb, Target } from 'lucide-react';
import { ArticleCard } from '../components/common/ArticleCard';
import { VideoCard } from '../components/common/VideoCard';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const societyDomains = [
  {
    icon: Globe,
    title: "Mutations sociales",
    description: "Les transformations qui façonnent notre époque."
  },
  {
    icon: Users,
    title: "Communautés",
    description: "Les nouveaux modes d'organisation collective."
  },
  {
    icon: Lightbulb,
    title: "Innovation sociale",
    description: "Les solutions aux défis contemporains."
  },
  {
    icon: Target,
    title: "Impact",
    description: "Les initiatives qui changent la donne."
  }
];

const featuredArticles = [
  {
    slug: 'innovation-sociale-2024',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
    title: "L'innovation sociale en 2024",
    tag: "Société",
    summary: "Comment les initiatives citoyennes transforment nos sociétés."
  },
  {
    slug: 'communautes-digitales',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    title: "L'essor des communautés digitales",
    tag: "Digital",
    summary: "Les nouveaux modes d'organisation sociale à l'ère numérique."
  },
  {
    slug: 'impact-social',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    title: "Mesurer l'impact social",
    tag: "Impact",
    summary: "Les méthodes pour évaluer et maximiser l'impact social."
  }
];

const latestVideos = [
  {
    title: "Les nouveaux modèles sociaux",
    guest: "Marie Lambert",
    duration: "45 min",
    date: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example1",
    articleSlug: "nouveaux-modeles-sociaux"
  },
  {
    title: "Innovation sociale et technologie",
    guest: "Thomas Martin",
    duration: "38 min",
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    articleSlug: "innovation-sociale-tech"
  }
];

export const SocietyPage = () => {
  return (
    <>
      <SEO
        title="Society | Décryptage des mutations contemporaines"
        description="Explorez les transformations sociales et les initiatives qui façonnent notre société. Analyses, débats et solutions pour les défis contemporains."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
      />
      <div className="pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-40">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
              alt="Society"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.15),transparent_50%)]" />
            <div className="absolute inset-0 backdrop-blur-[100px]" />
          </div>
          
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="container relative z-10"
          >
            <span className="inline-block px-4 py-2 bg-accent-violet text-white text-sm font-medium rounded-full mb-6">
              Society
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-6 max-w-3xl">
              Décryptez les mutations de notre époque
            </h1>
            <p className="text-xl text-tertiary max-w-2xl mb-8">
              Explorez les transformations sociales et les initiatives qui façonnent notre société contemporaine.
            </p>
          </motion.div>
        </section>

        {/* Domains Section */}
        <section className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {societyDomains.map((domain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900 p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
                  <domain.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{domain.title}</h3>
                <p className="text-tertiary">{domain.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="container mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Articles à la une</h2>
              <p className="text-tertiary">Les analyses sociétales du moment</p>
            </div>
            <Link
              to="/articles"
              className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
            >
              <span>Tous les articles</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ArticleCard article={{
                  title: article.title,
                  slug: { current: article.slug },
                  mainImage: article.image,
                  excerpt: article.summary,
                  categories: [{ _id: "1", title: article.tag }]
                }} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Videos */}
        <section className="container mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Dernières vidéos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <VideoCard {...video} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="container mb-20">
          <QuoteBlock
            quote="Les transformations sociales ne sont pas des accidents de l'histoire, mais le résultat de nos choix collectifs."
            author="Roger Ormières"
          />
        </section>

        {/* Newsletter */}
        <section className="container">
          <NewsletterForm />
        </section>
      </div>
    </>
  );
};

export default SocietyPage;