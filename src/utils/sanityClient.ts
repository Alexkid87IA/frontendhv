import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "../pages/ArticlePage";

// Create a single Sanity client instance with the provided credentials
export const sanityClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  apiVersion: "2024-05-13",
  useCdn: true,
  // Remove token requirement since we're only doing public reads
  perspective: "published",
  cors: true // Enable CORS support
});

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