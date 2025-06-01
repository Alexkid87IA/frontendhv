// Test de la connexion Sanity pour le débat
import { sanityClient } from '../utils/sanityClient.js';
import { getFeaturedDebate } from '../utils/sanityAPI.js';

// Test direct de la requête Sanity pour les débats
async function testDebateConnection() {
  console.log("Test de connexion pour les débats...");
  
  try {
    // Test de la requête directe
    console.log("1. Test de la requête directe via sanityClient:");
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
    
    const directResult = await sanityClient.fetch(query);
    console.log("Résultat de la requête directe:", directResult ? "Débat trouvé" : "Aucun débat trouvé");
    if (directResult) {
      console.log("Titre:", directResult.title);
      console.log("Nombre d'opinions:", directResult.opinions?.length || 0);
    }
    
    // Test via la fonction utilitaire
    console.log("\n2. Test via la fonction utilitaire getFeaturedDebate:");
    const apiResult = await getFeaturedDebate();
    console.log("Résultat via API:", apiResult ? "Débat trouvé" : "Aucun débat trouvé");
    if (apiResult) {
      console.log("Titre:", apiResult.title);
      console.log("Nombre d'opinions:", apiResult.opinions?.length || 0);
    }
    
    return {
      success: true,
      directResult: !!directResult,
      apiResult: !!apiResult
    };
  } catch (error) {
    console.error("Erreur lors du test de connexion pour les débats:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Exécuter le test
testDebateConnection()
  .then(result => {
    console.log("\nRésultat du test:", result.success ? "SUCCÈS" : "ÉCHEC");
    if (!result.success) {
      console.error("Erreur:", result.error);
    }
  })
  .catch(err => {
    console.error("Erreur inattendue:", err);
  });
