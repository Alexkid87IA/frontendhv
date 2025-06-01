import { sanityClient } from './sanityClient';
import { SanityArticle, SanityDebate, SanityPodcast, SanityCaseStudy, SanitySuccessStory, SanityUniverse, SanityClubFeature, SanityClubPricing, SanityQuote } from '../types/sanity';

// Cache pour les requêtes fréquentes
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes en millisecondes

/**
 * Fonction utilitaire pour récupérer des données avec cache
 * @param cacheKey Clé de cache unique
 * @param fetchFunction Fonction asynchrone qui récupère les données
 * @returns Les données, soit depuis le cache soit depuis la fonction de récupération
 */
async function getWithCache<T>(cacheKey: string, fetchFunction: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cachedItem = cache[cacheKey];
  
  // Si les données sont en cache et pas expirées, les retourner
  if (cachedItem && now - cachedItem.timestamp < CACHE_DURATION) {
    console.log(`Utilisation du cache pour ${cacheKey}`);
    return cachedItem.data as T;
  }
  
  // Sinon, récupérer les données et les mettre en cache
  try {
    const data = await fetchFunction();
    cache[cacheKey] = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${cacheKey}:`, error);
    throw error;
  }
}

/**
 * Vide le cache pour une clé spécifique ou tout le cache
 * @param cacheKey Clé de cache à vider (optionnel, si non fourni, vide tout le cache)
 */
export function clearCache(cacheKey?: string): void {
  if (cacheKey) {
    delete cache[cacheKey];
    console.log(`Cache vidé pour ${cacheKey}`);
  } else {
    Object.keys(cache).forEach(key => delete cache[key]);
    console.log('Cache entièrement vidé');
  }
}

// Récupérer tous les articles
export const getAllArticles = async (): Promise<SanityArticle[]> => {
  return getWithCache('allArticles', async () => {
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
  });
};

// Récupérer un article par son slug
export const getArticleBySlug = async (slug: string): Promise<SanityArticle | null> => {
  return getWithCache(`article_${slug}`, async () => {
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
  });
};

// Récupérer les articles par catégorie
export const getArticlesByCategory = async (categorySlug: string): Promise<SanityArticle[]> => {
  return getWithCache(`articles_category_${categorySlug}`, async () => {
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
  });
};

// Récupérer une catégorie par son slug
export const getCategoryBySlug = async (slug: string) => {
  return getWithCache(`category_${slug}`, async () => {
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
  });
};

// Récupérer les amuses-bouches
export const getAmuseBouches = async (limit = 5): Promise<any[]> => {
  return getWithCache(`amuseBouches_${limit}`, async () => {
    try {
      // Chercher directement le type amuseBouche
      const query = `*[_type == "amuseBouche"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        coverImage,
        description,
        publishedAt,
        duration,
        videoUrl
      }`;
      
      const results = await sanityClient.fetch(query, { limit });
      return results || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des amuses-bouches:", error);
      return [];
    }
  });
};

// Récupérer la citation la plus récente
export const getLatestQuote = async (): Promise<SanityQuote | null> => {
  return getWithCache('latestQuote', async () => {
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
  });
};

// Récupérer le débat à la une
export const getFeaturedDebate = async (): Promise<SanityDebate | null> => {
  return getWithCache('featuredDebate', async () => {
    try {
      const query = `*[_type == "debate" && isActive == true] | order(publishedAt desc)[0] {
        _id,
        "title": question,
        description,
        "image": forPerson.image,
        slug,
        "opinions": [
          {
            "position": "Pour",
            "author": {
              "name": forPerson.name,
              "role": forPerson.role,
              "image": forPerson.image
            },
            "arguments": [forPerson.argument],
            "votes": coalesce(stats.votesFor, 0)
          },
          {
            "position": "Contre",
            "author": {
              "name": againstPerson.name,
              "role": againstPerson.role,
              "image": againstPerson.image
            },
            "arguments": [againstPerson.argument],
            "votes": coalesce(stats.votesAgainst, 0)
          }
        ],
        "moderator": {
          "name": "Roger Ormières",
          "role": "Modérateur",
          "image": forPerson.image
        },
        "stats": {
          "totalVotes": coalesce(stats.votesFor, 0) + coalesce(stats.votesAgainst, 0),
          "comments": coalesce(stats.comments, 0),
          "shares": "1.2K"
        }
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération du débat à la une:", error);
      return null;
    }
  });
};

