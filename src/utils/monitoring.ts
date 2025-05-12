interface LogOptions {
  level?: 'info' | 'warn' | 'error';
  context?: Record<string, any>;
}

class Monitoring {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = import.meta.env.PROD && !!import.meta.env.VITE_MONITORING_ENABLED;
  }

  public log(message: string, options: LogOptions = {}) {
    if (!this.isEnabled) return;

    const { level = 'info', context = {} } = options;
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      message,
      level,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // Log en console en dev
    if (import.meta.env.DEV) {
      console[level](message, context);
      return;
    }

    // En prod, on pourrait envoyer à un service de monitoring
    try {
      const endpoint = import.meta.env.VITE_MONITORING_ENDPOINT;
      if (endpoint) {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logData)
        }).catch(() => {
          // Silently fail if monitoring is down
          console.warn('Failed to send log to monitoring service');
        });
      }
    } catch (error) {
      // Never block rendering for monitoring
      console.warn('Monitoring error:', error);
    }
  }

  public error(error: Error, context?: Record<string, any>) {
    this.log(error.message, {
      level: 'error',
      context: {
        ...context,
        stack: error.stack,
        name: error.name
      }
    });
  }
}

export const monitoring = new Monitoring();