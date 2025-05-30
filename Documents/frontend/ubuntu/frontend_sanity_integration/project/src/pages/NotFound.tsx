import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-accent-violet">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold">Oups ! Cette page n'existe pas</h2>
          <p className="text-tertiary max-w-md mx-auto">
            La page que vous recherchez semble avoir disparu dans les méandres du web...
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-accent-violet hover:bg-accent-fuchsia text-white rounded-lg transition-colors"
            >
              <Home size={20} />
              <span>Retour à l'accueil</span>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-6 py-3 border border-neutral-700 hover:border-accent-violet rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Page précédente</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;