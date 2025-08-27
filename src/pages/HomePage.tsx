import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { EditorialSection } from '../components/sections/EditorialSection';
import ContentSection from '../components/sections/ContentSection';
import { EssentialArticlesSection } from '../components/sections/EssentialArticlesSection';
import { ClubSection } from '../components/sections/ClubSection';
import { Footer } from '../components/layout/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { getAllArticles } from '../utils/sanityAPI';

const mockArticles = [
  {
    _id: '1',
    title: "Comment développer un mindset d'exception",
    slug: { _type: "slug", current: 'mindset-exception' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=1',
        _type: "reference"
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
    title: "Les 5 stratégies de croissance des licornes françaises",
    slug: { _type: "slug", current: 'strategies-croissance-licornes' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=2',
        _type: "reference"
      }
    },
    excerpt: "Analyse exclusive des méthodes utilisées par les startups françaises valorisées à plus d'1 milliard.",
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
    title: "L'art du pivot : Quand et comment changer de direction",
    slug: { _type: "slug", current: 'art-du-pivot' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=3',
        _type: "reference"
      }
    },
    excerpt: "Apprenez à reconnaître les signaux et à exécuter un pivot stratégique avec succès.",
    publishedAt: "2024-03-18",
    categories: [
      {
        _id: 'cat2',
        title: 'Business',
        slug: { current: 'business' }
      }
    ]
  },
  {
    _id: '4',
    title: "Le pouvoir de la visualisation dans l'entrepreneuriat",
    slug: { _type: "slug", current: 'pouvoir-visualisation' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=4',
        _type: "reference"
      }
    },
    excerpt: "Comment les entrepreneurs à succès utilisent la visualisation pour atteindre leurs objectifs.",
    publishedAt: "2024-03-17",
    categories: [
      {
        _id: 'cat1',
        title: 'Mindset',
        slug: { current: 'mindset' }
      }
    ]
  },
  {
    _id: '5',
    title: "Réseauter comme un pro : Le guide complet",
    slug: { _type: "slug", current: 'reseauter-comme-un-pro' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=5',
        _type: "reference"
      }
    },
    excerpt: "Techniques avancées pour construire un réseau professionnel puissant et authentique.",
    publishedAt: "2024-03-16",
    categories: [
      {
        _id: 'cat3',
        title: 'Society',
        slug: { current: 'society' }
      }
    ]
  },
  {
    _id: '6',
    title: "L'impact de l'IA sur les modèles économiques de demain",
    slug: { _type: "slug", current: 'impact-ia-modeles-economiques' },
    mainImage: {
      _type: "image",
      asset: {
        _ref: 'https://picsum.photos/400/300?random=6',
        _type: "reference"
      }
    },
    excerpt: "Exploration des transformations radicales que l'intelligence artificielle apporte au business.",
    publishedAt: "2024-03-15",
    categories: [
      {
        _id: 'cat2',
        title: 'Business',
        slug: { current: 'business' }
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
          setArticles(sanityArticles.slice(0, 6));
          setDataSource('sanity');
          console.log('✅ Articles récupérés depuis Sanity CMS');
        } else {
          setArticles(mockArticles);
          setDataSource('mock');
          console.log('📦 Utilisation des articles mockés (fallback)');
        }
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des articles:', error);
        setArticles(mockArticles);
        setDataSource('mock');
        console.log('📦 Utilisation des articles mockés suite à une erreur');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <SEO {...staticSEO.home} />
      {/* CORRECTION: overflow-hidden ajouté */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Background effects - CORRECTION: contenus dans un div avec overflow hidden */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        {/* CORRECTION: z-[5] au lieu de z-10, et overflow-x-hidden */}
        <main className="relative z-[5] pt-20 overflow-x-hidden">
          {/* 1. Hero avec article à la une + 6 articles récents + CTA */}
          <HeroSection />
          
          {/* 3. Navigation thématique + stats + CTA */}
          <EditorialSection />
          
          {/* 4. Nos formats : Podcasts */}
          <section className="py-20 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent overflow-hidden">
            <ContentSection 
              title="Le podcast High Value"
              description="Des conversations authentiques avec ceux qui façonnent le monde de demain"
              sectionType="emission"
            />
          </section>
          
          {/* 5. Nos formats : Études de cas */}
          <section className="py-20 overflow-hidden">
            <ContentSection 
              title="Des études de cas exclusives"
              description="Découvrez les stratégies et idées qui transforment le monde des affaires"
              sectionType="business-idea"
            />
          </section>
          
          {/* 6. Nos formats : Parcours exceptionnels */}
          <section className="py-20 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent overflow-hidden">
            <ContentSection 
              title="Des parcours inspirants"
              description="Histoires d'entrepreneurs qui ont réussi à concrétiser leur vision"
              sectionType="success-story"
            />
          </section>
          
          {/* 7. Articles essentiels (différents du Hero) */}
          <section className="py-20 overflow-hidden">
            <EssentialArticlesSection />
          </section>
          
          {/* 8. Proposition premium - SANS WRAPPER */}
          <ClubSection />
        </main>
        
        {/* 9. Footer avec liens et infos */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;