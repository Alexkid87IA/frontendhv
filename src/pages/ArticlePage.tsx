// src/pages/ArticlePage.tsx - Version finale avec design amélioré
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Share2, Bookmark, MessageSquare, Calendar, Clock, 
  User, Heart, Eye, ChevronRight, Copy, Check, Twitter, 
  Linkedin, Facebook, BookOpen, TrendingUp, ArrowRight, X,
  Mail, Send, MessageCircle
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
}

const ArticlePage: React.FC = () => {
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
        
        let fetchedArticle = null;
        
        try {
          fetchedArticle = await getArticleBySlug(slug, isPreview);
          if (fetchedArticle) {
            setDataSource('sanity');
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
            
            // Filtrer les articles de la même catégorie
            let filtered;
            if (fetchedArticle.categories && fetchedArticle.categories.length > 0) {
              const categoryIds = fetchedArticle.categories.map((c: any) => c._id);
              filtered = allArticles
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
              const otherArticles = allArticles
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
  }, [slug]);

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
    },
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
        {/* Hero Section avec image visible */}
        <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          {/* Image de fond */}
          <div className="absolute inset-0">
            {article.mainImage && article.mainImage.asset && article.mainImage.asset._ref ? (
              <img 
                src={buildSanityImageUrl(article.mainImage.asset._ref)}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.85 }}
                onError={(e) => {
                  console.error("Erreur chargement image:", e);
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80";
                }}
              />
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
                alt="Article background"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.85 }}
              />
            )}
            {/* Gradient minimal juste pour assurer la lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
          </div>

          {/* Contenu Hero */}
          <div className="relative container mx-auto px-4 pb-12 pt-40">
            {/* Breadcrumb avec couleurs de la verticale */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gray-300 text-sm mb-8 backdrop-blur-sm bg-black/20 rounded-full px-4 py-2 w-fit"
            >
              <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight size={14} className="text-gray-500" />
              <Link to="/articles" className="hover:text-white transition-colors">Articles</Link>
              {article.categories && article.categories[0] && (
                <>
                  <ChevronRight size={14} className="text-gray-500" />
                  <Link 
                    to={`/rubrique/${article.categories[0].slug.current}`}
                    className="font-medium transition-colors"
                    style={{ color: colors.textColor }}
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

            {/* Titre */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl leading-tight"
            >
              {article.title}
            </motion.h1>

            {/* Excerpt */}
            {article.excerpt && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 max-w-3xl mb-8"
              >
                {article.excerpt}
              </motion.p>
            )}

            {/* Meta info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              {article.author && (
                <div className="flex items-center gap-3">
                  {article.author.image ? (
                    <img 
                      src={urlFor(article.author.image).width(48).height(48).url()}
                      alt={article.author.name}
                      className="w-12 h-12 rounded-full border-2 border-white/20"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <User size={20} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-white font-medium">{article.author.name}</p>
                    {article.author.bio && (
                      <p className="text-gray-400 text-sm line-clamp-1">{article.author.bio}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 text-gray-400 text-sm">
                {article.publishedAt && (
                  <span className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {estimatedReadingTime} min
                </span>
                <span className="flex items-center gap-2">
                  <Eye size={16} />
                  {(article.views || 0).toLocaleString()} vues
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Container principal avec layout 2 colonnes */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contenu principal */}
            <article className="lg:col-span-8">
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
            </article>

            {/* Sidebar droite */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                
                {/* Encart Auteur - En premier */}
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
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {article.publishedAt && new Date(article.publishedAt).toLocaleDateString('fr-FR', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {estimatedReadingTime} min
                          </span>
                        </div>
                      </div>
                    </div>
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
                
                {/* Table des matières */}
                {article.body && article.body.filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style)).length > 0 && (
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-1 h-6 rounded-full"
                        style={{ background: colors.bgGradient }}
                      />
                      <h3 className="text-lg font-semibold text-white">
                        Sommaire
                      </h3>
                    </div>
                    
                    <nav className="space-y-1">
                      {article.body
                        .filter((block: any) => block._type === 'block' && ['h2', 'h3'].includes(block.style))
                        .map((heading: any, index: number) => {
                          const text = heading.children?.[0]?.text || '';
                          const id = `heading-${index}`;
                          const isH3 = heading.style === 'h3';
                          const isActive = activeSection === id;
                          
                          return (
                            <a
                              key={id}
                              href={`#${id}`}
                              className={`group flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 ${
                                isH3 ? 'ml-4' : ''
                              }`}
                              style={{
                                background: isActive ? colors.bgLight : 'transparent',
                                color: isActive ? colors.textColor : '#9ca3af'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                  e.currentTarget.style.color = '#ffffff';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = '#9ca3af';
                                }
                              }}
                            >
                              <span 
                                className="w-2 h-2 rounded-full transition-all duration-200"
                                style={{
                                  background: isActive ? colors.primary : '#4b5563',
                                  boxShadow: isActive ? `0 0 12px ${colors.primary}50` : 'none'
                                }}
                              />
                              <span className={`${isH3 ? 'text-sm' : 'text-base'} line-clamp-2`}>
                                {text}
                              </span>
                            </a>
                          );
                        })}
                    </nav>
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
                                  <Clock size={12} />
                                  {related.readingTime || 5} min
                                </span>
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
                        <span className="text-yellow-400">✓</span>
                        <span>Accès VIP aux contenus</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✓</span>
                        <span>Communauté privée</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-white/90">
                        <span className="text-yellow-400">✓</span>
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
                {relatedArticles.slice(0, 6).map((related, index) => (
                  <motion.article 
                    key={related._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/article/${related.slug.current}`}>
                      <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105">
                        {related.mainImage && related.mainImage.asset && related.mainImage.asset._ref && (
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={`https://cdn.sanity.io/images/z9wsynas/production/${related.mainImage.asset._ref.replace('image-', '').replace('-jpg', '.jpg').replace('-png', '.png').replace('-webp', '.webp')}?w=400&h=250&fit=crop&auto=format`}
                              alt={related.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          </div>
                        )}
                        <div className="p-6">
                          {related.categories && related.categories[0] && (
                            <span className={`text-xs ${colors.text} font-medium uppercase`}>
                              {related.categories[0].title}
                            </span>
                          )}
                          <h3 className={`text-lg font-semibold text-white mt-2 mb-3 group-hover:${colors.text} transition-colors line-clamp-2`}>
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                            {related.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{related.readingTime || 5} min de lecture</span>
                            <span className="flex items-center gap-1">
                              <Eye size={14} />
                              {(related.views || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
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