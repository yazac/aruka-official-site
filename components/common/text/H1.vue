<template>
  <h1 :class="[`c-text-h1`, `c-text-h1-color--${props.color}`, `u-font-${props.lang}`]">
    <slot />
  </h1>
</template>

<script setup lang="ts">
interface Props {
  color?: 'black' | 'white' | 'brown' | 'lightgreen' | 'darkgreen'
  lang?: 'jp' | 'en'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
  lang: 'jp'
})

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

h1 {
  @include mixin.fs-xlarge;
}
</style>