<template>
  <button class="c-work-card u-anim-stepmotion" 
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
    @click="requestModal()"
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
  </button>
</template>

<script setup lang="ts">
interface Props {
  id: string
  image: string
  title: string
}

const props = defineProps<Props>()

const { openModal } = useModal()

function requestModal() {
  openModal({ type: 'works', id: props.id })
}

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
