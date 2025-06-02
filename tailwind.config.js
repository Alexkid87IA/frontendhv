/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base colors
        primary: '#000000', // Noir pur
        secondary: '#FFFFFF', // Blanc pur
        tertiary: '#D1D5DB', // Gris clair pour texte courant

        // Semantic colors
        background: '#000000', // Noir pur
        foreground: '#F9FAFB', // Texte principal
        muted: '#000000', // Fond des cartes
        'muted-foreground': '#9CA3AF', // Texte secondaire
        border: '#1A1A1A', // Bordure par défaut
        input: '#000000',
        ring: '#2563EB',

        // Accent colors
        'hv-blue-accent': '#00A4F9',
        'hv-card-bg': '#000000',
        'hv-card-border': 'rgba(255, 255, 255, 0.05)',
        'hv-text-white': '#FFFFFF',
        'hv-text-primary-maquette': '#E5E7EB',
        'hv-text-secondary-maquette': '#9CA3AF',
        'hv-text-accent': '#00A4F9',

        accent: {
          blue: '#00A4F9',
          turquoise: '#63FDFD',
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
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
};