// Attendre que la page soit complètement chargée
window.addEventListener('load', function() {
  // Attendre un peu pour que React finisse de rendre la page
  setTimeout(function() {
    // Créer le footer
    var footer = document.createElement('div');
    footer.style.backgroundColor = 'red';
    footer.style.color = 'white';
    footer.style.padding = '30px';
    footer.style.textAlign = 'center';
    footer.style.marginTop = '40px';
    footer.style.position = 'relative';
    footer.style.zIndex = '9999';
    footer.innerHTML = '<h3 style="margin-bottom: 10px; font-weight: bold;">HIGH VALUE FOOTER TEST</h3><p>© 2025 High Value. Tous droits réservés.</p>';
    
    // Ajouter le footer directement au body, après tout le contenu
    document.body.appendChild(footer);
  }, 1000); // Attendre 1 seconde pour être sûr
});
