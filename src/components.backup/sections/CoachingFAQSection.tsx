import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "Comment se déroule une séance de coaching ?",
    answer: "Les séances se déroulent en visioconférence ou en présentiel à Paris. Chaque session est structurée en trois temps : point sur les avancées, travail sur les objectifs du jour, et définition des actions à mener. Un document de synthèse vous est envoyé après chaque session."
  },
  {
    question: "Quelle est votre approche du coaching ?",
    answer: "Mon approche combine coaching stratégique et développement personnel. Je m'appuie sur mon expérience d'entrepreneur et ma connaissance approfondie des enjeux actuels pour vous aider à atteindre vos objectifs. La méthode est à la fois structurée et adaptative, pour répondre au mieux à vos besoins spécifiques."
  },
  {
    question: "Pour qui est ce coaching ?",
    answer: "Ce coaching s'adresse aux entrepreneurs, dirigeants et porteurs de projet qui souhaitent développer leur impact, clarifier leur vision et accélérer leur développement. Que vous soyez en phase de lancement, de croissance ou de transformation, l'accompagnement est adapté à votre situation."
  },
  {
    question: "Quels sont les engagements mutuels ?",
    answer: "Je m'engage à vous accompagner avec professionnalisme, bienveillance et à mettre à votre disposition mon expertise et mes outils. De votre côté, l'engagement se traduit par une présence assidue aux sessions, une implication dans les exercices proposés et la mise en œuvre des actions définies ensemble."
  },
  {
    question: "Comment sont organisées les sessions ?",
    answer: "Les sessions durent entre 1h30 et 2h, à un rythme défini ensemble (généralement bi-mensuel). Chaque session fait l'objet d'une préparation en amont et d'un compte-rendu détaillé. Un accès à des ressources complémentaires vous est fourni entre les sessions."
  }
];

export const CoachingFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
        >
          FAQ
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Questions fréquentes
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-neutral-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left"
            >
              <span className="font-semibold">{item.question}</span>
              {openFAQ === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {openFAQ === index && (
              <div className="px-6 pb-4 text-tertiary">
                {item.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};