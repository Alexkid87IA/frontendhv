import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Calendar, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, ArrowRight, Star, Sparkles, BookOpen } from 'lucide-react';

export const NewsletterFooterSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,164,249,0.15),transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      {/* Newsletter Section */}
      <div className="container relative py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-2xl blur opacity-75"></div>
            <div className="relative bg-black/50 backdrop-blur-xl p-12 rounded-2xl border border-white/10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue/20 rounded-full text-accent-blue font-medium mb-6">
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

              <form className="max-w-md mx-auto">
                <div className="relative mb-6">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-accent-blue hover:bg-accent-turquoise text-white rounded-lg transition-colors"
                  >
                    S'abonner
                  </button>
                </div>
                <p className="text-sm text-center text-gray-400">
                  En vous inscrivant, vous acceptez de recevoir nos communications. Désabonnement possible à tout moment.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative border-t border-white/5">
        <div className="container py-20">
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
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'Youtube' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue to-accent-turquoise rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <social.icon size={20} className="text-white group-hover:text-accent-blue transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h5 className="font-semibold mb-6">Navigation</h5>
                <ul className="space-y-4">
                  {[
                    { label: 'Story', path: '/rubrique/story' },
                    { label: 'Business', path: '/rubrique/business' },
                    { label: 'Mental', path: '/rubrique/mental' },
                    { label: 'Society', path: '/rubrique/society' }
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
                <h5 className="font-semibold mb-6">Contact</h5>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:contact@highvalue.fr" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2">
                      <Mail size={16} />
                      <span>contact@highvalue.fr</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+33600000000" className="text-gray-400 hover:text-accent-blue transition-colors flex items-center gap-2">
                      <Phone size={16} />
                      <span>+33 6 00 00 00 00</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span>Paris, France</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-blue rounded-xl blur opacity-50"></div>
                <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <h5 className="font-semibold mb-4">Créez avec nous</h5>
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
                      className="flex items-center justify-center gap-2 bg-accent-blue hover:bg-accent-turquoise px-6 py-3 rounded-lg text-white transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Commencer</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                &copy; {new Date().getFullYear()} High Value Media. Tous droits réservés.
              </p>
              <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                  { label: 'Mentions légales', path: '/mentions-legales' },
                  { label: 'Politique de confidentialité', path: '/confidentialite' },
                  { label: 'CGV', path: '/cgv' }
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-accent-blue transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default NewsletterFooterSection;