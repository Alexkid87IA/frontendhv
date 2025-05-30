/**
 * Utilitaire robuste pour la gestion des images Sanity
 * Fournit des méthodes sécurisées pour manipuler les images et gérer les cas d'erreur
 */

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './sanityClient';

// Créer un constructeur d'URL d'image à partir du client Sanity
const builder = imageUrlBuilder(client);

// Type pour les images Sanity
export interface SanityImage {
  _type: string;
  asset?: {
    _ref: string;
    _type: string;
  };
  // Autres propriétés possibles
  hotspot?: any;
  crop?: any;
}

/**
 * Vérifie si un objet est une image Sanity valide
 */
export const isValidSanityImage = (image: any): boolean => {
  return (
    image &&
    typeof image === 'object' &&
    image._type === 'image' &&
    image.asset &&
    typeof image.asset === 'object' &&
    image.asset._ref &&
    typeof image.asset._ref === 'string'
  );
};

/**
 * Génère une URL pour une image Sanity avec gestion d'erreur
 * Retourne une URL d'image placeholder si l'image est invalide
 */
export const urlFor = (source: SanityImageSource | null | undefined): any => {
  try {
    // Si la source est invalide, retourner un objet avec des méthodes de fallback
    if (!source) {
      return {
        url: () => 'https://placehold.co/600x400?text=Image+non+disponible',
        width: () => 600,
        height: () => 400,
        format: () => ({ url: () => 'https://placehold.co/600x400?text=Image+non+disponible' }),
        auto: () => ({ url: () => 'https://placehold.co/600x400?text=Image+non+disponible' }),
        fit: () => ({ url: () => 'https://placehold.co/600x400?text=Image+non+disponible' }),
      };
    }

    // Utiliser le builder pour générer l'URL
    return builder.image(source);
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL de l\'image:', error);
    
    // Retourner un objet avec des méthodes de fallback en cas d'erreur
    return {
      url: () => 'https://placehold.co/600x400?text=Erreur+image',
      width: () => 600,
      height: () => 400,
      format: () => ({ url: () => 'https://placehold.co/600x400?text=Erreur+image' }),
      auto: () => ({ url: () => 'https://placehold.co/600x400?text=Erreur+image' }),
      fit: () => ({ url: () => 'https://placehold.co/600x400?text=Erreur+image' }),
    };
  }
};

/**
 * Génère une URL d'image avec dimensions spécifiques et gestion d'erreur
 */
export const getImageUrl = (
  image: SanityImage | null | undefined,
  width: number = 800,
  height: number = 600
): string => {
  try {
    if (!isValidSanityImage(image)) {
      return `https://placehold.co/${width}x${height}?text=Image+non+disponible`;
    }
    
    return urlFor(image).width(width).height(height).url();
  } catch (error) {
    console.error('Erreur lors de la génération de l\'URL de l\'image:', error);
    return `https://placehold.co/${width}x${height}?text=Erreur+image`;
  }
};

/**
 * Obtient les dimensions d'une image Sanity avec gestion d'erreur
 */
export const getImageDimensions = (
  image: SanityImage | null | undefined
): { width: number; height: number } => {
  try {
    if (!isValidSanityImage(image)) {
      return { width: 800, height: 600 };
    }
    
    // Logique pour extraire les dimensions réelles si disponibles
    // Pour l'instant, retourne des valeurs par défaut
    return { width: 800, height: 600 };
  } catch (error) {
    console.error('Erreur lors de l\'obtention des dimensions de l\'image:', error);
    return { width: 800, height: 600 };
  }
};

export default {
  urlFor,
  getImageUrl,
  getImageDimensions,
  isValidSanityImage
};
