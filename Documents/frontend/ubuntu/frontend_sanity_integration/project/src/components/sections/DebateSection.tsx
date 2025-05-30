import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Share2, ThumbsUp, ThumbsDown, Users, TrendingUp } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';

const debates = [
  {
    id: 1,
    question: "Faut-il interdire l'IA dans les écoles ?",
    description: "L'intelligence artificielle révolutionne l'éducation, mais soulève aussi des questions éthiques importantes.",
    category: "Tech & Éducation",
    forPerson: {
      name: "Sarah Chen",
      role: "Directrice EdTech",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      argument: "Les élèves doivent développer leur créativité et leur esprit critique naturellement. L'IA risque de créer une dépendance et d'inhiber le développement de compétences fondamentales.",
      credentials: "15 ans d'expérience en pédagogie numérique",
      stats: {
        publications: 12,
        citations: 450
      }
    },
    againstPerson: {
      name: "Thomas Mueller",
      role: "Chercheur en IA éducative",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      argument: "L'IA est un outil comme un autre. La vraie question est d'apprendre à l'utiliser de manière éthique et responsable. C'est une compétence essentielle pour le futur.",
      credentials: "Docteur en sciences de l'éducation",
      stats: {
        publications: 18,
        citations: 680
      }
    },
    stats: {
      participants: 2547,
      comments: 156
    },
    relatedArticles: [
      {
        title: "L'impact de l'IA sur l'apprentissage",
        url: "/article/ia-apprentissage"
      }
    ]
  },
  {
    id: 2,
    question: "Le télétravail devrait-il devenir la norme ?",
    description: "La pandémie a bouleversé nos habitudes de travail. Est-il temps d'institutionnaliser le travail à distance ?",
    category: "Travail & Société",
    forPerson: {
      name: "Marie Durant",
      role: "DRH Innovation",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      argument: "Le télétravail améliore la qualité de vie, réduit le stress et l'empreinte carbone, tout en augmentant la productivité. C'est un modèle plus durable et plus humain.",
      credentials: "Expert en transformation organisationnelle",
      stats: {
        publications: 8,
        citations: 320
      }
    },
    againstPerson: {
      name: "Pierre Lambert",
      role: "Sociologue du travail",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
      argument: "Le bureau physique est essentiel pour la créativité collective, la cohésion d'équipe et la transmission des savoirs. Le tout-télétravail risque de déshumaniser le travail.",
      credentials: "Auteur de 'L'entreprise relationnelle'",
      stats: {
        publications: 15,
        citations: 890
      }
    },
    stats: {
      participants: 3102,
      comments: 234
    },
    relatedArticles: [
      {
        title: "Télétravail : les nouveaux défis",
        url: "/article/teletravail-defis"
      }
    ]
  },
  {
    id: 3,
    question: "Les réseaux sociaux font-ils plus de mal que de bien ?",
    description: "Entre connexion sociale et addiction numérique, quel est l'impact réel des réseaux sociaux sur notre société ?",
    category: "Tech & Société",
    forPerson: {
      name: "Julie Martin",
      role: "Psychologue numérique",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
      argument: "Les réseaux sociaux créent une dépendance psychologique, augmentent l'anxiété et l'isolement réel, tout en favorisant la désinformation et la polarisation sociale.",
      credentials: "Spécialiste en cyberdépendance",
      stats: {
        publications: 10,
        citations: 560
      }
    },
    againstPerson: {
      name: "Lucas Bernard",
      role: "Analyste médias sociaux",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
      argument: "Les réseaux sociaux sont des outils de démocratisation de l'information et de mobilisation sociale sans précédent. Ils créent des opportunités et des connexions impossibles autrement.",
      credentials: "Expert en communication digitale",
      stats: {
        publications: 14,
        citations: 720
      }
    },
    stats: {
      participants: 4205,
      comments: 312
    },
    relatedArticles: [
      {
        title: "Réseaux sociaux : le vrai du faux",
        url: "/article/reseaux-sociaux-impact"
      }
    ]
  }
];

