import { urlFor } from '../../utils/sanityClient';

interface SafeImageProps {
  source: any;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function SafeImage({ source, alt, className, width, height }: SafeImageProps) {
  // AJOUTEZ CES LIGNES POUR DEBUG
  console.log('SafeImage debug:', {
    source,
    alt,
    hasAsset: source?.asset,
    hasRef: source?.asset?._ref,
    sourceType: typeof source
  });

  // Si c'est déjà une URL, l'utiliser directement
  if (typeof source === 'string') {
    return <img src={source} alt={alt} className={className} />;
  }

  try {
    // Si c'est un objet Sanity avec asset._ref
    if (source?.asset?._ref) {
      // Vérifier si c'est une URL ou une vraie référence Sanity
      if (source.asset._ref.startsWith('http')) {
        return <img src={source.asset._ref} alt={alt} className={className} />;
      }
      
      // Sinon, utiliser urlFor pour les vraies références Sanity
      const imageUrl = urlFor(source)
        .width(width || 800)
        .height(height || 600)
        .url();
      
      return <img src={imageUrl} alt={alt} className={className} />;
    }
    
    // Si c'est un objet avec une propriété url
    if (source?.url) {
      return <img src={source.url} alt={alt} className={className} />;
    }
    
    // Fallback
    return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Image`} alt={alt} className={className} />;
  } catch (error) {
    console.error('Erreur SafeImage:', error);
    return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Erreur`} alt={alt} className={className} />;
  }
}