// src/lib/sanityClient.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "z9wsynas",
  dataset: "production",
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2023-05-03", // Utilisez une date API récente
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  if (!source || !source.asset) {
    // Retourner une URL d'image placeholder valide
    return "https://via.placeholder.com/400x300?text=Image+Indisponible";
  }
  return builder.image(source );
}
