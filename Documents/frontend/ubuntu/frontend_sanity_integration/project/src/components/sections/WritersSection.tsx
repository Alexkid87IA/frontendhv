import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pen, Book, Heart, Coffee, Star, ArrowRight, Globe, Brain, Target, Users } from 'lucide-react';

interface Writer {
  name: string;
  color: string;
  quote: string;
  voice: string[];
  expertise: string[];
  hobby: string;
  bio: string;
  image: string;
  articles: number;
  featured?: boolean;
  role: string;
  stats?: {
    views: number;
    engagement: number;
    articles: number;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const writers: Writer[] = [
  {
    name: "Roger Ormières",
    role: "Fondateur & Rédacteur en chef",
    color: "from-accent-violet to-accent-fuchsia",
    quote: "L'entrepreneuriat est une aventure humaine avant d'être un business.",
    voice: ["authentique", "inspirante", "stratégique"],
    expertise: ["entrepreneuriat", "innovation", "leadership"],
    hobby: "passionné de podcasting et d'histoires entrepreneuriales",
    bio: "Entrepreneur, investisseur et producteur, Roger accompagne les entrepreneurs ambitieux à travers le monde. Créateur du podcast High Value Entrepreneurs, il donne la parole à ceux qui osent transformer leur vision en réalité.",
    image: "https://yt3.googleusercontent.com/JoLqbdLoPqNLoBUYorqoeyht0KT5uyehGL5ppcCIu5s5PAOeMXi86FoULWWjE2VpJnBKdYPmNj8=s900-c-k-c0x00ffffff-no-rj",
    articles: 45,
    featured: true,
    stats: {
      views: 1200000,
      engagement: 85,
      articles: 45
    },
    social: {
      twitter: "@rogerormieres",
      linkedin: "rogerormieres",
      instagram: "@rogerormieres"
    }
  },
  {
    name: "Alexia Delvaux",
    role: "Experte Récits de vie",
    color: "from-orange-400 to-orange-600",
    quote: "Les émotions sont des messagères, pas des obstacles.",
    voice: ["poétique", "introspective", "inspirante"],
    expertise: ["récits de vie", "développement personnel", "quête de sens"],
    hobby: "écrit chaque matin au bord d'un lac et collectionne les carnets Moleskine",
    bio: "Alexia est passionnée par les chemins de traverse, les renaissances personnelles et les histoires qui touchent l'âme. Elle écrit comme on respire : pour comprendre ce qui nous transforme.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    articles: 28,
    stats: {
      views: 450000,
      engagement: 92,
      articles: 28
    }
  },
  {
    name: "Victor Sorel",
    role: "Expert Business & Innovation",
    color: "from-blue-400 to-blue-600",
    quote: "Tout est système, même l'intuition.",
    voice: ["claire", "stratégique", "structurée"],
    expertise: ["business", "reconversion", "innovation"],
    hobby: "fan de design de jeux de stratégie, joueur d'échecs amateur",
    bio: "Victor décrypte les tendances du travail, les mutations de société et l'économie de demain. Ses articles sont taillés pour aider à mieux penser… et mieux décider.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    articles: 32,
    stats: {
      views: 680000,
      engagement: 78,
      articles: 32
    }
  },
  {
    name: "Lila Moreno",
    role: "Experte Culture & Société",
    color: "from-emerald-400 to-emerald-600",
    quote: "Si la pop culture n'est pas politique, alors rien ne l'est.",
    voice: ["maligne", "connectée", "vibrante"],
    expertise: ["culture contemporaine", "société", "lifestyle"],
    hobby: "flâne dans les friperies, écoute des podcasts sur l'astrologie et la sociologie",
    bio: "Lila observe le monde comme une story permanente. Elle capte les signaux faibles, les mythes modernes et les nouvelles façons de vivre et de penser — toujours avec un regard libre et pop.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    articles: 24,
    stats: {
      views: 320000,
      engagement: 88,
      articles: 24
    }
  },
  {
    name: "Émile Chazal",
    role: "Expert Éditos & Tribunes",
    color: "from-purple-400 to-purple-600",
    quote: "L'élégance d'une idée réside dans la justesse de sa structure.",
    voice: ["érudite", "fluide", "engagée"],
    expertise: ["éditos", "tribunes", "philosophie appliquée"],
    hobby: "passionné d'archives radiophoniques et de calligraphie",
    bio: "Émile écrit pour faire dialoguer le passé et le présent. Ses textes allient exigence intellectuelle et clarté accessible, avec une voix toujours singulière et juste.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
    articles: 30,
    stats: {
      views: 520000,
      engagement: 82,
      articles: 30
    }
  },
  {
    name: "Nora Bellami",
    role: "Experte Guides Pratiques",
    color: "from-rose-400 to-rose-600",
    quote: "Apprendre, c'est déjà se transformer.",
    voice: ["didactique", "positive", "chaleureuse"],
    expertise: ["guides pratiques", "articles de fond", "pédagogie bienveillante"],
    hobby: "anime des ateliers d'écriture bénévolement et collectionne des plantes médicinales",
    bio: "Nora simplifie l'essentiel. Ses articles sont des outils pour avancer avec confiance, clarté et autonomie, dans une langue limpide et motivante.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
    articles: 26,
    stats: {
      views: 420000,
      engagement: 90,
      articles: 26
    }
  }
];

const WriterCard = ({ writer }: { writer: Writer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${writer.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
      <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 h-full">
        {/* Header */}
        <div className="flex items-start gap-6 mb-6">
          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={writer.image}
              alt={writer.name}
              className="w-full h-full object-cover rounded-xl"
            />
            {writer.featured && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-violet rounded-full flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{writer.name}</h3>
              {writer.featured && (
                <Star size={16} className="text-accent-violet" />
              )}
            </div>
            <p className="text-sm text-accent-violet mb-2">{writer.role}</p>
            <p className="text-sm text-tertiary italic">"{writer.quote}"</p>
          </div>
        </div>

        {/* Stats */}
        {writer.stats && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <Globe size={18} className="text-accent-violet mx-auto mb-2" />
              <div className="text-lg font-bold">{(writer.stats.views / 1000).toFixed(0)}k</div>
              <div className="text-xs text-tertiary">Vues</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <Brain size={18} className="text-accent-violet mx-auto mb-2" />
              <div className="text-lg font-bold">{writer.stats.engagement}%</div>
              <div className="text-xs text-tertiary">Engagement</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 text-center">
              <Target size={18} className="text-accent-violet mx-auto mb-2" />
              <div className="text-lg font-bold">{writer.stats.articles}</div>
              <div className="text-xs text-tertiary">Articles</div>
            </div>
          </div>
        )}

        {/* Expertise & Voice */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Pen size={16} className="text-accent-violet" />
              <span>Style d'écriture</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {writer.voice.map((trait, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 rounded-full text-xs"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Book size={16} className="text-accent-violet" />
              <span>Expertise</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {writer.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio & More */}
        <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Users size={16} className="text-accent-violet" />
              <span>Bio</span>
            </h4>
            <p className="text-sm text-tertiary">{writer.bio}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
              <Heart size={16} className="text-accent-violet" />
              <span>Passion</span>
            </h4>
            <p className="text-sm text-tertiary">{writer.hobby}</p>
          </div>
          {writer.social && (
            <div className="pt-4 flex justify-end gap-4">
              {writer.social.twitter && (
                <a href={`https://twitter.com/${writer.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-accent-violet transition-colors">
                  Twitter
                </a>
              )}
              {writer.social.linkedin && (
                <a href={`https://linkedin.com/in/${writer.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-accent-violet transition-colors">
                  LinkedIn
                </a>
              )}
              {writer.social.instagram && (
                <a href={`https://instagram.com/${writer.social.instagram}`} target="_blank" rel="noopener noreferrer" className="text-tertiary hover:text-accent-violet transition-colors">
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 w-full flex items-center justify-center gap-2 text-sm text-accent-violet hover:text-accent-fuchsia transition-colors"
        >
          <span>{isExpanded ? 'Voir moins' : 'En savoir plus'}</span>
          <ArrowRight size={16} className={`transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
};

export const WritersSection = () => {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
        >
          L'équipe éditoriale
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Les plumes de High Value
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-tertiary text-lg max-w-2xl mx-auto"
        >
          Une équipe de rédacteurs passionnés qui partagent leur expertise et leur vision unique
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {writers.map((writer, index) => (
          <WriterCard key={index} writer={writer} />
        ))}
      </div>
    </section>
  );
};