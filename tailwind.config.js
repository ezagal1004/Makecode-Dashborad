module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode support
  theme: {
    extend: {
      colors: {
        primary: "#F9FAFB", // Light background
        secondary: "#374151", // Dark text
        accent: "#3B82F6", // Blue accent
        "accent-hover": "#2563EB", // Darker blue for hover
        card: "#FFFFFF", // White card background
        "card-dark": "#1F2937", // Dark card for dark mode
        "text-dark": "#D1D5DB", // Light text for dark mode
      },
    },
  },
  plugins: [],
};
