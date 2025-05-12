import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const NewsletterForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
  };

  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 p-6 md:p-8 rounded-2xl">
      <h3 className="text-2xl font-montserrat font-bold mb-4">
        Restez inspiré
      </h3>
      <p className="text-tertiary mb-6">
        Recevez notre newsletter hebdomadaire avec les meilleurs articles et insights.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre email"
          className="flex-1 bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet"
          required
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg">
            <span>S'inscrire</span>
            <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.button>
      </form>
    </div>
  );
};