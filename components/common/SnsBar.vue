<template>
  <div class="c-snsbar" ref="snsBar">
    <ul role="list">
      <li role="listitem" v-for="item, field in snsLinks">
        <NuxtLink :to="item.url" target="_blank" class="u-hover" :style="{maskImage: `url(/assets/images/common/icon-${item.name}.svg)`}">
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import snsLinks from '@/assets/json/sns.json';
const splashState = useSplashState();
const footerIntersection = useFooterIntersectingState();
const snsBar = ref<HTMLElement>();

const shouldHideBar = computed(() => {
  return splashState.value || footerIntersection.value;
});

watch(shouldHideBar, (shouldHide) => {
  if (snsBar.value) {
    snsBar.value.classList.toggle('js-hidden', shouldHide);
  }
});

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-snsbar {
  background: var.$color-white;
  position: fixed;
  z-index: 8;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
  transition: left 2s cubic-bezier(0.19, 0.01, 0.01, 0.99), bottom 2s cubic-bezier(0.19, 0.01, 0.01, 0.99);

  @include mixin.pc {
    top: calc(var(--header-height) + 20px);
    width: 90px;
    border-radius: 0 20px 20px 0;
    padding: 30px 30px;
    left: 0%;
  }

  @include mixin.sp {
    width: 100%;
    height: min-content;
    padding: mixin.vw(20, var.$dsSp) mixin.vw(30, var.$dsSp);
    border-radius: mixin.vw(20, var.$dsSp) mixin.vw(20, var.$dsSp) 0 0;
    bottom: 0%;
  }

  &.js-hidden {
    @include mixin.pc {
      left: -100%;  
    }
    @include mixin.sp {
      bottom: -100%;  
    }
  }


  ul {
    display: flex;
    list-style: none;

    @include mixin.pc {
      flex-direction: column;
      gap: 20px;
    }
    
    @include mixin.sp {
      flex-direction: row;
      justify-content: space-between;
    }

    li {
      aspect-ratio: 1;
      @include mixin.pc {
        width: 100%;
      }
      @include mixin.sp {
        height: mixin.vw(35, var.$dsSp);
      }

      a {
        display: block;
        width: 100%;
        height: 100%;
        background-color: var.$color-brown;
        mask-size: cover;
        mask-repeat: no-repeat;
        mask-position: center;
      }
    }
  }
}
</style>