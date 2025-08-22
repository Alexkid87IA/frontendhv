import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Headphones,
  Mic,
  Radio,
  Clock,
  Calendar,
  TrendingUp,
  Star,
  Share2,
  ChevronRight,
  Filter,
  Search,
  Volume2,
  BarChart3,
  Users,
  Sparkles,
  Hash,
  X,
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Footer } from '../components/layout/Footer';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import SafeImage from '../components/common/SafeImage';
import { Link } from 'react-router-dom';
import { getAllEmissions } from '../utils/sanityAPI';

// Types
interface Episode {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  date: string;
  category: string;
  guest?: string;
  guestTitle?: string;
  listens: number;
  likes: number;
  audioUrl?: string;
  videoUrl?: string;
  featured?: boolean;
}

// Catégories avec leurs styles - AVEC GENERAL AJOUTÉ
const categoryConfig = {
  entrepreneuriat: {
    label: 'Entrepreneuriat',
    gradient: 'from-blue-400 to-cyan-500',
    icon: TrendingUp
  },
  leadership: {
    label: 'Leadership',
    gradient: 'from-purple-400 to-violet-500',
    icon: Users
  },
  innovation: {
    label: 'Innovation',
    gradient: 'from-green-400 to-emerald-500',
    icon: Sparkles
  },
  mindset: {
    label: 'Mindset',
    gradient: 'from-orange-400 to-red-500',
    icon: Hash
  },
  general: {
    label: 'Général',
    gradient: 'from-gray-400 to-gray-500',
    icon: Radio
  }
};

