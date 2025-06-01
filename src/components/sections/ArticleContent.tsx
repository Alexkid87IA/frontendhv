import React from 'react';
import { motion } from 'framer-motion';
import { PortableText } from "@portabletext/react";
import ErrorBoundary from '../common/ErrorBoundary';
import SafeImage from '../common/SafeImage';
import { Share2, Heart, Bookmark, MessageCircle } from 'lucide-react';

// Contenu de test pour forcer l'affichage
const testContent = [
  {
    "_key": "test1",
    "_type": "block",
    "style": "normal",
    "children": [
      {
        "_key": "test1.1",
        "_type": "span",
        "marks": [],
        "text": "Ceci est un paragraphe de test pour vérifier que le rendu Portable Text fonctionne correctement."
      }
    ],
    "markDefs": []
  },
  {
    "_key": "test2",
    "_type": "block",
    "style": "h2",
    "children": [
      {
        "_key": "test2.1",
        "_type": "span",
        "marks": [],
        "text": "Un titre de niveau 2 pour tester"
      }
    ],
    "markDefs": []
  },
  {
    "_key": "test3",
    "_type": "block",
    "style": "normal",
    "children": [
      {
        "_key": "test3.1",
        "_type": "span",
        "marks": ["strong"],
        "text": "Texte en gras "
      },
      {
        "_key": "test3.2",
        "_type": "span",
        "marks": ["em"],
        "text": "et texte en italique "
      },
      {
        "_key": "test3.3",
        "_type": "span",
        "marks": [],
        "text": "pour tester le formatage."
      }
    ],
    "markDefs": []
  }
];

