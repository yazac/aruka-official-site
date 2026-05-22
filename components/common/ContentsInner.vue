<template>
  <div class="c-contents-inner">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-contents-inner {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  z-index: 1;
  @include mixin.pc {
    max-width: 1200px;
    padding: 0 120px 0;
  }
  @include mixin.sp {
    padding: 0 mixin.vw(20, var.$dsSp);
  }
}
</style>