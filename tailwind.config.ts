import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#962E8B',
          green: '#AFCE54',
          ink: '#1B1520',
          cream: '#FFF9F5',
          sand: '#F6E9DE',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(27, 21, 32, 0.10)',
        lift: '0 18px 40px rgba(150, 46, 139, 0.18)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top left, rgba(175, 206, 84, 0.35), transparent 34%), radial-gradient(circle at 80% 10%, rgba(150, 46, 139, 0.18), transparent 28%), linear-gradient(180deg, #FFF9F5 0%, #FFFDFC 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.5deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
