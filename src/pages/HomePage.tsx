import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { AmuseBoucheSection } from '../components/sections/AmuseBoucheSection';
import { EditorialSection } from '../components/sections/EditorialSection';
import ContentSection from '../components/sections/ContentSection';
import { ClubSection } from '../components/sections/ClubSection';
import { ExploreArticlesCTA } from '../components/sections/ExploreArticlesCTA';
import SimpleFooter from '../components/layout/SimpleFooter';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getAllArticles } from '../utils/sanityAPI';

// Données mockées pour la section articles (utilisées en fallback)
const mockArticles = [
  {
    _id: '1',
    title: "Comment développer un mindset d'exception",
    slug: { current: 'mindset-exception' },
    mainImage: {
      asset: {
        _ref: 'https://picsum.photos/400/300?random=1',
        url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Découvrez les secrets des entrepreneurs qui réussissent et transforment leur vision du possible.",
    publishedAt: "2024-03-20",
    categories: [
      {
        _id: 'cat1',
        title: 'Mindset',
        slug: { current: 'mindset' }
      }
    ]
  },
  {
    _id: '2',
    title: "L'art de la résilience entrepreneuriale",
    slug: { current: 'resilience-entrepreneuriale' },
    mainImage: {
      asset: {
        _ref: 'image-2',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Comment transformer les obstacles en opportunités et rebondir face aux défis.",
    publishedAt: "2024-03-19",
    categories: [
      {
        _id: 'cat2',
        title: 'Business',
        slug: { current: 'business' }
      }
    ]
  },
  {
    _id: '3',
    title: "Les clés d'une communication impactante",
    slug: { current: 'communication-impactante' },
    mainImage: {
      asset: {
        _ref: 'image-3',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80'
      }
    },
    excerpt: "Maîtrisez l'art de la communication pour amplifier votre message et votre influence.",
    publishedAt: "2024-03-18",
    categories: [
      {
        _id: 'cat3',
        title: 'Communication',
        slug: { current: 'communication' }
      }
    ]
  }
];

export const HomePage = () => {
  const [articles, setArticles] = useState(mockArticles);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSource, setDataSource] = useState('mock');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const sanityArticles = await getAllArticles();
        
        if (sanityArticles && sanityArticles.length > 0) {
          setArticles(sanityArticles.slice(0, 6)); // Limiter à 6 articles pour la homepage
          setDataSource('sanity');
          console.log('Articles récupérés depuis Sanity CMS');
        } else {
          setArticles(mockArticles);
          setDataSource('mock');
          console.log('Utilisation des articles mockés (fallback)');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des articles:', error);
        setArticles(mockArticles);
        setDataSource('mock');
        console.log('Utilisation des articles mockés suite à une erreur');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <SEO {...staticSEO.home} />
      {/* Contenu */}
      <div className="relative space-y-16 md:space-y-24 lg:space-y-32">
        {/* Effets d'arrière-plan déplacés pour ne pas interférer avec le footer */}
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* Sections de contenu */}
        <HeroSection />
        <AmuseBoucheSection />
        <EditorialSection />
        <ExploreArticlesCTA />
        <ClubSection />
        <ContentSection 
          title="Le podcast High Value"
          description="Des conversations authentiques avec ceux qui façonnent le monde de demain"
          sectionType="emission"
        />
        <ContentSection 
          title="Des études de cas"
          description="Découvrez les stratégies et idées qui transforment le monde des affaires"
          sectionType="business-idea"
        />
        <ContentSection 
          title="Des parcours incroyables"
          description="Parcours inspirants d'entrepreneurs qui ont réussi à concrétiser leur vision"
          sectionType="success-story"
        />
        
        {/* Espace supplémentaire pour garantir que le footer est visible */}
        <div className="h-16"></div>
        
        {/* Ajout explicite du SimpleFooter directement dans la HomePage */}
        <SimpleFooter />
      </div>
    </>
  );
};

export default HomePage;