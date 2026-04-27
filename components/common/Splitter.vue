<template>
  <div class="c-splitter-wrapper u-anim-squiggle">
    <div class="c-splitter" v-intersection-observe="{
      threshold: 0.5
    }">
    </div>
  </div>
</template>


<script setup lang="ts">
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';

.c-splitter {
  width: 0%;
  height: 2px;
  background-color: var.$color-light-green;
  margin-top: 60px;

  &.js-active {
    width: 100%;
    transition: width 1s cubic-bezier(0.89, -0.01, 0.03, 0.99);
  }
}
</style>