// Récupérer les univers éditoriaux
export const getUniverses = async (): Promise<SanityUniverse[]> => {
  return getWithCache('universes', async () => {
    try {
      const query = `*[_type == "universe"] | order(order asc) {
        _id,
        title,
        description,
        image,
        slug,
        order
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération des univers:", error);
      return [];
    }
  });
};

// Récupérer les fonctionnalités du club
export const getClubFeatures = async (): Promise<SanityClubFeature[]> => {
  return getWithCache('clubFeatures', async () => {
    try {
      const query = `*[_type == "clubFeature"] | order(order asc) {
        _id,
        title,
        description,
        icon,
        order
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération des fonctionnalités du club:", error);
      return [];
    }
  });
};

// Récupérer les tarifs du club
export const getClubPricing = async (): Promise<SanityClubPricing[]> => {
  return getWithCache('clubPricing', async () => {
    try {
      const query = `*[_type == "clubPricing"] | order(price asc) {
        _id,
        price,
        currency,
        period,
        features,
        isActive
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération des tarifs du club:", error);
      return [];
    }
  });
};

// Récupérer les contenus par type (podcast, études de cas, success stories)
export const getContentItems = async (contentType: string, limit = 5): Promise<any[]> => {
  return getWithCache(`contentItems_${contentType}_${limit}`, async () => {
    try {
      // Requête qui résout les références pour obtenir le titre du type de section
      const query = `*[_type == "article"] {
        _id,
        title,
        mainImage,
        excerpt,
        slug,
        "sectionTypeTitle": sectionType->title,
        "typeDeSection": typeDeSection->title,
        "typeTitle": type->title
      }`;
      
      const allArticles = await sanityClient.fetch(query);
      console.log(`Total articles récupérés: ${allArticles.length}`);
      
      // Afficher un exemple pour debug
      if (allArticles.length > 0) {
        console.log(`Exemple d'article avec types résolus:`, allArticles[0]);
      }
      
      // Mapping des types recherchés vers les valeurs possibles dans Sanity
      const typeMapping: Record<string, string[]> = {
        'emission': ['Emission', 'emission', 'Émission', 'Podcast'],
        'business-idea': ['Business Idea', 'business-idea', 'Business idea', 'BusinessIdea', 'Étude de cas'],
        'success-story': ['Success Story', 'success-story', 'Success story', 'SuccessStory']
      };
      
      const validTypes = typeMapping[contentType] || [];
      console.log(`Recherche pour ${contentType}, valeurs acceptées:`, validTypes);
      
      // Filtrer les articles selon le type
      const filtered = allArticles.filter((article: any) => {
        const sectionType = article.sectionTypeTitle || 
                          article.typeDeSection || 
                          article.typeTitle;
        
        if (sectionType) {
          console.log(`Article "${article.title}" a le type résolu:`, sectionType);
        }
        
        return validTypes.some(validType => 
          sectionType && sectionType.toLowerCase() === validType.toLowerCase()
        );
      }).slice(0, limit);
      
      console.log(`Articles trouvés pour ${contentType}: ${filtered.length}`);
      
      // Si toujours pas de résultats, affichons tous les types disponibles
      if (filtered.length === 0) {
        const allTypes = allArticles
          .map((a: any) => a.sectionTypeTitle || a.typeDeSection || a.typeTitle)
          .filter(Boolean);
        console.log(`Aucun article trouvé. Types disponibles dans Sanity:`, [...new Set(allTypes)]);
      }
      
      return filtered;
    } catch (error) {
      console.error(`Erreur lors de la récupération des contenus de type ${contentType}:`, error);
      return [];
    }
  });
};