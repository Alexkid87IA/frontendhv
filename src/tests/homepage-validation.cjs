// Script de validation de l'intégrité de la homepage
// Version compatible avec Node.js CommonJS

const fs = require('fs');
const path = require('path');

/**
 * Fonction simulant la validation de l'intégrité de la homepage
 * Cette version utilise CommonJS et peut s'exécuter en Node.js standard
 */
function validateHomepage() {
  console.log('🔍 Début de la validation de l\'intégrité de la homepage...');
  
  // Vérification des fichiers principaux
  console.log('\n📁 Vérification des fichiers principaux...');
  
  const requiredFiles = [
    'src/pages/HomePage.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/HomeArticlesSection.tsx',
    'src/components/sections/AmuseBoucheSection.tsx',
    'src/components/sections/EditorialSection.tsx',
    'src/components/sections/DebateSection.tsx',
    'src/components/sections/ContentSection.tsx',
    'src/components/sections/ClubSection.tsx',
    'src/utils/sanityAPI.ts',
    'src/utils/sanityClient.ts',
    'src/utils/sanityImage.ts',
    'src/types/sanity.ts',
    'src/context/GlobalContext.tsx',
    'src/components/common/SafeImage.tsx',
    'src/components/common/LoadingSpinner.tsx',
    'src/components/common/Button.tsx',
    'src/components/common/ErrorMessage.tsx',
    'src/components/common/SectionHeader.tsx',
    'src/components/common/DataSourceIndicator.tsx',
    'src/styles/accessibility.css'
  ];
  
  const missingFiles = [];
  const existingFiles = [];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      existingFiles.push(file);
      console.log(`✅ ${file} - Présent`);
    } else {
      missingFiles.push(file);
      console.log(`❌ ${file} - Manquant`);
    }
  });
  
  // Vérification des patterns de fallback dans les composants
  console.log('\n🔄 Vérification des patterns de fallback dans les composants...');
  
  const componentsToCheck = [
    'src/components/sections/HeroSection.tsx',
    'src/components/sections/AmuseBoucheSection.tsx',
    'src/components/sections/EditorialSection.tsx',
    'src/components/sections/DebateSection.tsx',
    'src/components/sections/ContentSection.tsx',
    'src/components/sections/ClubSection.tsx'
  ];
  
  const fallbackPatterns = {
    dataSource: /dataSource.*=.*useState.*\(['"]cms['"]\)/,
    setDataSource: /setDataSource\(['"]mock['"]\)/,
    mockData: /(mock|mocked)(Articles|Features|Items|Data|Universes|Pricing)/,
    errorHandling: /catch.*\(.*error.*\)/,
    loadingState: /isLoading.*=.*useState\(true\)/
  };
  
  const componentsWithFallback = [];
  const componentsWithoutFallback = [];
  
  componentsToCheck.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Vérifier si le composant contient les patterns de fallback
      const hasDataSource = fallbackPatterns.dataSource.test(content);
      const hasSetDataSource = fallbackPatterns.setDataSource.test(content);
      const hasMockData = fallbackPatterns.mockData.test(content);
      const hasErrorHandling = fallbackPatterns.errorHandling.test(content);
      const hasLoadingState = fallbackPatterns.loadingState.test(content);
      
      const totalPatterns = [hasDataSource, hasSetDataSource, hasMockData, hasErrorHandling, hasLoadingState].filter(Boolean).length;
      
      if (totalPatterns >= 4) {
        componentsWithFallback.push(file);
        console.log(`✅ ${file} - Fallback robuste (${totalPatterns}/5 patterns)`);
      } else {
        componentsWithoutFallback.push(file);
        console.log(`⚠️ ${file} - Fallback incomplet (${totalPatterns}/5 patterns)`);
      }
    }
  });
  
  // Vérification de l'utilisation des composants communs
  console.log('\n🧩 Vérification de l\'utilisation des composants communs...');
  
  const commonComponents = {
    'LoadingSpinner': /<LoadingSpinner/,
    'SafeImage': /<SafeImage/,
    'ErrorMessage': /<ErrorMessage/,
    'Button': /<Button/,
    'SectionHeader': /<SectionHeader/,
    'DataSourceIndicator': /<DataSourceIndicator/
  };
  
  const componentsUsage = {};
  
  Object.keys(commonComponents).forEach(component => {
    componentsUsage[component] = 0;
  });
  
  const allComponentFiles = fs.readdirSync(path.join(process.cwd(), 'src/components/sections'))
    .filter(file => file.endsWith('.tsx'))
    .map(file => path.join(process.cwd(), 'src/components/sections', file));
  
  allComponentFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    Object.entries(commonComponents).forEach(([component, pattern]) => {
      if (pattern.test(content)) {
        componentsUsage[component]++;
      }
    });
  });
  
  Object.entries(componentsUsage).forEach(([component, count]) => {
    console.log(`${count > 0 ? '✅' : '⚠️'} ${component} - Utilisé dans ${count} composants`);
  });
  
  // Vérification de l'accessibilité
  console.log('\n♿ Vérification des améliorations d\'accessibilité...');
  
  const accessibilityFile = path.join(process.cwd(), 'src/styles/accessibility.css');
  const accessibilityFileExists = fs.existsSync(accessibilityFile);
  
  console.log(`${accessibilityFileExists ? '✅' : '❌'} Feuille de style d'accessibilité - ${accessibilityFileExists ? 'Présente' : 'Manquante'}`);
  
  if (accessibilityFileExists) {
    const accessibilityContent = fs.readFileSync(accessibilityFile, 'utf8');
    const accessibilityPatterns = {
      contrast: /contrast/i,
      focus: /focus/i,
      ariaAttributes: /aria/i,
      skipLink: /skip-link/i
    };
    
    Object.entries(accessibilityPatterns).forEach(([pattern, regex]) => {
      const hasPattern = regex.test(accessibilityContent);
      console.log(`${hasPattern ? '✅' : '⚠️'} Amélioration d'accessibilité: ${pattern} - ${hasPattern ? 'Présente' : 'Manquante'}`);
    });
  }
  
  // Vérification de l'optimisation des performances
  console.log('\n⚡ Vérification des optimisations de performance...');
  
  const sanityAPIFile = path.join(process.cwd(), 'src/utils/sanityAPI.ts');
  const globalContextFile = path.join(process.cwd(), 'src/context/GlobalContext.tsx');
  
  if (fs.existsSync(sanityAPIFile)) {
    const sanityAPIContent = fs.readFileSync(sanityAPIFile, 'utf8');
    const hasCache = /cache|CACHE_DURATION/.test(sanityAPIContent);
    console.log(`${hasCache ? '✅' : '⚠️'} Système de cache pour les requêtes Sanity - ${hasCache ? 'Présent' : 'Manquant'}`);
  }
  
  if (fs.existsSync(globalContextFile)) {
    const globalContextContent = fs.readFileSync(globalContextFile, 'utf8');
    const hasGlobalState = /createContext|useContext/.test(globalContextContent);
    console.log(`${hasGlobalState ? '✅' : '⚠️'} Gestion d'état global - ${hasGlobalState ? 'Présente' : 'Manquante'}`);
  }
  
  // Résumé
  console.log('\n📋 Résumé de la validation:');
  console.log(`✅ ${existingFiles.length}/${requiredFiles.length} fichiers requis présents`);
  console.log(`✅ ${componentsWithFallback.length}/${componentsToCheck.length} composants avec fallback robuste`);
  
  const commonComponentsUsed = Object.values(componentsUsage).filter(count => count > 0).length;
  console.log(`✅ ${commonComponentsUsed}/${Object.keys(commonComponents).length} composants communs utilisés`);
  
  if (existingFiles.length === requiredFiles.length && 
      componentsWithFallback.length === componentsToCheck.length && 
      commonComponentsUsed === Object.keys(commonComponents).length) {
    console.log('\n🎉 Validation réussie! Le site est prêt pour la production.');
  } else {
    console.log('\n⚠️ Validation terminée avec des avertissements. Vérifiez les points mentionnés ci-dessus.');
  }
}

// Exécuter la validation
validateHomepage();
