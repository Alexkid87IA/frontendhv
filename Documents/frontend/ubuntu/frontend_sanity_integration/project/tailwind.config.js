/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: '#000000',      // Noir pur
        secondary: '#FFFFFF',    // Blanc pur
        tertiary: '#D1D5DB',    // Gris clair pour texte courant

        // Semantic colors
        background: '#000000',
        foreground: '#FFFFFF',
        muted: '#1F2937',
        'muted-foreground': '#D1D5DB',
        border: '#374151',
        input: '#1F2937',
        ring: '#00A4F9',

        // Accent colors
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