import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Calendar, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ArrowRight, Star, Sparkles, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export const NewsletterFooterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email.includes('@') && email.includes('.')) { // Validation basique
      setStatus('success');
      setMessage('Merci ! Votre inscription a bien été prise en compte.');
      setEmail(''); // Réinitialiser le champ email
    } else {
      setStatus('error');
      setMessage('Oups ! Veuillez entrer une adresse email valide.');
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
      </div>

      {/* Newsletter Section */}
      <div className="container relative pt-20 pb-16">
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-2xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-blue/20 to-accent-turquoise/20 rounded-full text-accent-blue font-medium mb-6">
                  <Star className="w-4 h-4" />
                  <span>Newsletter High Value</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">
                  Rejoignez la communauté{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">
                    High Value
                  </span>
                </h2>
                <p className="text-xl text-gray-300">
                  Recevez chaque semaine une dose d'inspiration, des analyses exclusives et des insights stratégiques.
                </p>
              </div>

              {status === 'success' && (
                <motion.div 
                  className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 p-4 rounded-lg mb-6 text-sm"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle size={20} /> {message}
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div 
                  className="flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 p-4 rounded-lg mb-6 text-sm"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                >
                  <AlertTriangle size={20} /> {message}
                </motion.div>
              )}

              {(status === 'idle' || status === 'loading' || status === 'error') && (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch max-w-md mx-auto">
                  <motion.input
                    initial={{ opacity: 0, width: '80%' }} 
                    animate={{ opacity: 1, width: '100%' }} 
                    transition={{ duration: 0.5, delay: 0.3 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    className="flex-grow bg-black/60 border border-white/10 rounded-lg px-5 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200 shadow-sm text-base"
                    required
                    disabled={status === 'loading'}
                  />
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(0, 164, 249, 0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="relative group flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue text-white font-semibold px-6 py-3.5 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 focus:ring-offset-background-dark disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                          initial={{ opacity:0 }} animate={{ opacity:1}} exit={{ opacity:0 }}
                        />
                        <span>Envoi...</span>
                      </>
                    ) : (
                      <>
                        <span>S'inscrire</span>
                        <Send size={18} className="transform group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
              
              <p className="text-xs text-gray-500 mt-6 text-center">
                Nous respectons votre vie privée. Désinscription possible à tout moment.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-6">
              <motion.img 
                src="/src/assets/logos/LOGO_HV MEDIA.svg"
                alt="High Value Media"
                className="h-16 w-auto"
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.2)",
                  transition: { duration: 0.2 }
                }}
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Développez votre mindset d'exception et transformez votre vision du possible.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook', color: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2]' },
                { icon: Twitter, label: 'Twitter', color: 'hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2]' },
                { icon: Instagram, label: 'Instagram', color: 'hover:bg-[#E4405F]/20 hover:text-[#E4405F]' },
                { icon: Youtube, label: 'Youtube', color: 'hover:bg-[#FF0000]/20 hover:text-[#FF0000]' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">Navigation</h5>
              <ul className="space-y-4">
                {[
                  { label: 'Story', path: '/rubrique/story', color: 'from-amber-500 to-orange-500' },
                  { label: 'Business', path: '/rubrique/business', color: 'from-blue-500 to-cyan-500' },
                  { label: 'Mental', path: '/rubrique/mental', color: 'from-purple-500 to-violet-500' },
                  { label: 'Society', path: '/rubrique/society', color: 'from-emerald-500 to-teal-500' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${link.color}`}></div>
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <h5 className="font-semibold mt-8 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">Formats</h5>
              <ul className="space-y-4">
                {[
                  { label: 'Articles', path: '/articles' },
                  { label: 'Podcasts', path: '/podcasts' },
                  { label: 'Émissions', path: '/emissions' },
                  { label: 'Débats', path: '/debats' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">Contact</h5>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:contact@highvalue.fr" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2 group">
                    <Mail size={16} className="text-accent-blue" />
                    <span className="group-hover:translate-x-1 transition-transform">contact@highvalue.fr</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+33600000000" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2 group">
                    <Phone size={16} className="text-accent-blue" />
                    <span className="group-hover:translate-x-1 transition-transform">+33 6 00 00 00 00</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <MapPin size={16} className="text-accent-blue" />
                  <span>Paris, France</span>
                </li>
                <li>
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2 group">
                    <Calendar size={16} className="text-accent-blue" />
                    <span className="group-hover:translate-x-1 transition-transform">Prendre rendez-vous</span>
                  </a>
                </li>
              </ul>
              
              <h5 className="font-semibold mt-8 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">Légal</h5>
              <ul className="space-y-4">
                {[
                  { label: 'Mentions légales', path: '/mentions-legales' },
                  { label: 'Politique de confidentialité', path: '/confidentialite' },
                  { label: 'CGV', path: '/cgv' }
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-accent-blue transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h5 className="font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">Créez avec Roger</h5>
                <p className="text-gray-400 text-sm mb-6">
                  Transformez votre expertise en contenu premium qui inspire et convertit.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Link
                    to="/create-with-roger"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue to-accent-turquoise hover:from-accent-turquoise hover:to-accent-blue px-6 py-3 rounded-lg text-white transition-colors w-full"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Commencer</span>
                  </Link>
                </motion.div>
              </div>
            </div>
            
            <div className="mt-8 relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-cyan rounded-xl blur opacity-50"></div>
              <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h5 className="font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-fuchsia">Le Club High Value</h5>
                <p className="text-gray-400 text-sm mb-6">
                  Rejoignez notre communauté d'entrepreneurs et développez votre mindset d'exception.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Link
                    to="/club"
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-accent-violet to-accent-fuchsia hover:from-accent-fuchsia hover:to-accent-cyan px-6 py-3 rounded-lg text-white transition-colors w-full"
                  >
                    <Star className="w-4 h-4" />
                    <span>Découvrir</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Animated Border */}
        <div className="relative">
          <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-accent-blue to-transparent"></div>
          <div className="pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} High Value Media. Tous droits réservés.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Propulsé par</span>
                <span className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-turquoise">High Value Tech</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewsletterFooterSection;