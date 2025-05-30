import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Sparkles } from 'lucide-react';

interface OfferProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  icon: typeof Rocket;
  gradient: string;
  delay?: number;
}

const OfferCard = ({ title, subtitle, description, features, ctaText, icon: Icon, gradient, delay = 0 }: OfferProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative group"
  >
    <div className={`absolute inset-0 ${gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
    <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 h-full flex flex-col">
      <div className="w-12 h-12 bg-gradient-to-br from-accent-violet to-accent-fuchsia rounded-xl flex items-center justify-center mb-6">
        <Icon size={24} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-accent-violet mb-4">{subtitle}</p>
      
      <div className="prose prose-invert prose-sm mb-6">
        <p className="text-tertiary">{description}</p>
      </div>
      
      <div className="flex-grow">
        <h4 className="text-lg font-semibold mb-4">Ce que tu obtiens :</h4>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 mt-2 bg-accent-violet rounded-full flex-shrink-0" />
              <span className="text-tertiary">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <motion.a
        href="#booking"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center justify-center gap-2 w-full mt-8 bg-gradient-to-r from-accent-violet to-accent-fuchsia hover:from-accent-fuchsia hover:to-accent-cyan text-white px-6 py-3 rounded-lg transition-all duration-300"
      >
        <span>{ctaText}</span>
        <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
      </motion.a>
    </div>
  </motion.div>
);

export const CoachingOffersSection = () => {
  const offers: OfferProps[] = [
    {
      title: "Pour les porteurs de projet",
      subtitle: "Un accompagnement en 12 semaines — en visio ou en présentiel",
      description: "Tu as une idée. Un rêve, un truc qui te hante. Mais tu tournes en rond. Ce programme est là pour t'aider à structurer ta vision, formuler ton offre, comprendre ton positionnement, ton message et ton client. Pas à pas, semaine après semaine, tu accouches de ton projet — sans perdre ton âme.",
      features: [
        "6 sessions individuelles avec Roger",
        "Suivi asynchrone par messagerie privée",
        "Accès à une bibliothèque de templates et contenus privés",
        "Document de synthèse final + plan d'action"
      ],
      ctaText: "Je suis porteur de projet",
      icon: Rocket,
      gradient: "bg-gradient-to-br from-accent-violet to-accent-fuchsia"
    },
    {
      title: "Pour les entrepreneurs stratégiques",
      subtitle: "Un accompagnement en 12 semaines — en visio ou en présentiel",
      description: "Tu n'en es pas à ton coup d'essai. Tu veux passer un cap. Redéfinir ton image, repenser ton modèle, retrouver du feu. Ce coaching est pensé comme une table de guerre. On décortique ton positionnement, ton contenu, ton récit, ton tunnel. Et on t'aide à redevenir magnétique — en alignant vision et traction.",
      features: [
        "6 sessions stratégiques + 2 sprints créatifs",
        "Audit de positionnement / tunnel / branding",
        "Aide à la narration stratégique (bio, pitch, copy)",
        "Accès aux contacts et ressources de l'écosystème Roger"
      ],
      ctaText: "Je suis entrepreneur confirmé",
      icon: Sparkles,
      gradient: "bg-gradient-to-br from-accent-cyan to-accent-violet",
      delay: 0.2
    }
  ];

  return (
    <section id="offers" className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
          Nos programmes
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Choisissez votre transformation
        </h2>
        <p className="text-tertiary text-lg max-w-2xl mx-auto">
          Un accompagnement sur-mesure adapté à votre situation et vos objectifs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {offers.map((offer, index) => (
          <OfferCard key={index} {...offer} />
        ))}
      </div>
    </section>
  );
};