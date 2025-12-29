<template>
  <div class="c-header">
    <div class="c-header-logo-wrapper" ref="arukuchan">
      <NuxtLink href="/" class="c-header-logo">
        <CommonLogoArukuChan color="lightgreen" />
      </NuxtLink>
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
const mouse = useMousePositionState();
const arukuchan = ref<HTMLElement | null>(null);

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
}

.c-header-logo-wrapper {
  transform: scale(1, 1);
  &.js-active {
    transform: scale(-1, 1);
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
      color: var.$color-black;
    }
  }

  button {
    font-size: 48px;
  }
}
</style>