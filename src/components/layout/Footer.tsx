import React from 'react';
import Link from 'next/link';

// SVG Icons components
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-navy-800 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Social */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-semibold tracking-tighter text-white">
                High Value
              </span>
            </Link>
            <p className="text-gray-300 max-w-md mb-6">
              High Value est une plateforme de contenus premium dédiés au développement personnel, professionnel et à l'entrepreneuriat.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <InstagramIcon />, href: "https://instagram.com" },
                { icon: <YoutubeIcon />, href: "https://youtube.com" },
                { icon: <TwitterIcon />, href: "https://twitter.com" },
                { icon: <LinkedinIcon />, href: "https://linkedin.com" },
                { icon: <FacebookIcon />, href: "https://facebook.com" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-gray-300 hover:text-blue-400 hover:border-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Catégories</h3>
            <ul className="space-y-2">
              {[
                { label: "Business", href: "/rubrique/business" },
                { label: "Mental", href: "/rubrique/psychologie" },
                { label: "Story", href: "/rubrique/story" },
                { label: "Société", href: "/rubrique/societe" },
                { label: "Émission", href: "/emission" }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Informations</h3>
            <ul className="space-y-2">
              {[
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Politique de confidentialité", href: "/confidentialite" },
                { label: "CGU", href: "/cgu" },
                { label: "Contact", href: "/contact" },
                { label: "À propos", href: "/a-propos" }
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-300 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-400 text-sm">
          © 2025 High Value. Tous droits réservés.
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-navy-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Recevez nos meilleurs contenus directement dans votre boîte mail
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Un email par semaine, sans spam, uniquement de la valeur ajoutée pour votre croissance personnelle et professionnelle.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 bg-navy-800 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 transition-colors">
              S'abonner
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
