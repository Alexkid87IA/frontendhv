import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  suggestion?: string;
  retry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  suggestion = "Veuillez réessayer ultérieurement.",
  retry,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center p-6 rounded-lg bg-red-900/20 border border-red-500/30 ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-500" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-red-400 mb-2">
        {message}
      </h3>
      <p className="text-gray-300 text-center mb-4">
        {suggestion}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md transition-colors"
          aria-label="Réessayer"
        >
          Réessayer
        </button>
      )}
    </motion.div>
  );
};

export default ErrorMessage;
