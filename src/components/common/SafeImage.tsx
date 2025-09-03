import React from 'react';
import { urlFor } from '../../utils/sanityClient';

interface SafeImageProps {
  source: any;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  fallbackText?: string;
}

export default function SafeImage({ 
  source, 
  alt, 
  className = '', 
  width = 800, 
  height = 600,
  loading = 'lazy',
  onError,
  fallbackText
}: SafeImageProps) {
  // Réduire les logs en production
  if (import.meta.env.DEV) {
    console.log('SafeImage debug:', {
      source,
      alt,
      hasAsset: source?.asset,
      hasUrl: source?.asset?.url,
      hasRef: source?.asset?._ref,
      sourceType: typeof source
    });
  }

  // Si pas de source du tout, retourner une image placeholder
  if (!source) {
    return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=No+Image`} alt={alt} className={className} loading={loading} />;
  }

  // Si c'est déjà une URL, l'utiliser directement
  if (typeof source === 'string') {
    // Vérifier que l'URL n'est pas vide
    if (!source || source.trim() === '') {
      return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=No+Image`} alt={alt} className={className} loading={loading} />;
    }
    return <img src={source} alt={alt} className={className} loading={loading} />;
  }

  try {
    // Si c'est un objet Sanity avec asset
    if (source?.asset) {
      
      // NOUVEAU: Vérifier d'abord si on a une URL directe dans asset.url
      if (source.asset.url) {
        if (import.meta.env.DEV) {
          console.log('Using direct URL from asset.url:', source.asset.url);
        }
        return <img src={source.asset.url} alt={alt} className={className} loading={loading} />;
      }
      
      // Si asset est directement une string URL
      if (typeof source.asset === 'string' && source.asset.startsWith('http')) {
        return <img src={source.asset} alt={alt} className={className} loading={loading} />;
      }
      
      // Si on a asset._ref
      if (source.asset._ref) {
        const ref = source.asset._ref;
        
        // IMPORTANT: Vérifier que _ref n'est pas vide
        if (!ref || ref === '' || ref === null || ref === undefined) {
          console.warn('Empty asset reference detected for image:', alt);
          return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Invalid+Reference`} alt={alt} className={className} loading={loading} />;
        }
        
        // Vérifier si c'est une URL ou une vraie référence Sanity
        if (ref.startsWith('http')) {
          return <img src={ref} alt={alt} className={className} loading={loading} />;
        }
        
        // Si c'est une vraie référence Sanity (format: image-xxx-xxx-xxx)
        if (ref.includes('image-')) {
          try {
            const imageUrl = urlFor(source)
              .width(width || 800)
              .height(height || 600)
              .url();
            
            // Vérifier que l'URL générée n'est pas vide
            if (!imageUrl) {
              throw new Error('Empty URL generated from Sanity reference');
            }
            
            return (
              <img 
                src={imageUrl} 
                alt={alt} 
                className={className} 
                loading={loading}
                onError={(e) => {
                  console.error('Failed to load Sanity image:', imageUrl);
                  if (onError) onError();
                  // Fallback sur placeholder
                  (e.target as HTMLImageElement).src = `https://placehold.co/${width || 400}x${height || 300}?text=${encodeURIComponent(fallbackText || 'Image Error')}`;
                }}
              />
            );
          } catch (error) {
            console.error('Error generating Sanity URL:', error);
            return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Sanity+Error`} alt={alt} className={className} loading={loading} />;
          }
        }
        
        // Si _ref n'est ni une URL ni une référence Sanity valide
        console.warn('Invalid reference format:', ref);
        return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Invalid+Format`} alt={alt} className={className} loading={loading} />;
      }
    }
    
    // Si c'est un objet avec une propriété url directement
    if (source?.url) {
      return <img src={source.url} alt={alt} className={className} loading={loading} />;
    }
    
    // Fallback
    return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Image`} alt={alt} className={className} loading={loading} />;
  } catch (error) {
    console.error('Erreur SafeImage:', error);
    if (onError) onError();
    return <img src={`https://placehold.co/${width || 400}x${height || 300}?text=Erreur`} alt={alt} className={className} loading={loading} />;
  }
}