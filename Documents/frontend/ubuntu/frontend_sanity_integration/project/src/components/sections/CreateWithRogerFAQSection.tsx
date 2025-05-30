import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "Combien de temps dure une session de création ?",
    answer: "Une session standard dure environ 2-3 heures, incluant la préparation, le shooting et les retours. Nous adaptons la durée en fonction de vos besoins spécifiques."
  },
  {
    question: "Quels types de contenus sont inclus dans la livraison ?",
    answer: "Vous recevez les rushes HD, les photos retouchées, et les montages finaux adaptés à vos réseaux sociaux. Nous fournissons également des versions optimisées pour chaque plateforme."
  },
  {
    question: "Puis-je modifier le contenu après la livraison ?",
    answer: "Oui, vous recevez les fichiers sources que vous pouvez modifier. Nous proposons également un service de retouches et modifications post-production sur demande."
  }
];

export const CreateWithRogerFAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <section className="bg-neutral-900 py-20">
      <div className="container">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 }
          }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions fréquentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-800 rounded-lg overflow-hidden"
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
      </div>
    </section>
  );
};