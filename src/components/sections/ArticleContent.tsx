import React from 'react';
import { motion } from 'framer-motion';
import { PortableText } from "@portabletext/react";
import ErrorBoundary from '../common/ErrorBoundary';
import SafeImage from '../common/SafeImage';
import { Share2, Heart, Bookmark, MessageCircle } from 'lucide-react';

interface ArticleContentProps {
  content: any;
  className?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, className }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  // Composants personnalisés pour le rendu du contenu Portable Text
  const customComponents = {
    block: {
      // Paragraphes normaux
      normal: ({children}: any) => (
        <p className="text-lg leading-relaxed mb-6 text-white/90">{children}</p>
      ),
      // Titres
      h1: ({children}: any) => (
        <h1 className="text-3xl md:text-4xl font-bold mt-16 mb-8 text-white">{children}</h1>
      ),
      h2: ({children}: any) => (
        <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>
      ),
      h3: ({children}: any) => (
        <h3 className="text-xl md:text-2xl font-bold mt-10 mb-5 text-white">{children}</h3>
      ),
      h4: ({children}: any) => (
        <h4 className="text-lg md:text-xl font-bold mt-8 mb-4 text-white">{children}</h4>
      ),
      // Citations
      blockquote: ({children}: any) => (
        <blockquote className="border-l-4 border-accent-blue pl-6 py-4 my-8 text-xl italic text-white/80 bg-white/5 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      // Listes à puces
      bullet: ({children}: any) => (
        <ul className="list-disc pl-6 mb-8 space-y-3 text-white/90">{children}</ul>
      ),
      // Listes numérotées
      number: ({children}: any) => (
        <ol className="list-decimal pl-6 mb-8 space-y-3 text-white/90">{children}</ol>
      ),
    },
    listItem: {
      // Éléments de liste
      bullet: ({children}: any) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
      number: ({children}: any) => (
        <li className="text-lg leading-relaxed">{children}</li>
      ),
    },
    marks: {
      // Texte en gras
      strong: ({children}: any) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      // Texte en italique
      em: ({children}: any) => (
        <em className="italic text-white/90">{children}</em>
      ),
      // Liens
      link: ({value, children}: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a 
            href={value?.href} 
            target={target} 
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-accent-blue hover:text-accent-turquoise underline decoration-accent-blue/30 hover:decoration-accent-turquoise transition-colors"
          >
            {children}
          </a>
        );
      },
      // Texte surligné
      highlight: ({children}: any) => (
        <span className="bg-accent-blue/20 text-accent-blue px-1.5 py-0.5 rounded">{children}</span>
      ),
    },
    types: {
      image: ({value}: any) => {
        return (
          <figure className="my-10 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative">
              <SafeImage
                image={value}
                alt={value.alt || "Image de l'article"}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
              {/* Overlay subtil pour améliorer la lisibilité des légendes */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            {value.caption && (
              <figcaption className="text-sm text-white/70 italic mt-3 text-center px-4">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      // Autres types personnalisés si nécessaire
    },
  };

  try {
    return (
      <ErrorBoundary>
        <div className="relative">
          {/* Barre d'actions flottante */}
          <div className="hidden lg:block">
            <div className="sticky top-32 left-0 w-12 float-left -ml-20">
              <div className="flex flex-col items-center space-y-4">
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-200 border border-white/10 hover:border-accent-blue/30">
                  <Heart size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-200 border border-white/10 hover:border-accent-blue/30">
                  <Bookmark size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-200 border border-white/10 hover:border-accent-blue/30">
                  <Share2 size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-200 border border-white/10 hover:border-accent-blue/30">
                  <MessageCircle size={18} />
                </button>
                <div className="h-20 w-px bg-gradient-to-b from-white/10 to-transparent mt-2"></div>
              </div>
            </div>
          </div>
          
          <motion.article 
            className={`article-content ${className || ""} prose prose-lg prose-invert max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Barre d'actions mobile */}
            <div className="flex items-center justify-between mb-8 lg:hidden bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <div className="flex items-center space-x-2">
                <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all">
                  <Heart size={18} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all">
                  <Bookmark size={18} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all">
                  <Share2 size={18} />
                </button>
                <button className="w-9 h-9 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all">
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>
            
            {/* Première lettre mise en valeur */}
            <div className="relative">
              {content && content[0] && content[0].children && content[0].children[0] && (
                <div className="float-left mr-3 mb-1 text-5xl font-serif font-bold text-accent-blue leading-none mt-1">
                  {content[0].children[0].text?.charAt(0) || ""}
                </div>
              )}
              <PortableText value={content} components={customComponents} />
            </div>
            
            {/* Section de partage en fin d'article */}
            <div className="border-t border-white/10 mt-16 pt-10 max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="text-white/80 mb-4 sm:mb-0 font-medium">Partagez cet article</p>
                <div className="flex items-center space-x-4">
                  <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 flex items-center justify-center text-[#1877F2] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 flex items-center justify-center text-[#1DA1F2] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 flex items-center justify-center text-[#0A66C2] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("ArticleContent: Erreur pendant le rendu de PortableText:", error);
    return <p className="text-red-500">Erreur lors de l'affichage du contenu de l'article.</p>;
  }
};

export default ArticleContent;
