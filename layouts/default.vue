<!-- layouts/default.vue -->
<template>
  <VueLenis root />
  
  <div class="overlay u-anim-squiggle" style="animation-delay: 0.2s;"></div>
  <TopSplash />
  <div class="layout u-anim-squiggle u-font-jp">
    
    <!-- ヘッダー -->
    <header class="header">
      <CommonHeader />
    </header>

    <!-- メインコンテンツ -->
    <main class="main">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="footer">
      <p>&copy; 2025 My Nuxt App</p>
    </footer>
    <CommonSvgFilterSquiggle />
  </div>
</template>

<script setup>
import { VueLenis, useLenis } from 'lenis/vue' // Also available as global imports, no need to import them manually
import { watch } from 'vue'

// const lenis = useLenis((lenis) => {
//   // called every scroll
//   // console.log(lenis)
// })
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';
.layout {
  background-color: var.$color-beige;
  position: relative;
  pointer-events: all;
}

.header {
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 10;
}

.main {
  height: 1000vh;
  position: relative;

  @include mixin.pc {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 0;
  }
}

.overlay {
  mix-blend-mode: overlay;
  background: url("/images/sunburnpaper2.jpg") no-repeat center center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: fixed;
  top: 0;
  z-index: 1;
  opacity: 0.3;
  pointer-events: none;
}

.footer {
  background-color: var.$color-black;
  color: var.$color-white;
  text-align: center;
  padding: 100px;

  p {
    margin: 0;
  }
}
</style>