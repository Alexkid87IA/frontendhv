// src/pages/ArticlePage.tsx - Version finale avec Instagram amélioré et corrections Portable Text
import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Share2, Bookmark, MessageSquare, Calendar, Clock, 
  User, Heart, Eye, ChevronRight, ChevronDown, Copy, Check, Twitter, 
  Linkedin, Facebook, BookOpen, TrendingUp, ArrowRight, X,
  Mail, Send, MessageCircle, Instagram, Loader2, AlertCircle
} from "lucide-react";
import { PortableText } from "@portabletext/react";

// Composants existants
import { SEO } from "../components/common/SEO";
import { NewsletterForm } from "../components/common/NewsletterForm";
import { ArticleProgress } from "../components/sections/ArticleProgress";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { ErrorMessage } from "../components/common/ErrorMessage";
import SafeImage from "../components/common/SafeImage";
import ErrorBoundary from "../components/common/ErrorBoundary";
import { Footer } from "../components/layout/Footer";

// Système de données
import { LocalDataAPI, Article } from "../utils/localDataSystem";
import { getArticleBySlug, getAllArticles } from "../utils/sanityAPI";
import { urlFor } from "../utils/sanityClient";

// Déclaration pour Instagram API
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

// Types pour les données Sanity
interface SanityArticle {
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

// Fonction utilitaire pour nettoyer les champs Portable Text
const cleanPortableText = (value: any): string => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  
  // Si c'est un objet Portable Text unique
  if (value._type === 'block' && value.children) {
    return value.children
      .map((child: any) => child.text || '')
      .join('');
  }
  
