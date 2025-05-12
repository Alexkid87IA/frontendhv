import React from 'react';
import { Share2, Clock } from 'lucide-react';

interface ArticleHeaderProps {
  article: {
    title: string;
    description: string;
    date: string;
    readingTime: string;
    category: string;
    image: string;
  };
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  return (
    <header className="mb-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-primary-600">{article.category}</span>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        <h1 className="text-4xl font-bold leading-tight lg:text-5xl">{article.title}</h1>
        
        <p className="text-xl text-gray-600">{article.description}</p>

        <div className="flex items-center justify-between py-4">
          <time className="text-sm text-gray-600">{article.date}</time>
          <button 
            className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {article.image && (
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </header>
  );
}