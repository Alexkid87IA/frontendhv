import { sanityClient } from './sanityClient';

// Récupérer tous les articles
export const getAllArticles = async () => {
  try {
    const query = `*[_type == "article"] | order(publishedAt desc) {
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
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles:", error);
    return [];
  }
};

// Récupérer un article par son slug
export const getArticleBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      body,
      excerpt,
      publishedAt,
      categories[]->{
        _id,
        title,
        slug
      },
      author->{
        _id,
        name,
        image,
        bio
      }
    }`;
    
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'article ${slug}:`, error);
    return null;
  }
};

// Récupérer les articles par catégorie
export const getArticlesByCategory = async (categorySlug: string) => {
  try {
    const query = `*[_type == "article" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
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
    }`;
    
    return await sanityClient.fetch(query, { categorySlug });
  } catch (error) {
    console.error(`Erreur lors de la récupération des articles de la catégorie ${categorySlug}:`, error);
    return [];
  }
};

// Récupérer une catégorie par son slug
export const getCategoryBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "category" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description
    }`;
    
    return await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error(`Erreur lors de la récupération de la catégorie ${slug}:`, error);
    return null;
  }
};

// Récupérer les amuses-bouches
export const getAmuseBouches = async (limit = 5) => {
  try {
    const query = `*[_type == "article" && defined(categories) && "amuse-bouche" in categories[]->slug.current] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt
    }`;
    
    return await sanityClient.fetch(query, { limit });
  } catch (error) {
    console.error("Erreur lors de la récupération des amuses-bouches:", error);
    return [];
  }
};

// Récupérer la citation la plus récente
export const getLatestQuote = async () => {
  try {
    const query = `*[_type == "quote"] | order(publishedAt desc)[0] {
      _id,
      text,
      author,
      publishedAt
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Erreur lors de la récupération de la citation:", error);
    return null;
  }
};

// Récupérer le débat à la une
export const getFeaturedDebate = async () => {
  try {
    const query = `*[_type == "debate" && featured == true][0] {
      _id,
      title,
      description,
      image,
      slug,
      opinions,
      moderator,
      stats
    }`;
    
    return await sanityClient.fetch(query);
  } catch (error) {
    console.error("Erreur lors de la récupération du débat à la une:", error);
    return null;
  }
};
