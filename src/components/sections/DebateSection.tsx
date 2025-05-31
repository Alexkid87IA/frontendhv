import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

const mockDebate = {
  title: "L'IA va-t-elle remplacer les entrepreneurs ?",
  description: "Un débat passionnant sur l'impact de l'intelligence artificielle dans l'entrepreneuriat",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
  participants: [
    {
      name: "Sarah Chen",
      role: "CEO IA Solutions",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      name: "Marc Dubois",
      role: "Expert Innovation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Startup Advisor",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
    }
  ],
  stats: {
    views: "15K",
    comments: "234",
    shares: "1.2K"
  }
};

export const DebateSection = () => {
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
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Left Column - Text Content */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6">
                    <MessageSquare size={18} />
                    <span>Débat de la semaine</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {mockDebate.title}
                  </h2>

                  <p className="text-gray-300 text-lg mb-8">
                    {mockDebate.description}
                  </p>

                  {/* Participants */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-400 mb-4">
                      Participants:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {mockDebate.participants.map((participant, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <SafeImage
                              image={participant.image}
                              alt={participant.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {participant.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {participant.role}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats & CTA */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex gap-6 text-sm text-gray-400">
                      <span>{mockDebate.stats.views} vues</span>
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

                {/* Right Column - Image */}
                <div className="lg:w-[450px]">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <SafeImage
                      image={mockDebate.image}
                      alt={mockDebate.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default DebateSection;