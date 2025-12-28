<!-- pages/index.vue -->
<template>
  <div>
    <TopKv />
    <!-- <h1 class="u-font-en">WORKS</h1>
    <NuxtLink to="about/">私たちについて</NuxtLink>     -->

    <div class="p-loading-logo">
      <div class="p-loading-logo-text">
        <CommonLogoText color="black"/>
      </div>
    </div>

    <div class="controls">
      <button @click="func">Start Animation</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const func = () => {
  const stepItems = document.querySelectorAll<HTMLElement>('.u-anim-stepmotion')
  stepItems.forEach((item) => {
    item.classList.add('js-active')
  })
}

const loading = useLoadingState()
setTimeout(() => {
  loading.value = false
}, 2000)

</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.spacer {
  height: 100px;
  width: 100%;
}

.controls {
  margin-top: 12px;
}

.p-loading-logo {
  margin: 0 auto;
  @include mixin.pc {
    width: 200px;
  }
}
</style>