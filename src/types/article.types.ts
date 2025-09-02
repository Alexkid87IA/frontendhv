// src/types/article.types.ts

// Types pour les données Sanity
export interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[];
  content?: any[];
  mainImage?: any;
  publishedAt?: string;
  author?: {
    name: string;
    image?: any;
    bio?: string;
  };
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  tags?: Array<{
    title: string;
    slug: { current: string };
  }>;
  readingTime?: number;
  views?: number;
  likes?: number;
  keyPoints?: string[];
  videoUrl?: string;
}

// Type pour les couleurs de verticale
export interface VerticalColors {
  gradient: string;
  bgGradient: string;
  primary: string;
  secondary: string;
  bgLight: string;
  bgMedium: string;
  borderColor: string;
  textColor: string;
}

// Type pour les headings de la table des matières
export interface TableOfContentsHeading {
  id: string;
  text: string;
  subheadings: Array<{
    id: string;
    text: string;
  }>;
}

// Type pour les liens de partage
export interface ShareLink {
  name: string;
  icon: React.FC<{ size?: number; className?: string }>;
  color: string;
  url: string;
}