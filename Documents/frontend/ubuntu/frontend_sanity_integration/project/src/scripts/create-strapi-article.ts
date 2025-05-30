import { createArticle } from '../utils/strapi';
import { strapiArticleContent } from '../data/strapi-article';

const createStrapiArticle = async () => {
  try {
    console.log('Creating Strapi article...');
    const result = await createArticle(strapiArticleContent);
    console.log('Article created successfully:', result);
  } catch (error) {
    console.error('Failed to create article:', error);
  }
};

createStrapiArticle();