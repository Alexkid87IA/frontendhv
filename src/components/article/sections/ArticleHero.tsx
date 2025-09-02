// src/components/article/sections/ArticleHero.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar } from "lucide-react";
import { SanityArticle, VerticalColors } from "../../../types/article.types";
import { buildSanityImageUrl } from "../../../utils/articleUtils";

interface ArticleHeroProps {
  article: SanityArticle;
  colors: VerticalColors;
}

// Fonction pour calculer la position de l'image basée sur le hotspot
const getHotspotPosition = (hotspot: any) => {
  if (!hotspot) {
    // Position par défaut si pas de hotspot
    return 'center center';
  }
  
  // Convertir les coordonnées du hotspot (0-1) en pourcentages CSS
  const x = Math.round(hotspot.x * 100);
  const y = Math.round(hotspot.y * 100);
  
  return `${x}% ${y}%`;
};

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, colors }) => {
  // Récupérer le hotspot s'il existe
  const hotspot = article.mainImage?.hotspot;
  const imagePosition = getHotspotPosition(hotspot);
  
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-end overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Container de l'image avec hotspot */}
      <div className="absolute inset-0">
        {article.mainImage && article.mainImage.asset && article.mainImage.asset._ref ? (
          <>
            {/* Image unique avec hotspot pour desktop et mobile */}
            <img 
              src={buildSanityImageUrl(article.mainImage.asset._ref)}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                opacity: 0.9,
                // Utilise la position du hotspot définie dans Sanity
                objectPosition: imagePosition
              }}
              onError={(e) => {
                console.error("Erreur chargement image:", e);
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80";
              }}
            />
            
            {/* Debug info - À enlever en production */}
            {process.env.NODE_ENV === 'development' && hotspot && (
              <div className="absolute top-4 right-4 bg-black/70 text-white text-xs p-2 rounded">
                Hotspot: {Math.round(hotspot.x * 100)}% x {Math.round(hotspot.y * 100)}%
              </div>
            )}
          </>
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Article background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              opacity: 0.9,
              objectPosition: 'center 30%'
            }}
          />
        )}
        
        {/* Gradients très légers pour bien voir l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Overlay minimal uniquement sur le tiers inférieur pour le texte */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Contenu Hero avec plus d'espace */}
      <div className="relative container mx-auto px-4 pb-16 pt-48">
        {/* Breadcrumb plus visible avec meilleur contraste */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm mb-8 backdrop-blur-md bg-black/50 rounded-full px-5 py-2.5 w-fit border border-white/20"
        >
          <Link to="/" className="text-white font-medium hover:text-gray-200 transition-colors">Accueil</Link>
          <ChevronRight size={16} className="text-gray-400" />
          <Link to="/articles" className="text-white font-medium hover:text-gray-200 transition-colors">Articles</Link>
          {article.categories && article.categories[0] && (
            <>
              <ChevronRight size={16} className="text-gray-400" />
              <Link 
                to={`/rubrique/${article.categories[0].slug.current}`}
                className="font-semibold transition-colors"
                style={{ color: colors.textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                  e.currentTarget.style.textShadow = `0 0 20px ${colors.primary}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.textColor;
                  e.currentTarget.style.textShadow = 'none';
                }}
              >
                {article.categories[0].title}
              </Link>
            </>
          )}
        </motion.div>

        {/* Titre qui prend toute la largeur */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 max-w-full lg:max-w-[90%] leading-[1.1] tracking-tight"
        >
          {article.title}
        </motion.h1>

        {/* Meta info simplifiée - seulement date */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-4 text-gray-300 text-sm"
        >
          {article.publishedAt && (
            <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Calendar size={14} />
              {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleHero;