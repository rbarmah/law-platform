/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          50: '#FFF1E5',
          100: '#FFE4CC',
          200: '#FFD1A3',
          300: '#FFBD7A',
          400: '#FFA952',
          500: '#FF6B00',
          600: '#E66000',
          700: '#CC5500',
          800: '#B34B00',
          900: '#994100'
        },
        secondary: {
          DEFAULT: '#00A5BB',
          50: '#E5F7FA',
          100: '#CCF0F5',
          200: '#99E0EA',
          300: '#66D1E0',
          400: '#33C1D5',
          500: '#00A5BB',
          600: '#0094A8',
          700: '#008494',
          800: '#007381',
          900: '#00636D'
        },
        navy: {
          DEFAULT: '#1A2B49',
          50: '#E6E9EE',
          100: '#CCD2DD',
          200: '#99A5BB',
          300: '#667899',
          400: '#334B77',
          500: '#1A2B49',
          600: '#172642',
          700: '#15223A',
          800: '#121D33',
          900: '#10192C'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#00A5BB',
              '&:hover': {
                color: '#008494',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};