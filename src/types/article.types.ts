// src/types/article.types.ts

// Type pour le hotspot d'image Sanity
export interface SanityImageHotspot {
  x: number; // Valeur entre 0 et 1
  y: number; // Valeur entre 0 et 1
  height: number;
  width: number;
}

// Type pour le crop d'image Sanity
export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// Type pour l'image Sanity avec hotspot
export interface SanityImage {
  asset: {
    _ref: string;
    _type?: string;
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
}

// Types pour les données Sanity
export interface SanityArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[];
  content?: any[];
  mainImage?: SanityImage; // Utilise le nouveau type avec hotspot
  publishedAt?: string;
  author?: {
    name: string;
    image?: SanityImage; // L'image de l'auteur peut aussi avoir un hotspot
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