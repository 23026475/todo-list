/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        
        primary: {
          light: '#3B82F6', // Bright blue
          dark: '#2563EB', // Deeper blue for dark mode
        },
        secondary: {
          light: '#10B981', // Green
          dark: '#22C55E', // Vivid green for dark mode
        },
        background: {
          light: '#F4F6F8', // Light gray
          dark: '#111827', // Deep navy
        },
        card: {
          light: '#FFFFFF', // White card background
          dark: '#1E293B', // Dark navy card background
        },
        text: {
          light: '#1F2937', // Dark gray for readability
          dark: '#F9FAFB', // Near white for text
        },
        muted: {
          light: '#6B7280', // Muted gray
          dark: '#9CA3AF', // Lighter gray for dark mode
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        light: '0 4px 6px rgba(0, 0, 0, 0.1)',
        dark: '0 4px 6px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
