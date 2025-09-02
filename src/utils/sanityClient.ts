import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Définition locale du type SanityImage
export interface SanityImage {
  asset?: {
    _ref?: string;
    _type?: string;
  };
  hotspot?: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  };
  crop?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}

// Client public pour les contenus publiés
export const sanityClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  apiVersion: "2024-05-13",
  useCdn: true,
  perspective: "published",
  cors: true
});

// Client preview pour les brouillons (avec token)
export const previewClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  apiVersion: "2024-05-13",
  useCdn: false, // Pas de CDN pour le preview
  perspective: "raw", // CHANGÉ : "raw" permet de voir tous les documents (publiés et brouillons)
  cors: true,
  token: import.meta.env.VITE_SANITY_PREVIEW_TOKEN || import.meta.env.VITE_SANITY_TOKEN || process.env.VITE_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true
});

// Logs de débogage pour vérifier le preview
console.log("🔑 Token preview chargé:", !!import.meta.env.VITE_SANITY_PREVIEW_TOKEN);
console.log("📋 Preview client configuré avec perspective:", previewClient.config().perspective);
console.log("🗂️ Dataset utilisé:", previewClient.config().dataset);

// Create a reusable image builder instance
const builder = imageUrlBuilder(sanityClient);

// Unified urlFor function for image URL generation
export function urlFor(source: SanityImage | string | undefined) {
  // Si pas de source, retourner un builder factice
  if (!source) {
    return {
      width: (w: number) => ({
        height: (h: number) => ({
          url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible"
        }),
        url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible"
      }),
      height: (h: number) => ({
        width: (w: number) => ({
          url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible"
        }),
        url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible"
      }),
      url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible",
      auto: (format: string) => ({
        url: () => "https://via.placeholder.com/800x450?text=Image+non+disponible"
      })
    };
  }
  
  // Si c'est une string (URL directe)
  if (typeof source === 'string') {
    const finalUrl = (source.startsWith('http://') || source.startsWith('https://')) 
      ? source 
      : "https://via.placeholder.com/800x450?text=Source+invalide";
    
    return {
      width: (w: number) => ({
        height: (h: number) => ({
          url: () => finalUrl
        }),
        url: () => finalUrl
      }),
      height: (h: number) => ({
        width: (w: number) => ({
          url: () => finalUrl
        }),
        url: () => finalUrl
      }),
      url: () => finalUrl,
      auto: (format: string) => ({
        url: () => finalUrl
      })
    };
  }
  
  // Si c'est un objet SanityImage avec asset
  if ((source as SanityImage).asset) {
    return builder.image(source);
  }
  
  // Fallback
  return {
    width: (w: number) => ({
      height: (h: number) => ({
        url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide"
      }),
      url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide"
    }),
    height: (h: number) => ({
      width: (w: number) => ({
        url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide"
      }),
      url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide"
    }),
    url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide",
    auto: (format: string) => ({
      url: () => "https://via.placeholder.com/800x450?text=Source+image+invalide"
    })
  };
}

// Export the builder for cases where direct access is needed
export { builder as imageBuilder };