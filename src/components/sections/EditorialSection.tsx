import React from 'react';
import Link from 'next/link';

// SVG Icons components
const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z"></path>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

// Définition des univers éditoriaux
const universes = [
  {
    icon: BookIcon,
    name: 'Story',
    description: 'Des récits inspirants qui redéfinissent le possible',
    bgColor: 'bg-[#3D2A26]',
    textColor: 'text-white',
    bgText: 'story',
    path: '/rubrique/story',
    stats: {
      articles: 42,
      reads: '150K+'
    }
  },
  {
    icon: BriefcaseIcon,
    name: 'Business',
    description: 'Décryptage des tendances et innovations',
    bgColor: 'bg-[#1F3A4F]',
    textColor: 'text-white',
    bgText: 'business',
    path: '/rubrique/business',
    stats: {
      articles: 38,
      reads: '120K+'
    }
  },
  {
    icon: BrainIcon,
    name: 'Mental',
    description: 'Développez une psychologie de champion',
    bgColor: 'bg-[#3A2A4F]',
    textColor: 'text-white',
    bgText: 'mental',
    path: '/rubrique/psychologie',
    stats: {
      articles: 35,
      reads: '180K+'
    }
  },
  {
    icon: UsersIcon,
    name: 'Society',
    description: 'Les mutations qui façonnent notre époque',
    bgColor: 'bg-[#1F3F3A]',
    textColor: 'text-white',
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
              className={`group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${universe.bgColor}`}
            >
              <Link href={universe.path} className="block h-full">
                {/* Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <span className="text-[120px] font-bold text-white select-none">
                    {universe.bgText}
                  </span>
                </div>
                
                {/* Card Container */}
                <div className="relative p-8 flex flex-col h-full min-h-[500px]">
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center text-white">
                      <universe.icon />
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
                    <h3 className="text-3xl font-bold text-white mb-3 transition-colors">
                      {universe.name}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6">
                      {universe.description}
                    </p>

                    {/* CTA */}
                    <div className="inline-flex items-center gap-2 text-white transition-colors">
                      <span className="font-medium">Explorer l'univers</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">
                        <ArrowRightIcon />
                      </span>
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

export default EditorialSection;
