import React, { useState } from 'react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor, isValidSanityImage } from '../../utils/sanityImage';

interface SafeImageProps {
  image: any;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackText?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Composant sécurisé pour afficher des images Sanity avec gestion des erreurs
 * et fallback automatique en cas d'image invalide ou d'erreur de chargement
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  image,
  alt,
  width = 800,
  height = 600,
  className = '',
  fallbackText,
  objectFit = 'cover'
}) => {
  const [hasError, setHasError] = useState(false);
  
  // Texte à afficher en cas d'image manquante
  const displayText = fallbackText || 'Image non disponible';
  
  // Vérifier si l'image est valide
  const isValid = isValidSanityImage(image);
  
  // Si l'image n'est pas valide ou a généré une erreur, afficher un placeholder
  if (!isValid || hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: `${height}px` }}
      >
        <span className="text-sm text-center px-4">{displayText}</span>
      </div>
    );
  }
  
  // Générer l'URL de l'image avec les dimensions spécifiées
  let imageUrl;
  try {
    imageUrl = urlFor(image).width(width).height(height).url();
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL de l\'image:', error);
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center text-gray-500 ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: `${height}px` }}
      >
        <span className="text-sm text-center px-4">{displayText}</span>
      </div>
    );
  }
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{ objectFit }}
      width={width}
      height={height}
      onError={() => setHasError(true)}
      loading="lazy"
    />
  );
};

export default SafeImage;
