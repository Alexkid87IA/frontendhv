// src/components/article/ui/ArticleCTA.tsx
import React from "react";
import { VerticalColors } from "../../../types/article.types";

interface ArticleCTAProps {
  colors: VerticalColors;
  variant?: 'desktop' | 'mobile';
}

const ArticleCTA: React.FC<ArticleCTAProps> = ({ colors, variant = 'desktop' }) => {
  const containerClass = variant === 'mobile' ? 'lg:hidden mt-12' : '';
  
  return (
    <div className={containerClass}>
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="absolute inset-0 opacity-90"
          style={{ background: colors.bgGradient }}
        />
        {/* Pattern décoratif */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16">
            <div className="w-full h-full bg-white rounded-lg" />
          </div>
          <div className="absolute bottom-0 left-0 w-32 h-32 transform rotate-45 -translate-x-16 translate-y-16">
            <div className="w-full h-full bg-white rounded-lg" />
          </div>
        </div>
        
        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-white/20 rounded text-xs font-semibold text-white uppercase">
              Le Club Élite
            </span>
            <span className="px-2 py-1 bg-orange-500 text-black rounded text-xs font-bold">
              -50%
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            Rejoindre la liste d'attente
          </h3>
          <p className="text-white/90 text-sm mb-4">
            L'écosystème premium pour les entrepreneurs d'exception. 500+ inscrits sur liste d'attente.
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-3xl font-bold text-white">99€</p>
              <p className="text-xs text-white/70">/mois</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70 line-through">199€</p>
              <p className="text-xs text-yellow-400 font-semibold">Offre fondateurs</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="text-yellow-400">✔</span>
              <span>Accès VIP aux contenus</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="text-yellow-400">✔</span>
              <span>Communauté privée</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <span className="text-yellow-400">✔</span>
              <span>Events mensuels exclusifs</span>
            </div>
          </div>
          
          <button 
            className="w-full py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105"
            onClick={() => window.location.href = '/le-club'}
          >
            🚀 Rejoindre la liste d'attente
          </button>
          
          <p className="text-xs text-white/60 text-center mt-3">
            7 jours d'essai • Sans engagement
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCTA;