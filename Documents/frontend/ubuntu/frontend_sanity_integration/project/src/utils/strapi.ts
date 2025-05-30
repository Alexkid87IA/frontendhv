import qs from 'qs';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

const fetchFromAPI = async (endpoint: string, options: FetchOptions = {}) => {
  try {
    const defaultHeaders = {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'An error occurred while fetching data');
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug: string) => {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: true,
      category: {
        populate: ['name'],
      },
      author: {
        populate: ['firstname', 'lastname', 'avatar', 'bio'],
      },
    },
  }, {
    encodeValuesOnly: true,
  });

  try {
    const response = await fetchFromAPI(`/articles?${query}`);
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

export const fetchRelatedArticles = async (categoryId: number, excludeId: number) => {
  const query = qs.stringify({
    filters: {
      category: {
        id: {
          $eq: categoryId,
        },
      },
      id: {
        $ne: excludeId,
      },
    },
    populate: ['image'],
    pagination: {
      limit: 3,
    },
  }, {
    encodeValuesOnly: true,
  });

  try {
    const response = await fetchFromAPI(`/articles?${query}`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching related articles:', error);
    throw error;
  }
};