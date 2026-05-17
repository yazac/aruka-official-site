<template>
  <div 
    class="c-works-modal_content u-anim-stepmotion"
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
          :src="matchedWork.image === null? 'https://placehold.jp/800x800.png': `/assets/images/works${matchedWork.image}`"
          :alt="matchedWork.title[getCurrentLanguage()]"
          loading="lazy" 
          placeholder
          width="800"
          height="800"
          quality="80"
          fit="contain"
        />
      </div>

      <div class="c-works-modal_content-texts">
        <CommonTextNormal class="c-works-modal_content-title">
          {{ matchedWork.title[getCurrentLanguage()] }}
        </CommonTextNormal>

        <CommonTextNormal class="c-works-modal_content-desc">
          {{ matchedWork.description[getCurrentLanguage()] }}
        </CommonTextNormal>
      </div>
    </template>

    <!-- Fallback if no match -->
    <p v-else class="c-works-modal_content-not-found">
      Work not found.
    </p>

    <button 
      type="button"
      class="c-works-modal-close-button"
      @click="closeModal()"
    ></button>
  </div>
</template>

<script setup lang="ts">
import worksData from '@/assets/json/works.json'
const { closeModal } = useModal()
const worksDetailData = worksData.works

interface Props {
  id: string
}

const props = defineProps<Props>()
const matchedWork = computed(() =>
  worksDetailData.find((item) => String(item.id) === props.id)
)
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

.c-works-modal_content-texts {
  word-break: break-word;
}

.c-works-modal_content-image-wrap {
  @include mixin.pc {
    flex-shrink: 0;
    :deep(img) {
      height: 100%;
    }
  }
}

.c-works-modal-close-button {
  mask-image: url("/assets/images/common/close.svg");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  background: var.$color-brown;
  
  @include mixin.pc {
    padding: 20px;
  }
  @include mixin.sp {
    padding: mixin.vw(16, var.$dsSp);
  }
}
</style>