import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

const mockDebate = {
  title: "L'IA va-t-elle remplacer les entrepreneurs ?",
  description: "Un débat passionnant sur l'impact de l'intelligence artificielle dans l'entrepreneuriat",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
  opinions: [
    {
      position: "Pour",
      author: {
        name: "Sarah Chen",
        role: "CEO IA Solutions",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
      },
      arguments: [
        "L'IA peut analyser des données plus rapidement qu'un humain",
        "Les algorithmes prennent des décisions plus objectives",
        "Automatisation croissante des tâches entrepreneuriales"
      ],
      votes: 245
    },
    {
      position: "Contre",
      author: {
        name: "Marc Dubois",
        role: "Expert Innovation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      },
      arguments: [
        "L'entrepreneuriat nécessite une intelligence émotionnelle",
        "La créativité humaine reste inégalée",
        "L'IA est un outil, pas un remplacement"
      ],
      votes: 312
    }
  ],
  moderator: {
    name: "Elena Rodriguez",
    role: "Startup Advisor",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
  stats: {
    totalVotes: 557,
    comments: 234,
    shares: "1.2K"
  }
};

export const DebateSection = () => {
  const [userVote, setUserVote] = useState<"pour" | "contre" | null>(null);
  const [votes, setVotes] = useState({
    pour: mockDebate.opinions[0].votes,
    contre: mockDebate.opinions[1].votes
  });

  const handleVote = (position: "pour" | "contre") => {
    if (userVote === position) {
      setVotes(prev => ({
        ...prev,
        [position]: prev[position] - 1
      }));
      setUserVote(null);
    } else {
      if (userVote) {
        setVotes(prev => ({
          ...prev,
          [userVote]: prev[userVote] - 1,
          [position]: prev[position] + 1
        }));
      } else {
        setVotes(prev => ({
          ...prev,
          [position]: prev[position] + 1
        }));
      }
      setUserVote(position);
    }
  };

  const totalVotes = votes.pour + votes.contre;
  const pourPercentage = Math.round((votes.pour / totalVotes) * 100);
  const contrePercentage = Math.round((votes.contre / totalVotes) * 100);

  return (
    <ErrorBoundary>
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black rounded-3xl border border-white/10"
          >
            {/* Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6">
                  <MessageSquare size={18} />
                  <span>Débat de la semaine</span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  {mockDebate.title}
                </h2>

                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  {mockDebate.description}
                </p>

                {/* Moderator */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <SafeImage
                      image={mockDebate.moderator.image}
                      alt={mockDebate.moderator.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {mockDebate.moderator.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      Modérateur · {mockDebate.moderator.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Opinions Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {mockDebate.opinions.map((opinion, index) => (
                  <motion.div
                    key={opinion.position}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                  >
                    {/* Author */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <SafeImage
                          image={opinion.author.image}
                          alt={opinion.author.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {opinion.author.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {opinion.author.role}
                        </div>
                      </div>
                    </div>

                    {/* Position */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-6 ${
                      opinion.position === "Pour" 
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      {opinion.position}
                    </div>

                    {/* Arguments */}
                    <ul className="space-y-4 mb-6">
                      {opinion.arguments.map((argument, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 mt-2 rounded-full bg-accent-blue flex-shrink-0" />
                          <span className="text-gray-300">{argument}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Vote Button */}
                    <button
                      onClick={() => handleVote(opinion.position.toLowerCase() as "pour" | "contre")}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        userVote === opinion.position.toLowerCase()
                          ? "bg-accent-blue text-white"
                          : "bg-white/10 hover:bg-white/20 text-white"
                      }`}
                    >
                      {opinion.position === "Pour" ? (
                        <ThumbsUp size={18} />
                      ) : (
                        <ThumbsDown size={18} />
                      )}
                      <span>Voter {opinion.position}</span>
                    </button>

                    {/* Vote Count */}
                    <div className="mt-4 text-center text-sm text-gray-400">
                      {opinion.position === "Pour" ? pourPercentage : contrePercentage}% 
                      ({opinion.position === "Pour" ? votes.pour : votes.contre} votes)
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Stats & CTA */}
              <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
                <div className="flex gap-6 text-sm text-gray-400">
                  <span>{totalVotes} votes</span>
                  <span>{mockDebate.stats.comments} commentaires</span>
                  <span>{mockDebate.stats.shares} partages</span>
                </div>
                <Link
                  to="/debat/ia-entrepreneurs"
                  className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-turquoise transition-colors"
                >
                  <span>Voir le débat complet</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default DebateSection;