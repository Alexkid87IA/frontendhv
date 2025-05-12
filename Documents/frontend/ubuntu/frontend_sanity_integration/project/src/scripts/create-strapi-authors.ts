import { createAuthor } from '../utils/strapi';
import { authors } from '../data/strapi-authors';

const createStrapiAuthors = async () => {
  try {
    console.log('Creating Strapi authors...');
    
    for (const author of authors) {
      console.log(`Creating author: ${author.name}`);
      const result = await createAuthor(author);
      console.log('Author created successfully:', result);
    }
    
    console.log('All authors created successfully!');
  } catch (error) {
    console.error('Failed to create authors:', error);
  }
};

createStrapiAuthors();