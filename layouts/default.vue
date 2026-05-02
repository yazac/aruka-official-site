<!-- layouts/default.vue -->
<template>
  <div class="layout u-font-jp">
    <VueLenis root />
    
    
    
    <TopSplash v-if="splashState" />

    <!-- ヘッダー -->
    <header class="header">
      <CommonHeader />
    </header>

    <SnsBar />

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
import SnsBar from '~/components/common/SnsBar.vue';

const route = useRoute();
const loading = useLoadingState();
const splashState = useSplashState();
const kvResourcesLoaded = useKVResourcesLoadedState();

// const lenis = useLenis((lenis) => {
//   // called every scroll
//   // console.log(lenis)
// })

onMounted(async() => {
  if (route.path === "/" || route.path === "/en") {
    // Wait for KV resources to load or timeout after 2000ms
    const kvLoadTimeout = new Promise(resolve => setTimeout(resolve, 1300));
    const kvLoadComplete = new Promise(resolve => {
      const unwatch = watch(() => kvResourcesLoaded.value, (loaded) => {
        if (loaded) {
          unwatch();
          resolve(true);
        }
      });
    });

    await Promise.all([kvLoadComplete, kvLoadTimeout]);
  } else {
    await wait(500)
  }

  loading.value = false;
  // console.log('loading', loading.value)
  
  await wait(500);
  splashState.value = false;
  // console.log('splashState', splashState.value)

  ginkChanComment();
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
  width: 100%;
  margin: 0 auto;
}
</style>