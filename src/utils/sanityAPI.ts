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
    console.log("Fetching all articles from Sanity...");
    const articles = await sanityClient.fetch(query);
    console.log(`Successfully fetched ${articles.length} articles from Sanity`);
    return articles;
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
    console.log(`Fetching articles for category: ${categorySlug}`);
    const articles = await sanityClient.fetch(query, { categorySlug });
    console.log(`Successfully fetched ${articles.length} articles for category: ${categorySlug}`);
    return articles;
  } catch (error) {
    console.error(`Error fetching articles for category ${categorySlug}:`, error);
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
    console.log(`Fetching category details for slug: ${slug}`);
    const category = await sanityClient.fetch(query, { slug });
    console.log(`Category details for ${slug}:`, category ? "Found" : "Not found");
    return category;
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error);
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
