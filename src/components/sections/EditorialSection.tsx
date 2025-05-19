import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Définition des univers éditoriaux
const universes = [
  {
    icon: '📚', // Emoji pour remplacer BookOpen
    name: 'Story',
    description: 'Des récits inspirants qui redéfinissent le possible',
    color: 'from-orange-400 to-pink-500',
    textColor: 'text-orange-300',
    hoverColor: 'group-hover:text-orange-300',
    bgText: 'story',
    path: '/rubrique/story',
    stats: {
      articles: 42,
      reads: '150K+'
    }
  },
  {
    icon: '💼', // Emoji pour remplacer Briefcase
    name: 'Business',
    description: 'Décryptage des tendances et innovations',
    color: 'from-blue-400 to-cyan-500',
    textColor: 'text-blue-300',
    hoverColor: 'group-hover:text-blue-300',
    bgText: 'business',
    path: '/rubrique/business',
    stats: {
      articles: 38,
      reads: '120K+'
    }
  },
  {
    icon: '🧠', // Emoji pour remplacer Brain
    name: 'Mental',
    description: 'Développez une psychologie de champion',
    color: 'from-violet-400 to-purple-500',
    textColor: 'text-violet-300',
    hoverColor: 'group-hover:text-violet-300',
    bgText: 'mental',
    path: '/rubrique/psychologie',
    stats: {
      articles: 35,
      reads: '180K+'
    }
  },
  {
    icon: '👥', // Emoji pour remplacer Users
    name: 'Society',
    description: 'Les mutations qui façonnent notre époque',
    color: 'from-emerald-400 to-teal-500',
    textColor: 'text-emerald-300',
    hoverColor: 'group-hover:text-emerald-300',
    bgText: 'society',
    path: '/rubrique/societe',
    stats: {
      articles: 31,
      reads: '90K+'
    }
  }
];

export const EditorialSection = () => {
  return (
    <section className="py-20 bg-navy-900 relative overflow-hidden">
      {/* Background blur effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,253,253,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-block px-4 py-2 bg-violet-500/20 text-violet-300 rounded-full text-sm font-medium mb-6"
          >
            Univers éditoriaux
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Explorer les univers High Value
          </h2>
          <p 
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Plongez dans nos thématiques phares et découvrez des contenus qui inspirent et transforment
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {universes.map((universe, index) => (
            <div
              key={index}
              className="group relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <Link href={universe.path} className="block h-full">
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[180px] font-bold text-white/5 select-none">
                    {universe.bgText}
                  </span>
                </div>
                
                {/* Card Container */}
                <div className="relative h-full rounded-2xl overflow-hidden backdrop-blur-sm bg-navy-800/70">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${universe.color} opacity-20 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-30`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-8 flex flex-col">
                    {/* Top Section */}
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center">
                        <span className="text-2xl">{universe.icon}</span>
                      </div>
                      <div className="px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full">
                        <span className="text-sm font-medium text-white">{universe.stats.articles} articles</span>
                      </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto">
                      {/* Stats */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full">
                          <span className="text-sm text-white">{universe.stats.reads} lectures</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className={`text-3xl font-bold text-white mb-3 ${universe.hoverColor} transition-colors`}>
                        {universe.name}
                      </h3>
                      <p className="text-gray-300 text-lg mb-6">
                        {universe.description}
                      </p>

                      {/* CTA */}
                      <div className={`inline-flex items-center gap-2 text-white ${universe.hoverColor} transition-colors`}>
                        <span className="font-medium">Explorer l'univers</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">&#10142;</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
