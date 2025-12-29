<template>
  <div class="aruku-chan-wrapper" :class="`aruku-chan-wrapper-color--${props.color}`">
    <span class="aruku-chan-img"></span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: 'black' | 'white' | 'brown' | 'lightgreen' | 'darkgreen'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black'
})
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.aruku-chan-wrapper {
  &-color--black {
    span {
      background-color: var.$color-black;
    }
  }
  &-color--white {
    span {
      background-color: var.$color-white;
    }
  }
  &-color--lightgreen {
    span {
      background-color: var.$color-light-green;
    }
  }
  &-color--darkgreen {
    span {
      background-color: var.$color-dark-green;
    }
  }
}

.aruku-chan-img {
  display: block;
  mask-image: url('/assets/images/aruka-logo/img-aruku-chan.svg');
  mask-size: cover;
  mask-position: center;
  mask-repeat: no-repeat;
  aspect-ratio: 189 / 171;
  min-width: 10px;
  width: 100%;
  height: auto;
}
</style>