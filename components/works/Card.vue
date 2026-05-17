<template>
  <div class="c-work-card-wrap u-anim-stepmotion"
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
    }">
    <button class="c-work-card" @click="requestModal()">
      <div class="c-work-card-image-wrap">
        <NuxtImg 
          :src="image"
          :alt="title"
          width="800"
          height="800"
          loading="lazy" 
          quality="50"
          placeholder
        />
      </div>
      <!-- <CommonTextNormalLarge class="c-work-card-title">
        {{ title }}
      </CommonTextNormalLarge> -->
    </button>
  </div>
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
.c-work-card-wrap {
  overflow: hidden;
  &:hover{
    transform: scale(1.2);
    box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
}

.c-work-card {
  position: relative;
  width: 100%;

  &:hover{
    .c-work-card-image-wrap {
      // filter: blur(0.2rem);
      transform: scale(1.02);
    }
  }
}

.c-work-card-title {
  position: absolute;
  left: 0;
  bottom: 0;
}

.c-work-card-image-wrap {
  aspect-ratio: 1;
  transform: scale(1);
  transition: transform 0.3s ease-out;
}
</style>
