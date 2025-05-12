import { sanityClient } from "./sanityClient";
import groq from "groq";

// Exemple de fonction pour récupérer tous les articles
export async function getAllArticles() {
  const query = groq`*[_type == "article"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "category": category->{title, slug},
    "author": author->{name, slug, image},
    "tags": tags[]->{title, slug}
  } | order(publishedAt desc)`;
  try {
    const articles = await sanityClient.fetch(query);
    return articles;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  const query = groq`*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    body,
    publishedAt,
    "category": category->{title, slug},
    "author": author->{name, slug, image, bio},
    "tags": tags[]->{title, slug}
  }`;
  try {
    const article = await sanityClient.fetch(query, { slug });
    return article;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${slug}:`, error);
    return null;
  }
}

// Fonctions pour les autres types de contenu (catégories, auteurs, podcasts, citations, etc.) à ajouter ici

export async function getAllCategories() {
  const query = groq`*[_type == "category"]{
    _id,
    title,
    slug,
    description
  } | order(title asc)`;
  try {
    const categories = await sanityClient.fetch(query);
    return categories;
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return [];
  }
}

export async function getAllPodcasts() {
  const query = groq`*[_type == "podcast"]{
    _id,
    title,
    slug,
    description,
    coverImage,
    videoUrl,
    duration,
    views,
    publishedAt,
    "category": category->{title, slug},
    "tags": tags[]->{title, slug}
  } | order(publishedAt desc)`;
  try {
    const podcasts = await sanityClient.fetch(query);
    return podcasts;
  } catch (error) {
    console.error("Erreur lors de la récupération des podcasts:", error);
    return [];
  }
}

export async function getLatestQuote() {
  const query = groq`*[_type == "quote"] | order(dateDisplayed desc, _createdAt desc)[0]{
    _id,
    text,
    author,
    role
  }`;
  try {
    const quote = await sanityClient.fetch(query);
    return quote;
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation:", error);
    return null;
  }
}

// Pour la section "Amuse-bouche" (articles avec format "amuse-bouche")
export async function getAmuseBouches(limit = 5) {
  const query = groq`*[_type == "article" && format == "amuse-bouche"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "category": category->{title, slug}
  } | order(publishedAt desc)[0...$limit]`;
  try {
    const articles = await sanityClient.fetch(query, { limit });
    return articles;
  } catch (error) {
    console.error("Erreur lors de la récupération des amuses-bouches:", error);
    return [];
  }
}

// Pour la section "Essentiels"
export async function getEssentialArticles() {
  const query = groq`*[_type == "article" && isEssential == true]{
    _id,
    title,
    slug,
    excerpt,
    orderInEssentials
  } | order(orderInEssentials asc)`;
  try {
    const articles = await sanityClient.fetch(query);
    return articles;
  } catch (error) {
    console.error("Erreur lors de la récupération des articles essentiels:", error);
    return [];
  }
}

