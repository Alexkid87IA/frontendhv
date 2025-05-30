import React from 'react';
import { Link } from 'react-router-dom';
import SafeImage from '../common/SafeImage';
import ErrorBoundary from '../common/ErrorBoundary';

interface DebateSectionProps {
  debate?: {
    _id: string;
    title?: string;
    slug?: {
      current: string;
    };
    mainImage?: any;
    excerpt?: string;
    participants?: Array<{
      _id: string;
      name?: string;
      image?: any;
      role?: string;
    }>;
  };
}

export const DebateSection: React.FC<DebateSectionProps> = ({ debate }) => {
  if (!debate) return null;

  return (
    <ErrorBoundary>
      <section className="py-12 bg-hv-bg-secondary">
        <div className="container mx-auto px-4">
          <div className="bg-hv-card-bg rounded-xl shadow-lg overflow-hidden border border-hv-card-border">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-hv-text-primary-maquette">
                    Débat de la semaine
                  </h2>
                  <h3 className="text-xl font-semibold mb-4 text-hv-blue-accent">
                    {debate.title || "Titre du débat"}
                  </h3>
                  {debate.excerpt && (
                    <p className="text-hv-text-secondary-maquette mb-6">
                      {debate.excerpt}
                    </p>
                  )}
                  <Link 
                    to={`/debat/${debate.slug?.current || '#'}`}
                    className="inline-block bg-hv-blue-accent hover:bg-hv-blue-accent/90 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    Voir le débat complet
                  </Link>
                </div>
                
                <div className="md:w-1/2">
                  <div className="relative rounded-xl overflow-hidden mb-6 h-48 md:h-64">
                    <SafeImage
                      image={debate.mainImage}
                      alt={debate.title || "Débat de la semaine"}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {debate.participants && debate.participants.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-hv-text-secondary-maquette mb-3">
                        Participants:
                      </h4>
                      <div className="flex flex-wrap gap-4">
                        {debate.participants.map((participant) => (
                          <div key={participant._id} className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                              <SafeImage
                                image={participant.image}
                                alt={participant.name || "Participant"}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="block text-sm font-medium text-hv-text-primary-maquette">
                                {participant.name || "Participant"}
                              </span>
                              {participant.role && (
                                <span className="text-xs text-hv-text-secondary-maquette">
                                  {participant.role}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default DebateSection;
