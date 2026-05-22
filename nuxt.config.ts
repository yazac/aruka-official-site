import meta from './assets/json/meta.json'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'robots', content: 'index,follow' },
        { name: 'format-detection', content: 'telephone=no' },

        // ogp
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '' },
        { property: 'og:description', content: '' },
        { property: 'og:image', content: '/ogp.png' },
        { property: 'og:site_name', content: '' },
        
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '' },
        { name: 'twitter:description', content: '' },
        { name: 'twitter:image', content: '/ogp.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'canonical', href: meta.domain },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Luxurious+Roman&family=New+Tegomin&family=Zen+Old+Mincho&display=swap' }
      ]
    },
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  css: [
    '@/assets/css/index.scss',
    'ress/dist/ress.min.css'
  ],
  modules: ['@formkit/auto-animate', 'lenis/nuxt', '@nuxt/image', 'nuxt-gtag'],
  build: {
    transpile: []
  },
  gtag: {
    id: 'G-C7KPRL5Z3D'
  },
  ssr: true,
  image: {
    provider: 'ipx'
  }
})