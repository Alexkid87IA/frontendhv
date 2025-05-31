import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, Brain, ArrowRight, Shield, Zap, Target, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ClubSection = () => {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-neutral-900 to-black rounded-3xl p-12 border border-white/10">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        </div>

        {/* Content */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Column */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue/20 text-accent-blue rounded-full text-sm font-medium mb-6"
              >
                <Crown size={18} />
                <span>Club High Value</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              >
                Rejoignez le Club
                <span className="bg-gradient-to-r from-accent-blue to-accent-turquoise bg-clip-text text-transparent"> High Value</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Développez votre mindset, votre business et votre réseau avec un accompagnement premium. 
                Accédez à notre veille stratégique et à notre communauté d'entrepreneurs high value.
              </motion.p>

              {/* Prix */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="mb-8 inline-block bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-accent-blue" size={20} />
                  <span className="text-accent-blue font-medium">Offre de lancement limitée</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold">19,90€</span>
                  <span className="text-gray-400">/mois</span>
                </div>
                <p className="text-sm text-gray-400">Pour les 100 premiers membres uniquement</p>
                <p className="text-xs text-gray-500 mt-2">Puis 39,90€/mois</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/club"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-accent-blue/25"
                >
                  <span>Rejoindre le Club</span>
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="#discover"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  <span>En savoir plus</span>
                  <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>

            {/* Right Column - Features */}
            <div className="lg:w-[450px]">
              <div className="grid gap-4">
                {[
                  {
                    icon: Calendar,
                    title: "Live hebdomadaire",
                    description: "Sessions en direct avec des experts et entrepreneurs à succès"
                  },
                  {
                    icon: Brain,
                    title: "Mindset & Stratégie",
                    description: "Développez votre psychologie de champion et votre vision business"
                  },
                  {
                    icon: Shield,
                    title: "Veille exclusive",
                    description: "Analyses approfondies et insights stratégiques"
                  },
                  {
                    icon: Users,
                    title: "Réseau privilégié",
                    description: "Connexions avec des entrepreneurs et décideurs high value"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent-blue to-accent-turquoise rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubSection;