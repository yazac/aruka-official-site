<!-- layouts/default.vue -->
<template>
  <VueLenis root />
  
  <div class="overlay u-anim-squiggle" style="animation-delay: 0.2s;"></div>
  
  <TopSplash v-if="route.path == '/'"/>
  <div class="layout u-font-jp" :class="route.path == '/' ? 'u-anim-squiggle': undefined">
    
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
      <CommonFooter />
    </footer>

    <!-- svgフィルター -->
    <CommonSvgFilterSquiggle />
  </div>
</template>

<script setup>
import { VueLenis, useLenis } from 'lenis/vue' // Also available as global imports, no need to import them manually
import { watch } from 'vue'

const route = useRoute();

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
  z-index: 2;
}

.main {
  position: relative;

  @include mixin.pc {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 0;
  }
}

.overlay {
  mix-blend-mode: color-burn;
  background: url("/assets/images/sunburnpaper2.jpg") no-repeat center center;
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: fixed;
  top: 0;
  z-index: 10;
  opacity: 0.6;
  pointer-events: none;
}
</style>