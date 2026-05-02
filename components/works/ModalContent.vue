<template>
  <div 
    class="c-works-modal_content u-anim-stepmotion"
    :class="{'js-active': displayState}"
    v-step-animation="{ 
      duration: 200,
      delay: 0,
      startPosition: { x: 0, y: 100 },
      startRotation: random(-1, 1),
      startScale:  0.5
    }"
    v-intersection-observe="{
      threshold: 0.5,
      retrigger: false,
    }"
  >
    <template v-if="matchedWork">
      <div class="c-works-modal_content-image-wrap">
        <NuxtImg 
          :src="matchedWork.image"
          :alt="matchedWork.title"
          loading="lazy" 
          placeholder
          @load="onImageLoaded"
        />
      </div>
      <CommonTextNormal class="c-works-modal_content-title">
        {{ matchedWork.title }}
      </CommonTextNormal>
    </template>

    <!-- Fallback if no match -->
    <p v-else class="c-works-modal_content-not-found">
      Work not found.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import worksData from '@/assets/json/works.json'

const worksDetailData = worksData.works

interface Props {
  id: string
}

const props = defineProps<Props>()

const displayState = ref(false)

const matchedWork = computed(() =>
  worksDetailData.find((item) => String(item.id) === props.id)
)
const onImageLoaded = () => {
  displayState.value = true
}
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-works-modal_content {
  background: var.$color-white;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
  display: flex;

  @include mixin.pc {
    aspect-ratio: 1.414/1;
    height: 70vh;
    padding: 5vh;
    gap: 2vh;
  }

  @include mixin.sp {
    aspect-ratio: 1/1.414;
    width: 90vw;
    padding: 8vw;
    flex-wrap: wrap;
    align-content: stretch
  }
}

.c-works-modal_content-image-wrap {
  @include mixin.pc {
    :deep(img) {
      height: 100%;
    }
  }
}

</style>