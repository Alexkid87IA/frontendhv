/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: '#030712', // Fond général très sombre (presque noir)
        secondary: '#FFFFFF',    // Blanc pur
        tertiary: '#D1D5DB',    // Gris clair pour texte courant

        // Semantic colors
        background: '#030712', // Fond général très sombre
        foreground: '#F9FAFB', // Texte principal (blanc cassé)
        muted: '#111827', // Fond des cartes (noir/gris très foncé)
        'muted-foreground': '#9CA3AF', // Texte secondaire (gris moyen)
        border: '#374151', // Bordure par défaut (sera surchargée pour les cartes)
        input: '#1F2937',
        ring: '#2563EB', // Bleu pour les anneaux de focus, à ajuster si besoin

        // Accent colors from maquette
        'hv-blue-accent': '#00A4F9', // Bleu vif/turquoise pour accents et survol (utilisé dans la maquette)
        'hv-card-bg': '#0A0F1E', // Fond des cartes (plus précis, un bleu très sombre)
        'hv-card-border': 'rgba(255, 255, 255, 0.1)', // Bordure fine et claire pour les cartes
        'hv-text-white': '#FFFFFF',
        'hv-text-primary-maquette': '#E5E7EB', // Texte principal sur fond sombre (gris très clair)
        'hv-text-secondary-maquette': '#9CA3AF', // Texte secondaire sur fond sombre (gris)
        'hv-text-accent': '#00A4F9', // Texte accentué (bleu vif)

        // Anciennes couleurs (à conserver ou migrer si besoin)
        accent: {
          blue: '#00A4F9',      // Bleu accent
          turquoise: '#63FDFD', // Turquoise accent
          'blue-5': 'rgba(0, 164, 249, 0.05)',
          'blue-10': 'rgba(0, 164, 249, 0.1)',
          'blue-20': 'rgba(0, 164, 249, 0.2)',
          'blue-40': 'rgba(0, 164, 249, 0.4)',
          'turquoise-5': 'rgba(99, 253, 253, 0.05)',
          'turquoise-10': 'rgba(99, 253, 253, 0.1)',
          'turquoise-20': 'rgba(99, 253, 253, 0.2)',
          'turquoise-40': 'rgba(99, 253, 253, 0.4)'
        }
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
        playfair: ['Playfair Display', 'serif']
      },
      animation: {
        tilt: 'tilt 10s infinite linear',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(0.5deg)',
          },
          '75%': {
            transform: 'rotate(-0.5deg)',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};