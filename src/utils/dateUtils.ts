/**
 * Formate une date en format lisible en français
 * @param dateString - La date à formater (peut être une chaîne ISO, un objet Date, ou undefined)
 * @returns Une chaîne formatée ou "Date inconnue" si la date est invalide
 */
export function formatDate(dateString?: string | Date): string {
  if (!dateString) return "Date inconnue";
  
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return "Date invalide";
    }
    
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return "Date inconnue";
  }
}

/**
 * Calcule le temps de lecture estimé d'un texte
 * @param text - Le texte à analyser
 * @param wordsPerMinute - Nombre de mots lus par minute (par défaut: 200)
 * @returns Une chaîne formatée (ex: "5 min de lecture")
 */
export function calculateReadingTime(text?: string, wordsPerMinute: number = 200): string {
  if (!text) return "1 min de lecture";
  
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  return `${minutes} min de lecture`;
}

/**
 * Vérifie si une date est récente (moins de X jours)
 * @param dateString - La date à vérifier
 * @param days - Nombre de jours pour considérer une date comme récente (par défaut: 7)
 * @returns true si la date est récente, false sinon
 */
export function isRecentDate(dateString?: string | Date, days: number = 7): boolean {
  if (!dateString) return false;
  
  try {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    
    return diffDays <= days;
  } catch (error) {
    return false;
  }
}