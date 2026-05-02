<template>
  <div class="c-work-card u-anim-stepmotion" 
    v-step-animation="{ 
      duration: 500,
      delay: 0,
      startPosition: { x: 100, y: 100 },
      startRotation: random(-2, 2),
      startScale:  1
    }"
    v-intersection-observe="{
      threshold: 0.5,
      retrigger: false,
    }"
  >
    <div class="c-work-card-image-wrap">
      <NuxtImg 
        :src="image"
        :alt="title"
        loading="lazy" 
        placeholder
      />
    </div>
    <CommonTextNormal class="c-work-card-title">
      {{ title }}
    </CommonTextNormal>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string
  title: string
}
defineProps<Props>()

</script>

<style lang="scss" scoped>
.c-work-card {
  position: relative;
  width: 100%;
}

.c-work-card-title {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
