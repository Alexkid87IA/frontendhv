// src/components/article/embeds/InstagramEmbed.tsx
import React, { useState, useEffect, useRef } from "react";
import { Instagram, Loader2, ArrowRight } from "lucide-react";

interface InstagramEmbedProps {
  url: string;
  caption?: string;
}

// Déclaration pour Instagram API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const InstagramEmbedBase: React.FC<InstagramEmbedProps> = ({ url, caption }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Fonction pour extraire l'ID du post
  const getInstagramPostId = (url: string) => {
    if (!url) return null;
    
    const patterns = [
      /instagram\.com\/p\/([^\/\?]+)/,
      /instagram\.com\/reel\/([^\/\?]+)/,
      /instagram\.com\/tv\/([^\/\?]+)/,
      /instagr\.am\/p\/([^\/\?]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };
  
  const postId = getInstagramPostId(url);
  
  // Empêcher le rechargement de l'iframe une fois chargé
  useEffect(() => {
    if (hasLoaded && iframeRef.current) {
      // Forcer le navigateur à garder l'iframe en mémoire
      iframeRef.current.style.willChange = 'contents';
    }
  }, [hasLoaded]);
  
  // Si pas d'ID valide
  if (!postId) {
    return (
      <div className="my-12 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8 text-center">
            <Instagram className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Post Instagram non disponible</p>
            <p className="text-sm text-gray-500">L'URL fournie n'est pas valide</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
            >
              <Instagram className="w-4 h-4" />
              Voir sur Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-12 flex justify-center">
      <div className="w-full max-w-3xl px-4">
        {/* Container avec isolation et optimisation pour éviter les reflows */}
        <div 
          className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800"
          style={{
            contain: 'layout style paint',
            willChange: 'contents',
            isolation: 'isolate',
            maxWidth: '100%'
          }}
        >
          {/* Header Instagram */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-[2px]">
            <div className="bg-black p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">Post Instagram</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Ouvrir dans Instagram
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Container de l'iframe avec hauteur fixe et isolation CSS */}
          <div 
            className="relative bg-black"
            style={{ 
              height: '1100px',
              minHeight: '1100px',
              maxHeight: '1100px',
              contain: 'strict',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden' // Optimisation rendering
            }}
          >
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black pointer-events-none">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Chargement du post Instagram...</p>
                </div>
              </div>
            )}
            
            {/* Iframe Instagram optimisé sans lazy loading */}
            <iframe
              ref={iframeRef}
              key={`instagram-${postId}`} // Clé unique stable
              src={`https://www.instagram.com/p/${postId}/embed`}
              className={`w-full transition-opacity duration-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                border: 'none',
                height: '1100px',
                minHeight: '1100px',
                backgroundColor: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                willChange: 'contents',
                transform: 'translateZ(0)' // Force GPU layer
              }}
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              // Pas de lazy loading pour éviter le déchargement
              // loading="lazy" SUPPRIMÉ
              onLoad={() => {
                setIsLoading(false);
                setTimeout(() => setHasLoaded(true), 100); // Petit délai pour transition douce
              }}
              title={`Instagram post ${postId}`}
              importance="high"
              fetchpriority="high"
              decoding="sync"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
            />
          </div>
        </div>
        
        {/* Caption optionnelle */}
        {caption && (
          <div className="mt-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400 italic">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mémorisation du composant pour éviter les re-renders inutiles
const InstagramEmbed = React.memo(InstagramEmbedBase, (prevProps, nextProps) => {
  // Re-render uniquement si l'URL ou la caption change
  return prevProps.url === nextProps.url && prevProps.caption === nextProps.caption;
});

export default InstagramEmbed;