import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Users, Star, Trophy, Sparkles } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ArticleCard } from '../components/common/ArticleCard';
import { CategoryFilter } from '../components/common/CategoryFilter';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { VideoCard } from '../components/common/VideoCard';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Articles mis en avant
const featuredArticles = [
  {
    slug: 'success-story-startup',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80',
    title: "De 0 à 1M€ : L'histoire d'une startup française",
    tag: "Success Story",
    summary: "Le parcours inspirant d'une jeune entreprise qui a su s'imposer sur son marché."
  },
  {
    slug: 'reconversion-reussie',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80',
    title: "Changer de vie à 40 ans",
    tag: "Parcours",
    summary: "Comment une reconversion professionnelle peut devenir un nouveau départ."
  },
  {
    slug: 'innovation-sociale',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    title: "Entreprendre pour le bien commun",
    tag: "Impact",
    summary: "Ces entrepreneurs qui concilient business et impact social."
  }
];

// Dernières vidéos
const latestVideos = [
  {
    title: "De cadre à entrepreneur",
    guest: "Pierre Martin",
    duration: "48 min",
    date: "2024-03-15",
    thumbnail: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example1",
    articleSlug: "cadre-entrepreneur"
  },
  {
    title: "Réinventer son business",
    guest: "Marie Dubois",
    duration: "42 min",
    date: "2024-03-10",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    videoUrl: "https://youtube.com/watch?v=example2",
    articleSlug: "reinventer-business"
  }
];

// Types de récits
const storyTypes = [
  {
    icon: Star,
    title: "Success Stories",
    description: "Des parcours exceptionnels qui inspirent."
  },
  {
    icon: Users,
    title: "Portraits",
    description: "À la rencontre d'entrepreneurs passionnés."
  },
  {
    icon: Trophy,
    title: "Réussites",
    description: "Des victoires qui donnent espoir."
  },
  {
    icon: Sparkles,
    title: "Transformations",
    description: "Des changements de vie inspirants."
  }
];

export const StoryPage = () => {
  return (
    <>
      <SEO
        title="Story | Histoires inspirantes et parcours d'exception"
        description="Des histoires authentiques qui redéfinissent le possible. Découvrez des parcours inspirants, des success stories et des transformations remarquables."
        image="https://26.staticbtf.eno.do/v1/28-default/edcc5f103e7a372373a37d5b076cbb95/media.jpg"
      />
      <div className="pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-40">
          <div className="absolute inset-0">
            <img
              src="https://26.staticbtf.eno.do/v1/28-default/edcc5f103e7a372373a37d5b076cbb95/media.jpg"
              alt="Story"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
            {/* Sophisticated background effects */}
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
              Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-6 max-w-3xl">
              Des histoires qui inspirent et transforment
            </h1>
            <p className="text-xl text-tertiary max-w-2xl mb-8">
              Découvrez des parcours authentiques qui redéfinissent le possible et inspirent l'action.
            </p>
          </motion.div>
        </section>

        {/* Story Types Section */}
        <section className="container py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900 p-6 rounded-xl"
              >
                <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
                  <type.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-tertiary">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="container mb-20">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Histoires à la une</h2>
              <p className="text-tertiary">Des parcours qui marquent les esprits</p>
            </div>
            <Link
              to="/articles"
              className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
            >
              <span>Toutes les histoires</span>
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
                <ArticleCard {...article} />
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
            quote="Chaque histoire est unique, mais toutes partagent une même vérité : le changement commence par l'audace d'agir."
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

export default StoryPage;