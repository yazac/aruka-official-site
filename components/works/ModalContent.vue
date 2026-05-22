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
        <template v-if="matchedWork.image.length > 1">
          <Swiper :modules="modules" navigation loop :speed="300">
            <SwiperSlide v-for="(image, index) in matchedWork.image" :key="index">
              <NuxtImg
                :src="`/images/works${image}`"
                :alt="`${matchedWork.title[getCurrentLanguage()]} - image ${index + 1}`"
                loading="lazy"
                placeholder
                width="800"
                height="800"
                quality="80"
                fit="contain"
              />
            </SwiperSlide>
          </Swiper>
        </template>
        <template v-else>
          <NuxtImg
            :src="matchedWork.image[0] ? `/images/works${matchedWork.image[0]}` : 'https://placehold.jp/800x800.png'"
            :alt="matchedWork.title[getCurrentLanguage()]"
            loading="lazy"
            placeholder
            width="800"
            height="800"
            quality="80"
            fit="contain"
          />
        </template>
      </div>

      <div class="c-works-modal_content-texts">
        <CommonTextNormal class="c-works-modal_content-title">
          {{ matchedWork.title[getCurrentLanguage()] }}
        </CommonTextNormal>

        <CommonTextNormal class="c-works-modal_content-desc">
          <span v-html="matchedWork.description[getCurrentLanguage()]">
          </span>
        </CommonTextNormal>

        <CommonTextNormal class="c-works-modal_content-url">
          <a :href="matchedWork.url" target="_blank" rel="noopener noreferrer" v-if="matchedWork.url">
            link
          </a>
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
      aria-label="Close modal"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

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

const modules = [Navigation]
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
    gap: 3vh;
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
  width: 100%;
  word-break: break-word;
  position: relative;
  @include mixin.pc {
    p {
      font-size: 1.7vh;
    }
  }
  @include mixin.sp {
    width: 100%;
  }
}

.c-works-modal_content-image-wrap {
  @include mixin.pc {
    width: 60vh;

    flex-shrink: 0;
  }
  @include mixin.sp {
    width: 100%;
    margin-bottom: mixin.vw(16, var.$dsSp);
  }

  .swiper {
    :deep(.swiper-button-prev) {
      color: var.$color-white;
      filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3))
    }
    :deep(.swiper-button-next) {
      color: var.$color-white;
      filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3))
    }
  }
}

.c-works-modal-close-button {
  mask-image: url("/images/common/close.svg");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  background: var.$color-dark-green;
  
  @include mixin.pc {
    padding: 20px;
  }
  @include mixin.sp {
    padding: mixin.vw(16, var.$dsSp);
  }
}
</style>