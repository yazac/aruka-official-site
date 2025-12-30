<template>
  <h3 :class="[`c-text-h3`, `c-text-h3-color--${props.color}`, `u-font-${props.lang}`]">
    <slot />
  </h3>
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

h3 {
  @include var.fs-medium;
  font-weight: 700;
}
</style>