<template>
  <div ref="moduleRoot" class="c-kv" v-intersection-observe="{
    threshold: 0.5
  }">
    <div class="c-kv-bg" id="canvas-wrapper">
      <div class="overlay"></div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = useLoadingState()
const splashState = useSplashState()
const kvResourcesLoaded = useKVResourcesLoadedState()
const moduleRoot = ref<HTMLElement | null>(null)
const pageVisibleState = usePageVisibleState()
let appObj: App | null = null;

import { App } from '@/composables/kv/main.js'

// Preload resources for KV section (3D objects and textures)
const preloadKVResources = async () => {
  const resources = [
    '/assets/object/aruku_chan_white2.glb',
    '/assets/images/kv/gold_grass.png'
  ];

  return Promise.all(
    resources.map(url => {
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'fetch';
        link.href = url;
        link.crossOrigin = 'anonymous';
        link.onload = () => resolve(url);
        link.onerror = () => reject(new Error(`Failed to preload: ${url}`));
        document.head.appendChild(link);
      });
    })
  );
};

onMounted(async () => {
  // Start preloading resources
  try {
    await preloadKVResources();
    // Mark resources as loaded
    kvResourcesLoaded.value = true;

    // Initialize Three.js app
    appObj = new App();
  } 
  
  catch (error) {
    console.warn('Resource preload warning:', error);
    // Mark as loaded even on error to not block splash
    kvResourcesLoaded.value = true;
  }

  window.addEventListener('visibilitychange', () => {
    pageVisibleState.value = document.visibilityState === 'visible';
  });
});

watch(pageVisibleState, (isVisible) => {
  if (!appObj) return;
  
  if (isVisible) {
    appObj.resume();
  } else {
    appObj.pause();
  }
});

onUnmounted(() => {
  if (appObj) {
    appObj.destroy();
    appObj = null;
  }
});

</script>

<style scoped lang="scss">
.c-kv {
  width: 100%;
  position: sticky;
  top: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s;

  &.js-active {
    opacity: 1;
  }
}

.c-kv-bg {
  width: 100%;
  height: 100vh;
  position: relative;
}

.overlay {
  mix-blend-mode: color-burn;
  background: url("/assets/images/sunburnpaper6.jpg") repeat center center;
  background-size: contain;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 0;
  opacity: 0.4;
  pointer-events: none;
}
</style>