import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Composant ErrorBoundary pour capturer les erreurs dans les composants enfants
 * et afficher un fallback au lieu de planter l'application entière
 */
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  children, 
  fallback = <DefaultErrorFallback /> 
}) => {
  return (
    <ReactErrorBoundary FallbackComponent={({ error }) => {
      console.error('ErrorBoundary a capturé une erreur:', error);
      return <>{fallback}</>;
    }}>
      {children}
    </ReactErrorBoundary>
  );
};

/**
 * Composant de fallback par défaut à afficher en cas d'erreur
 */
const DefaultErrorFallback = () => {
  return (
    <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
      <h3 className="text-lg font-medium text-red-800 mb-2">
        Une erreur est survenue lors du chargement de ce contenu
      </h3>
      <p className="text-red-600">
        Nous nous excusons pour ce désagrément. Veuillez rafraîchir la page ou réessayer plus tard.
      </p>
    </div>
  );
};

export default ErrorBoundary;
