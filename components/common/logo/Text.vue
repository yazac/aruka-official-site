<template>
  <div ref="componentRoot" class="text-logo-wrapper" :class="`text-logo-wrapper-color--${props.color}`">
    <div class="u-anim-stepmotion" v-for="(image, index) in imageList" :key="index" v-step-animation="{ 
        duration: 500,
        delay: index * 60,
        startPosition: { x: 0, y: 20 },
        startRotation: random(-20, 20),
        startScale:  1
      }">
      <span :style="`mask-image: url(${image[0]}); aspect-ratio: ${image[1]} / 30`"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: 'black' | 'white' | 'brown'
  trigger?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
})

const componentRoot = ref<HTMLElement | null>(null)

const imageList = [
  ['/assets/images/aruka-logo/img-aruka-logo-a-01.svg', "52.8"],
  ['/assets/images/aruka-logo/img-aruka-logo-r.svg', "63.2"],
  ['/assets/images/aruka-logo/img-aruka-logo-u.svg', "58.4"],
  ['/assets/images/aruka-logo/img-aruka-logo-k.svg', "64"],
  ['/assets/images/aruka-logo/img-aruka-logo-a-02.svg', "71.6"],
]

const altList = ['a','r','u','k','a.']

watch(() => props.trigger, (newVal) => {
  if (newVal && componentRoot.value) {
    const stepItems = componentRoot.value.querySelectorAll<HTMLElement>('.u-anim-stepmotion')
    stepItems.forEach((item) => {
      item.classList.add('js-active')
    })
  }
});
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.text-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  

  @include mixin.pc {
    gap: 10%;
    height: 30px;
  }
  @include mixin.sp {
    gap: 4%;
    height: mixin.vw(17);
  }

  .u-anim-stepmotion {
    width: auto;
    height: 100%;

    span {
      mask-size: cover;
      mask-position: center;
      mask-repeat: no-repeat;
      width: auto;
      height: 100%;
      display: block;
    }
  }

  &-color--black {
    .u-anim-stepmotion {
      span {
        background-color: var.$color-black;
      }
    }
  }
  &-color--white {
    .u-anim-stepmotion {
      span {
        background-color: var.$color-white;
      }
    }
  }
}
</style>