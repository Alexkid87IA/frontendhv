import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanityClient'; // Assurez-vous que sanityClient est exporté depuis ce fichier

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}
