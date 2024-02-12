module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        heroBackDeskLight: "url('/src/assets/bg-desktop-light.jpg')",
        heroBackDeskDark: "url('/src/assets/bg-desktop-dark.jpg')",
        heroBackMobLight: "url('/src/assets/bg-mobile-light.jpg')",
        heroBackMobDark: "url('/src/assets/bg-mobile-dark.jpg')",
      },
      colors: {
        pri: "hsl(220, 98%, 61%)",
        sec: "hsl(192, 100%, 67%)",
        thr: "hsl(280, 87%, 65%)",
        dark: "hsl(235, 21%, 11%)",
      },
      fontFamily: {
        Josefin: ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
