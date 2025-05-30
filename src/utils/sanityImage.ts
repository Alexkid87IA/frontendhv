import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from './sanityClient';

// Créer un builder d'URL d'image
const builder = imageUrlBuilder(sanityClient);

/**
 * Vérifie si une valeur est une image Sanity valide
 * @param source - La source à vérifier
 * @returns true si c'est une image Sanity valide, false sinon
 */
export function isValidSanityImage(source: any): boolean {
  if (!source) return false;
  
  // Si c'est une chaîne et que c'est une URL, c'est valide
  if (typeof source === 'string') {
    return source.startsWith('http://') || source.startsWith('https://');
  }
  
  // Vérifier si c'est un objet d'image Sanity avec un asset
  return (
    typeof source === 'object' && 
    source !== null && 
    (source.asset || source._type === 'image')
  );
}

/**
 * Génère une URL pour une image Sanity
 * @param source - La source de l'image (objet Sanity ou URL)
 * @returns L'URL de l'image ou une URL de placeholder si invalide
 */
export function urlFor(source: any): any {
  if (!source) {
    return {
      url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible",
      width: () => ({ height: () => ({ fit: () => ({ url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible" }) }) })
    };
  }
  
  // Si c'est déjà une URL
  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return {
        url: () => source,
        width: () => ({ height: () => ({ fit: () => ({ url: () => source }) }) })
      };
    }
    return {
      url: () => "https://via.placeholder.com/800x450?text=URL+invalide",
      width: () => ({ height: () => ({ fit: () => ({ url: () => "https://via.placeholder.com/800x450?text=URL+invalide" }) }) })
    };
  }
  
  // Si c'est un objet d'image Sanity valide
  if (isValidSanityImage(source)) {
    return builder.image(source as SanityImageSource);
  }
  
  // Fallback pour les cas non gérés
  return {
    url: () => "https://via.placeholder.com/800x450?text=Format+invalide",
    width: () => ({ height: () => ({ fit: () => ({ url: () => "https://via.placeholder.com/800x450?text=Format+invalide" }) }) })
  };
}