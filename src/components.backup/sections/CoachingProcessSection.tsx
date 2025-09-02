import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Sparkles } from 'lucide-react';

const processSteps = [
  {
    number: 1,
    title: "Prise de contact",
    description: "Un premier échange pour comprendre vos besoins et objectifs.",
    icon: Users
  },
  {
    number: 2,
    title: "Session découverte",
    description: "Une session approfondie pour établir votre diagnostic et définir votre plan d'action.",
    icon: Target
  },
  {
    number: 3,
    title: "Accompagnement",
    description: "Des sessions régulières pour avancer vers vos objectifs avec méthode et structure.",
    icon: Brain
  },
  {
    number: 4,
    title: "Transformation",
    description: "L'atteinte de vos objectifs et l'acquisition d'outils pour continuer à progresser.",
    icon: Sparkles
  }
];

export const CoachingProcessSection = () => {
  return (
    <section className="bg-neutral-900 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
          >
            Méthodologie
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Un processus éprouvé en 4 étapes
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-gradient-to-r from-accent-violet to-transparent transform translate-y-4" />
              )}
              <div className="bg-neutral-800 p-6 rounded-xl relative z-10">
                <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent-violet rounded-full flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-tertiary">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};