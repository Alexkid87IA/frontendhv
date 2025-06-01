// Script de test pour valider l'affichage des données Sanity
// Ce script permet de tester la connexion au CMS et la récupération des données

import { sanityClient } from '../utils/sanityClient';

// Fonction pour tester la récupération des univers éditoriaux
async function testUniverses() {
  console.log('Test de récupération des univers éditoriaux...');
  
  try {
    const query = `*[_type == "universe"] | order(order asc) {
      _id,
      title,
      subtitle,
      description,
      image,
      logo,
      "slug": slug.current,
      gradient,
      order
    }`;
    
    const result = await sanityClient.fetch(query);
    
    console.log(`Résultat: ${result.length} univers trouvés`);
    if (result.length > 0) {
      console.log('Premier univers:', {
        titre: result[0].title,
        slug: result[0].slug,
        image: result[0].image ? 'OK' : 'Manquante',
        logo: result[0].logo ? 'OK' : 'Manquant'
      });
    }
    
    return result.length > 0;
  } catch (error) {
    console.error('Erreur lors du test des univers:', error);
    return false;
  }
}

// Fonction pour tester la récupération des fonctionnalités du club
async function testClubFeatures() {
  console.log('Test de récupération des fonctionnalités du club...');
  
  try {
    const query = `*[_type == "clubFeature"] | order(order asc) {
      _id,
      title,
      description,
      icon,
      order
    }`;
    
    const result = await sanityClient.fetch(query);
    
    console.log(`Résultat: ${result.length} fonctionnalités trouvées`);
    if (result.length > 0) {
      console.log('Première fonctionnalité:', {
        titre: result[0].title,
        icône: result[0].icon,
        description: result[0].description ? result[0].description.substring(0, 30) + '...' : 'Manquante'
      });
    }
    
    return result.length > 0;
  } catch (error) {
    console.error('Erreur lors du test des fonctionnalités du club:', error);
    return false;
  }
}

// Fonction pour tester la récupération des tarifs du club
async function testClubPricing() {
  console.log('Test de récupération des tarifs du club...');
  
  try {
    const query = `*[_type == "clubPricing" && isActive == true] | order(isPromotion desc)[0] {
      _id,
      price,
      period,
      isPromotion,
      promotionLabel,
      regularPrice,
      limitDescription,
      isActive
    }`;
    
    const result = await sanityClient.fetch(query);
    
    console.log('Résultat:', result ? 'Tarif trouvé' : 'Aucun tarif actif trouvé');
    if (result) {
      console.log('Tarif:', {
        prix: result.price,
        période: result.period,
        promotion: result.isPromotion ? 'Oui' : 'Non'
      });
    }
    
    return !!result;
  } catch (error) {
    console.error('Erreur lors du test des tarifs du club:', error);
    return false;
  }
}

// Fonction principale pour exécuter tous les tests
async function runAllTests() {
  console.log('=== DÉBUT DES TESTS DE VALIDATION SANITY ===');
  
  const universeResult = await testUniverses();
  const featuresResult = await testClubFeatures();
  const pricingResult = await testClubPricing();
  
  console.log('\n=== RÉSUMÉ DES TESTS ===');
  console.log(`Univers éditoriaux: ${universeResult ? 'SUCCÈS' : 'ÉCHEC'}`);
  console.log(`Fonctionnalités du club: ${featuresResult ? 'SUCCÈS' : 'ÉCHEC'}`);
  console.log(`Tarifs du club: ${pricingResult ? 'SUCCÈS' : 'ÉCHEC'}`);
  
  const overallSuccess = universeResult && featuresResult && pricingResult;
  console.log(`\nRésultat global: ${overallSuccess ? 'SUCCÈS' : 'ÉCHEC'}`);
  console.log(`Source des données: ${overallSuccess ? 'CMS Sanity' : 'Données mockées (fallback)'}`);
  
  console.log('\n=== FIN DES TESTS ===');
  
  return overallSuccess;
}

// Exécuter les tests
runAllTests();

export { runAllTests, testUniverses, testClubFeatures, testClubPricing };
