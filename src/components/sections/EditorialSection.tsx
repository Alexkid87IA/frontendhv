import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Briefcase, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../common/SectionHeader';

export const EditorialSection = () => {
  return (
    <section className="container py-20">
      <SectionHeader
        title="Explorer les univers éditoriaux"
        subtitle="Plongez dans nos thématiques phares"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            title: "Story",
            icon: BookOpen,
            tag: "Story",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
            excerpt: "Des parcours inspirants qui redéfinissent le possible",
            link: "/rubrique/story",
            gradient: "from-amber-500 to-orange-500",
            overlayGradient: "from-amber-900/80 via-black/50 to-transparent"
          },
          {
            title: "Business & innovation",
            icon: Briefcase,
            tag: "Innovation",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
            excerpt: "Les nouvelles frontières de l'entrepreneuriat",
            link: "/rubrique/business",
            gradient: "from-blue-500 to-cyan-500",
            overlayGradient: "from-blue-900/80 via-black/50 to-transparent"
          },
          {
            title: "Mental",
            icon: Brain,
            tag: "Psychologie",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
            excerpt: "Développer une psychologie de champion",
            link: "/rubrique/mental",
            gradient: "from-purple-500 to-violet-500",
            overlayGradient: "from-purple-900/80 via-black/50 to-transparent"
          },
          {
            title: "Society",
            icon: Users,
            tag: "Society",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80",
            excerpt: "Décrypter les mutations de notre époque",
            link: "/rubrique/society",
            gradient: "from-emerald-500 to-teal-500",
            overlayGradient: "from-emerald-900/80 via-black/50 to-transparent"
          }
        ].map((category, index) => (
          // Reste du JSX inchangé...
        ))}
      </div>
    </section>
  );
};

export default EditorialSection;
