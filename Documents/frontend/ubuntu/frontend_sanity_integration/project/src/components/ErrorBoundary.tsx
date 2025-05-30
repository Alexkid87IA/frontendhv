import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { RotateCcw } from 'lucide-react';
import { monitoring } from '../utils/monitoring';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  React.useEffect(() => {
    monitoring.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Oups ! Quelque chose s'est mal passé
        </h1>
        <p className="text-tertiary mb-8">
          Une erreur inattendue est survenue. Nous nous excusons pour la gêne occasionnée.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent-violet hover:bg-accent-fuchsia text-white rounded-lg transition-colors"
        >
          <RotateCcw size={20} />
          <span>Recharger la page</span>
        </button>
      </div>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
      onError={(error) => monitoring.error(error)}
    >
      {children}
    </ReactErrorBoundary>
  );
}