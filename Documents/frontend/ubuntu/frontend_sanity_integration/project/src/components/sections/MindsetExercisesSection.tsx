import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Shield, Compass, ChevronDown, ChevronUp, Check } from 'lucide-react';

interface Exercise {
  id: number;
  icon: typeof Brain;
  title: string;
  description: string;
  steps: string[];
  category: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    icon: Brain,
    title: "Visualisation du succès",
    description: "Un exercice puissant pour programmer votre cerveau vers la réussite",
    category: "Développement personnel",
    steps: [
      "Trouvez un endroit calme et fermez les yeux",
      "Imaginez-vous ayant atteint votre objectif principal",
      "Ressentez les émotions associées à cette réussite",
      "Visualisez les détails de cette situation",
      "Répétez cet exercice chaque matin pendant 10 minutes"
    ]
  },
  {
    id: 2,
    icon: Target,
    title: "Définition d'objectifs SMART",
    description: "Apprenez à fixer des objectifs clairs et atteignables",
    category: "Productivité",
    steps: [
      "Identifiez un objectif important pour vous",
      "Rendez-le Spécifique et mesurable",
      "Assurez-vous qu'il soit Atteignable",
      "Vérifiez sa Pertinence",
      "Définissez un délai Temporel"
    ]
  },
  {
    id: 3,
    icon: Shield,
    title: "Gestion des pensées limitantes",
    description: "Transformez vos doutes en opportunités de croissance",
    category: "Résilience",
    steps: [
      "Identifiez une croyance limitante",
      "Questionnez sa validité avec des preuves",
      "Trouvez des contre-exemples",
      "Reformulez-la de manière positive",
      "Créez une nouvelle croyance habilitante"
    ]
  },
  {
    id: 4,
    icon: Compass,
    title: "Alignement des valeurs",
    description: "Découvrez et vivez selon vos valeurs fondamentales",
    category: "Authenticité",
    steps: [
      "Listez vos 10 valeurs les plus importantes",
      "Classez-les par ordre de priorité",
      "Évaluez votre vie actuelle par rapport à ces valeurs",
      "Identifiez les écarts",
      "Créez un plan d'action pour plus d'alignement"
    ]
  }
];

export const MindsetExercisesSection = () => {
  const [openExercise, setOpenExercise] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<number, Set<number>>>({});

  const toggleExercise = (id: number) => {
    setOpenExercise(openExercise === id ? null : id);
  };

  const toggleStep = (exerciseId: number, stepIndex: number) => {
    setCompletedSteps(prev => {
      const exerciseSteps = prev[exerciseId] || new Set();
      const newSteps = new Set(exerciseSteps);
      
      if (newSteps.has(stepIndex)) {
        newSteps.delete(stepIndex);
      } else {
        newSteps.add(stepIndex);
      }

      return {
        ...prev,
        [exerciseId]: newSteps
      };
    });
  };

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
        >
          Exercices pratiques
        </motion.span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Développez votre psychologie jour après jour
        </h2>
        <p className="text-tertiary text-lg max-w-2xl mx-auto">
          Des exercices concrets pour renforcer votre mental et atteindre vos objectifs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {exercises.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleExercise(exercise.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center">
                  <exercise.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{exercise.title}</h3>
                  <p className="text-sm text-accent-violet">{exercise.category}</p>
                </div>
              </div>
              {openExercise === exercise.id ? (
                <ChevronUp size={24} />
              ) : (
                <ChevronDown size={24} />
              )}
            </button>

            {openExercise === exercise.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 pb-6"
              >
                <p className="text-tertiary mb-6">{exercise.description}</p>
                <div className="space-y-4">
                  {exercise.steps.map((step, index) => {
                    const isCompleted = completedSteps[exercise.id]?.has(index);
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ x: 4 }}
                        onClick={() => toggleStep(exercise.id, index)}
                        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                          isCompleted
                            ? 'bg-accent-violet/20 text-accent-violet'
                            : 'bg-neutral-800/50 hover:bg-neutral-800'
                        }`}
                      >
                        <Check
                          size={20}
                          className={isCompleted ? 'text-accent-violet' : 'text-neutral-500'}
                          fill={isCompleted ? 'currentColor' : 'none'}
                        />
                        <span className="text-left">{step}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};