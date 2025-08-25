/**
 * Types partagés pour les données Sanity
 * Ce fichier centralise toutes les interfaces TypeScript pour les données provenant de Sanity CMS
 */

// Type de base pour les références Sanity
export interface SanityReference {
  _ref: string;
  _type: "reference";
}

// Type de base pour les slugs Sanity
export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Type de base pour les images Sanity
export interface SanityImage {
  _type: "image";
  asset: SanityReference;
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
  caption?: string;     // Légende de l'image
  url?: string;         // URL directe (parfois utilisée)
}

// Type pour les catégories
export interface SanityCategory {
  _id: string;
  title: string;
  description?: string;
  slug: SanitySlug;
  color?: string;       // Couleur de la catégorie (pour les badges)
  icon?: string;        // Icône de la catégorie
  order?: number;       // Ordre d'affichage
}

// Type pour les sous-catégories
export interface SanitySubcategory {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
  parentCategory?: {
    _id: string;
    title: string;
    slug: SanitySlug;
  };
  articleCount?: number;  // Nombre d'articles dans cette sous-catégorie
  isActive?: boolean;     // Si la sous-catégorie est active
}

// Type pour les auteurs
export interface SanityAuthor {
  _id: string;
  name: string;
  bio?: string;
  image?: SanityImage;
  slug?: SanitySlug;    // Pour les pages d'auteur
  role?: string;        // Rôle de l'auteur
}

// Type pour les articles
export interface SanityArticle {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: any;                           // Corps de l'article en format Portable Text
  content?: any;                        // Alternative à body
  publishedAt?: string;
  categories?: SanityCategory[];
  subcategories?: SanitySubcategory[];  // Sous-catégories
  author?: SanityAuthor;
  readingTime?: string;                 // Temps de lecture (ex: "5 min")
  featured?: boolean;                   // Si l'article est à la une
  isFeatured?: boolean;                 // Alternative (Sanity utilise parfois ce nom)
  isTrending?: boolean;                 // Si l'article est tendance
  trendingOrder?: number;               // Ordre dans les tendances
  keyPoints?: string[];                 // Points clés de l'article
  contentType?: string;                 // Type de contenu (article, emission, etc.)
  videoUrl?: string;                    // URL vidéo externe
  duration?: string;                    // Durée (pour podcasts/vidéos)
  guest?: string;                       // Invité (pour podcasts)
  stats?: {                            // Statistiques
    views?: number;
    likes?: number;
    comments?: number;
  };
}

// Type pour les débats
export interface SanityDebate {
  _id: string;
  title: string;
  description?: string;
  image?: SanityImage;
  slug: SanitySlug;
  opinions?: SanityOpinion[];
  moderator?: SanityAuthor;
  stats?: {
    for: number;
    against: number;
    neutral: number;
    totalVotes?: number;
    comments?: number;
    shares?: string;
  };
  isActive?: boolean;    // Si le débat est actif
  featured?: boolean;    // Si le débat est à la une
}

// Type pour les opinions dans les débats
export interface SanityOpinion {
  _key: string;
  author: {
    name: string;
    title?: string;
    role?: string;
    image?: SanityImage;
  };
  position: 'for' | 'against' | 'neutral' | 'Pour' | 'Contre';
  text?: string;
  arguments?: string[];
  votes?: number;
}

// Type pour les univers éditoriaux
export interface SanityUniverse {
  _id: string;
  title: string;
  subtitle?: string;     // Sous-titre
  description: string;
  image?: SanityImage;
  slug: SanitySlug;
  order?: number;
  icon?: string;        // Nom de l'icône
  color?: string;       // Couleur thématique
  gradient?: string;    // Gradient CSS
}

// Type pour les podcasts
export interface SanityPodcast {
  _id: string;
  title: string;
  mainImage?: SanityImage;
  thumbnail?: string;          // URL directe de la miniature
  excerpt?: string;
  description?: string;         // Description plus longue
  slug: SanitySlug;
  audioUrl?: string;
  videoUrl?: string;           // URL vidéo
  duration?: number | string;  // Durée en secondes ou format texte
  publishedAt?: string;
  guest?: string;              // Nom de l'invité
  category?: string;           // Catégorie du podcast
  episodeNumber?: number;      // Numéro d'épisode
  featured?: boolean;          // Si le podcast est à la une
  listens?: number;           // Nombre d'écoutes
  likes?: number;             // Nombre de likes
}

// Type pour les études de cas
export interface SanityCaseStudy {
  _id: string;
  title: string;
  mainImage?: SanityImage;
  excerpt?: string;
  slug: SanitySlug;
  company?: string;
  industry?: string;
  challenge?: string;     // Défi à relever
  solution?: string;      // Solution apportée
  results?: string[];     // Résultats obtenus
  publishedAt?: string;
  metrics?: {            // Métriques de succès
    label: string;
    value: string;
  }[];
}

// Type pour les success stories
export interface SanitySuccessStory {
  _id: string;
  title: string;
  subtitle?: string;
  mainImage?: SanityImage;
  excerpt?: string;
  content?: string;       // Contenu complet
  slug: SanitySlug;
  person?: string;        // Nom de la personne
  achievement?: string;   // Réalisation principale
  publishedAt?: string;
  author?: SanityAuthor;
  metrics?: {            // Métriques de succès
    label: string;
    value: string;
  }[];
}

// Type pour les fonctionnalités du club
export interface SanityClubFeature {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  order?: number;
  available?: boolean;    // Si la fonctionnalité est disponible
  gradient?: string;      // Gradient pour l'affichage
}

// Type pour les tarifs du club
export interface SanityClubPricing {
  _id: string;
  title?: string;         // Nom du plan
  price: number;
  currency: string;
  period: 'month' | 'year' | 'monthly' | 'yearly' | 'one-time';
  features: string[];
  isActive: boolean;
  highlighted?: boolean;  // Si le plan est mis en avant
  buttonText?: string;    // Texte du bouton CTA
  discount?: number;      // Pourcentage de réduction
}

// Type pour les citations
export interface SanityQuote {
  _id: string;
  text: string;
  author: string;
  role?: string;         // Rôle de l'auteur
  avatar?: string;       // Initiales ou image
  publishedAt?: string;
}

// Type pour les amuse-bouches (contenus courts)
export interface SanityAmuseBouche {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  coverImage?: SanityImage;   // Alternative à mainImage
  description?: string;
  excerpt?: string;
  duration?: string;           // Durée de lecture/visionnage
  videoUrl?: string;          // URL vidéo si applicable
  publishedAt?: string;
  contentType?: string;       // Type de contenu court
}

// Type pour les émissions
export interface SanityEmission {
  _id: string;
  title: string;
  description?: string;
  thumbnail?: string;         // URL de la miniature
  slug: string;              // Slug simple ou SanitySlug
  duration?: string;
  publishedAt?: string;
  featured?: boolean;
  listens?: number;
  likes?: number;
  videoUrlExternal?: string;
  category?: string;
  guest?: string;
}