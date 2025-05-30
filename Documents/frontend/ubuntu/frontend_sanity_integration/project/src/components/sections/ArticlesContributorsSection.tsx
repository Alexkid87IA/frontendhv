import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronDown, ChevronUp } from 'lucide-react';

const contributors = [
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
    featured: true
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
    articles: 28
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
    articles: 32
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
    articles: 24
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
    articles: 30
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
    articles: 26
  }
];

export const ArticlesContributorsSection = () => {
  const [expandedContributor, setExpandedContributor] = useState<string | null>(null);

  const toggleContributor = (name: string) => {
    setExpandedContributor(expandedContributor === name ? null : name);
  };

  return (
    <section className="container mb-20">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">L'équipe éditoriale</h2>
          <p className="text-tertiary">Une équipe de rédacteurs passionnés qui partagent leur expertise</p>
        </div>
        <Link
          to="/about"
          className="flex items-center gap-2 text-accent-fuchsia hover:text-accent-cyan transition-colors"
        >
          <span>En savoir plus</span>
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${contributor.color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            
            <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={contributor.image}
                    alt={contributor.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  {contributor.featured && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-violet rounded-full flex items-center justify-center">
                      <Star size={12} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{contributor.name}</h3>
                  <p className="text-sm text-accent-violet">{contributor.role}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm italic text-tertiary mb-4">
                "{contributor.quote}"
              </blockquote>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-tertiary mb-4">
                <div>{contributor.articles} articles</div>
                <div>{contributor.expertise.length} domaines d'expertise</div>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => toggleContributor(contributor.name)}
                className="flex items-center gap-2 text-sm text-accent-fuchsia hover:text-accent-cyan transition-colors"
              >
                <span>{expandedContributor === contributor.name ? 'Voir moins' : 'En savoir plus'}</span>
                {expandedContributor === contributor.name ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Expanded Content */}
              {expandedContributor === contributor.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/5"
                >
                  {/* Expertise */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {contributor.expertise.map((exp, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 rounded-full text-xs"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Voice */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Style d'écriture</h4>
                    <div className="flex flex-wrap gap-2">
                      {contributor.voice.map((v, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-white/5 rounded-full text-xs"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Bio</h4>
                    <p className="text-sm text-tertiary">{contributor.bio}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};