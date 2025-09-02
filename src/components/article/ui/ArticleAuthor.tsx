// src/components/article/ui/ArticleAuthor.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User } from "lucide-react";
import { urlFor } from "../../../utils/sanityClient";
import { VerticalColors } from "../../../types/article.types";

interface ArticleAuthorProps {
  author: {
    name: string;
    image?: any;
    bio?: string;
  };
  publishedAt?: string;
  colors: VerticalColors;
  variant?: 'desktop' | 'mobile';
}

const ArticleAuthor: React.FC<ArticleAuthorProps> = ({ 
  author, 
  publishedAt, 
  colors, 
  variant = 'desktop' 
}) => {
  // Styles conditionnels selon la variante
  const containerStyles = variant === 'mobile' 
    ? "lg:hidden mb-10"
    : "bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6";
  
  const innerContainerStyles = variant === 'mobile'
    ? "bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 p-5"
    : "";
  
  const avatarSize = variant === 'mobile' 
    ? { width: 64, height: 64, iconSize: 24, className: "w-16 h-16" }
    : { width: 80, height: 80, iconSize: 32, className: "w-20 h-20" };

  return (
    <div className={containerStyles}>
      <div className={innerContainerStyles}>
        <div className={`flex ${variant === 'mobile' ? 'items-start' : 'items-center'} gap-4 ${variant === 'desktop' ? 'mb-4' : ''}`}>
          {author.image ? (
            <img 
              src={urlFor(author.image).width(avatarSize.width).height(avatarSize.height).url()}
              alt={author.name}
              className={`${avatarSize.className} rounded-full object-cover flex-shrink-0`}
              style={{ border: `2px solid ${colors.borderColor}` }}
            />
          ) : (
            <div 
              className={`${avatarSize.className} rounded-full flex items-center justify-center flex-shrink-0`}
              style={{ background: colors.bgGradient }}
            >
              <User size={avatarSize.iconSize} className="text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className={`${variant === 'mobile' ? 'text-xs' : 'text-xs'} text-gray-400 ${variant === 'mobile' ? 'mb-0.5' : 'mb-1'}`}>
              Écrit par
            </p>
            <h3 className={`${variant === 'mobile' ? 'text-base' : 'text-lg'} font-semibold text-white mb-1`}>
              {author.name}
            </h3>
            {variant === 'desktop' && publishedAt && (
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>
                    {new Date(publishedAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'short' 
                    })}
                  </span>
                </span>
              </div>
            )}
            {variant === 'mobile' && author.bio && (
              <p className="text-xs text-gray-300 leading-relaxed">
                {author.bio}
              </p>
            )}
            {variant === 'mobile' && (
              <Link 
                to={`/auteur/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block mt-3 text-xs font-medium transition-colors"
                style={{ color: colors.textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textColor;
                }}
              >
                Voir tous ses articles →
              </Link>
            )}
          </div>
        </div>
        
        {variant === 'desktop' && (
          <>
            {author.bio && (
              <p className="text-sm text-gray-300 leading-relaxed">
                {author.bio}
              </p>
            )}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <Link 
                to={`/auteur/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center"
                style={{
                  background: colors.bgLight,
                  color: colors.textColor
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bgMedium;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.bgLight;
                }}
              >
                Voir tous ses articles
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleAuthor;