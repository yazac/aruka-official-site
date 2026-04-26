<template>
  <p :class="[`c-text-p`, `c-text-p-color--${props.color}`, `u-font-${props.lang}`]">
    <slot />
  </p>
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
@use '@/assets/css/_mixin.scss';

p {
  @include mixin.fs-normal;
}
</style>