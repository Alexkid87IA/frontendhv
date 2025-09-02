// src/components/article/sections/ArticleSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Share2, ArrowRight } from "lucide-react";
import { SanityArticle, VerticalColors, TableOfContentsHeading } from "../../../types/article.types";
import ArticleAuthor from "../ui/ArticleAuthor";
import TableOfContents from "../ui/TableOfContents";
import ArticleCTA from "../ui/ArticleCTA";

interface ArticleSidebarProps {
  article: SanityArticle;
  relatedArticles: SanityArticle[];
  headings: TableOfContentsHeading[] | null;
  activeSection: string;
  scrollProgress: number;
  colors: VerticalColors;
  onShare: () => void;
}

const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
  article,
  relatedArticles,
  headings,
  activeSection,
  scrollProgress,
  colors,
  onShare
}) => {
  return (
    <div className="space-y-8">
        
        {/* Encart Auteur - Desktop */}
        {article.author && (
          <ArticleAuthor 
            author={article.author}
            publishedAt={article.publishedAt}
            colors={colors}
            variant="desktop"
          />
        )}
        
        {/* Table des matières DESKTOP */}
        {headings && headings.length > 0 && (
          <TableOfContents
            headings={headings}
            activeSection={activeSection}
            scrollProgress={scrollProgress}
            colors={colors}
            variant="desktop"
          />
        )}

        {/* Stats de l'article - Partage uniquement */}
        <div 
          className="backdrop-blur-md rounded-2xl p-6"
          style={{
            background: colors.bgLight,
            border: `1px solid ${colors.borderColor}`
          }}
        >
          <button
            onClick={onShare}
            className="w-full flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-all"
          >
            <Share2 size={24} className="text-gray-400" />
            <span className="text-sm text-gray-400">Partager cet article</span>
          </button>
        </div>

        {/* Articles similaires */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                Articles similaires
              </h3>
              <Link 
                to="/articles"
                className="text-sm transition-colors"
                style={{ color: colors.textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textColor;
                }}
              >
                Voir tous →
              </Link>
            </div>
            
            <div className="space-y-4">
              {relatedArticles.slice(0, 3).map((related) => (
                <Link
                  key={related._id}
                  to={`/article/${related.slug.current}`}
                  className="group block"
                >
                  <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                    {related.mainImage && related.mainImage.asset && related.mainImage.asset._ref && (
                      <img 
                        src={`https://cdn.sanity.io/images/z9wsynas/production/${related.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=120&h=80&fit=crop&auto=format`}
                        alt={related.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-medium text-white transition-colors line-clamp-2 text-sm mb-2"
                        style={{
                          color: '#ffffff'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.textColor;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#ffffff';
                        }}
                      >
                        {related.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Club Élite */}
        <ArticleCTA colors={colors} />
    </div>
  );
};

export default ArticleSidebar;