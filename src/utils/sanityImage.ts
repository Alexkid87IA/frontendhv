import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "../pages/ArticlePage";

// Create a single Sanity client instance with the provided credentials
export const sanityClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  apiVersion: "2024-05-13",
  useCdn: true,
  perspective: "published",
  cors: true
});

// Create a reusable image builder instance
const builder = imageUrlBuilder(sanityClient);

/**
 * Vérifie si un objet est une image Sanity valide
 * @param source Objet à vérifier
 * @returns boolean indiquant si l'objet est une image Sanity valide
 */
export function isValidSanityImage(source: any): boolean {
  if (!source) return false;
  
  // Si c'est une string, ce n'est pas un objet image Sanity valide pour builder
  if (typeof source === 'string') return false;
  
  // Vérifier si l'objet a la structure minimale requise pour une image Sanity
  return !!(source && source.asset && source.asset._ref);
}

/**
 * Retourne un builder d'image pour une manipulation sécurisée
 * ou undefined si l'image n'est pas valide
 * @param source Source de l'image
 * @returns Builder d'image ou undefined
 */
export function getImageBuilder(source: any) {
  if (!isValidSanityImage(source)) return undefined;
  
  try {
    return builder.image(source);
  } catch (error) {
    console.error("Erreur lors de la création du builder d'image:", error);
    return undefined;
  }
}

/**
 * Génère une URL d'image sécurisée avec fallback
 * @param source Source de l'image
 * @param width Largeur optionnelle
 * @param height Hauteur optionnelle
 * @returns URL de l'image ou URL de placeholder
 */
export function urlFor(source: any, width?: number, height?: number): string {
  // Si la source n'est pas valide, retourner une image placeholder
  if (!isValidSanityImage(source)) {
    const size = width && height ? `${width}x${height}` : '800x450';
    return `https://via.placeholder.com/${size}?text=Image+Indisponible`;
  }
  
  try {
    let imageBuilder = builder.image(source);
    
    // Appliquer les dimensions si spécifiées
    if (width) imageBuilder = imageBuilder.width(width);
    if (height) imageBuilder = imageBuilder.height(height);
    
    return imageBuilder.auto('format').url();
  } catch (error) {
    console.error("Erreur lors de la génération de l'URL de l'image:", error);
    const size = width && height ? `${width}x${height}` : '800x450';
    return `https://via.placeholder.com/${size}?text=Erreur+Image`;
  }
}

// Export le builder pour les cas où l'accès direct est nécessaire
export { builder as imageBuilder };
