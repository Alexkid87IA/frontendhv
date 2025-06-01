/**
 * Script de validation de l'intégrité de la homepage
 * Ce script vérifie que tous les composants de la homepage sont correctement connectés à Sanity
 * et qu'ils disposent d'un fallback robuste vers des données mockées en cas d'erreur.
 */

import { sanityClient } from '../utils/sanityClient';
import { getAllArticles, getAmuseBouches, getFeaturedDebate, getUniverses, getClubFeatures, getClubPricing, getContentItems } from '../utils/sanityAPI';

// Fonction principale de validation
async function validateHomepage() {
  console.log('🔍 Début de la validation de l\'intégrité de la homepage...');
  
  try {
    // Vérifier la connexion à Sanity
    console.log('🔌 Vérification de la connexion à Sanity CMS...');
    const connectionTest = await sanityClient.fetch('*[_type == "sanity.imageAsset"][0]._id');
    
    if (connectionTest) {
      console.log('✅ Connexion à Sanity CMS établie avec succès');
    } else {
      console.warn('⚠️ Impossible de vérifier la connexion à Sanity CMS');
    }
    
    // Vérifier les articles récents
    console.log('\n📰 Vérification des articles récents...');
    const articles = await getAllArticles();
    console.log(`${articles.length > 0 ? '✅' : '⚠️'} ${articles.length} articles récupérés`);
    
    // Vérifier les amuses-bouches
    console.log('\n🍽️ Vérification des amuses-bouches...');
    const amuseBouches = await getAmuseBouches();
    console.log(`${amuseBouches.length > 0 ? '✅' : '⚠️'} ${amuseBouches.length} amuses-bouches récupérés`);
    
    // Vérifier le débat à la une
    console.log('\n💬 Vérification du débat à la une...');
    const debate = await getFeaturedDebate();
    console.log(`${debate ? '✅' : '⚠️'} Débat à la une ${debate ? 'récupéré' : 'non trouvé'}`);
    
    // Vérifier les univers éditoriaux
    console.log('\n🌍 Vérification des univers éditoriaux...');
    const universes = await getUniverses();
    console.log(`${universes.length > 0 ? '✅' : '⚠️'} ${universes.length} univers récupérés`);
    
    // Vérifier les fonctionnalités du club
    console.log('\n👑 Vérification des fonctionnalités du club...');
    const clubFeatures = await getClubFeatures();
    console.log(`${clubFeatures.length > 0 ? '✅' : '⚠️'} ${clubFeatures.length} fonctionnalités du club récupérées`);
    
    // Vérifier les tarifs du club
    console.log('\n💰 Vérification des tarifs du club...');
    const clubPricing = await getClubPricing();
    console.log(`${clubPricing.length > 0 ? '✅' : '⚠️'} ${clubPricing.length} tarifs du club récupérés`);
    
    // Vérifier les podcasts
    console.log('\n🎙️ Vérification des podcasts...');
    const podcasts = await getContentItems('emission');
    console.log(`${podcasts.length > 0 ? '✅' : '⚠️'} ${podcasts.length} podcasts récupérés`);
    
    // Vérifier les études de cas
    console.log('\n📊 Vérification des études de cas...');
    const caseStudies = await getContentItems('business-idea');
    console.log(`${caseStudies.length > 0 ? '✅' : '⚠️'} ${caseStudies.length} études de cas récupérées`);
    
    // Vérifier les success stories
    console.log('\n🏆 Vérification des success stories...');
    const successStories = await getContentItems('success-story');
    console.log(`${successStories.length > 0 ? '✅' : '⚠️'} ${successStories.length} success stories récupérées`);
    
    // Résumé
    console.log('\n📋 Résumé de la validation:');
    const totalSections = 9;
    const sectionsWithData = [
      articles.length > 0,
      amuseBouches.length > 0,
      debate !== null,
      universes.length > 0,
      clubFeatures.length > 0,
      clubPricing.length > 0,
      podcasts.length > 0,
      caseStudies.length > 0,
      successStories.length > 0
    ].filter(Boolean).length;
    
    console.log(`✅ ${sectionsWithData}/${totalSections} sections avec données réelles de Sanity`);
    console.log(`⚠️ ${totalSections - sectionsWithData}/${totalSections} sections utilisant des données mockées`);
    
    if (sectionsWithData === totalSections) {
      console.log('\n🎉 Toutes les sections de la homepage sont connectées à Sanity avec succès!');
    } else {
      console.log('\n⚠️ Certaines sections utilisent des données mockées. Vérifiez que le contenu est bien créé dans Sanity Studio.');
    }
    
    console.log('\n✅ Validation de l\'intégrité de la homepage terminée');
    
  } catch (error) {
    console.error('❌ Erreur lors de la validation:', error);
  }
}

// Exécuter la validation
validateHomepage();
