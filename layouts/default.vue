<!-- layouts/default.vue -->
<template>
  <div class="layout u-font-jp">
    <VueLenis root />
    <div class="overlay"></div>
    
    
    <TopSplash v-if="splashState" />

    <!-- ヘッダー -->
    <header class="header">
      <CommonHeader />
    </header>

    <!-- メインコンテンツ -->
    <main class="main ">
      <slot />
    </main>

    

    <!-- フッター -->
    <footer class="footer">
      <CommonFooter />
    </footer>

    <!-- <div class="layout-inner" :class="route.path == '/' ? 'u-anim-squiggle': undefined">
    </div> -->

    <!-- svgフィルター -->
    <CommonSvgFilterSquiggle />
  </div>
</template>

<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

const route = useRoute();
const router = useRouter();
const loading = useLoadingState();
const splashState = useSplashState();

// const lenis = useLenis((lenis) => {
//   // called every scroll
//   // console.log(lenis)
// })

onMounted(async() => {
  await wait(2000); // loading が終わった判定とさしかえの想定
  loading.value = false;
  // console.log('loading', loading.value)
  
  await wait(500);
  splashState.value = false;
  // console.log('splashState', splashState.value)
})

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';
.layout {
  background-color: var.$color-white;
}

.layout-inner {
  background-color: var.$color-beige;
  position: relative;
  pointer-events: all;
}

.header {
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 2;
  height: 0;
}

.main {
  position: relative;
  // padding-top: var(--header-height);
  @include mixin.pc {
    width: 100%;
    margin: 0 auto;
  }
}

.overlay {
  mix-blend-mode: color-burn;
  background: url("/assets/images/sunburnpaper6.jpg") repeat center center;
  background-size: contain;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 10;
  opacity: 0.6;
  pointer-events: none;
}
</style>