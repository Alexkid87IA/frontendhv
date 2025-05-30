/**
 * Utilitaires pour la manipulation des dates
 */

/**
 * Formate une date ISO en format lisible
 * @param dateString - Chaîne de date ISO ou undefined
 * @returns Date formatée (ex: "12 mai 2025") ou chaîne vide si dateString est undefined
 */
export const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // Options de formatage pour la date
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    return date.toLocaleDateString('fr-FR', options);
  } catch (error) {
    console.error('Erreur lors du formatage de la date:', error);
    return '';
  }
};

/**
 * Calcule la différence entre la date actuelle et une date donnée
 * @param dateString - Chaîne de date ISO ou undefined
 * @returns Temps écoulé en format lisible (ex: "il y a 2 jours") ou chaîne vide si dateString est undefined
 */
export const getTimeAgo = (dateString?: string): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return '';
    }
    
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'à l\'instant';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `il y a ${months} mois`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `il y a ${years} an${years > 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Erreur lors du calcul du temps écoulé:', error);
    return '';
  }
};

export default {
  formatDate,
  getTimeAgo
};
