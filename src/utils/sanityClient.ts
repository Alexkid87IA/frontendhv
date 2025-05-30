import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "../pages/ArticlePage";

// Create a single Sanity client instance with the provided credentials
export const sanityClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  apiVersion: "2024-05-13",
  useCdn: true, // Set to true to use the CDN for better performance with public data
  perspective: "published"
});

// Create a reusable image builder instance
const builder = imageUrlBuilder(sanityClient);

// Unified urlFor function for image URL generation
export function urlFor(source: SanityImage | string | undefined): string {
  if (!source) {
    return "https://via.placeholder.com/800x450?text=Image+non+disponible";
  }
  
  if (typeof source === 'string') {
    if (source.startsWith('http://') || source.startsWith('https://')) {
      return source;
    }
    return "https://via.placeholder.com/800x450?text=Source+invalide";
  }
  
  if ((source as SanityImage).asset) {
    return builder.image(source).auto('format').url();
  }
  
  return "https://via.placeholder.com/800x450?text=Source+image+invalide";
}

// Export the builder for cases where direct access is needed
export { builder as imageBuilder };