export const DebateSection = () => {
  const [currentDebateIndex, setCurrentDebateIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState<Record<number, boolean>>({});
  const [results, setResults] = useState<Record<number, { yes: number; no: number }>>({});
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [isSharing, setIsSharing] = useState(false);

  const currentDebate = debates[currentDebateIndex];

  const handleVote = (debateId: number, vote: 'yes' | 'no') => {
    // Simulate realistic voting percentages based on current participation
    const currentParticipants = currentDebate.stats.participants;
    const baseYesPercentage = 45 + Math.random() * 10; // Between 45-55%
    const totalVotes = currentParticipants + 1;
    
    const yesVotes = Math.round((vote === 'yes' ? baseYesPercentage + 1 : baseYesPercentage) * totalVotes / 100);
    const noVotes = totalVotes - yesVotes;
    
    setResults(prev => ({
      ...prev,
      [debateId]: {
        yes: Math.round((yesVotes / totalVotes) * 100),
        no: Math.round((noVotes / totalVotes) * 100)
      }
    }));
    setHasVoted(prev => ({ ...prev, [debateId]: true }));
  };

  const nextDebate = () => {
    setCurrentDebateIndex((prev) => (prev + 1) % debates.length);
  };

  const prevDebate = () => {
    setCurrentDebateIndex((prev) => (prev - 1 + debates.length) % debates.length);
  };

  const toggleComments = (debateId: number) => {
    setShowComments(prev => ({ ...prev, [debateId]: !prev[debateId] }));
  };

  return (
    <section className="container py-20">
      <div className="bg-neutral-900 rounded-2xl p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/5 to-accent-fuchsia/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-4"
              >
                Le débat de la semaine
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-bold">
                Confrontez les idées
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevDebate}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Débat précédent"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextDebate}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Débat suivant"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Debate Content */}
          <div className="space-y-8">
            {/* Question & Category */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-sm text-tertiary">
                  {currentDebateIndex + 1} / {debates.length}
                </span>
                <span className="px-3 py-1 bg-accent-violet/20 text-accent-violet rounded-full text-sm">
                  {currentDebate.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {currentDebate.question}
              </h3>
              <p className="text-tertiary text-lg max-w-2xl mx-auto">
                {currentDebate.description}
              </p>
            </div>

            {/* Debate Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pour */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-neutral-800 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-violet/10 to-transparent" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={currentDebate.forPerson.image}
                      alt={currentDebate.forPerson.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{currentDebate.forPerson.name}</h4>
                      <p className="text-accent-violet text-sm">{currentDebate.forPerson.role}</p>
                      <p className="text-xs text-tertiary">{currentDebate.forPerson.credentials}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg mb-6">
                    "{currentDebate.forPerson.argument}"
                  </blockquote>

                  <div className="flex items-center gap-4 text-sm text-tertiary">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{currentDebate.forPerson.stats.publications} publications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      <span>{currentDebate.forPerson.stats.citations} citations</span>
                    </div>
                  </div>

                  {hasVoted[currentDebate.id] && (
                    <div className="mt-6">
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results[currentDebate.id].yes}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-accent-violet"
                        />
                      </div>
                      <p className="text-sm text-accent-violet mt-2 font-semibold">
                        {results[currentDebate.id].yes}% sont d'accord
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Contre */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-neutral-800 rounded-xl p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={currentDebate.againstPerson.image}
                      alt={currentDebate.againstPerson.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-lg">{currentDebate.againstPerson.name}</h4>
                      <p className="text-accent-cyan text-sm">{currentDebate.againstPerson.role}</p>
                      <p className="text-xs text-tertiary">{currentDebate.againstPerson.credentials}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg mb-6">
                    "{currentDebate.againstPerson.argument}"
                  </blockquote>

                  <div className="flex items-center gap-4 text-sm text-tertiary">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{currentDebate.againstPerson.stats.publications} publications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      <span>{currentDebate.againstPerson.stats.citations} citations</span>
                    </div>
                  </div>

                  {hasVoted[currentDebate.id] && (
                    <div className="mt-6">
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results[currentDebate.id].no}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-accent-cyan"
                        />
                      </div>
                      <p className="text-sm text-accent-cyan mt-2 font-semibold">
                        {results[currentDebate.id].no}% sont contre
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-6 pt-6">
              {!hasVoted[currentDebate.id] ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(currentDebate.id, 'yes')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 text-white font-semibold rounded-xl transition-colors"
                  >
                    <ThumbsUp size={20} />
                    <span>Je suis pour</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(currentDebate.id, 'no')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-accent-cyan hover:bg-accent-cyan/90 text-white font-semibold rounded-xl transition-colors"
                  >
                    <ThumbsDown size={20} />
                    <span>Je suis contre</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-accent-violet"
                >
                  <Check size={20} />
                  <span>Merci pour votre participation ! 🎉</span>
                </motion.div>
              )}

              {/* Stats & Actions */}
              <div className="flex items-center gap-6 text-sm text-tertiary">
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{currentDebate.stats.participants} participants</span>
                </div>
                <button
                  onClick={() => toggleComments(currentDebate.id)}
                  className="flex items-center gap-2 hover:text-accent-violet transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>{currentDebate.stats.comments} commentaires</span>
                </button>
                <button
                  onClick={() => setIsSharing(!isSharing)}
                  className="flex items-center gap-2 hover:text-accent-violet transition-colors"
                >
                  <Share2 size={18} />
                  <span>Partager</span>
                </button>
              </div>

              {/* Share Panel */}
              {isSharing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-md"
                >
                  <h4 className="text-lg font-semibold mb-4">Partager ce débat</h4>
                  <ShareButtons title={currentDebate.question} />
                </motion.div>
              )}

              {/* Related Articles */}
              {currentDebate.relatedArticles.length > 0 && (
                <div className="w-full max-w-2xl mt-6 p-4 bg-neutral-800/50 rounded-xl">
                  <h4 className="text-sm font-semibold mb-2">Articles liés</h4>
                  <ul className="space-y-2">
                    {currentDebate.relatedArticles.map((article, index) => (
                      <li key={index}>
                        <a
                          href={article.url}
                          className="text-accent-violet hover:text-accent-cyan transition-colors"
                        >
                          {article.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};