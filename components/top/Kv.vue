<template>
  <div ref="moduleRoot" class="c-kv">
    <div class="c-kv-bg" id="canvas-wrapper">
      <!-- <NuxtImg src="https://picsum.photos/id/46/891/300" alt="aruka." /> -->
      <canvas id="canvas"></canvas>
    </div>
  </div>  
</template>

<script setup lang="ts">
const loading = useLoadingState()
const moduleRoot = ref<HTMLElement | null>(null)

watch(loading, (newVal) => {
  if (!newVal) {
    moduleRoot.value?.classList.add('js-active')
  }
});

import { App } from '@/composables/kv/main.js'

onMounted(() => {
  new App();
});

</script>

<style scoped lang="scss">
.c-kv {
  width: 100%;
  border-radius: 28px;
  overflow: hidden;
}

.c-kv-bg {
  width: 100%;
  height: 50vh;
}
</style>