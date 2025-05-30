import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Category {
  _id: string;
  title: string;
}

interface ArticleCardProps {
  article: {
    slug?: { current: string };
    mainImage?: any;
    title: string;
    categories?: Category[];
    excerpt?: string;
  };
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = () => {
    if (!article.mainImage) return "https://via.placeholder.com/400x300?text=Image+Indisponible";
    
    // Si c'est déjà une URL complète
    if (typeof article.mainImage === 'string') {
      return article.mainImage;
    }
    
    // Si c'est un objet Sanity avec asset
    if (article.mainImage.asset && article.mainImage.asset.url) {
      return article.mainImage.asset.url;
    }
    
    return "https://via.placeholder.com/400x300?text=Image+Indisponible";
  };

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Link to={`/article/${article.slug?.current || ''}`}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={getImageUrl()}
            alt={article.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-4">
          {/* Affichage des badges de catégories avec couleurs Tailwind standard */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.categories && article.categories.length > 0 ? (
              article.categories.map((category, index) => (
                <span 
                  key={category._id} 
                  className={`px-2 py-1 text-xs font-medium rounded-full text-white ${
                    ["bg-purple-600", "bg-pink-600", "bg-blue-500", "bg-green-500"][index % 4]
                  }`}
                >
                  {category.title}
                </span>
              ))
            ) : (
              <span className="text-purple-400 text-sm font-inter uppercase tracking-wider">
                Sans catégorie
              </span>
            )}
          </div>
          
          <h3 className="mt-2 text-xl font-montserrat font-bold line-clamp-2 text-white group-hover:text-pink-500 transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-gray-300 line-clamp-3">
            {article.excerpt || ''}
          </p>
        </div>
      </Link>
    </motion.article>
  );
};