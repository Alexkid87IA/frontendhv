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
    imageUrl?: string;
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

  // Fonction pour obtenir l'URL de l'image - VERSION CORRIGÉE
  const getAuthorImageUrl = React.useMemo(() => {
    try {
      // Debug amélioré - on log seulement une fois
      if (import.meta.env.DEV) {
        console.log('Author data:', {
          name: author.name,
          hasImage: !!author.image,
          hasImageUrl: !!author.imageUrl,
          imageStructure: author.image ? JSON.stringify(author.image, null, 2) : 'no image',
          imageUrlValue: author.imageUrl || 'no imageUrl'
        });
      }
      
      // 1. Priorité à imageUrl s'il existe
      if (author.imageUrl && typeof author.imageUrl === 'string' && author.imageUrl.length > 0) {
        // Vérifier que c'est une URL valide
        if (author.imageUrl.startsWith('http') || author.imageUrl.startsWith('//')) {
          return author.imageUrl;
        }
      }
      
      // 2. Ensuite vérifier image avec différentes structures
      if (author.image) {
        // Si c'est directement une string URL
        if (typeof author.image === 'string' && author.image.startsWith('http')) {
          return author.image;
        }
        
        // Si c'est un objet avec asset
        if (author.image.asset) {
          // Si asset est une string URL
          if (typeof author.image.asset === 'string' && author.image.asset.startsWith('http')) {
            return author.image.asset;
          }
          
          // Si asset a _ref qui est une URL
          if (author.image.asset._ref && 
              typeof author.image.asset._ref === 'string' && 
              author.image.asset._ref.startsWith('http')) {
            return author.image.asset._ref;
          }
          
          // Si c'est une vraie référence Sanity (format: image-xxx-xxx-xxx)
          if (author.image.asset._ref && 
              typeof author.image.asset._ref === 'string' && 
              author.image.asset._ref.includes('image-')) {
            try {
              const url = urlFor(author.image)
                .width(avatarSize.width * 2) // x2 pour la rétine
                .height(avatarSize.height * 2)
                .url();
              
              if (url && !url.includes('undefined')) {
                return url;
              }
            } catch (e) {
              console.error('Error with urlFor:', e);
            }
          }
        }
        
        // Si image a directement une propriété url
        if (author.image.url && typeof author.image.url === 'string') {
          return author.image.url;
        }
      }
      
      // Pas d'image trouvée
      return null;
    } catch (error) {
      console.error('Error in getAuthorImageUrl:', error);
      return null;
    }
  }, [author.image, author.imageUrl, author.name, avatarSize.width, avatarSize.height]);

  return (
    <div className={containerStyles}>
      <div className={innerContainerStyles}>
        <div className={`flex ${variant === 'mobile' ? 'items-start' : 'items-center'} gap-4 ${variant === 'desktop' ? 'mb-4' : ''}`}>
          {getAuthorImageUrl ? (
            <img 
              src={getAuthorImageUrl}
              alt={author.name}
              className={`${avatarSize.className} rounded-full object-cover flex-shrink-0 ring-2 ring-white/10`}
              loading="lazy"
              onError={(e) => {
                // Remplacer l'image par le fallback en cas d'erreur
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                
                // Afficher le fallback
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.author-fallback')) {
                  const fallback = document.createElement('div');
                  fallback.className = `author-fallback ${avatarSize.className} rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white/10`;
                  fallback.style.background = colors.bgGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  fallback.innerHTML = `
                    <svg width="${avatarSize.iconSize}" height="${avatarSize.iconSize}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div 
              className={`${avatarSize.className} rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white/10`}
              style={{ background: colors.bgGradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
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
              <p className="text-xs text-gray-300 leading-relaxed mt-2">
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
              <p className="text-sm text-gray-300 leading-relaxed mt-4">
                {author.bio}
              </p>
            )}
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <Link 
                to={`/auteur/${author.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="block w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center"
                style={{
                  background: colors.bgLight || 'rgba(255, 255, 255, 0.05)',
                  color: colors.textColor || '#fff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.bgMedium || 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = colors.bgLight || 'rgba(255, 255, 255, 0.05)';
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