interface ArticleContentProps {
  content: any;
  className?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, className }) => {
  // Vérification plus robuste du contenu
  const hasValidContent = content && 
    (Array.isArray(content) && content.length > 0) || 
    (typeof content === 'object' && Object.keys(content).length > 0);

  // Afficher le contenu brut dans la console pour débogage
  console.log("ArticleContent: Contenu reçu", content);
  if (content) {
    try {
      console.log("ArticleContent: Contenu JSON", JSON.stringify(content, null, 2));
    } catch (e) {
      console.log("ArticleContent: Impossible de convertir le contenu en JSON", e);
    }
  }

  // Utiliser le contenu de test si le contenu réel est invalide ou vide
  const contentToRender = hasValidContent ? content : testContent;
  
  // Indiquer si on utilise le contenu de test
  if (!hasValidContent) {
    console.warn("ArticleContent: Utilisation du contenu de test car le contenu réel est invalide ou vide");
  }

  // Composants personnalisés pour le rendu du contenu Portable Text
  const customComponents = {
    block: {
      // Paragraphes normaux
      normal: ({children}: any) => (
        <p className="text-lg leading-relaxed mb-8 text-white/90">{children}</p>
      ),
      // Titres
      h1: ({children}: any) => (
        <h1 className="text-3xl md:text-4xl font-bold mt-20 mb-10 text-white">{children}</h1>
      ),
      h2: ({children}: any) => (
        <h2 className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-white">{children}</h2>
      ),
      h3: ({children}: any) => (
        <h3 className="text-xl md:text-2xl font-bold mt-12 mb-6 text-white">{children}</h3>
      ),
      h4: ({children}: any) => (
        <h4 className="text-lg md:text-xl font-bold mt-10 mb-5 text-white">{children}</h4>
      ),
      // Citations
      blockquote: ({children}: any) => (
        <blockquote className="border-l-4 border-accent-blue pl-8 py-6 my-10 text-xl italic text-white/80 bg-white/5 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      // Listes à puces
      bullet: ({children}: any) => (
        <ul className="list-disc pl-8 mb-10 space-y-4 text-white/90">{children}</ul>
      ),
      // Listes numérotées
      number: ({children}: any) => (
        <ol className="list-decimal pl-8 mb-10 space-y-4 text-white/90">{children}</ol>
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
        <span className="bg-accent-blue/20 text-accent-blue px-2 py-1 rounded">{children}</span>
      ),
    },
    types: {
      image: ({value}: any) => {
        return (
          <figure className="my-14 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative group">
              <SafeImage
                image={value}
                alt={value.alt || "Image de l'article"}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
              {/* Overlay subtil pour améliorer la lisibilité des légendes */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {value.caption && (
              <figcaption className="text-sm text-white/70 italic mt-4 text-center px-4">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      // Autres types personnalisés si nécessaire
    },
  };

  // Composant de partage flottant
  const FloatingShare = () => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed left-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col items-center space-y-6 z-10"
    >
      <div className="w-px h-20 bg-gradient-to-b from-transparent to-white/20"></div>
      <motion.button 
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-300 border border-white/10 hover:border-accent-blue/30 backdrop-blur-sm"
      >
        <Heart size={20} />
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-300 border border-white/10 hover:border-accent-blue/30 backdrop-blur-sm"
      >
        <Bookmark size={20} />
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all duration-300 border border-white/10 hover:border-accent-blue/30 backdrop-blur-sm"
      >
        <Share2 size={20} />
      </motion.button>
      <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent"></div>
    </motion.div>
  );

  try {
    return (
      <ErrorBoundary>
        <div className="relative">
          {/* Barre de partage flottante pour desktop */}
          <FloatingShare />
          
          <motion.article 
            className={`article-content ${className || ""} prose prose-lg prose-invert max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Barre d'actions mobile */}
            <div className="flex items-center justify-between mb-10 xl:hidden bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
              <div className="flex items-center space-x-3">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all border border-white/10"
                >
                  <Heart size={18} />
                </motion.button>
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all border border-white/10"
                >
                  <Bookmark size={18} />
                </motion.button>
              </div>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-accent-blue/20 flex items-center justify-center text-white/70 hover:text-accent-blue transition-all border border-white/10"
              >
                <Share2 size={18} />
              </motion.button>
            </div>
            
            {/* Contenu de l'article avec première lettre mise en valeur */}
            <div className="relative">
              {/* Afficher un message si on utilise le contenu de test */}
              {!hasValidContent && (
                <div className="bg-amber-900/20 border border-amber-500/30 p-4 rounded-lg mb-8">
                  <p className="text-amber-400 text-sm">
                    ⚠️ Contenu de test affiché car le contenu réel est invalide ou vide. Vérifiez le champ "body" dans Sanity Studio.
                  </p>
                </div>
              )}
              
              {/* Fallback pour les contenus non-array */}
              {!Array.isArray(contentToRender) ? (
                <div>
                  <p className="text-lg leading-relaxed mb-8 text-white/90">
                    {typeof contentToRender === 'string' ? contentToRender : 'Contenu non disponible dans le format attendu.'}
                  </p>
                  <p className="text-sm text-gray-400 mb-8">
                    Note: Ce contenu n'est pas au format Portable Text standard.
                  </p>
                </div>
              ) : (
                <PortableText value={contentToRender} components={customComponents} />
              )}
            </div>
            
            {/* Section de partage en fin d'article */}
            <div className="mt-20 pt-10 border-t border-white/10">
              <div className="bg-gradient-to-r from-black/40 to-black/20 p-8 rounded-2xl backdrop-blur-md border border-white/10 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-white">Partager cet article</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] transition-all border border-[#1877F2]/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                    <span className="font-medium">Facebook</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] transition-all border border-[#1DA1F2]/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                    <span className="font-medium">Twitter</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] transition-all border border-[#0A66C2]/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    <span className="font-medium">LinkedIn</span>
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all border border-white/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="font-medium">Email</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("ArticleContent: Erreur pendant le rendu de PortableText:", error);
    return (
      <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
        <p className="text-white mb-2">Une erreur est survenue lors de l'affichage du contenu.</p>
        <p className="text-gray-400 text-sm">Détails techniques: {error instanceof Error ? error.message : String(error)}</p>
        <div className="mt-4 p-4 bg-black/30 rounded border border-white/10">
          <p className="text-white/70 text-sm mb-2">Contenu reçu:</p>
          <pre className="text-xs text-white/50 overflow-auto max-h-40">
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
};

export default ArticleContent;
