import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Share2, ThumbsUp, ThumbsDown, Users, TrendingUp } from 'lucide-react';
import { ShareButtons } from '../common/ShareButtons';
import { sanityClient, urlFor } from '../../lib/sanityClient'; // Importer le client Sanity

// Interface pour les types de données Sanity
interface SanityDebate {
  _id: string;
  question: string;
  description: string;
  category: string;
  forPerson: {
    name: string;
    role: string;
    image: any; // Pour l'image Sanity
    argument: string;
    credentials: string;
    publications: number;
    citations: number;
  };
  againstPerson: {
    name: string;
    role: string;
    image: any; // Pour l'image Sanity
    argument: string;
    credentials: string;
    publications: number;
    citations: number;
  };
  stats: {
    participants: number;
    comments: number;
    votesFor: number;
    votesAgainst: number;
  };
  relatedArticles: Array<{
    title: string;
    article: {
      slug: {
        current: string;
      };
    };
  }>;
}

export const DebateSection = () => {
  const [debates, setDebates] = useState<SanityDebate[]>([]);
  const [currentDebateIndex, setCurrentDebateIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, { yes: number; no: number }>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [isSharing, setIsSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupérer les débats depuis Sanity
  useEffect(() => {
    const fetchDebates = async () => {
      try {
        setIsLoading(true);
        
        // Requête GROQ pour récupérer les débats actifs, triés par date de publication
        const query = `*[_type == "debate" && isActive == true] | order(publishedAt desc) {
          _id,
          question,
          description,
          category,
          forPerson {
            name,
            role,
            image,
            argument,
            credentials,
            publications,
            citations
          },
          againstPerson {
            name,
            role,
            image,
            argument,
            credentials,
            publications,
            citations
          },
          stats {
            participants,
            comments,
            votesFor,
            votesAgainst
          },
          "relatedArticles": relatedArticles[] {
            title,
            "article": article-> {
              "slug": slug.current
            }
          }
        }`;
        
        const fetchedDebates = await sanityClient.fetch(query);
        console.log("Débats récupérés:", fetchedDebates);
        
        if (fetchedDebates && fetchedDebates.length > 0) {
          setDebates(fetchedDebates);
          
          // Initialiser les résultats de vote pour chaque débat
          const initialResults: Record<string, { yes: number; no: number }> = {};
          fetchedDebates.forEach((debate: SanityDebate) => {
            const totalVotes = debate.stats.votesFor + debate.stats.votesAgainst;
            if (totalVotes > 0) {
              initialResults[debate._id] = {
                yes: Math.round((debate.stats.votesFor / totalVotes) * 100),
                no: Math.round((debate.stats.votesAgainst / totalVotes) * 100)
              };
            }
          });
          setResults(initialResults);
        }
        
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des débats:", err);
        setError("Impossible de charger les débats.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDebates();
  }, []);

  // Si aucun débat n'est disponible ou pendant le chargement
  if (isLoading) {
    return (
      <section className="container py-20">
        <div className="bg-neutral-900 rounded-2xl p-8 text-center">
          <p>Chargement des débats...</p>
        </div>
      </section>
    );
  }

  if (error || debates.length === 0) {
    return (
      <section className="container py-20">
        <div className="bg-neutral-900 rounded-2xl p-8 text-center">
          <p className="text-red-500">{error || "Aucun débat actif pour le moment."}</p>
        </div>
      </section>
    );
  }

  const currentDebate = debates[currentDebateIndex];

  const handleVote = async (debateId: string, vote: 'yes' | 'no') => {
    // Dans une version complète, vous pourriez envoyer le vote à une API ou à Sanity
    // Pour l'instant, nous simulons le vote localement
    
    // Simuler des pourcentages réalistes basés sur la participation actuelle
    const currentParticipants = currentDebate.stats.participants;
    const baseYesPercentage = 45 + Math.random() * 10; // Entre 45-55%
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
    
    // Vous pourriez implémenter ici une logique pour enregistrer le vote dans Sanity
    // via une API ou un webhook
  };

  const nextDebate = () => {
    setCurrentDebateIndex((prev) => (prev + 1) % debates.length);
  };

  const prevDebate = () => {
    setCurrentDebateIndex((prev) => (prev - 1 + debates.length) % debates.length);
  };

  const toggleComments = (debateId: string) => {
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
                disabled={debates.length <= 1}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextDebate}
                className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                aria-label="Débat suivant"
                disabled={debates.length <= 1}
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
                      src={currentDebate.forPerson.image && urlFor(currentDebate.forPerson.image).width(64).height(64).fit("crop").url()}
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
                      <span>{currentDebate.forPerson.publications} publications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      <span>{currentDebate.forPerson.citations} citations</span>
                    </div>
                  </div>

                  {hasVoted[currentDebate._id] && (
                    <div className="mt-6">
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results[currentDebate._id].yes}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-accent-violet"
                        />
                      </div>
                      <p className="text-sm text-accent-violet mt-2 font-semibold">
                        {results[currentDebate._id].yes}% sont d'accord
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
                      src={currentDebate.againstPerson.image && urlFor(currentDebate.againstPerson.image).width(64).height(64).fit("crop").url()}
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
                      <span>{currentDebate.againstPerson.publications} publications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={16} />
                      <span>{currentDebate.againstPerson.citations} citations</span>
                    </div>
                  </div>

                  {hasVoted[currentDebate._id] && (
                    <div className="mt-6">
                      <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${results[currentDebate._id].no}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-accent-cyan"
                        />
                      </div>
                      <p className="text-sm text-accent-cyan mt-2 font-semibold">
                        {results[currentDebate._id].no}% sont contre
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-6 pt-6">
              {!hasVoted[currentDebate._id] ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(currentDebate._id, 'yes')}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-accent-violet hover:bg-accent-violet/90 text-white font-semibold rounded-xl transition-colors"
                  >
                    <ThumbsUp size={20} />
                    <span>Je suis pour</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(currentDebate._id, 'no')}
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
                  <Users size={16} />
                  <span>{currentDebate.stats.participants} participants</span>
                </div>
                <button
                  onClick={() => toggleComments(currentDebate._id)}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>{currentDebate.stats.comments} commentaires</span>
                </button>
                <button
                  onClick={() => setIsSharing(!isSharing)}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Share2 size={16} />
                  <span>Partager</span>
                </button>
              </div>

              {/* Sharing Options */}
              {isSharing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  <ShareButtons
                    url={`${window.location.origin}/debat/${currentDebate._id}`}
                    title={currentDebate.question}
                    onClose={() => setIsSharing(false)}
                  />
                </motion.div>
              )}

              {/* Related Articles */}
              {currentDebate.relatedArticles && currentDebate.relatedArticles.length > 0 && (
                <div className="w-full mt-8">
                  <h4 className="text-lg font-semibold mb-4">Articles liés</h4>
                  <ul className="space-y-2">
                    {currentDebate.relatedArticles.map((article, index) => (
                      <li key={index}>
                        <a
                          href={`/article/${article.article?.slug}`}
                          className="text-accent-violet hover:underline"
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
