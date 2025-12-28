<template>
  <div class="c-splash" :class="{ 'js-active': !loading }">
  </div>
</template>

<script setup lang="ts">
const loading = useLoadingState()
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';

.c-splash {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var.$color-beige;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  pointer-events: none;

  clip-path: rect(0% 100% 100% 0%);
  transition: clip-path 1s cubic-bezier(0.98,-0.01, 0.58, 1);

  
  &.js-active {
    clip-path: rect(0% 0% 100% 0%);
    pointer-events: auto;
  }
}
</style>