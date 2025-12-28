<template>
  <div ref="moduleRoot" class="c-splash" :class="{ 'js-active': !loading }">
    <div class="c-splash-logo">
      <div class="c-splash-logo-text">
        <CommonLogoText color="black" :trigger="animTrigger"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = useLoadingState()
const animTrigger = ref(false)

const moduleRoot = ref<HTMLElement | null>(null)

setTimeout(() => {
  loading.value = false
}, 2000)

onMounted(() => {
  animTrigger.value = true

  if (moduleRoot.value) {
    moduleRoot.value.addEventListener('transitionend', () => {
      moduleRoot.value?.remove();
    })
  }
});

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-splash {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: var.$color-beige;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.5s steps(8);

  &.js-active {
    opacity: 0;
    pointer-events: auto;
  }
}

.c-splash-logo {
  margin: 0 auto;
  @include mixin.pc {
    width: 200px;
  }
}
</style>