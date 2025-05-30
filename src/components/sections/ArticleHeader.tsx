import React from 'react';
import { formatDate } from '../../utils/dateUtils';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface ArticleHeaderProps {
  article: {
    title?: string;
    mainImage?: any;
    publishedAt?: string;
    author?: {
      name?: string;
      image?: any;
    };
    categories?: Array<{
      _id: string;
      title: string;
      slug?: {
        current: string;
      };
    }>;
  };
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  if (!article) return null;

  return (
    <ErrorBoundary>
      <header className="mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-hv-text-primary-maquette">
              {article.title || "Article sans titre"}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {article.author?.image && (
                  <div className="mr-3 w-10 h-10 rounded-full overflow-hidden">
                    <SafeImage
                      image={article.author.image}
                      alt={article.author.name || "Auteur"}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <span className="block text-sm font-medium text-hv-text-primary-maquette">
                    {article.author?.name || "Auteur inconnu"}
                  </span>
                  <span className="text-xs text-hv-text-secondary-maquette">
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {article.mainImage && (
            <div className="max-w-5xl mx-auto mb-8 rounded-xl overflow-hidden">
              <SafeImage
                image={article.mainImage}
                alt={article.title || "Image de l'article"}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </header>
    </ErrorBoundary>
  );
};

export default ArticleHeader;
