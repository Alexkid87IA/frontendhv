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
}

// Type pour les catégories
export interface SanityCategory {
  _id: string;
  title: string;
  description?: string;
  slug: SanitySlug;
}

// Type pour les auteurs
export interface SanityAuthor {
  _id: string;
  name: string;
  bio?: string;
  image?: SanityImage;
}

// Type pour les articles
export interface SanityArticle {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  excerpt?: string;
  body?: any; // Corps de l'article en format Portable Text
  publishedAt?: string;
  categories?: SanityCategory[];
  author?: SanityAuthor;
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
  };
}

// Type pour les opinions dans les débats
export interface SanityOpinion {
  _key: string;
  author: {
    name: string;
    title?: string;
    image?: SanityImage;
  };
  position: 'for' | 'against' | 'neutral';
  text: string;
}

// Type pour les univers éditoriaux
export interface SanityUniverse {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  slug: SanitySlug;
  order?: number;
}

// Type pour les podcasts
export interface SanityPodcast {
  _id: string;
  title: string;
  mainImage?: SanityImage;
  excerpt?: string;
  slug: SanitySlug;
  audioUrl?: string;
  duration?: number;
  publishedAt?: string;
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
  publishedAt?: string;
}

// Type pour les success stories
export interface SanitySuccessStory {
  _id: string;
  title: string;
  mainImage?: SanityImage;
  excerpt?: string;
  slug: SanitySlug;
  person?: string;
  achievement?: string;
  publishedAt?: string;
}

// Type pour les fonctionnalités du club
export interface SanityClubFeature {
  _id: string;
  title: string;
  description: string;
  icon: string;
  order?: number;
}

// Type pour les tarifs du club
export interface SanityClubPricing {
  _id: string;
  price: number;
  currency: string;
  period: 'month' | 'year';
  features: string[];
  isActive: boolean;
}

// Type pour les citations
export interface SanityQuote {
  _id: string;
  text: string;
  author: string;
  publishedAt?: string;
}
