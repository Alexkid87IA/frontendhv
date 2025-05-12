import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Camera, Edit, Users, ArrowRight } from 'lucide-react';

const process = [
  {
    title: "Stratégie & Brief",
    description: "Session stratégique pour définir vos objectifs, votre message et votre positionnement unique.",
    icon: MessageSquare,
    color: "from-accent-violet to-accent-fuchsia",
    details: [
      "Analyse de vos besoins et objectifs",
      "Définition de votre audience cible",
      "Élaboration de votre message clé",
      "Choix des formats adaptés"
    ]
  },
  {
    title: "Préparation",
    description: "Coaching personnalisé pour optimiser votre présence à l'écran et votre message.",
    icon: PenTool,
    color: "from-accent-fuchsia to-accent-cyan",
    details: [
      "Coaching prise de parole",
      "Préparation du script",
      "Conseils style et posture",
      "Répétition et ajustements"
    ]
  },
  {
    title: "Production",
    description: "Tournage professionnel en studio avec équipement haut de gamme et équipe dédiée.",
    icon: Camera,
    color: "from-accent-cyan to-accent-violet",
    details: [
      "Studio professionnel équipé",
      "Équipe technique experte",
      "Multi-caméras 4K",
      "Son broadcast"
    ]
  },
  {
    title: "Post-production",
    description: "Montage expert, color grading et optimisation pour chaque plateforme.",
    icon: Edit,
    color: "from-accent-violet to-accent-fuchsia",
    details: [
      "Montage professionnel",
      "Color grading cinéma",
      "Sound design",
      "Exports multi-formats"
    ]
  }
];

export const CreateWithRogerProcessSection = () => {
  return (
    <section className="bg-neutral-900 py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
            Notre processus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une méthodologie éprouvée en 4 étapes
          </h2>
          <p className="text-tertiary text-lg max-w-2xl mx-auto">
            Un accompagnement personnalisé de A à Z pour des résultats exceptionnels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20`} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />
              </div>

              {/* Card Content */}
              <div className="relative bg-neutral-800/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 h-full transition-transform duration-500 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-violet rounded-xl flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>

                {/* Icon & Title */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                    <step.icon size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-accent-violet transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-tertiary">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  {step.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <ArrowRight size={16} className="text-accent-violet" />
                      <span className="text-tertiary">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute -bottom-8 left-1/2 w-px h-8 bg-gradient-to-b from-accent-violet to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 text-center">
            <Users size={24} className="text-accent-violet mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">150+</div>
            <p className="text-sm text-tertiary">Entrepreneurs accompagnés</p>
          </div>
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 text-center">
            <Camera size={24} className="text-accent-violet mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">1000+</div>
            <p className="text-sm text-tertiary">Contenus produits</p>
          </div>
          <div className="bg-neutral-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 text-center">
            <Edit size={24} className="text-accent-violet mx-auto mb-4" />
            <div className="text-2xl font-bold mb-2">98%</div>
            <p className="text-sm text-tertiary">Taux de satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};