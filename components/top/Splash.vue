<!-- Splash.vue -->
<template>
  <div class="c-splash" :class="{ 'is-leaving': !loading }">
    <div class="c-splash-logo">
      <div class="c-splash-logo-text">
        <CommonLogoText color="lightgreen" :trigger="animTrigger" :height="{
          pc: 30,
          sp: 20
        }"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = useLoadingState()
const animTrigger = ref(false)

onMounted(() => {
  animTrigger.value = true
})
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
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.5s steps(8);

  &.is-leaving {
    opacity: 0;
    pointer-events: none;
  }
}

.c-splash-logo {
  margin: 0 auto;
  @include mixin.pc {
    width: 365px;
  }

  @include mixin.sp {
    width: 100%;
    padding: 0 mixin.vw(80, var.$dsSp);
  }
}
</style>