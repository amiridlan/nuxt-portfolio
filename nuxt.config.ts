// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  runtimeConfig: {
    public: {
      r2BaseUrl: 'https://example.com',
      instagramUrl: 'https://www.instagram.com/_amirmir6/',
      websiteUrl: 'https://amiridlan.my/',
      contactEmail: 'amiridlan6@gmail.com',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
