import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Film, Edit } from 'lucide-react';
import { FeatureCard } from '../common/FeatureCard';

export const CreateWithRogerFeaturesSection = () => {
  return (
    <section className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
          Nos services
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Créer avec Roger
        </h2>
        <p className="text-lg text-tertiary max-w-2xl mx-auto">
          Une approche unique qui combine expertise technique et accompagnement éditorial
          pour créer du contenu authentique et impactant.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={Video}
          title="Interview Studio"
          description="Captation professionnelle en studio avec éclairage et son de qualité broadcast."
        />
        <FeatureCard
          icon={Camera}
          title="Portrait Photo"
          description="Séance photo professionnelle pour vos supports de communication."
        />
        <FeatureCard
          icon={Film}
          title="Réels & TikTok"
          description="Création de contenus courts et dynamiques optimisés pour les réseaux sociaux."
        />
        <FeatureCard
          icon={Edit}
          title="Accompagnement"
          description="Conseil éditorial et stratégique pour maximiser l'impact de vos contenus."
        />
      </div>
    </section>
  );
};