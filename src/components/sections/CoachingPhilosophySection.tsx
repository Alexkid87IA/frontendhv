import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, Users, Sparkles } from 'lucide-react';
import { FeatureCard } from '../common/FeatureCard';

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const CoachingPhilosophySection = () => {
  return (
    <section className="container py-20">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div>
          <motion.span
            variants={fadeInUp}
            className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6"
          >
            Notre approche
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Un coaching qui va au-delà des méthodes traditionnelles
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="prose prose-invert prose-lg"
          >
            <p>
              Le coaching que je propose est un accompagnement sur-mesure qui combine 
              vision stratégique et développement personnel. Une approche unique qui 
              s'appuie sur plus de 15 ans d'expérience dans l'entrepreneuriat.
            </p>
            <p>
              Mon objectif est de vous aider à :
            </p>
            <ul>
              <li>Clarifier votre vision et vos objectifs</li>
              <li>Développer votre leadership et votre impact</li>
              <li>Accélérer votre développement</li>
              <li>Rester aligné avec vos valeurs</li>
            </ul>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon={Brain}
            title="Clarté"
            description="Définissez une vision claire et des objectifs alignés."
          />
          <FeatureCard
            icon={Target}
            title="Impact"
            description="Maximisez votre impact et votre influence."
          />
          <FeatureCard
            icon={Users}
            title="Leadership"
            description="Développez votre posture de leader."
          />
          <FeatureCard
            icon={Sparkles}
            title="Authenticité"
            description="Restez fidèle à vos valeurs."
          />
        </div>
      </motion.div>
    </section>
  );
};