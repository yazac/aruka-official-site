<template>
  <div class="c-header">
    <div class="c-header-arukuchan-comment" ref="arukuchanComment">
      みつけてくれてありがとう！
    </div>

    <div class="c-header-logo-wrapper" ref="arukuchan" :key="route.path">
      
      <!-- TOP以外 -->
      <NuxtLink v-if="route.path != '/'" to="/" class="c-header-logo">
        <CommonLogoArukuChan color="lightgreen" />
      </NuxtLink>

      <!-- TOP -->
      <button v-else class="c-header-logo">
        <CommonLogoArukuChan color="lightgreen" />
      </button>
    </div>

    <nav class="c-header-nav">
      <ul role="list">
        <li role="listitem"><NuxtLink to="/">Home</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
        <li role="listitem"><NuxtLink to="/about">About</NuxtLink></li>
      </ul>

      <button>
        =
      </button>
    </nav>
  </div>
</template>


<script setup lang="ts">
const route = useRoute()

const mouse = useMousePositionState();
const arukuchanClickNum = useArukuchanClickNumState();
const arukuchan = ref<HTMLElement | null>(null);
const arukuchanComment = ref<HTMLElement | null>(null);

onMounted(() => {
  const rect = arukuchan.value?.getBoundingClientRect();

  const teritory = {
    xMin: (rect?.x ?? 0) + 200,
    yMin: (rect?.y ?? 0) + 200,
  };


  window.addEventListener('mousemove', throttle(200, (e: MouseEvent) => {
    mouse.value.x = e.clientX;
    mouse.value.y = e.clientY;

    if (teritory.xMin && teritory.yMin) {
      if (mouse.value.x < teritory.xMin && mouse.value.y < teritory.yMin) {
        arukuchan.value?.classList.add('js-active');
      }
      else {
        arukuchan.value?.classList.remove('js-active');
      }
    }
  }));

  arukuchan.value?.addEventListener('click', () => {
    const arukusound = new Audio('/assets/sound/arukuchan.mp3');
    arukusound.play().catch(err => console.log('Audio play failed:', err));

    arukuchanClickNum.value += 1;

    if (arukuchanClickNum.value % 20 == 0) {
      arukuchanComment.value?.classList.add('js-active')
      setTimeout(()=>{
        arukuchanComment.value?.classList.remove('js-active')
      }, 2000)
    }
  });
});
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';

.c-header {
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.c-header-logo-wrapper {
  transform: scale(1, 1);
  &.js-active {
    transform: scale(-1, 1);
  }
}

.c-header-arukuchan-comment {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 90px;
  margin: auto;

  width: max-content;
  height: fit-content;
  padding: 8px 8px;
  border-radius: 25px;

  background: var.$color-white;

  opacity: 0;
  transition: opacity 1s;

  &.js-active {
    opacity: 1;
    transition: opacity 0.01s;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    background: inherit;
    width: 10%;
    height: 65%;
    clip-path: polygon(0% 0%, 100% 10%, 100% 100%);
    top: 25%;
    left: -5%;
    z-index: -1;
  }
}

.c-header-logo {
  width: 60px;
  display: inline-block;
  transition: transform 0.05s cubic-bezier(0.89,-0.01, 0.2, 1);

  &:active {
    transform: scale(1.8, 0.5);
  }
}

.c-header-nav {
  display: flex;
  align-items: center;
  gap: 40px;
  ul {
    display: flex;
    align-items: center;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      :deep(a) {
        color: var.$color-black;
        text-decoration: none;
      }
    }
  }

  button {
    @include var.fs-large;
  }
}
</style>