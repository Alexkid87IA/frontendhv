import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Megaphone, Target, Palette, Users } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Rocket,
    title: "Startup & Scale-up",
    description: "Accompagnement dans toutes les phases de croissance, de l'idéation à la levée de fonds.",
    topics: [
      "Business Model Canvas",
      "Pitch & Storytelling",
      "Levée de fonds",
      "Product Market Fit"
    ]
  },
  {
    icon: Lightbulb,
    title: "Innovation & Stratégie",
    description: "Développement de stratégies innovantes et différenciantes pour votre business.",
    topics: [
      "Innovation Frugale",
      "Design Thinking",
      "Positionnement",
      "Go-to-Market"
    ]
  },
  {
    icon: Megaphone,
    title: "Personal Branding",
    description: "Construction d'une image de marque personnelle forte et authentique.",
    topics: [
      "Storytelling Personnel",
      "Présence Digitale",
      "Content Strategy",
      "Media Training"
    ]
  },
  {
    icon: Target,
    title: "Leadership & Impact",
    description: "Développement de votre leadership et maximisation de votre impact.",
    topics: [
      "Communication",
      "Management",
      "Influence",
      "Vision"
    ]
  },
  {
    icon: Palette,
    title: "Créativité & Innovation",
    description: "Stimulation de la créativité et développement de solutions innovantes.",
    topics: [
      "Idéation",
      "Problem Solving",
      "Innovation Process",
      "Creative Leadership"
    ]
  },
  {
    icon: Users,
    title: "Culture & Organisation",
    description: "Création d'une culture d'entreprise forte et performante.",
    topics: [
      "Values & Mission",
      "Team Building",
      "Change Management",
      "Remote Culture"
    ]
  }
];

export const CoachingExpertiseSection = () => {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
        >
          Expertise
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Domaines d'expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-tertiary text-lg max-w-2xl mx-auto"
        >
          Une expertise pointue dans les domaines clés de l'entrepreneuriat et de l'innovation
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:bg-neutral-800/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-accent-violet to-accent-fuchsia rounded-xl flex items-center justify-center mb-6">
              <area.icon size={24} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-accent-violet transition-colors">
              {area.title}
            </h3>
            
            <p className="text-tertiary mb-6">
              {area.description}
            </p>

            <div className="space-y-2">
              {area.topics.map((topic, topicIndex) => (
                <div
                  key={topicIndex}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-accent-violet rounded-full" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};