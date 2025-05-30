import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Target, Calendar, Clock, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ShareButtons } from '../components/common/ShareButtons';
import { QuoteBlock } from '../components/common/QuoteBlock';
import { ArticleCard } from '../components/common/ArticleCard';
import { NewsletterForm } from '../components/common/NewsletterForm';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Mock data for case studies
const caseStudies = {
  'qonto-scale': {
    company: 'Qonto',
    title: 'Comment Qonto est devenue une licorne',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    stats: [
      { icon: Building2, value: '€5B', label: 'Valorisation' },
      { icon: Users, value: '300K+', label: 'Clients' },
      { icon: TrendingUp, value: '1000%', label: 'Croissance' }
    ],
    tags: ['Fintech', 'Scale-up', 'B2B'],
    summary: "De startup à leader européen de la finance d'entreprise en 5 ans",
    content: `
# L'ascension de Qonto

## Les débuts
Fondée en 2016 par Steve Anavi et Alexandre Prot, Qonto est née d'une frustration : la complexité de la gestion bancaire pour les entreprises.

## La stratégie
- Focus sur l'expérience utilisateur
- Développement produit itératif
- Expansion européenne maîtrisée

## Les chiffres clés
- 300 000+ clients professionnels
- Présence dans 4 pays européens
- Plus de 1000 employés

## Les facteurs de succès
1. Une vision claire du marché
2. Une équipe de haut niveau
3. Une exécution sans faille
4. Un timing parfait
    `,
    quote: {
      text: "La clé de notre succès ? Une obsession constante pour l'expérience client.",
      author: "Alexandre Prot, CEO de Qonto"
    },
    publishDate: "2024-03-15",
    readTime: "10 min",
    relatedCases: [
      {
        slug: 'alan-innovation',
        title: "Alan : Réinventer l'assurance santé",
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
        tag: 'HealthTech',
        summary: "Une approche tech-first de l'assurance santé"
      }
    ]
  }
};

export const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies[slug as keyof typeof caseStudies];

  if (!study) {
    return (
      <div className="container py-20">
        <h1>Étude de cas non trouvée</h1>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${study.title} | Étude de cas`}
        description={study.summary}
        image={study.image}
      />
      <div className="relative pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center pt-40">
          <div className="absolute inset-0">
            <img
              src={study.image}
              alt={study.title}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
          </div>
          
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="container relative z-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-accent-violet text-white text-sm font-medium rounded-full">
                Étude de cas
              </span>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="font-bold text-white">{study.company}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold leading-tight mb-6">
              {study.title}
            </h1>
            
            <p className="text-xl text-tertiary max-w-2xl mb-8">
              {study.summary}
            </p>

            <div className="flex flex-wrap gap-8">
              {study.stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <stat.icon size={24} className="text-accent-violet" />
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-tertiary">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Content */}
        <motion.article
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="container mt-20"
        >
          <div className="max-w-3xl mx-auto">
            {/* Meta Info */}
            <div className="flex items-center gap-6 text-tertiary mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <time dateTime={study.publishDate}>
                  {new Date(study.publishDate).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{study.readTime} de lecture</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-8">
              {study.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg prose-headings:font-montserrat prose-headings:font-bold prose-p:text-secondary/90 prose-a:text-accent-fuchsia hover:prose-a:text-accent-cyan prose-strong:text-white mb-12">
              {study.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('#')) {
                  const level = paragraph.match(/^#+/)?.[0].length || 1;
                  const text = paragraph.replace(/^#+\s/, '');
                  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
                  return <HeadingTag key={index}>{text}</HeadingTag>;
                }
                if (paragraph.startsWith('-')) {
                  return (
                    <ul key={index}>
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith('1.')) {
                  return (
                    <ol key={index}>
                      {paragraph.split('\n').map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Quote */}
            <div className="mb-12">
              <QuoteBlock
                quote={study.quote.text}
                author={study.quote.author}
              />
            </div>

            {/* Share */}
            <div className="mb-12">
              <h3 className="text-lg font-semibold mb-4">Partager cette étude de cas</h3>
              <ShareButtons title={study.title} />
            </div>
          </div>
        </motion.article>

        {/* Related Case Studies */}
        <section className="container mt-20">
          <h2 className="text-2xl font-bold mb-8">Études de cas similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {study.relatedCases.map((relatedCase, index) => (
              <ArticleCard key={index} {...relatedCase} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="container mt-20">
          <NewsletterForm />
        </section>
      </div>
    </>
  );
};

export default CaseStudyPage;