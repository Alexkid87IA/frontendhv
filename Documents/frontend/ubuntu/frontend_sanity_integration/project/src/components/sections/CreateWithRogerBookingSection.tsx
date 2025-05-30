import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

export const CreateWithRogerBookingSection = () => {
  return (
    <section id="booking" className="container py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/10 via-accent-fuchsia/10 to-accent-cyan/10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 bg-accent-violet/20 text-accent-violet rounded-full text-sm font-medium mb-6">
              Appel découverte gratuit
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Réservez votre appel avec Roger
            </h2>
            <p className="text-lg text-tertiary max-w-2xl mx-auto">
              Un appel de 30 minutes pour discuter de vos objectifs et voir comment nous pouvons vous aider à créer du contenu qui vous ressemble.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/5 rounded-xl p-6">
              <Clock size={24} className="text-accent-violet mb-4" />
              <h3 className="text-lg font-semibold mb-2">30 minutes</h3>
              <p className="text-sm text-tertiary">
                Un échange focalisé sur vos objectifs et besoins spécifiques
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <Users size={24} className="text-accent-violet mb-4" />
              <h3 className="text-lg font-semibold mb-2">One-on-One</h3>
              <p className="text-sm text-tertiary">
                Un appel personnalisé avec Roger pour discuter de votre projet
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-6">
              <ArrowRight size={24} className="text-accent-violet mb-4" />
              <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
              <p className="text-sm text-tertiary">
                Un plan d'action clair pour la suite de votre projet
              </p>
            </div>
          </div>

          {/* Calendly Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8"
          >
            <iframe
              src="https://calendly.com/d/example"
              width="100%"
              height="700"
              className="rounded-lg"
              title="Calendrier de réservation"
            />
          </motion.div>

          {/* Testimonial */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-playfair italic text-center mt-12"
          >
            "L'appel découverte avec Roger m'a permis de clarifier ma vision et de définir une stratégie de contenu adaptée à mes objectifs."
            <footer className="text-sm text-tertiary mt-2">
              — Marie Durant, CEO
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
};