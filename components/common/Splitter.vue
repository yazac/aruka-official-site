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
@use '@/assets/css/_mixin.scss';

.c-splitter {
  width: 0%;
  background-color: var.$color-light-green;

  @include mixin.pc {
    height: 2px;
    margin-top: 60px;
  }

  @include mixin.sp {
    height: 2px;
    margin-top: mixin.vw(60, var.$dsSp);
  }

  &.js-active {
    width: 100%;
    transition: width 1s cubic-bezier(0.89, -0.01, 0.03, 0.99);
  }
}
</style>