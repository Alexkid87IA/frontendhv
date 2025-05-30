import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ArticleSidebarProps {
  author?: {
    name?: string;
    image?: any;
    bio?: string;
    slug?: {
      current: string;
    };
  };
  relatedArticles?: Array<{
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    mainImage?: any;
  }>;
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({ author, relatedArticles = [] }) => {
  return (
    <ErrorBoundary>
      <aside className="space-y-8">
        {author && (
          <div className="bg-hv-card-bg p-6 rounded-xl shadow-sm border border-hv-card-border">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-hv-card-border text-hv-text-primary-maquette">
              À propos de l'auteur
            </h3>
            <div className="flex items-center mb-4">
              {author.image && (
                <div className="mr-4 w-16 h-16 rounded-full overflow-hidden">
                  <SafeImage
                    image={author.image}
                    alt={author.name || "Auteur"}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium text-hv-text-primary-maquette">
                  {author.name || "Auteur inconnu"}
                </h4>
                {author.slug?.current && (
                  <Link 
                    to={`/auteur/${author.slug.current}`}
                    className="text-sm text-hv-blue-accent hover:underline"
                  >
                    Voir le profil
                  </Link>
                )}
              </div>
            </div>
            {author.bio && (
              <p className="text-sm text-hv-text-secondary-maquette mb-4">
                {typeof author.bio === 'string' 
                  ? author.bio 
                  : "Biographie non disponible"}
              </p>
            )}
          </div>
        )}

        {relatedArticles.length > 0 && (
          <div className="bg-hv-card-bg p-6 rounded-xl shadow-sm border border-hv-card-border">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b border-hv-card-border text-hv-text-primary-maquette">
              Articles similaires
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((article) => (
                <div key={article._id} className="group">
                  <Link to={`/article/${article.slug?.current || '#'}`} className="flex items-start gap-3">
                    {article.mainImage && (
                      <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden">
                        <SafeImage
                          image={article.mainImage}
                          alt={article.title || "Article similaire"}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-xs text-hv-blue-accent flex items-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire l'article
                        <ArrowRight className="ml-1 w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </ErrorBoundary>
  );
};

export default ArticleSidebar;
