<!-- pages/index.vue -->
<template>
  <div>
    <TopKv />
    
    <CommonSplitter />

    <CommonTextH2 lang="en">
      WORKS
    </CommonTextH2>

    <CommonLogoText color="white" :trigger="animTrigger"/>
  </div>
</template>

<script setup lang="ts">
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