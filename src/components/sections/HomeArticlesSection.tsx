import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface HomeArticlesSectionProps {
  title?: string;
  articles?: Array<{
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    mainImage?: any;
    excerpt?: string;
    publishedAt?: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug?: {
        current: string;
      };
    }>;
  }>;
}

export const HomeArticlesSection: React.FC<HomeArticlesSectionProps> = ({
  title = "Articles récents",
  articles = []
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <ErrorBoundary>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-hv-text-primary-maquette">
              {title}
            </h2>
            <Link 
              to="/articles" 
              className="flex items-center text-hv-blue-accent hover:text-hv-blue-accent/80 transition-colors"
            >
              Voir tous les articles
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article key={article._id} className="bg-hv-card-bg rounded-xl shadow-lg overflow-hidden border border-hv-card-border group">
                <div className="relative h-48 overflow-hidden">
                  <SafeImage
                    image={article.mainImage}
                    alt={article.title || "Article récent"}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {article.categories && article.categories.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {article.categories.map((category, idx) => (
                        category.slug?.current && (
                          <Link 
                            key={category._id} 
                            to={`/rubrique/${category.slug.current}`} 
                            className={`inline-block ${["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][idx % 4]} px-3 py-1 text-sm font-medium text-white rounded-md hover:opacity-90 transition-opacity`}
                          >
                            {category.title}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Link to={`/article/${article.slug?.current || '#'}`} className="group">
                    <h3 className="text-xl font-bold mb-3 text-hv-text-primary-maquette group-hover:text-hv-blue-accent transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-hv-text-secondary-maquette text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-end mt-auto">
                      <span className="inline-flex items-center text-hv-blue-accent font-medium transition-colors group-hover:text-hv-text-white">
                        Lire l'article
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default HomeArticlesSection;
