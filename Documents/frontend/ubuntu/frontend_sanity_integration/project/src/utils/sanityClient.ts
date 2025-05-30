import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "z9wsynas", // Remplacez par votre Project ID Sanity
  dataset: "production", // Remplacez par votre Dataset Sanity
  apiVersion: "2024-05-13", // Utilisez la date d'aujourd'hui ou la date de la dernière mise à jour majeure de l'API
  useCdn: false, // `false` si vous voulez toujours les données les plus fraîches
});

