export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
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
  modules: [
    // '@nuxtjs/tailwindcss' // 必要なモジュール（例：Tailwind CSS）
  ],
  build: {
    transpile: []
  },
  ssr: false // サーバーサイドレンダリングを無効化（SPA モード）
})