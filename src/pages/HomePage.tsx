import React, { useState, useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { staticSEO } from '../utils/seo.config';
import { HeroSection } from '../components/sections/HeroSection';
import { AmuseBoucheSection } from '../components/sections/AmuseBoucheSection';
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
  // ... autres articles mockés
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
      <div className="relative space-y-16 md:space-y-24 lg:space-y-32">
        <div className="absolute inset-0 z-[-1]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        <main className="pt-20">
          {/* 1. Hero avec article à la une + 6 articles récents + CTA */}
          <HeroSection />
          
          {/* 2. Contenus RS/snackables pour engagement rapide */}
          <AmuseBoucheSection />
          
          {/* 3. Navigation thématique + stats + CTA */}
          <EditorialSection />
          
          {/* 4. Nos formats : Podcasts */}
          <ContentSection 
            title="Le podcast High Value"
            description="Des conversations authentiques avec ceux qui façonnent le monde de demain"
            sectionType="emission"
          />
          
          {/* 5. Nos formats : Études de cas */}
          <ContentSection 
            title="Des études de cas"
            description="Découvrez les stratégies et idées qui transforment le monde des affaires"
            sectionType="business-idea"
          />
          
          {/* 6. Nos formats : Parcours exceptionnels */}
          <ContentSection 
            title="Des parcours incroyables"
            description="Parcours inspirants d'entrepreneurs qui ont réussi à concrétiser leur vision"
            sectionType="success-story"
          />
          
          {/* 7. Articles essentiels (différents du Hero) */}
          <EssentialArticlesSection />
          
          {/* 8. Proposition premium */}
          <ClubSection />
        </main>
        
        {/* 9. Footer avec liens et infos */}
        <Footer />
      </div>
    </>
  );
};

export default HomePage;