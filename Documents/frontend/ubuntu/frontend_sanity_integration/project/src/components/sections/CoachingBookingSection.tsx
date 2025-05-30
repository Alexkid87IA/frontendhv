import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export const CoachingBookingSection = () => {
  return (
    <section id="booking" className="container py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/10 via-accent-fuchsia/10 to-accent-cyan/10" />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold mb-6"
          >
            Réserver une session avec Roger
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-tertiary mb-8 max-w-2xl mx-auto"
          >
            Tu sens que le moment est venu de te faire accompagner ?<br />
            Choisis ton créneau, laisse un mot si tu veux. Roger lit tout.<br />
            C'est ici que les choses commencent vraiment.
          </motion.p>

          {/* Calendly Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-8 mb-8"
          >
            <iframe
              src="https://calendly.com/d/example"
              width="100%"
              height="600"
              className="rounded-lg"
              title="Calendrier de réservation"
            />
          </motion.div>

          {/* Inspirational Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl font-playfair italic text-center mb-8"
          >
            "Les plus grandes révolutions commencent par une conversation."
          </motion.blockquote>

          {/* Alternative CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-violet hover:bg-accent-fuchsia text-white rounded-lg transition-colors"
            >
              <Calendar size={20} />
              <span>Réserver maintenant</span>
            </a>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <span>Voir tous les créneaux</span>
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};