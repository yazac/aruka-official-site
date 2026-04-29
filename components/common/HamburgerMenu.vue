<template>
  <div class="c-menu u-font-en">
    <nav class="c-menu-inner">
      <ul role="list" class="c-menu-page-list" ref="menuPageList">
        <li role="listitem" :class="{ 'is-current': isCurrentPage('/') }">
          <NuxtLink :to="getLocalizedPath('/')">Home</NuxtLink>
        </li>
        <li role="listitem" :class="{ 'is-current': isCurrentPage('/about') }">
          <NuxtLink :to="getLocalizedPath('/about')">About</NuxtLink>
        </li>
        <li role="listitem" :class="{ 'is-current': isCurrentPage('/works') }">
          <NuxtLink :to="getLocalizedPath('/works')">Works</NuxtLink>
        </li>
      </ul>

      <button class="c-menu-burger-close" ref="menuCloseButton">
        <span></span>
      </button>
    </nav>
    <div class="c-menu-background" ref="menuBackground"></div>
  </div>
</template>

<script setup lang="ts">
const menuBackground = ref<HTMLElement | null>(null);
const menuPageList = ref<HTMLElement | null>(null);
const menuCloseButton = ref<HTMLElement | null>(null);

const menuState = useMenuOpenState();

onMounted(() => {
  menuCloseButton.value?.addEventListener("click", () => {
    menuState.value = false;
  })
})

watch(() => menuState.value, (newVal) => {
  if (newVal) {
    menuBackground.value?.classList.add("js-active");
    menuPageList.value?.classList.add("js-active");
    menuCloseButton.value?.classList.add("js-active");
  } else {
    menuBackground.value?.classList.remove("js-active");
    menuPageList.value?.classList.remove("js-active");
    menuCloseButton.value?.classList.remove("js-active");
  }
})


</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-menu {
  @include mixin.pc {
    display: none;
  }

  @include mixin.sp {
    position: fixed;
    z-index: 8;
    top: 0;
    right: 0;
    width: mixin.vw(240, var.$dsSp);
    height: mixin.vw(248, var.$dsSp);
    pointer-events: none;
  }
}

.c-menu-background {
  position: absolute;
  width: mixin.vw(350, var.$dsSp);
  aspect-ratio: 1;
  background: var.$color-white;
  z-index: -1;
  top:19%;
  left: 83%;
  border-radius: 100%;
  transform: translate(-50%, -50%) scale(0);
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &.js-active {
    transform: translate(-50%, -50%) scale(1);
  }
}

.c-menu-inner {
  padding-top: mixin.vw(59, var.$dsSp);
  padding-left: mixin.vw(62, var.$dsSp);
}

.c-menu-page-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: mixin.vw(32, var.$dsSp);
  opacity: 0;
  right: -10%;
  position: relative;

  &.js-active {
    opacity: 1;
    right: 0;
    transition: all 0.6s ease-in-out;
  }

  li {
    @include mixin.fs-medium;

    :deep(a) {
      color: var.$color-black;
      text-decoration: none;
      pointer-events: all;
    }

    &:nth-child(2) {
      margin-left: mixin.vw(30, var.$dsSp);
    }
    &:nth-child(3) {
      margin-left: mixin.vw(70, var.$dsSp);
    }

    &.is-current {
      :deep(a) {
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
}

.c-menu-burger-close {
  position: absolute;
  top: mixin.vw(23, var.$dsSp);
  right: mixin.vw(15, var.$dsSp);
  cursor: pointer;
  width: mixin.vw(50, var.$dsSp);
  height: mixin.vw(50, var.$dsSp);
  padding: mixin.vw(2, var.$dsSp);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  &.js-active {
    pointer-events: all;
    opacity: 1;
  }

  span {
    background: url('/assets/images/common/close.svg') no-repeat center;
    background-size: contain;
    display: block;
    width: 100%;
    height: 100%;
  }  
}
</style>