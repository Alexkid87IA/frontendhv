import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'coaching'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-medium text-tertiary">
          Nom complet
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-medium text-tertiary">
          Email professionnel
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm font-medium text-tertiary">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="message" className="block text-sm font-medium text-tertiary">
          Votre message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full bg-neutral-800/50 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-secondary placeholder-neutral-500 focus:outline-none focus:border-accent-violet focus:ring-1 focus:ring-accent-violet transition-colors resize-none"
          required
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="relative w-full group"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <div className="relative flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg transition-colors">
          <span>Envoyer ma demande</span>
          <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>
    </form>
  );
};