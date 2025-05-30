import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sanityClient } from '../../utils/sanityClient';

// Types pour TypeScript
interface SanityImage {
  asset: {
    _ref: string;
    url?: string;
  };
}

interface SanitySlug {
  current: string;
}

interface SanityAuthor {
  name: string;
  image?: SanityImage;
}

interface SanityCategory {
  _id: string;
  title: string;
  slug?: SanitySlug;
}

interface Article {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author?: SanityAuthor;
  categories?: SanityCategory[];
  videoUrl?: string;
  duration?: string;
  views?: number;
}

interface ContentSectionProps {
  title: string;
  description: string;
  sectionType: 'emission' | 'business-idea' | 'success-story';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, description, sectionType }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // Requête GROQ pour récupérer les articles du type de section spécifié
        const query = `*[_type == "article" && references(*[_type == "sectionType" && slug.current == $sectionType]._id)] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          mainImage,
          publishedAt,
          "author": author-> {
            name,
            image
          },
          "categories": categories[]-> {
            _id,
            title,
            slug
          },
          videoUrl,
          duration,
          views
        }[0...6]`;
        
        const result = await sanityClient.fetch(query, { sectionType });
        setArticles(result);
      } catch (err) {
        console.error('Erreur lors de la récupération des articles:', err);
        setError('Impossible de charger les articles. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [sectionType]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Formatage de la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  // Formatage du nombre de vues
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(0)}K vues`;
    }
    return `${views} vues`;
  };

  // Fonction pour obtenir le texte du CTA selon le type de section
  const getCtaText = (type: string) => {
    switch (type) {
      case 'emission':
        return 'Regarder la vidéo';
      case 'business-idea':
        return 'Découvrir l\'idée';
      case 'success-story':
        return 'Lire l\'histoire';
      default:
        return 'Lire l\'article';
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Chargement des articles...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="py-8 text-center">Aucun article trouvé pour cette section.</div>;
  }

  return (
    <section className="py-12 bg-navy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-gray-300 mt-2">{description}</p>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Précédent"
            >
              &#10094;
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              aria-label="Suivant"
            >
              &#10095;
            </button>
          </div>
        </div>

        <div 
          ref={carouselRef}
          className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {articles.map((article) => (
            <div key={article._id} className="flex-none w-80 md:w-96">
              <Link to={`/article/${article.slug.current}`} className="block">
                <div className="bg-navy-800 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                  <div className="relative h-48 md:h-56">
                    {article.mainImage ? (
                      <img 
                        src={`https://cdn.sanity.io/images/z9wsynas/production/${article.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg')}`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">Image non disponible</span>
                      </div>
                    )}
                    
                    {/* Bouton Play uniquement pour la section Émission */}
                    {sectionType === 'emission' && article.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 rounded-full bg-blue-500 bg-opacity-80 hover:bg-opacity-100 transition-all transform hover:scale-110">
                          <div className="w-8 h-8 flex items-center justify-center text-white">
                            &#9658;
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 hover:text-blue-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    {article.excerpt && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    )}
                    
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <div className="flex items-center">
                        {article.author?.name && (
                          <span>{article.author.name}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {sectionType === 'emission' && article.duration && (
                          <span>{article.duration}</span>
                        )}
                        
                        {sectionType === 'emission' && article.views && (
                          <span>{formatViews(article.views)}</span>
                        )}
                        
                        {article.publishedAt && (
                          <span>{formatDate(article.publishedAt)}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <span className="text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                        {getCtaText(sectionType)}
                        <span className="ml-1">&#10095;</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;