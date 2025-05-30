import { sanityClient } from './sanityClient';

export const getAllArticles = async () => {
  try {
    const articles = await sanityClient.fetch(`
      *[_type == "article"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        categories[]->{
          _id,
          title,
          slug
        }
      }
    `);
    return articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export default {
  getAllArticles
};