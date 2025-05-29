import React, { useEffect } from 'react';
import { HomePage } from './HomePage';

const HomePageWithFooter = () => {
  // Fonction qui ajoute le footer directement au DOM après le rendu
  useEffect(() => {
    // Créer le footer
    const footerDiv = document.createElement('div');
    footerDiv.style.backgroundColor = 'red';
    footerDiv.style.color = 'white';
    footerDiv.style.padding = '30px';
    footerDiv.style.textAlign = 'center';
    footerDiv.style.marginTop = '40px';
    footerDiv.style.zIndex = '9999';
    footerDiv.style.position = 'relative';
    footerDiv.innerHTML = '<h3 style="margin-bottom: 10px; font-weight: bold;">HIGH VALUE FOOTER TEST</h3><p>© 2025 High Value. Tous droits réservés.</p>';
    
    // Ajouter le footer à la fin du body
    document.body.appendChild(footerDiv);
    
    // Nettoyer lors du démontage du composant
    return () => {
      document.body.removeChild(footerDiv);
    };
  }, []);

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default HomePageWithFooter;
