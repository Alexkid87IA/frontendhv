import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Target, Calendar, Clock } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { NewsletterForm } from '../components/common/NewsletterForm';
import { ArticleProgress } from '../components/sections/ArticleProgress';
import ArticleContent from '../components/sections/ArticleContent';
import { ShareButtons } from '../components/common/ShareButtons';
import { RelatedArticles } from '../components/sections/RelatedArticles';

const businessIdea = {
  slug: 'saas-ia-sales',
  title: "SaaS d'IA pour la vente B2B",
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80',
  category: 'SaaS/IA',
  metrics: [
    { icon: Building2, value: '€8.5B', label: 'Marché Global' },
    { icon: TrendingUp, value: '45%', label: 'CAGR' },
    { icon: Target, value: '89%', label: 'Marge brute' }
  ],
  opportunity: "L'IA révolutionne la prospection et la qualification des leads B2B",
  content: `
# L'opportunité en détail

## Le marché

Le marché des solutions d'IA pour la vente B2B connaît une croissance explosive, portée par plusieurs facteurs clés :

- La digitalisation accélérée des processus de vente
- Le besoin d'automatisation intelligente
- La recherche d'efficacité dans la prospection

### Taille et croissance
- Marché global : €8.5B
- CAGR : 45%
- Europe : 30% du marché

### Segments clés
- Grands comptes : 40%
- Mid-market : 35%
- PME : 25%

## La solution

### Proposition de valeur
- Automatisation de la prospection
- Qualification intelligente des leads
- Personnalisation à grande échelle
- Intégration avec les CRM existants

### Avantages compétitifs
1. Technologie propriétaire
2. Focus sur le marché européen
3. Approche verticalisée
4. Conformité RGPD native

## Plan d'exécution

### Phase 1 : MVP (4 mois)
- Développement du core engine
- Tests avec early adopters
- Validation du product-market fit

### Phase 2 : Go-to-Market (6 mois)
- Lancement commercial
- Acquisition des premiers clients
- Optimisation du funnel

### Phase 3 : Scale (12 mois)
- Expansion géographique
- Développement produit
- Levée de fonds Series A

## Besoins financiers

### Utilisation des fonds
- 40% R&D
- 30% Sales & Marketing
- 20% Operations
- 10% Buffer

### Métriques clés
- CAC : < €2000
- LTV : > €20000
- Payback : < 12 mois
- Marge brute : 89%

## Équipe idéale

### Profils clés
- CTO avec exp. ML/AI
- Head of Sales B2B
- Product Manager SaaS
- Data Scientists

### Advisory board
- Expert IA/ML
- Entrepreneur SaaS
- Expert Sales B2B`,
  publishDate: "2024-03-15",
  readTime: "15 min",
  relatedIdeas: [
    {
      slug: 'fintech-crypto-b2b',
      title: 'Infrastructure crypto pour PME',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80',
      tag: 'Fintech',
      summary: "Les PME cherchent à intégrer les paiements crypto de manière sécurisée"
    }
  ]
};

export const BusinessIdeaPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <SEO
        title={`${businessIdea.title} | Opportunité Business`}
        description={businessIdea.opportunity}
        image={businessIdea.image}
      />
      <div className="relative pb-20">
        <ArticleProgress />

        <div className="container relative">
          <div className="flex gap-12">
            <div className="flex-1 max-w-3xl mx-auto">
              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-accent-violet text-white text-sm font-medium rounded-full">
                    Opportunité Business
                  </span>
                  <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <span className="font-bold text-white">{businessIdea.category}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  {businessIdea.title}
                </h1>

                <p className="text-xl text-tertiary mb-8">
                  {businessIdea.opportunity}
                </p>

                <div className="flex items-center gap-6 text-tertiary mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <time dateTime={businessIdea.publishDate}>
                      {new Date(businessIdea.publishDate).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{businessIdea.readTime} de lecture</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {businessIdea.metrics.map((metric, i) => (
                    <div key={i} className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-4">
                      <metric.icon size={24} className="text-accent-violet mb-2" />
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-tertiary">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </header>

              {/* Content */}
              <ArticleContent content={businessIdea.content} />

              {/* Share */}
              <div className="mt-12 mb-12">
                <h3 className="text-lg font-semibold mb-4">Partager cette opportunité</h3>
                <ShareButtons title={businessIdea.title} />
              </div>

              {/* Related Ideas */}
              {businessIdea.relatedIdeas.length > 0 && (
                <RelatedArticles articles={businessIdea.relatedIdeas} />
              )}

              {/* Newsletter */}
              <section className="mt-20">
                <NewsletterForm />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessIdeaPage;