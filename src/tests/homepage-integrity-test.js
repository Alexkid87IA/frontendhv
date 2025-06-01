// Script de validation de l'intégrité de la homepage
import { sanityClient } from '../utils/sanityClient.js';
import { 
  getAllArticles, 
  getAmuseBouches, 
  getLatestQuote, 
  getFeaturedDebate 
} from '../utils/sanityAPI.js';

// Fonction pour tester toutes les sections de la homepage
async function testHomepageIntegrity() {
  console.log("=== TEST D'INTÉGRITÉ DE LA HOMEPAGE ===");
  console.log("Date du test:", new Date().toLocaleString());
  console.log("----------------------------------------");
  
  const results = {
    articles: { success: false, count: 0, message: "" },
    amuseBouches: { success: false, count: 0, message: "" },
    quote: { success: false, message: "" },
    debate: { success: false, message: "" },
    universes: { success: false, count: 0, message: "" },
    clubFeatures: { success: false, count: 0, message: "" },
    clubPricing: { success: false, message: "" }
  };
  
  try {
    // 1. Test des articles (HomeArticlesSection et HeroSection)
    console.log("\n1. Test des articles (HomeArticlesSection et HeroSection)");
    const articles = await getAllArticles();
    results.articles.success = Array.isArray(articles);
    results.articles.count = articles?.length || 0;
    results.articles.message = results.articles.success 
      ? `${results.articles.count} articles récupérés avec succès` 
      : "Échec de récupération des articles";
    console.log(results.articles.message);
    
    // 2. Test des amuses-bouches (AmuseBoucheSection)
    console.log("\n2. Test des amuses-bouches (AmuseBoucheSection)");
    const amuseBouches = await getAmuseBouches();
    results.amuseBouches.success = Array.isArray(amuseBouches);
    results.amuseBouches.count = amuseBouches?.length || 0;
    results.amuseBouches.message = results.amuseBouches.success 
      ? `${results.amuseBouches.count} amuses-bouches récupérés avec succès` 
      : "Échec de récupération des amuses-bouches";
    console.log(results.amuseBouches.message);
    
    // 3. Test de la citation (HeroSection)
    console.log("\n3. Test de la citation (HeroSection)");
    const quote = await getLatestQuote();
    results.quote.success = !!quote;
    results.quote.message = results.quote.success 
      ? "Citation récupérée avec succès" 
      : "Échec de récupération de la citation";
    console.log(results.quote.message);
    
    // 4. Test du débat (DebateSection)
    console.log("\n4. Test du débat (DebateSection)");
    const debate = await getFeaturedDebate();
    results.debate.success = !!debate;
    results.debate.message = results.debate.success 
      ? "Débat récupéré avec succès" 
      : "Échec de récupération du débat";
    console.log(results.debate.message);
    
    // 5. Test des univers (EditorialSection)
    console.log("\n5. Test des univers (EditorialSection)");
    const universesQuery = `*[_type == "universe"] | order(order asc)`;
    const universes = await sanityClient.fetch(universesQuery);
    results.universes.success = Array.isArray(universes);
    results.universes.count = universes?.length || 0;
    results.universes.message = results.universes.success 
      ? `${results.universes.count} univers récupérés avec succès` 
      : "Échec de récupération des univers";
    console.log(results.universes.message);
    
    // 6. Test des fonctionnalités du club (ClubSection)
    console.log("\n6. Test des fonctionnalités du club (ClubSection)");
    const featuresQuery = `*[_type == "clubFeature"] | order(order asc)`;
    const features = await sanityClient.fetch(featuresQuery);
    results.clubFeatures.success = Array.isArray(features);
    results.clubFeatures.count = features?.length || 0;
    results.clubFeatures.message = results.clubFeatures.success 
      ? `${results.clubFeatures.count} fonctionnalités du club récupérées avec succès` 
      : "Échec de récupération des fonctionnalités du club";
    console.log(results.clubFeatures.message);
    
    // 7. Test du tarif du club (ClubSection)
    console.log("\n7. Test du tarif du club (ClubSection)");
    const pricingQuery = `*[_type == "clubPricing" && isActive == true][0]`;
    const pricing = await sanityClient.fetch(pricingQuery);
    results.clubPricing.success = !!pricing;
    results.clubPricing.message = results.clubPricing.success 
      ? "Tarif du club récupéré avec succès" 
      : "Échec de récupération du tarif du club";
    console.log(results.clubPricing.message);
    
  } catch (error) {
    console.error("Erreur lors du test d'intégrité:", error);
  }
  
  // Résumé des résultats
  console.log("\n=== RÉSUMÉ DES TESTS ===");
  let totalSuccess = 0;
  let totalTests = Object.keys(results).length;
  
  for (const [key, value] of Object.entries(results)) {
    if (value.success) totalSuccess++;
    console.log(`${key}: ${value.success ? "✅ OK" : "❌ ÉCHEC"} - ${value.message}`);
  }
  
  console.log("\n=== CONCLUSION ===");
  console.log(`${totalSuccess}/${totalTests} tests réussis`);
  
  if (totalSuccess === totalTests) {
    console.log("✅ TOUS LES TESTS SONT RÉUSSIS - La homepage est prête pour le déploiement");
  } else {
    console.log("⚠️ CERTAINS TESTS ONT ÉCHOUÉ - Le fallback vers les données mockées sera utilisé");
  }
  
  return {
    success: totalSuccess === totalTests,
    results
  };
}

// Exécuter le test
testHomepageIntegrity()
  .then(result => {
    console.log("\nTest d'intégrité terminé:", result.success ? "SUCCÈS GLOBAL" : "ÉCHEC PARTIEL");
  })
  .catch(err => {
    console.error("Erreur inattendue lors du test d'intégrité:", err);
  });