export const EmissionsPage = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'duration'>('recent');
  const [likedEpisodes, setLikedEpisodes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const episodesPerPage = 6;

  // Générer des épisodes de démonstration
  const generateMockEpisodes = (): Episode[] => {
    const allEpisodes = [
      {
        id: '1',
        slug: 'de-0-a-10m-en-2-ans',
        title: "De 0 à 10M€ en 2 ans : L'histoire incroyable de TechCorp",
        description: "Dans cet épisode exceptionnel, découvrez comment Jean Dupont a transformé une simple idée en empire tech valorisé à plusieurs millions. Une conversation sans filtre sur les défis, les échecs et les victoires.",
        thumbnail: 'https://picsum.photos/800/600?random=1',
        duration: '48:32',
        date: '2024-03-15',
        category: 'entrepreneuriat',
        guest: 'Jean Dupont',
        guestTitle: 'CEO & Fondateur de TechCorp',
        listens: 15420,
        likes: 892,
        featured: true
      },
      {
        id: '2',
        slug: 'leadership-2-0',
        title: "Leadership 2.0 : Comment diriger dans l'ère de l'IA",
        description: "Marie Laurent partage ses insights sur le leadership moderne et comment adapter son style de management à l'ère de l'intelligence artificielle.",
        thumbnail: 'https://picsum.photos/800/600?random=2',
        duration: '35:18',
        date: '2024-03-12',
        category: 'leadership',
        guest: 'Marie Laurent',
        guestTitle: 'VP Engineering chez Google',
        listens: 8932,
        likes: 445
      },
      {
        id: '3',
        slug: 'mindset-de-champion',
        title: "Mindset de champion : Les secrets des entrepreneurs qui réussissent",
        description: "Une plongée profonde dans la psychologie du succès avec le coach mental des plus grands entrepreneurs français.",
        thumbnail: 'https://picsum.photos/800/600?random=3',
        duration: '42:15',
        date: '2024-03-10',
        category: 'mindset',
        guest: 'Paul Martin',
        guestTitle: 'Coach mental & Auteur bestseller',
        listens: 12543,
        likes: 723
      },
      {
        id: '4',
        slug: 'innovation-disruptive',
        title: "Innovation disruptive : Comment identifier les opportunités de demain",
        description: "Sophie Chen révèle sa méthode pour repérer les tendances avant tout le monde et créer des business innovants.",
        thumbnail: 'https://picsum.photos/800/600?random=4',
        duration: '39:47',
        date: '2024-03-08',
        category: 'innovation',
        guest: 'Sophie Chen',
        guestTitle: 'Partner chez Sequoia Capital',
        listens: 9876,
        likes: 556
      },
      {
        id: '5',
        slug: 'scaling-international',
        title: "Scaling international : Les clés pour conquérir le monde",
        description: "Comment passer d'une startup française à une scale-up internationale ? Retour d'expérience avec celui qui l'a fait.",
        thumbnail: 'https://picsum.photos/800/600?random=5',
        duration: '51:23',
        date: '2024-03-05',
        category: 'entrepreneuriat',
        guest: 'Alexandre Petit',
        guestTitle: 'Serial Entrepreneur',
        listens: 7234,
        likes: 389
      },
      {
        id: '6',
        slug: 'remote-leadership',
        title: "Remote leadership : Manager des équipes distribuées",
        description: "Les meilleures pratiques pour diriger des équipes à distance et maintenir une culture d'entreprise forte.",
        thumbnail: 'https://picsum.photos/800/600?random=6',
        duration: '37:29',
        date: '2024-03-03',
        category: 'leadership',
        guest: 'Emma Wilson',
        guestTitle: 'Head of People chez Notion',
        listens: 6543,
        likes: 298
      }
    ];

    // Générer plus d'épisodes pour la démo
    for (let i = 7; i <= 20; i++) {
      allEpisodes.push({
        id: i.toString(),
        slug: `episode-${i}`,
        title: `Episode ${i} : ${['Stratégie de croissance', 'Innovation tech', 'Leadership inspirant', 'Mindset gagnant'][i % 4]}`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        thumbnail: `https://picsum.photos/800/600?random=${i}`,
        duration: `${30 + (i % 30)}:${String((i * 7) % 60).padStart(2, '0')}`,
        date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
        category: ['entrepreneuriat', 'leadership', 'innovation', 'mindset'][i % 4],
        guest: `Invité ${i}`,
        guestTitle: `Expert en ${['Business', 'Tech', 'Management', 'Growth'][i % 4]}`,
        listens: Math.floor(Math.random() * 10000) + 1000,
        likes: Math.floor(Math.random() * 1000) + 100
      });
    }

    return allEpisodes;
  };

  useEffect(() => {
    const fetchEmissions = async () => {
      try {
        setIsLoading(true);
        
        console.log('🔎 Appel de getAllEmissions...');
        const emissions = await getAllEmissions();
        console.log('📺 Émissions récupérées depuis Sanity:', emissions);
        console.log('📊 Nombre d\'émissions:', emissions?.length || 0);
        
        if (emissions && Array.isArray(emissions) && emissions.length > 0) {
          console.log('✅ Utilisation des vraies données Sanity');
          
          // Transformer les données Sanity au format Episode
          const formattedEpisodes = emissions.map((emission: any, index: number) => {
            const formatted = {
              id: emission._id,
slug: emission.slug || emission._id,
              title: emission.title || 'Sans titre',
              description: emission.description || '',
              thumbnail: emission.thumbnail || `https://picsum.photos/800/600?random=${index}`,
              duration: emission.duration || '00:00',
              date: emission.publishedAt || new Date().toISOString(),
              category: emission.category || 'general',
              guest: emission.guest?.name || emission.guest || null,
              guestTitle: emission.guest?.title || null,
              listens: typeof emission.listens === 'number' ? emission.listens : 0,
              likes: typeof emission.likes === 'number' ? emission.likes : 0,
              audioUrl: emission.audioUrl || null,
              videoUrl: emission.videoUrl || emission.videoUrlExternal || null,
              featured: Boolean(emission.featured)
            };
            
            console.log(`🎬 Épisode ${index + 1} formaté:`, formatted);
            return formatted;
          });
          
          console.log('📋 Tous les épisodes formatés:', formattedEpisodes);
          setEpisodes(formattedEpisodes);
        } else {
          console.log('⚠️ Aucune émission trouvée dans Sanity, utilisation des données mockées');
          setEpisodes(generateMockEpisodes());
        }
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des émissions:', error);
        console.error('Détails de l\'erreur:', error);
        // Utiliser les données mockées en cas d'erreur
        setEpisodes(generateMockEpisodes());
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmissions();
    
    // Charger les likes depuis localStorage
    const saved = localStorage.getItem('likedEpisodes');
    if (saved) {
      try {
        setLikedEpisodes(JSON.parse(saved));
      } catch (e) {
        console.error('Erreur parsing localStorage:', e);
        setLikedEpisodes([]);
      }
    }
  }, []);

  // Sauvegarder les likes
  useEffect(() => {
    localStorage.setItem('likedEpisodes', JSON.stringify(likedEpisodes));
  }, [likedEpisodes]);

  const handleLike = (episodeId: string) => {
    setLikedEpisodes(prev =>
      prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId]
    );
  };

  // Episode featured
  const featuredEpisode = episodes.find(e => e.featured) || episodes[0] || null;

  // Filtrage et tri
  const filteredEpisodes = episodes
    .filter(episode => {
      const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (episode.guest && episode.guest.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || episode.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'popular':
          return b.listens - a.listens;
        case 'duration':
          const aDuration = parseInt(a.duration.split(':')[0]) * 60 + parseInt(a.duration.split(':')[1]);
          const bDuration = parseInt(b.duration.split(':')[0]) * 60 + parseInt(b.duration.split(':')[1]);
          return aDuration - bDuration;
        default:
          return 0;
      }
    });

  // Episodes paginés
  const paginatedEpisodes = filteredEpisodes.slice(0, page * episodesPerPage);
  const hasMoreEpisodes = paginatedEpisodes.length < filteredEpisodes.length;

  const loadMoreEpisodes = () => {
    setPage(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Podcasts | Roger Ormières"
        description="Écoutez les conversations les plus inspirantes avec les entrepreneurs et leaders qui façonnent le monde de demain."
      />

      <div className="min-h-screen bg-black">
        {/* Hero Section avec Episode Featured */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background avec effet audio */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-cyan-900/30" />
            
            {/* Ondes sonores animées */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-cyan-500/20 rounded-full"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {featuredEpisode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Content */}
                <div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-full mb-6"
                  >
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="text-sm font-medium text-white">Épisode à la une</span>
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
                      {featuredEpisode.title}
                    </span>
                  </h1>

                  <p className="text-xl text-gray-300 mb-8">
                    {featuredEpisode.description}
                  </p>

                  {/* Guest info */}
                  {featuredEpisode.guest && (
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Mic className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{featuredEpisode.guest}</h3>
                        {featuredEpisode.guestTitle && (
                          <p className="text-gray-400 text-sm">{featuredEpisode.guestTitle}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredEpisode.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Headphones className="w-4 h-4" />
                      {featuredEpisode.listens.toLocaleString()} écoutes
                    </span>
                    <span className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      {featuredEpisode.likes} likes
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to={`/emission/${featuredEpisode.slug}`}
                      className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                    >
                      <span>Découvrir l'épisode</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>

                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative"
                >
                  <Link to={`/emission/${featuredEpisode.slug}`}>
                    <div className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group">
                      {featuredEpisode.thumbnail ? (
                        <img
                          src={featuredEpisode.thumbnail}
                          alt={featuredEpisode.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            console.log(`❌ Erreur de chargement de l'image featured`);
                            (e.target as HTMLImageElement).src = `https://picsum.photos/800/600?random=featured`;
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                          <Radio className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      
                      {/* Overlay au hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="text-white text-lg font-bold">Voir l'épisode</div>
                      </div>
                    </div>
                  </Link>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
                  <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-50 pointer-events-none" />
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-20 z-30 bg-black/80 backdrop-blur-xl border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un épisode, un invité..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
              >
                <option value="all">Toutes catégories</option>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
              >
                <option value="recent">Plus récents</option>
                <option value="popular">Plus écoutés</option>
                <option value="duration">Durée</option>
              </select>
            </div>
          </div>
        </section>

        {/* Episodes List */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-white mb-8">Tous les épisodes</h2>
          
          <div className="space-y-6">
            {paginatedEpisodes.map((episode, index) => {
              const isLiked = likedEpisodes.includes(episode.id);
              const categoryStyle = categoryConfig[episode.category as keyof typeof categoryConfig] || categoryConfig.general;
              
              return (
                <motion.article
                  key={episode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <Link to={`/emission/${episode.slug}`} className="block">
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      {/* Thumbnail - Format 16:9 */}
                      <div className="relative flex-shrink-0 w-full lg:w-80">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                          {episode.thumbnail ? (
                            <img
                              src={episode.thumbnail}
                              alt={episode.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => {
                                console.log(`❌ Erreur de chargement de l'image pour: ${episode.title}`);
                                (e.target as HTMLImageElement).src = `https://picsum.photos/800/600?random=${index}`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                              <Radio className="w-12 h-12 text-white/50" />
                            </div>
                          )}
                          {/* Overlay simple au hover */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${categoryStyle.gradient} rounded-full`}>
                              {categoryStyle.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(episode.date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
                          {episode.title}
                        </h3>

                        <p className="text-gray-400 mb-4 line-clamp-2">
                          {episode.description}
                        </p>

                        {/* Guest */}
                        {episode.guest && (
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                              <Mic className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{episode.guest}</div>
                              {episode.guestTitle && (
                                <div className="text-xs text-gray-500">{episode.guestTitle}</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Meta info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {episode.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Headphones className="w-4 h-4" />
                              {episode.listens.toLocaleString()}
                            </span>
                          </div>

                          {/* Indication visuelle pour cliquer */}
                          <div className="flex items-center gap-2 text-purple-400 group-hover:text-cyan-400 transition-colors">
                            <span className="text-sm font-medium">Découvrir</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Actions (likes et partage) en dehors du lien */}
                  <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLike(episode.id);
                      }}
                      className={`p-2 rounded-lg transition-all ${
                        isLiked 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Logique de partage ici
                        console.log('Partager:', episode.title);
                      }}
                      className="p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {paginatedEpisodes.length === 0 && (
            <div className="text-center py-20">
              <Volume2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Aucun épisode ne correspond à vos critères
              </p>
            </div>
          )}

          {/* Bouton Voir plus */}
          {hasMoreEpisodes && paginatedEpisodes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMoreEpisodes}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm text-white font-bold rounded-2xl border border-white/20 hover:from-purple-500/30 hover:to-cyan-500/30 transition-all"
              >
                <span>Voir plus d'épisodes</span>
                <ChevronRight className="w-5 h-5" />
                <span className="text-sm opacity-60">
                  ({filteredEpisodes.length - paginatedEpisodes.length} restants)
                </span>
              </motion.button>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default EmissionsPage;