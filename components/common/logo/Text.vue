<template>
  <div ref="componentRoot" :class="`text-logo-wrapper text-logo-wrapper-color--${props.color}`" :style="{
    '--logo-height-pc': props.height.pc, 
    '--logo-height-sp': props.height.sp
  }">
    <div class="u-anim-stepmotion" v-for="(image, index) in imageList" :key="index" v-step-animation="{ 
        duration: 500,
        delay: index * 60,
        startPosition: { x: 0, y: 20 },
        startRotation: random(-20, 20),
        startScale:  1
      }">
      <span :style="{maskImage: `url(${image[0]})`, aspectRatio: `${image[1]} / 30`}"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  color?: 'black' | 'white' | 'brown' | 'lightgreen' | 'darkgreen'
  trigger?: boolean
  height?: {
    pc: number,
    sp: number,
  }
}

const props = withDefaults(defineProps<Props>(), {
  color: 'black',
  trigger: false,
  height: () => ({
    pc: 30,
    sp: 30
  })
})

const componentRoot = ref<HTMLElement | null>(null)

const imageList = [
  ['/assets/images/aruka-logo/img-aruka-logo-a-01.svg', "52.8"],
  ['/assets/images/aruka-logo/img-aruka-logo-r.svg', "63.2"],
  ['/assets/images/aruka-logo/img-aruka-logo-u.svg', "58.4"],
  ['/assets/images/aruka-logo/img-aruka-logo-k.svg', "64"],
  ['/assets/images/aruka-logo/img-aruka-logo-a-02.svg', "71.6"],
]

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
  justify-content: space-between;
  width: 100%;
  

  @include mixin.pc {
    height: calc(var(--logo-height-pc) * 1px);
  }
  @include mixin.sp {
    height: calc(var(--logo-height-sp) / 375 * 100vw);
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
  &-color--lightgreen {
    .u-anim-stepmotion {
      span {
        background-color: var.$color-light-green;
      }
    }
  }
  &-color--darkgreen {
    .u-anim-stepmotion {
      span {
        background-color: var.$color-dark-green;
      }
    }
  }
}
</style>