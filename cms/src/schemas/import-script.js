// Script d'importation des données dans Sanity
// Ce script utilise le client Sanity pour importer les données préparées

import { sanityClient } from '../../src/utils/sanityClient';
import { universesData, clubFeaturesData, clubPricingData } from './sanity-import-data';

// Fonction pour importer les univers éditoriaux
async function importUniverses() {
  console.log('Début de l\'importation des univers éditoriaux...');
  
  try {
    // Importer chaque univers
    for (const universe of universesData) {
      console.log(`Importation de l'univers: ${universe.title}`);
      
      // Vérifier si l'univers existe déjà (par slug)
      const existingUniverse = await sanityClient.fetch(
        `*[_type == "universe" && slug.current == $slug][0]`,
        { slug: universe.slug.current }
      );
      
      if (existingUniverse) {
        console.log(`L'univers ${universe.title} existe déjà, mise à jour...`);
        await sanityClient
          .patch(existingUniverse._id)
          .set(universe)
          .commit();
        console.log(`Univers ${universe.title} mis à jour avec succès`);
      } else {
        console.log(`Création d'un nouvel univers: ${universe.title}`);
        await sanityClient.create(universe);
        console.log(`Univers ${universe.title} créé avec succès`);
      }
    }
    
    console.log('Importation des univers éditoriaux terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des univers:', error);
  }
}

// Fonction pour importer les fonctionnalités du club
async function importClubFeatures() {
  console.log('Début de l\'importation des fonctionnalités du club...');
  
  try {
    // Importer chaque fonctionnalité
    for (const feature of clubFeaturesData) {
      console.log(`Importation de la fonctionnalité: ${feature.title}`);
      
      // Vérifier si la fonctionnalité existe déjà (par titre)
      const existingFeature = await sanityClient.fetch(
        `*[_type == "clubFeature" && title == $title][0]`,
        { title: feature.title }
      );
      
      if (existingFeature) {
        console.log(`La fonctionnalité ${feature.title} existe déjà, mise à jour...`);
        await sanityClient
          .patch(existingFeature._id)
          .set(feature)
          .commit();
        console.log(`Fonctionnalité ${feature.title} mise à jour avec succès`);
      } else {
        console.log(`Création d'une nouvelle fonctionnalité: ${feature.title}`);
        await sanityClient.create(feature);
        console.log(`Fonctionnalité ${feature.title} créée avec succès`);
      }
    }
    
    console.log('Importation des fonctionnalités du club terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des fonctionnalités:', error);
  }
}

// Fonction pour importer les tarifs du club
async function importClubPricing() {
  console.log('Début de l\'importation des tarifs du club...');
  
  try {
    // Importer chaque tarif
    for (const pricing of clubPricingData) {
      console.log(`Importation du tarif: ${pricing.price}€/${pricing.period}`);
      
      // Vérifier si le tarif existe déjà (par prix et période)
      const existingPricing = await sanityClient.fetch(
        `*[_type == "clubPricing" && price == $price && period == $period][0]`,
        { price: pricing.price, period: pricing.period }
      );
      
      if (existingPricing) {
        console.log(`Le tarif ${pricing.price}€/${pricing.period} existe déjà, mise à jour...`);
        await sanityClient
          .patch(existingPricing._id)
          .set(pricing)
          .commit();
        console.log(`Tarif ${pricing.price}€/${pricing.period} mis à jour avec succès`);
      } else {
        console.log(`Création d'un nouveau tarif: ${pricing.price}€/${pricing.period}`);
        await sanityClient.create(pricing);
        console.log(`Tarif ${pricing.price}€/${pricing.period} créé avec succès`);
      }
    }
    
    console.log('Importation des tarifs du club terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des tarifs:', error);
  }
}

// Fonction principale pour exécuter toutes les importations
async function importAllData() {
  console.log('Début de l\'importation de toutes les données dans Sanity...');
  
  try {
    await importUniverses();
    await importClubFeatures();
    await importClubPricing();
    
    console.log('Importation de toutes les données terminée avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'importation des données:', error);
  }
}

// Exécuter l'importation
importAllData();
