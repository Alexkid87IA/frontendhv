import { sanityClient, previewClient } from './sanityClient';
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
        keyPoints,
        categories[]->{
          _id,
          title,
          slug
        },
        subcategories[]->{
          _id,
          title,
          slug,
          parentCategory->{
            _id,
            title,
            slug
          }
        }
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
      return [];
    }
  });
};

// Récupérer un article par son slug (modifié pour supporter le preview)
export const getArticleBySlug = async (slug: string, preview = false): Promise<SanityArticle | null> => {
  // Logs de débogage détaillés
  console.log("🔍 getArticleBySlug appelé avec:", { slug, preview });
  
  // Si preview, utiliser le client preview sans cache
  if (preview) {
    try {
      // Log pour vérifier le client utilisé
      console.log("🔍 Utilisation du previewClient");
      console.log("📊 Configuration du previewClient:", {
        dataset: previewClient.config().dataset,
        perspective: previewClient.config().perspective,
        hasToken: !!previewClient.config().token
      });
      
      // Requête modifiée pour chercher aussi les brouillons
      const query = `*[_type == "article" && slug.current == $slug][0] {
        _id,
        _rev,
        _type,
        title,
        slug,
        mainImage,
        body,
        excerpt,
        publishedAt,
        keyPoints,
        categories[]->{
          _id,
          title,
          slug
        },
        subcategories[]->{
          _id,
          title,
          slug,
          parentCategory->{
            _id,
            title,
            slug
          }
        },
        author->{
          _id,
          name,
          image,
          bio
        }
      }`;
      
      console.log("🔍 Exécution de la requête preview pour slug:", slug);
      console.log("🔎 Requête GROQ:", query);
      
      const result = await previewClient.fetch(query, { slug });
      
      console.log("✅ Résultat de la requête preview:", {
        found: !!result,
        id: result?._id,
        title: result?.title,
        keyPoints: result?.keyPoints,
        isPublished: result?._id && !result._id.startsWith('drafts.')
      });
      
      // Si pas de résultat, essayer de chercher spécifiquement les brouillons
      if (!result) {
        console.log("⚠️ Aucun article trouvé, recherche des brouillons...");
        
        const draftQuery = `*[_type == "article" && (_id match "drafts.*") && slug.current == $slug][0] {
          _id,
          _rev,
          _type,
          title,
          slug,
          mainImage,
          body,
          excerpt,
          publishedAt,
          keyPoints,
          categories[]->{
            _id,
            title,
            slug
          },
          subcategories[]->{
            _id,
            title,
            slug,
            parentCategory->{
              _id,
              title,
              slug
            }
          },
          author->{
            _id,
            name,
            image,
            bio
          }
        }`;
        
        console.log("🔎 Requête spécifique brouillons:", draftQuery);
        const draftResult = await previewClient.fetch(draftQuery, { slug });
        
        console.log("📋 Résultat recherche brouillons:", {
          found: !!draftResult,
          id: draftResult?._id,
          keyPoints: draftResult?.keyPoints
        });
        
        return draftResult;
      }
      
      return result;
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération preview de l'article ${slug}:`, error);
      console.error("Détails de l'erreur:", error);
      return null;
    }
  }
  
  // Mode normal avec cache
  console.log("📚 Utilisation du mode normal (avec cache)");
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
        keyPoints,
        categories[]->{
          _id,
          title,
          slug
        },
        subcategories[]->{
          _id,
          title,
          slug,
          parentCategory->{
            _id,
            title,
            slug
          }
        },
        author->{
          _id,
          name,
          image,
          bio
        }
      }`;
      
      const result = await sanityClient.fetch(query, { slug });
      console.log("📋 Article récupéré avec keyPoints:", result?.keyPoints);
      return result;
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
      // D'abord, on trouve la catégorie pour avoir son _id
      const categoryQuery = `*[_type == "category" && slug.current == $categorySlug][0]._id`;
      const categoryId = await sanityClient.fetch(categoryQuery, { categorySlug });
      
      if (!categoryId) {
        console.log(`Catégorie non trouvée pour le slug: ${categorySlug}`);
        return [];
      }
      
      // Ensuite, on cherche les articles qui référencent cette catégorie
      const query = `*[_type == "article" && references($categoryId)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        keyPoints,
        categories[]->{
          _id,
          title,
          slug
        },
        subcategories[]->{
          _id,
          title,
          slug,
          parentCategory->{
            _id,
            title,
            slug
          }
        }
      }`;
      
      const articles = await sanityClient.fetch(query, { categoryId });
      console.log(`Articles trouvés pour ${categorySlug}: ${articles.length}`);
      
      return articles;
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
      // Chercher les articles avec format "amuse-bouche"
      const query = `*[_type == "article" && format == "amuse-bouche"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        "description": excerpt,
        "coverImage": mainImage,  // AmuseBoucheSection utilise coverImage
        excerpt,
        publishedAt,
        keyPoints,
        "duration": coalesce(readingTime, "5 min"),
        "videoUrl": videoUrl
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
        keyPoints,
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

// ============= NOUVELLES FONCTIONS POUR LES SOUS-CATÉGORIES =============

// Récupérer les articles par sous-catégorie
export const getArticlesBySubcategory = async (subcategorySlug: string): Promise<SanityArticle[]> => {
  return getWithCache(`articles_subcategory_${subcategorySlug}`, async () => {
    try {
      // D'abord, on trouve la sous-catégorie pour avoir son _id
      const subcategoryQuery = `*[_type == "subcategory" && slug.current == $subcategorySlug][0]._id`;
      const subcategoryId = await sanityClient.fetch(subcategoryQuery, { subcategorySlug });
      
      if (!subcategoryId) {
        console.log(`Sous-catégorie non trouvée pour le slug: ${subcategorySlug}`);
        return [];
      }
      
      // Ensuite, on cherche les articles qui référencent cette sous-catégorie
      const query = `*[_type == "article" && references($subcategoryId)] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        excerpt,
        publishedAt,
        keyPoints,
        readingTime,
        isTrending,
        isFeatured,
        isEssential,
        categories[]->{
          _id,
          title,
          slug
        },
        subcategories[]->{
          _id,
          title,
          slug,
          parentCategory->{
            _id,
            title,
            slug
          }
        }
      }`;
      
      const articles = await sanityClient.fetch(query, { subcategoryId });
      console.log(`Articles trouvés pour ${subcategorySlug}: ${articles.length}`);
      
      return articles;
    } catch (error) {
      console.error(`Erreur lors de la récupération des articles de la sous-catégorie ${subcategorySlug}:`, error);
      return [];
    }
  });
};

// Récupérer les sous-catégories groupées par catégorie parente
export const getSubcategoriesGrouped = async (): Promise<any> => {
  return getWithCache('subcategoriesGrouped', async () => {
    try {
      const query = `*[_type == "category"] | order(order asc) {
        _id,
        title,
        slug,
        "subcategories": *[_type == "subcategory" && references(^._id)] | order(order asc) {
          _id,
          title,
          slug,
          description,
          articleCount,
          isActive
        }
      }`;
      
      return await sanityClient.fetch(query);
    } catch (error) {
      console.error("Erreur lors de la récupération des sous-catégories groupées:", error);
      return [];
    }
  });
};

// Récupérer une sous-catégorie par son slug
export const getSubcategoryBySlug = async (slug: string) => {
  return getWithCache(`subcategory_${slug}`, async () => {
    try {
      const query = `*[_type == "subcategory" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        parentCategory->{
          _id,
          title,
          slug
        }
      }`;
      
      return await sanityClient.fetch(query, { slug });
    } catch (error) {
      console.error(`Erreur lors de la récupération de la sous-catégorie ${slug}:`, error);
      return null;
    }
  });
};

// ============= NOUVELLES FONCTIONS POUR LES ÉMISSIONS - CORRIGÉES =============

// Récupérer toutes les émissions
export const getAllEmissions = async (): Promise<any[]> => {
  return getWithCache('allEmissions', async () => {
    try {
      const query = `*[_type == "emission"] | order(publishedAt desc) {
        _id,
        title,
        description,
        "thumbnail": coverImage.asset->url,
        slug,
        duration,
        publishedAt,
        featured,
        "listens": coalesce(listens, 0),
        "likes": coalesce(likes, 0),
        videoUrlExternal,
        "category": coalesce(category, "general"),
        guest
      }`;
      
      const emissions = await sanityClient.fetch(query);
      console.log(`Émissions récupérées: ${emissions?.length || 0}`);
      
      // Valider que nous avons des données valides
      if (!emissions || !Array.isArray(emissions)) {
        console.warn("Aucune émission trouvée ou format invalide");
        return [];
      }
      
      return emissions;
    } catch (error) {
      console.error("Erreur lors de la récupération des émissions:", error);
      return [];
    }
  });
};

// Récupérer l'émission featured/à la une
export const getFeaturedEmission = async (): Promise<any | null> => {
  return getWithCache('featuredEmission', async () => {
    try {
      const query = `*[_type == "emission" && featured == true][0] {
        _id,
        title,
        description,
        "thumbnail": coverImage.asset->url,
        slug,
        duration,
        publishedAt,
        featured,
        "listens": coalesce(listens, 0),
        "likes": coalesce(likes, 0),
        videoUrlExternal,
        "category": coalesce(category, "general"),
        guest
      }`;
      
      const emission = await sanityClient.fetch(query);
      
      // Si pas d'émission featured, prendre la plus récente
      if (!emission) {
        const fallbackQuery = `*[_type == "emission"] | order(publishedAt desc)[0] {
          _id,
          title,
          description,
          "thumbnail": coverImage.asset->url,
          slug,
          duration,
          publishedAt,
          featured,
          "listens": coalesce(listens, 0),
          "likes": coalesce(likes, 0),
          videoUrlExternal,
          "category": coalesce(category, "general"),
          guest
        }`;
        
        return await sanityClient.fetch(fallbackQuery);
      }
      
      return emission;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'émission featured:", error);
      return null;
    }
  });
};

// Récupérer une émission par son slug
export const getEmissionBySlug = async (slug: string): Promise<any | null> => {
  return getWithCache(`emission_${slug}`, async () => {
    try {
      const query = `*[_type == "emission" && slug.current == $slug][0] {
        _id,
        title,
        description,
        "thumbnail": coverImage.asset->url,
        slug,
        duration,
        publishedAt,
        featured,
        "listens": coalesce(listens, 0),
        "likes": coalesce(likes, 0),
        videoUrlExternal,
        "category": coalesce(category, "general"),
        guest,
        detailedContent
      }`;
      
      return await sanityClient.fetch(query, { slug });
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'émission ${slug}:`, error);
      return null;
    }
  });
};

// Récupérer les émissions par catégorie
export const getEmissionsByCategory = async (category: string): Promise<any[]> => {
  return getWithCache(`emissions_category_${category}`, async () => {
    try {
      const query = `*[_type == "emission" && category == $category] | order(publishedAt desc) {
        _id,
        title,
        description,
        "thumbnail": coverImage.asset->url,
        slug,
        duration,
        publishedAt,
        featured,
        "listens": coalesce(listens, 0),
        "likes": coalesce(likes, 0),
        videoUrlExternal,
        category,
        guest
      }`;
      
      const emissions = await sanityClient.fetch(query, { category });
      console.log(`Émissions trouvées pour la catégorie ${category}: ${emissions?.length || 0}`);
      
      if (!emissions || !Array.isArray(emissions)) {
        return [];
      }
      
      return emissions;
    } catch (error) {
      console.error(`Erreur lors de la récupération des émissions de la catégorie ${category}:`, error);
      return [];
    }
  });
};