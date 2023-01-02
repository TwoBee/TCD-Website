export default defineNuxtConfig({
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: "aYqrKUfxMJclVVvrCuCL3Qtt",
      },
    ],
    "@nuxtjs/tailwindcss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/main.scss";',
        },
      },
    },
  },
  nitro: {
    prerender: {
      routes: ['/404.html']
    }
 }
});
