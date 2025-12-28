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
      title: 'My Nuxt App', // サイトのタイトル
      meta: [
        { name: 'description', content: 'Nuxt 3 アプリの説明' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }, // Favicon 設定
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Zen+Old+Mincho&display=swap' }
      ],
    },
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  css: [
    '@/assets/css/index.scss',
    'ress/dist/ress.min.css'
  ],
  modules: ['@formkit/auto-animate', 'lenis/nuxt', '@nuxt/image'],
  build: {
    transpile: []
  },
  ssr: true
})