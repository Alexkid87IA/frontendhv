import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleLogoClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const mainLinks = [
    { label: 'Story', path: '/rubrique/story' },
    { label: 'Business', path: '/rubrique/business' },
    { label: 'Mental', path: '/rubrique/mental' },
    { label: 'Société', path: '/rubrique/societe' },
    { label: 'Coaching', path: '/coaching' },
    { label: 'Podcasts', path: '/podcasts' },
    { label: 'Émissions', path: '/emissions' }
  ];

  const legalLinks = [
    { label: 'Mentions légales', path: '/mentions-legales' },
    { label: 'Politique de confidentialité', path: '/confidentialite' },
    { label: 'CGV', path: '/cgv' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', label: 'Facebook' },
    { icon: Twitter, url: '#', label: 'Twitter' },
    { icon: Instagram, url: '#', label: 'Instagram' },
    { icon: Youtube, url: '#', label: 'Youtube' }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-neutral-900/80 backdrop-blur-xl" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,164,249,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,253,253,0.1),transparent_50%)]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative container pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="block mb-6" onClick={handleLogoClick}>
              <motion.img 
                src="https://26.staticbtf.eno.do/v1/24-default/c6447f1810fadbb886029b7c212d9d98/media.jpg"
                alt="Roger Ormières"
                className="h-24 w-auto"
                whileHover={{
                  scale: 1.05,
                  filter: "brightness(1.2)",
                  transition: { duration: 0.2 }
                }}
              />
            </Link>
            <p className="text-tertiary mb-6">
              Explorez des récits inspirants, des réflexions sur le mindset et la culture entrepreneuriale.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-accent-blue/20 hover:text-accent-blue transition-colors"
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
              <h5 className="font-inter font-semibold mb-6">Navigation</h5>
              <ul className="space-y-4">
                {mainLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-tertiary hover:text-accent-turquoise transition-colors inline-flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-inter font-semibold mb-6">Contact</h5>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:contact@rogerormières.fr" className="text-tertiary hover:text-accent-turquoise transition-colors flex items-center gap-2">
                    <Mail size={16} />
                    <span>contact@rogerormières.fr</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+33600000000" className="text-tertiary hover:text-accent-turquoise transition-colors flex items-center gap-2">
                    <Phone size={16} />
                    <span>+33 6 00 00 00 00</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-tertiary">
                  <MapPin size={16} />
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h5 className="font-inter font-semibold mb-6">Newsletter</h5>
            <p className="text-tertiary mb-4">
              Recevez nos derniers articles et insights directement dans votre boîte mail.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-colors"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="relative w-full group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-accent-turquoise to-accent-turquoise rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-lg">
                  <span>S'inscrire</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-tertiary text-sm text-center md:text-left">
              &copy; {currentYear} Roger Ormières. Tous droits réservés.
            </p>
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-tertiary hover:text-accent-turquoise transition-colors"
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
  );
};
