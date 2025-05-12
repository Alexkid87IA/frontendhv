import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { ContactForm } from '../common/ContactForm';

export const CreateWithRogerContactSection = () => {
  return (
    <section id="contact" className="container py-20">
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 }
        }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Réserver une session
          </h2>
          <p className="text-tertiary text-lg">
            Remplissez le formulaire ci-dessous pour démarrer votre projet
          </p>
        </div>

        <ContactForm />

        <div className="mt-8 flex items-center justify-center gap-4">
          <Calendar size={20} className="text-accent-violet" />
          <span className="text-tertiary">
            Ou réservez directement un créneau sur{' '}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-fuchsia hover:text-accent-cyan transition-colors"
            >
              Calendly
            </a>
          </span>
        </div>
      </motion.div>
    </section>
  );
};