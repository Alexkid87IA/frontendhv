// src/lib/sanityClient.ts
// Assurez-vous d'installer @sanity/client et @sanity/image-url
// npm install @sanity/client @sanity/image-url
// ou
// yarn add @sanity/client @sanity/image-url

import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'z9wsynas',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03', // Utilisez une date API récente
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  if (!source || !source.asset) {
    // Vous pouvez retourner une URL d'image placeholder par défaut ici si vous le souhaitez
    // Par exemple: return 'https://via.placeholder.com/400x300?text=Image+Indisponible';
    return undefined; 
  }
  return builder.image(source)
}

