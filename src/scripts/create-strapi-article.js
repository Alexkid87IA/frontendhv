import axios from 'axios';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), '');

const strapiApi = axios.create({
  baseURL: env.VITE_STRAPI_API_URL,
  headers: {
    'Authorization': `Bearer ${env.VITE_STRAPI_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Format de données attendu par Strapi
const articleData = {
  data: {
    titre: "Article Test : L'Intégration Strapi et Bolt",
    slug: "article-test-integration-strapi-bolt",
    contenu: "Ceci est le premier paragraphe de notre article test. Il a pour but de vérifier que la création de contenu depuis un outil externe, comme Bolt, fonctionne correctement avec notre backend Strapi déployé sur Strapi Cloud.\n\nL'intégration repose sur l'API REST de Strapi et un token d'API sécurisé. Nous avons configuré Strapi pour inclure des types de contenu spécifiques comme les articles, les catégories, les tags et les auteurs, avec des relations entre eux pour une gestion de contenu structurée et cohérente.\n\nDans ce test, nous allons vérifier si cet article, une fois créé via le script de Bolt, apparaît correctement dans l'interface d'administration de Strapi et, après publication, sur le site public final. Cela validera l'ensemble du flux de travail.",
    meta_title: "Test d'intégration Strapi et Bolt",
    meta_description: "Article test pour valider la création de contenu via l'API Strapi depuis Bolt.",
    publishedAt: null // L'article sera créé en brouillon
  }
};

const createArticle = async () => {
  try {
    console.log('Starting article creation...');
    console.log('API URL:', env.VITE_STRAPI_API_URL);
    console.log('Article data:', JSON.stringify(articleData, null, 2));
    
    // Test de connexion à l'API
    console.log('Testing API connection...');
    const testResponse = await strapiApi.get('/');
    console.log('API connection successful:', testResponse.status);
    
    // Création de l'article
    console.log('Sending article creation request...');
    const response = await strapiApi.post('/articles', articleData);
    console.log('Article created successfully:', response.data);
  } catch (error) {
    console.error('Failed to create article:', error);
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error details:', error.message);
    }
  }
};

createArticle();