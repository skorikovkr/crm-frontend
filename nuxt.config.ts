import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@pinia/nuxt"],
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { from: path.resolve(__dirname, "./presets/wind-full/").replace(/\\/g, '/') },
  }
});
