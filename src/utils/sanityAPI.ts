import { sanityClient } from './sanityClient';
import type { SanityArticle, SanityQuote } from '../pages/ArticlePage';

export async function getAllArticles(): Promise<SanityArticle[]> {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, slug, image }
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching all articles:", error);
    throw error;
  }
}

export async function getArticlesByCategory(categorySlug: string): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, slug, image }
  }`;

  try {
    return await sanityClient.fetch(query, { categorySlug });
  } catch (error) {
    console.error("Error fetching articles by category:", error);
    throw error;
  }
}

export async function getCategoryBySlug(slug: string): Promise<any | null> {
  const query = `*[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching category by slug:", error);
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | null> {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    body,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, slug, image, bio }
  }`;

  try {
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
}

export async function getLatestQuote(): Promise<SanityQuote | null> {
  const query = `*[_type == "quote"] | order(dateDisplayed desc, _createdAt desc)[0]{
    _id,
    text,
    author,
    role
  }`;

  try {
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching latest quote:", error);
    throw error;
  }
}

export async function getAmuseBouches(limit: number = 10): Promise<SanityArticle[]> {
  const query = `*[_type == "article" && format == "amuse-bouche"]{
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ title, slug }
  } | order(publishedAt desc)[0...$limit]`;

  try {
    return await sanityClient.fetch(query, { limit });
  } catch (error) {
    console.error("Error fetching amuse-bouches:", error);
    throw error;
  }
}
