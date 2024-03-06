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
  modules: ["@nuxtjs/tailwindcss", "nuxt-primevue", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
  runtimeConfig: {
    public: {
      backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
      frontendUrl: process.env.NUXT_PUBLIC_FRONTEND_URL,
      persistedState: {
        storage: 'localStorage'
      }
    },
  },
  imports: {
    dirs: ["./utils"],
  },
  primevue: {
    options: {
      unstyled: true
    },
    importPT: { from: path.resolve(__dirname, "./presets/wind-full/").replace(/\\/g, '/') },
  },
  experimental: {
    asyncContext: true
  },
  routeRules: {
    '/company/*/crm/**': { ssr: false },
  }
});
