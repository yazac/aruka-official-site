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
        { rel: 'icon', type: 'image/png', href: '/favicon.png' } // Favicon 設定
      ]
    },
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  css: [
    '@/assets/css/global.styl',
    'normalize.css/normalize.css'
  ],
  modules: ['@formkit/auto-animate'],
  build: {
    transpile: []
  },
  ssr: false // サーバーサイドレンダリングを無効化（SPA モード）
})