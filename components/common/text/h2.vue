<template>
  <h2 :class="[`c-text-h2`, `c-text-h2-color--${props.color}`, `u-font-${props.lang}`]">
    <slot />
  </h2>
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

h2 {
  margin-top: 50px;
  @include var.fs-large;
}
</style>