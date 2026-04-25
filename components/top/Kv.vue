<template>
  <div ref="moduleRoot" class="c-kv" v-intersection-observe="{
    threshold: 0.5
  }">
    <div class="c-kv-bg" id="canvas-wrapper">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = useLoadingState()
const splashState = useSplashState()
const moduleRoot = ref<HTMLElement | null>(null)

import { App } from '@/composables/kv/main.js'

onMounted(() => {
  new App();
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
}
</style>