  // Si c'est un tableau de blocs Portable Text
  if (Array.isArray(value)) {
    return value
      .map(block => {
        if (block._type === 'block' && block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' ');
  }
  
  // Si c'est un objet avec une propriété text
  if (value.text) return value.text;
  
  return '';
};

// Composant Instagram mémorisé pour éviter les re-renders
const InstagramEmbedBase: React.FC<{ url: string; caption?: string }> = ({ url, caption }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Fonction pour extraire l'ID du post
  const getInstagramPostId = (url: string) => {
    if (!url) return null;
    
    const patterns = [
      /instagram\.com\/p\/([^\/\?]+)/,
      /instagram\.com\/reel\/([^\/\?]+)/,
      /instagram\.com\/tv\/([^\/\?]+)/,
      /instagr\.am\/p\/([^\/\?]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };
  
  const postId = getInstagramPostId(url);
  
  // Empêcher le rechargement de l'iframe une fois chargé
  useEffect(() => {
    if (hasLoaded && iframeRef.current) {
      // Forcer le navigateur à garder l'iframe en mémoire
      iframeRef.current.style.willChange = 'contents';
    }
  }, [hasLoaded]);
  
  // Si pas d'ID valide
  if (!postId) {
    return (
      <div className="my-12 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-gray-900/50 rounded-xl border border-gray-700 p-8 text-center">
            <Instagram className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Post Instagram non disponible</p>
            <p className="text-sm text-gray-500">L'URL fournie n'est pas valide</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all"
            >
              <Instagram className="w-4 h-4" />
              Voir sur Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="my-12 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Container avec isolation et optimisation pour éviter les reflows */}
        <div 
          className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800"
          style={{
            contain: 'layout style paint',
            willChange: 'contents',
            isolation: 'isolate'
          }}
        >
          {/* Header Instagram */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-[2px]">
            <div className="bg-black p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium">Post Instagram</span>
                </div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  Ouvrir dans Instagram
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Container de l'iframe avec hauteur fixe et isolation CSS */}
          <div 
            className="relative bg-black"
            style={{ 
              height: '1100px',
              minHeight: '1100px',
              maxHeight: '1100px',
              contain: 'strict',
              transform: 'translateZ(0)', // Force GPU acceleration
              backfaceVisibility: 'hidden' // Optimisation rendering
            }}
          >
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black pointer-events-none">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Chargement du post Instagram...</p>
                </div>
              </div>
            )}
            
            {/* Iframe Instagram optimisé sans lazy loading */}
            <iframe
              ref={iframeRef}
              key={`instagram-${postId}`} // Clé unique stable
              src={`https://www.instagram.com/p/${postId}/embed`}
              className={`w-full transition-opacity duration-500 ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                border: 'none',
                height: '1100px',
                minHeight: '1100px',
                backgroundColor: '#000',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                willChange: 'contents',
                transform: 'translateZ(0)' // Force GPU layer
              }}
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
              // Pas de lazy loading pour éviter le déchargement
              // loading="lazy" SUPPRIMÉ
              onLoad={() => {
                setIsLoading(false);
                setTimeout(() => setHasLoaded(true), 100); // Petit délai pour transition douce
              }}
              title={`Instagram post ${postId}`}
              importance="high"
              fetchpriority="high"
              decoding="sync"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-presentation"
            />
          </div>
        </div>
        
        {/* Caption optionnelle */}
        {caption && (
          <div className="mt-4 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
            <p className="text-sm text-gray-400 italic">
              {caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Mémorisation du composant pour éviter les re-renders inutiles
const InstagramEmbed = React.memo(InstagramEmbedBase, (prevProps, nextProps) => {
  // Re-render uniquement si l'URL ou la caption change
  return prevProps.url === nextProps.url && prevProps.caption === nextProps.caption;
});

const ArticlePage: React.FC<{ isEmission?: boolean }> = ({ isEmission = false }) => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<SanityArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<SanityArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [dataSource, setDataSource] = useState<'local' | 'sanity'>('local');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('intro');
  const [copied, setCopied] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Détection de la section active
      const sections = document.querySelectorAll('section[id], h2[id], h3[id]');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Chargement de l'article
  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setError("Slug de l'article manquant.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const urlParams = new URLSearchParams(window.location.search);
        const isPreview = urlParams.get('preview') === 'true';
        
        // Détection automatique si c'est une émission
        const isEmissionPath = window.location.pathname.includes('/emission/') || isEmission;
        
        let fetchedArticle = null;
        
        try {
          // Utiliser la bonne fonction selon le type de contenu
          fetchedArticle = await getArticleBySlug(slug, isPreview);
            
          if (fetchedArticle) {
            setDataSource('sanity');
            
            // NETTOYAGE DES DONNÉES POUR ÉVITER LES ERREURS REACT
            // Nettoyer excerpt
            if (fetchedArticle.excerpt) {
              fetchedArticle.excerpt = cleanPortableText(fetchedArticle.excerpt);
            }
            
            // Nettoyer bio de l'auteur
            if (fetchedArticle.author?.bio) {
              fetchedArticle.author.bio = cleanPortableText(fetchedArticle.author.bio);
            }
            
            // Nettoyer keyPoints s'ils ne sont pas un tableau de strings
            if (fetchedArticle.keyPoints && !Array.isArray(fetchedArticle.keyPoints)) {
              console.warn("⚠️ keyPoints n'est pas un tableau, on le supprime");
              delete fetchedArticle.keyPoints;
            } else if (fetchedArticle.keyPoints && Array.isArray(fetchedArticle.keyPoints)) {
              // S'assurer que chaque élément est une string
              fetchedArticle.keyPoints = fetchedArticle.keyPoints.map((point: any) => 
                typeof point === 'string' ? point : cleanPortableText(point)
              ).filter(Boolean);
            }
            
            console.log("✅ Article nettoyé:", fetchedArticle);
          }
        } catch (sanityError) {
          console.error("Erreur Sanity:", sanityError);
        }
        
        if (!fetchedArticle) {
          fetchedArticle = await LocalDataAPI.getArticleBySlug(slug);
          setDataSource('local');
        }
        
        if (!fetchedArticle) {
          setError("Article non trouvé");
        } else {
          setArticle(fetchedArticle);
          setLocalLikes(fetchedArticle.likes || 0);
          
          const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
          setIsBookmarked(savedBookmarks.includes(fetchedArticle._id));
          
          // Charger les articles liés
          try {
            const allArticles = await getAllArticles();
            
            // Nettoyer les excerpts des articles liés
            const cleanedArticles = allArticles.map((a: any) => ({
              ...a,
              excerpt: cleanPortableText(a.excerpt)
            }));
            
            // Filtrer les articles de la même catégorie
            let filtered;
            if (fetchedArticle.categories && fetchedArticle.categories.length > 0) {
              const categoryIds = fetchedArticle.categories.map((c: any) => c._id);
              filtered = cleanedArticles
                .filter((a: any) => {
                  if (a._id === fetchedArticle._id) return false;
                  if (a.categories && a.categories.length > 0) {
                    return a.categories.some((c: any) => categoryIds.includes(c._id));
                  }
                  return false;
                });
            }
            
            // Si pas assez d'articles de la même catégorie, ajouter d'autres articles
            if (!filtered || filtered.length < 6) {
              const otherArticles = cleanedArticles
                .filter((a: any) => a._id !== fetchedArticle._id)
                .filter((a: any) => !filtered?.some((f: any) => f._id === a._id));
              
              filtered = [...(filtered || []), ...otherArticles].slice(0, 6);
            }
            
            setRelatedArticles(filtered || []);
          } catch (err) {
            console.error("Erreur chargement articles liés:", err);
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement:", err);
        setError("Erreur lors du chargement de l'article");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [slug, isEmission]);

  // Scroll en haut quand on change d'article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Gestionnaires
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLocalLikes(isLiked ? localLikes - 1 : localLikes + 1);
  };

  const handleBookmark = () => {
    if (!article) return;
    
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const filtered = savedBookmarks.filter((id: string) => id !== article._id);
      localStorage.setItem('bookmarks', JSON.stringify(filtered));
    } else {
      savedBookmarks.push(article._id);
      localStorage.setItem('bookmarks', JSON.stringify(savedBookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article?.title || '';
  const shareText = article?.excerpt || '';

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'hover:bg-blue-500/20 hover:text-blue-400',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:bg-blue-700/20 hover:text-blue-600',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:bg-blue-600/20 hover:text-blue-500',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:bg-green-500/20 hover:text-green-400',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'hover:bg-sky-500/20 hover:text-sky-400',
      url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'hover:bg-purple-500/20 hover:text-purple-400',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    }
  ];

  // Déterminer les couleurs selon la verticale
  const getVerticalColors = () => {
    const category = article?.categories?.[0]?.slug?.current?.toLowerCase();
    
    switch(category) {
      case 'story':
      case 'recits':
        return {
          gradient: 'from-amber-500 to-orange-500',
          bgGradient: 'linear-gradient(135deg, rgb(245 158 11), rgb(249 115 22))',
          primary: '#f59e0b',
          secondary: '#fb923c',
          bgLight: 'rgba(245, 158, 11, 0.1)',
          bgMedium: 'rgba(245, 158, 11, 0.2)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          textColor: '#fbbf24'
        };
      case 'business':
        return {
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'linear-gradient(135deg, rgb(59 130 246), rgb(6 182 212))',
          primary: '#3b82f6',
          secondary: '#06b6d4',
          bgLight: 'rgba(59, 130, 246, 0.1)',
          bgMedium: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          textColor: '#60a5fa'
        };
      case 'mental':
      case 'psycho':
        return {
          gradient: 'from-purple-500 to-violet-500',
          bgGradient: 'linear-gradient(135deg, rgb(168 85 247), rgb(139 92 246))',
          primary: '#a855f7',
          secondary: '#8b5cf6',
          bgLight: 'rgba(168, 85, 247, 0.1)',
          bgMedium: 'rgba(168, 85, 247, 0.2)',
          borderColor: 'rgba(168, 85, 247, 0.3)',
          textColor: '#c084fc'
        };
      case 'society':
        return {
          gradient: 'from-emerald-500 to-teal-500',
          bgGradient: 'linear-gradient(135deg, rgb(16 185 129), rgb(20 184 166))',
          primary: '#10b981',
          secondary: '#14b8a6',
          bgLight: 'rgba(16, 185, 129, 0.1)',
          bgMedium: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 0.3)',
          textColor: '#34d399'
        };
      default:
        // Par défaut, utiliser bleu
        return {
          gradient: 'from-blue-500 to-cyan-500',
          bgGradient: 'linear-gradient(135deg, rgb(59 130 246), rgb(6 182 212))',
          primary: '#3b82f6',
          secondary: '#06b6d4',
          bgLight: 'rgba(59, 130, 246, 0.1)',
          bgMedium: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          textColor: '#60a5fa'
        };
    }
  };

  const colors = article ? getVerticalColors() : getVerticalColors();

  // Fonction pour construire l'URL de l'image Sanity
  const buildSanityImageUrl = (imageRef: string) => {
    const cleanRef = imageRef
      .replace('image-', '')
      .replace('-jpg', '.jpg')
      .replace('-png', '.png')
      .replace('-webp', '.webp');
    return `https://cdn.sanity.io/images/z9wsynas/production/${cleanRef}?w=1920&h=1080&fit=crop&auto=format`;
  };

  // Composants PortableText
  const portableTextComponents = {
    block: {
      h1: ({children}: any) => (
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-12">{children}</h1>
      ),
      h2: ({children}: any) => {
        const id = `heading-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <h2 id={id} className="text-3xl font-bold mb-6 text-white relative inline-block mt-10 scroll-mt-24">
            {children}
            <span 
              className="absolute -bottom-2 left-0 w-20 h-1 rounded-full"
              style={{ background: colors.bgGradient }}
            ></span>
          </h2>
        );
      },
      h3: ({children}: any) => {
        const id = `heading-${Math.random().toString(36).substr(2, 9)}`;
        return (
          <h3 id={id} className="text-2xl font-bold text-white mb-4 mt-8 scroll-mt-24">{children}</h3>
        );
      },
      normal: ({children}: any) => (
        <p className="text-lg leading-relaxed text-gray-300 mb-6">{children}</p>
      ),
      blockquote: ({children}: any) => (
        <blockquote 
          className="relative my-8 p-6 border-l-4 rounded-r-xl"
          style={{ 
            background: colors.bgLight,
            borderLeftColor: colors.primary 
          }}
        >
          <p className="text-xl text-white italic">{children}</p>
        </blockquote>
      ),
    },
    list: {
      bullet: ({children}: any) => (
        <ul className="space-y-3 my-6 ml-6">{children}</ul>
      ),
      number: ({children}: any) => (
        <ol className="space-y-3 my-6 ml-6 list-decimal">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({children}: any) => (
        <li className="flex items-start gap-3 text-gray-300">
          <span className="mt-1" style={{ color: colors.textColor }}>▸</span>
          <span>{children}</span>
        </li>
      ),
      number: ({children}: any) => (
        <li className="text-gray-300">{children}</li>
      ),
    },
    marks: {
      strong: ({children}: any) => <strong className="font-bold text-white">{children}</strong>,
      em: ({children}: any) => <em className="italic">{children}</em>,
      code: ({children}: any) => (
        <code 
          className="px-2 py-1 rounded text-sm"
          style={{ 
            background: colors.bgLight,
            color: colors.textColor 
          }}
        >{children}</code>
      ),
      link: ({value, children}: any) => (
        <a 
          href={value?.href} 
          className="underline transition-colors" 
          style={{ color: colors.textColor }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.primary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textColor;
          }}
          target="_blank" 
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({value}: any) => (
        <figure className="my-12 -mx-4 lg:-mx-12">
          <img 
            src={urlFor(value).width(1200).url()}
            alt={value.alt || "Image de l'article"}
            className="w-full rounded-xl"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-4">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ),
      code: ({value}: any) => (
        <div className="relative bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden my-8">
          <div className="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400 ml-2">{value.language || 'code'}</span>
            </div>
            <button 
              onClick={handleCopyLink}
              className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/30 transition-colors flex items-center gap-1"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Copié!' : 'Copier'}
            </button>
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className="text-gray-300">{value.code}</code>
          </pre>
        </div>
      ),
      // Utilisation du nouveau composant Instagram amélioré
      instagram: ({value}: any) => (
        <InstagramEmbed url={value?.url} caption={value?.caption} />
      ),
    },
  };

  // Fonction pour générer la table des matières
  const generateTableOfContents = () => {
    if (!article?.body) return null;

    const headings: any[] = [];
    let currentH2: any = null;
    
    article.body
      .filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
      .forEach((heading: any, index: number) => {
        const text = heading.children?.[0]?.text || '';
        const id = `heading-${index}`;
        
        if (heading.style === 'h2') {
          currentH2 = {
            id,
            text,
            subheadings: []
          };
          headings.push(currentH2);
        } else if (heading.style === 'h3' && currentH2) {
          currentH2.subheadings.push({ id, text });
        }
      });

    return headings;
  };

  // États de chargement et d'erreur
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <ErrorMessage message={error || "Article non trouvé"} />
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white transition-colors mt-4"
          >
            <ArrowLeft size={20} />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const isPreviewMode = new URLSearchParams(window.location.search).get('preview') === 'true';
  const estimatedReadingTime = article.readingTime || Math.ceil((article.body?.length || 0) * 0.5);
  const headings = generateTableOfContents();

  return (
    <ErrorBoundary>
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags?.map(tag => tag.title).join(', ')}
        author={article.author?.name}
        publishedTime={article.publishedAt}
        image={article.mainImage}
      />

      {/* Styles CSS pour scrollbar personnalisée */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Popup de partage */}
      <AnimatePresence>
        {showSharePopup && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSharePopup(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl z-[101]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <h3 className="text-xl font-semibold text-white">
                  Partager cet article
                </h3>
                <button
                  onClick={() => setShowSharePopup(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              
              {/* Réseaux sociaux */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {shareLinks.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowSharePopup(false)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 transition-all ${platform.color}`}
                      >
                        <Icon size={24} />
                        <span className="text-xs text-gray-400">{platform.name}</span>
                      </a>
                    );
                  })}
                </div>
                
                {/* Copier le lien */}
                <div className="pt-4 border-t border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-3">Ou copier le lien</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-gray-300 text-sm"
                    />
                    <button
                      onClick={() => {
                        handleCopyLink();
                        setTimeout(() => setShowSharePopup(false), 1000);
                      }}
                      className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? 'Copié!' : 'Copier'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Progress Bar avec couleur de la verticale */}
      <div 
        className={`fixed top-0 left-0 h-1 bg-gradient-to-r ${colors.gradient} z-[60] transition-all duration-300`}
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="min-h-screen bg-black text-white">
        {/* Hero Section avec image plus grande */}
        <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-end overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Container de l'image avec meilleur cadrage */}
          <div className="absolute inset-0">
            {article.mainImage && article.mainImage.asset && article.mainImage.asset._ref ? (
              <>
                {/* Image principale avec object-position amélioré */}
                <img 
                  src={buildSanityImageUrl(article.mainImage.asset._ref)}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    opacity: 0.9,
                    // Position intelligente : privilégie le haut de l'image (visages)
                    objectPosition: 'center 20%' // Montre plus le haut de l'image
                  }}
                  onError={(e) => {
                    console.error("Erreur chargement image:", e);
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80";
                  }}
                />
                
                {/* Version mobile avec cadrage différent */}
                <img 
                  src={buildSanityImageUrl(article.mainImage.asset._ref)}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover md:hidden"
                  style={{ 
                    opacity: 0.9,
                    // Sur mobile, on montre encore plus le haut pour les portraits
                    objectPosition: 'center 15%'
                  }}
                />
              </>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                alt="Article background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  opacity: 0.9,
                  objectPosition: 'center 30%'
                }}
              />
            )}
            
            {/* Gradients très légers pour bien voir l'image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Overlay minimal uniquement sur le tiers inférieur pour le texte */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          </div>

          {/* Contenu Hero avec plus d'espace */}
          <div className="relative container mx-auto px-4 pb-16 pt-48">{/* Plus d'espace en bas */}
            {/* Breadcrumb plus visible avec meilleur contraste */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm mb-8 backdrop-blur-md bg-black/50 rounded-full px-5 py-2.5 w-fit border border-white/20"
            >
              <Link to="/" className="text-white font-medium hover:text-gray-200 transition-colors">Accueil</Link>
              <ChevronRight size={16} className="text-gray-400" />
              <Link to="/articles" className="text-white font-medium hover:text-gray-200 transition-colors">Articles</Link>
              {article.categories && article.categories[0] && (
                <>
                  <ChevronRight size={16} className="text-gray-400" />
                  <Link 
                    to={`/rubrique/${article.categories[0].slug.current}`}
                    className="font-semibold transition-colors"
                    style={{ color: colors.textColor }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.primary;
                      e.currentTarget.style.textShadow = `0 0 20px ${colors.primary}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.textColor;
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {article.categories[0].title}
                  </Link>
                </>
              )}
            </motion.div>

            {/* Catégories avec couleurs inline */}
            {article.categories && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                {article.categories.map((cat) => (
                  <Link
                    key={cat._id}
                    to={`/rubrique/${cat.slug.current}`}
                    className="group relative px-5 py-2 backdrop-blur-md rounded-full text-sm font-medium transition-all duration-300"
                    style={{
                      background: colors.bgLight,
                      border: `1px solid ${colors.borderColor}`,
                      color: colors.textColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = colors.bgMedium;
                      e.currentTarget.style.borderColor = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = colors.bgLight;
                      e.currentTarget.style.borderColor = colors.borderColor;
                    }}
                  >
                    <span className="relative z-10">{cat.title}</span>
                  </Link>
                ))}
              </motion.div>
            )}

            {/* Titre qui prend toute la largeur */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 max-w-full lg:max-w-[90%] leading-[1.1] tracking-tight"
            >
              {article.title}
            </motion.h1>

            {/* PAS D'EXCERPT ICI - Il sera dans le corps de l'article */}

            {/* Meta info simplifiée - seulement date et vues */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-gray-300 text-sm"
            >
              {article.publishedAt && (
                <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Calendar size={14} />
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
              )}
              <span className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Eye size={14} />
                {(article.views || 0).toLocaleString()} vues
              </span>
            </motion.div>
          </div>
        </section>

        {/* TABLE DES MATIÈRES MOBILE - Affichée uniquement sur mobile */}
        {headings && headings.length > 0 && (
          <div className="lg:hidden container mx-auto px-4 py-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
              {/* Header avec toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full p-5 border-b flex items-center justify-between"
                style={{ borderColor: colors.borderColor + '30' }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: colors.bgGradient }}
                  >
                    <BookOpen size={18} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white">
                      Table des matières
                    </h3>
                    <p className="text-xs text-gray-500">
                      {headings.length} chapitres
                    </p>
                  </div>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gray-400 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {/* Contenu repliable */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.nav
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar"
                  >
                    <div className="space-y-2">
                      {headings.map((section: any, sectionIndex: number) => {
                        const isActive = activeSection === section.id;
                        const hasSubheadings = section.subheadings.length > 0;
                        const isExpanded = expandedSections[section.id];
                        
                        return (
                          <div key={section.id}>
                            {/* Section H2 */}
                            <div className="flex items-center gap-2">
                              <a
                                href={`#${section.id}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex-1 flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
                                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                                }`}
                                style={{
                                  borderLeft: isActive ? `3px solid ${colors.primary}` : '3px solid transparent'
                                }}
                              >
                                <div 
                                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                                  style={{
                                    background: isActive ? colors.primary : colors.bgLight,
                                    color: isActive ? '#000' : colors.textColor
                                  }}
                                >
                                  {sectionIndex + 1}
                                </div>
                                <span className={`text-sm ${isActive ? 'text-white font-medium' : 'text-gray-300'}`}>
                                  {section.text}
                                </span>
                              </a>
                              
                              {/* Bouton toggle SÉPARÉ du lien */}
                              {hasSubheadings && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setExpandedSections(prev => ({
                                      ...prev,
                                      [section.id]: !prev[section.id]
                                    }));
                                  }}
                                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                                >
                                  <ChevronDown 
                                    size={16} 
                                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    style={{ color: colors.textColor }}
                                  />
                                </button>
                              )}
                            </div>
                            
                            {/* Sous-sections H3 */}
                            {hasSubheadings && isExpanded && (
                              <div className="ml-8 mt-1 space-y-1">
                                {section.subheadings.map((sub: any) => (
                                  <a
                                    key={sub.id}
                                    href={`#${sub.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm hover:bg-white/5"
                                    style={{
                                      color: activeSection === sub.id ? colors.textColor : '#9ca3af'
                                    }}
                                  >
                                    <div 
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{
                                        background: activeSection === sub.id ? colors.primary : '#4b5563'
                                      }}
                                    />
                                    {sub.text}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </motion.nav>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Container principal avec layout 2 colonnes */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contenu principal */}
            <article className="lg:col-span-8">
              {/* EXCERPT - Intégré comme introduction */}
              {article.excerpt && (
                <div className="mb-10 relative">
                  {/* Ligne décorative gauche */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ 
                      background: colors.bgGradient,
                      opacity: 0.6
                    }}
                  />
                  
                  {/* Contenu de l'extrait */}
                  <div className="pl-8">
                    <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-light italic">
                      {article.excerpt}
                    </p>
                  </div>
                  
                  {/* Séparateur décoratif en bas */}
                  <div className="mt-8 flex items-center gap-4">
                    <div 
                      className="h-[1px] flex-1"
                      style={{ 
                        background: `linear-gradient(to right, ${colors.primary}40, transparent)`
                      }}
                    />
                    <div className="flex gap-1">
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colors.primary, opacity: 0.6 }}
                      />
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colors.primary, opacity: 0.4 }}
                      />
                      <div 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: colors.primary, opacity: 0.2 }}
                      />
                    </div>
                    <div 
                      className="h-[1px] flex-1"
                      style={{ 
                        background: `linear-gradient(to left, ${colors.primary}40, transparent)`
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Encart Auteur - Version mobile uniquement */}
              {article.author && (
                <div className="lg:hidden mb-10">
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/30 p-5">
                    <div className="flex items-center gap-4">
                      {article.author.image ? (
                        <img 
                          src={urlFor(article.author.image).width(64).height(64).url()}
                          alt={article.author.name}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                          style={{ border: `2px solid ${colors.borderColor}` }}
                        />
                      ) : (
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: colors.bgGradient }}
                        >
                          <User size={24} className="text-white" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">Écrit par</p>
                        <h3 className="text-base font-semibold text-white mb-1">
                          {article.author.name}
                        </h3>
                        {article.author.bio && (
                          <p className="text-xs text-gray-300 line-clamp-2">
                            {article.author.bio}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Player YouTube si c'est une émission avec videoUrl */}
              {isEmission && article.videoUrl && (
                <div className="mb-12">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${article.videoUrl.split('v=')[1]?.split('&')[0] || article.videoUrl.split('/').pop()}`}
                      title={article.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400">
                      📺 Émission complète
                    </p>
                  </div>
                </div>
              )}
              
              <div className="prose prose-invert prose-lg max-w-none">
                {(article.body || article.content) && (
                  <PortableText 
                    value={article.body || article.content}
                    components={portableTextComponents}
                  />
                )}

                {!article.body && !article.content && (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Le contenu de cet article est en cours de rédaction.</p>
                  </div>
                )}
              </div>

              {/* Points clés - CORRIGÉ */}
              {article.keyPoints && Array.isArray(article.keyPoints) && article.keyPoints.length > 0 && (
                <div className="mt-12 p-6 rounded-xl" style={{
                  background: colors.bgLight,
                  border: `1px solid ${colors.borderColor}`
                }}>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Points clés à retenir
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    {article.keyPoints.map((point: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span style={{ color: colors.primary }}>▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                      >
                        #{tag.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA de fin d'article avec couleurs de la verticale */}
              <div className={`mt-16 p-8 bg-gradient-to-br ${colors.gradient}/10 rounded-2xl border ${colors.border}`}>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Vous avez aimé cet article ?
                </h3>
                <p className="text-gray-300 mb-6">
                  Rejoignez notre communauté pour recevoir nos meilleurs contenus directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className={`flex-1 py-3 px-6 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white rounded-lg font-medium transition-all`}>
                    {"S'inscrire à la newsletter"}
                  </button>
                  <button 
                    onClick={handleBookmark}
                    className="flex-1 py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Bookmark size={20} className={isBookmarked ? 'fill-current' : ''} />
                    {isBookmarked ? 'Article sauvegardé' : 'Sauvegarder pour plus tard'}
                  </button>
                </div>
              </div>

              {/* CTA Club Élite - Version mobile affichée après l'article */}
              <div className="lg:hidden mt-12">
                <div className="relative overflow-hidden rounded-2xl">
                  <div 
                    className="absolute inset-0 opacity-90"
                    style={{ background: colors.bgGradient }}
                  />
                  {/* Pattern décoratif */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16">
                      <div className="w-full h-full bg-white rounded-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 transform rotate-45 -translate-x-16 translate-y-16">
                      <div className="w-full h-full bg-white rounded-lg" />
                    </div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs font-semibold text-white uppercase">
                        Le Club Élite
                      </span>
                      <span className="px-2 py-1 bg-orange-500 text-black rounded text-xs font-bold">
                        -50%
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      Rejoindre la liste d'attente
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      L'écosystème premium pour les entrepreneurs d'exception. 500+ inscrits sur liste d'attente.
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold text-white">99€</p>
                        <p className="text-xs text-white/70">/mois</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/70 line-through">199€</p>
                        <p className="text-xs text-yellow-400 font-semibold">Offre fondateurs</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Accès VIP aux contenus</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Communauté privée</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Events mensuels exclusifs</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105"
                      onClick={() => window.location.href = '/le-club'}
                    >
                      🚀 Rejoindre la liste d'attente
                    </button>
                    
                    <p className="text-xs text-white/60 text-center mt-3">
                      7 jours d'essai • Sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar droite - Cachée sur mobile, visible sur desktop */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                
                {/* Encart Auteur - COMPLÈTEMENT CORRIGÉ */}
                {article.author && (
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {article.author.image ? (
                        <img 
                          src={urlFor(article.author.image).width(80).height(80).url()}
                          alt={article.author.name}
                          className="w-20 h-20 rounded-full object-cover"
                          style={{ border: `2px solid ${colors.borderColor}` }}
                        />
                      ) : (
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center"
                          style={{ background: colors.bgGradient }}
                        >
                          <User size={32} className="text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Écrit par</p>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {article.author.name}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          {article.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              <span>
                                {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                                  day: 'numeric', 
                                  month: 'short' 
                                })}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Bio de l'auteur - CORRIGÉ */}
                    {article.author.bio && (
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {article.author.bio}
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <button 
                        className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                        style={{
                          background: colors.bgLight,
                          color: colors.textColor
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.bgMedium;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = colors.bgLight;
                        }}
                      >
                        Voir tous ses articles
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Table des matières DESKTOP avec sous-sections repliables */}
                {headings && headings.length > 0 && (
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
                    {/* Header fixe avec design amélioré */}
                    <div 
                      className="p-5 border-b"
                      style={{ borderColor: colors.borderColor + '30' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: colors.bgGradient }}
                          >
                            <BookOpen size={18} className="text-white" />
                          </div>
                          <div 
                            className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-white/20 animate-pulse"
                            style={{ background: colors.primary + '40' }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            Table des matières
                          </h3>
                          <p className="text-xs text-gray-500">
                            {headings.length} chapitres
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contenu avec scroll si nécessaire */}
                    <nav className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                      <div className="space-y-2">
                        {headings.map((section: any, sectionIndex: number) => {
                          const isActive = activeSection === section.id;
                          const hasSubheadings = section.subheadings.length > 0;
                          const isExpanded = expandedSections[section.id];
                          const hasActiveChild = section.subheadings.some((sub: any) => activeSection === sub.id);
                          
                          return (
                            <div key={section.id} className="group">
                              {/* Section principale H2 */}
                              <div className="relative flex items-center gap-2">
                                <a
                                  href={`#${section.id}`}
                                  className={`
                                    flex-1 flex items-center gap-3 py-3 px-4 rounded-xl
                                    transition-all duration-300 relative overflow-hidden
                                    ${isActive ? 'bg-gradient-to-r' : 'hover:bg-white/5'}
                                  `}
                                  style={{
                                    background: isActive 
                                      ? `linear-gradient(90deg, ${colors.bgLight}, transparent)` 
                                      : hasActiveChild 
                                      ? colors.bgLight + '50'
                                      : undefined,
                                    borderLeft: isActive ? `3px solid ${colors.primary}` : '3px solid transparent'
                                  }}
                                >
                                  {/* Indicateur numéroté */}
                                  <div 
                                    className={`
                                      w-7 h-7 rounded-lg flex items-center justify-center
                                      text-xs font-bold transition-all duration-300
                                      ${isActive ? 'scale-110' : ''}
                                    `}
                                    style={{
                                      background: isActive ? colors.primary : colors.bgLight,
                                      color: isActive ? '#000' : colors.textColor
                                    }}
                                  >
                                    {sectionIndex + 1}
                                  </div>
                                  
                                  {/* Texte de la section */}
                                  <span 
                                    className={`
                                      flex-1 font-medium transition-colors duration-300
                                      ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                                    `}
                                  >
                                    {section.text}
                                  </span>
                                  
                                  {/* Badge de lecture si actif */}
                                  {isActive && (
                                    <div className="flex items-center gap-1 text-xs">
                                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                      <span className="text-green-500">En cours</span>
                                    </div>
                                  )}
                                </a>
                                
                                {/* Bouton toggle SÉPARÉ - En dehors du lien */}
                                {hasSubheadings && (
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setExpandedSections(prev => ({
                                        ...prev,
                                        [section.id]: !prev[section.id]
                                      }));
                                    }}
                                    className="p-1.5 rounded-lg transition-all duration-300 hover:bg-white/10"
                                    style={{ color: colors.textColor }}
                                  >
                                    <div className="relative">
                                      <ChevronDown 
                                        size={16} 
                                        className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                      />
                                      {!isExpanded && section.subheadings.length > 0 && (
                                        <div 
                                          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                                          style={{ background: colors.primary + '60' }}
                                        />
                                      )}
                                    </div>
                                  </button>
                                )}
                              </div>
                              
                              {/* Sous-sections H3 repliables */}
                              <AnimatePresence>
                                {hasSubheadings && isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-700/50 pl-4">
                                      {section.subheadings.map((sub: any, subIndex: number) => {
                                        const isSubActive = activeSection === sub.id;
                                        return (
                                          <a
                                            key={sub.id}
                                            href={`#${sub.id}`}
                                            className={`
                                              flex items-center gap-2 py-2 px-3 rounded-lg
                                              text-sm transition-all duration-200
                                              ${isSubActive ? 'bg-white/10' : 'hover:bg-white/5'}
                                            `}
                                            style={{
                                              color: isSubActive ? colors.textColor : '#9ca3af'
                                            }}
                                          >
                                            <div 
                                              className="w-1.5 h-1.5 rounded-full"
                                              style={{
                                                background: isSubActive ? colors.primary : '#4b5563'
                                              }}
                                            />
                                            <span className="line-clamp-1">
                                              {sub.text}
                                            </span>
                                            {isSubActive && (
                                              <Eye size={12} className="ml-auto" style={{ color: colors.primary }} />
                                            )}
                                          </a>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </nav>
                    
                    {/* Footer avec progression */}
                    <div 
                      className="p-4 border-t"
                      style={{ borderColor: colors.borderColor + '30' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Progression de lecture</span>
                        <span className="text-xs font-medium" style={{ color: colors.textColor }}>
                          {Math.round(scrollProgress)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ 
                            background: colors.bgGradient,
                            width: `${scrollProgress}%`
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats de l'article avec couleurs inline */}
                <div 
                  className="backdrop-blur-md rounded-2xl p-6"
                  style={{
                    background: colors.bgLight,
                    border: `1px solid ${colors.borderColor}`
                  }}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={handleLike}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <Heart size={24} className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors`} />
                      <span className="text-xs text-gray-400">{localLikes}</span>
                    </button>
                    <button
                      onClick={handleBookmark}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <Bookmark size={24} className={`${isBookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'} transition-colors`} />
                      <span className="text-xs text-gray-400">Sauver</span>
                    </button>
                    <button
                      onClick={handleShare}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <Share2 size={24} className="text-gray-400" />
                      <span className="text-xs text-gray-400">Partager</span>
                    </button>
                  </div>
                </div>

                {/* Articles similaires */}
                {relatedArticles.length > 0 && (
                  <div className="bg-gray-900/30 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-white">
                        Articles similaires
                      </h3>
                      <Link 
                        to="/articles"
                        className="text-sm transition-colors"
                        style={{ color: colors.textColor }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = colors.textColor;
                        }}
                      >
                        Voir tous →
                      </Link>
                    </div>
                    
                    <div className="space-y-4">
                      {relatedArticles.slice(0, 3).map((related) => (
                        <Link
                          key={related._id}
                          to={`/article/${related.slug.current}`}
                          className="group block"
                        >
                          <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                            {related.mainImage && related.mainImage.asset && related.mainImage.asset._ref && (
                              <img 
                                src={`https://cdn.sanity.io/images/z9wsynas/production/${related.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=120&h=80&fit=crop&auto=format`}
                                alt={related.title}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 
                                className="font-medium text-white transition-colors line-clamp-2 text-sm mb-2"
                                style={{
                                  color: '#ffffff'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = colors.textColor;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '#ffffff';
                                }}
                              >
                                {related.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Eye size={12} />
                                  {(related.views || 0).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Club Élite - Promotion avec les vraies infos */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div 
                    className="absolute inset-0 opacity-90"
                    style={{ background: colors.bgGradient }}
                  />
                  {/* Pattern décoratif */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 transform rotate-45 translate-x-16 -translate-y-16">
                      <div className="w-full h-full bg-white rounded-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 transform rotate-45 -translate-x-16 translate-y-16">
                      <div className="w-full h-full bg-white rounded-lg" />
                    </div>
                  </div>
                  
                  <div className="relative p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-white/20 rounded text-xs font-semibold text-white uppercase">
                        Le Club Élite
                      </span>
                      <span className="px-2 py-1 bg-orange-500 text-black rounded text-xs font-bold">
                        -50%
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      Rejoindre la liste d'attente
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      L'écosystème premium pour les entrepreneurs d'exception. 500+ inscrits sur liste d'attente.
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-3xl font-bold text-white">99€</p>
                        <p className="text-xs text-white/70">/mois</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white/70 line-through">199€</p>
                        <p className="text-xs text-yellow-400 font-semibold">Offre fondateurs</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Accès VIP aux contenus</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Communauté privée</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✔</span>
                        <span>Events mensuels exclusifs</span>
                      </div>
                    </div>
                    
                    <button 
                      className="w-full py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105"
                      onClick={() => window.location.href = '/le-club'}
                    >
                      🚀 Rejoindre la liste d'attente
                    </button>
                    
                    <p className="text-xs text-white/60 text-center mt-3">
                      7 jours d'essai • Sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Section Articles Recommandés */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Continuez votre lecture
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Découvrez d'autres articles qui pourraient vous intéresser
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.slice(0, 6).map((related, index) => {
                  // Déterminer les couleurs pour chaque article selon SA catégorie
                  const getCardColors = () => {
                    const cardCategory = related.categories?.[0]?.slug?.current?.toLowerCase();
                    
                    switch(cardCategory) {
                      case 'story':
                      case 'recits':
                        return {
                          gradient: 'from-amber-500 to-orange-500',
                          primary: '#f59e0b',
                          textColor: '#fbbf24',
                          borderColor: 'rgba(245, 158, 11, 0.3)'
                        };
                      case 'business':
                        return {
                          gradient: 'from-blue-500 to-cyan-500',
                          primary: '#3b82f6',
                          textColor: '#60a5fa',
                          borderColor: 'rgba(59, 130, 246, 0.3)'
                        };
                      case 'mental':
                      case 'psycho':
                        return {
                          gradient: 'from-purple-500 to-violet-500',
                          primary: '#a855f7',
                          textColor: '#c084fc',
                          borderColor: 'rgba(168, 85, 247, 0.3)'
                        };
                      case 'society':
                        return {
                          gradient: 'from-emerald-500 to-teal-500',
                          primary: '#10b981',
                          textColor: '#34d399',
                          borderColor: 'rgba(16, 185, 129, 0.3)'
                        };
                      default:
                        return {
                          gradient: 'from-gray-500 to-gray-600',
                          primary: '#6b7280',
                          textColor: '#9ca3af',
                          borderColor: 'rgba(107, 114, 128, 0.3)'
                        };
                    }
                  };
                  
                  const cardColors = getCardColors();
                  
                  return (
                    <motion.article 
                      key={related._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Link to={`/article/${related.slug.current}`}>
                        <div 
                          className="relative overflow-hidden rounded-xl bg-white/5 border transition-all hover:transform hover:scale-105"
                          style={{
                            borderColor: cardColors.borderColor
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = cardColors.primary;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = cardColors.borderColor;
                          }}
                        >
                          {related.mainImage && related.mainImage.asset && related.mainImage.asset._ref && (
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={`https://cdn.sanity.io/images/z9wsynas/production/${related.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=400&h=250&fit=crop&auto=format`}
                                alt={related.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                              
                              {/* Badge de catégorie avec gradient */}
                              {related.categories && related.categories[0] && (
                                <div className="absolute top-4 left-4">
                                  <span 
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${cardColors.gradient}`}
                                  >
                                    {related.categories[0].title}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="text-lg font-semibold text-white mt-2 mb-3 transition-colors line-clamp-2">
                              {related.title}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                              {related.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye size={14} style={{ color: cardColors.textColor, opacity: 0.7 }} />
                                {(related.views || 0).toLocaleString()} vues
                              </span>
                            </div>
                            
                            {/* Ligne de progression colorée au survol */}
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r"
                              style={{
                                background: `linear-gradient(to right, ${cardColors.primary}, ${cardColors.textColor})`
                              }}
                            />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <Link 
                  to="/articles"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white rounded-lg font-medium transition-all`}
                >
                  Voir tous les articles
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Barre d'actions mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-white/10 p-4 lg:hidden z-50">
          <div className="flex items-center justify-around">
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1 text-gray-400"
            >
              <Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
              <span className="text-xs">{localLikes}</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <MessageSquare size={20} />
              <span className="text-xs">0</span>
            </button>
            <button
              onClick={handleBookmark}
              className="flex flex-col items-center gap-1 text-gray-400"
            >
              <Bookmark size={20} className={isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''} />
            </button>
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-1 text-gray-400"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </ErrorBoundary>
  );
};

export default ArticlePage;
export { ArticlePage };