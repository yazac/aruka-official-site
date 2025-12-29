<!-- pages/index.vue -->
<template>
  <div>
    <TopKv />
    
    <CommonSplitter />

    <h1 class="u-font-en">WORKS</h1>
    <NuxtLink to="about/">私たちについて</NuxtLink>    

    <CommonLogoText color="white" :trigger="animTrigger"/>

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


const animTrigger = ref(false)

setTimeout(() => {
  animTrigger.value = true
}, 10000)
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
</style>