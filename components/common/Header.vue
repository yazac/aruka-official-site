<template>
  <div class="c-header" ref="headerElem" >
    <div class="c-header-arukuchan-comment" ref="arukuchanComment">
      みつけてくれてありがとう！
    </div>

    <div class="c-header-logo-attention" ref="arukuchanAttention">
    </div>

    <div class="c-header-logo-wrapper" ref="arukuchan" @click="onArukuchanClick">
      <!-- TOPの時だけ遷移を無効にする -->
      <NuxtLink
        to="/"
        class="c-header-logo"
        :aria-disabled="route.path === '/'"
        @click.prevent="route.path === '/'"
      >
        <CommonLogoArukuChan color="lightgreen" />
      </NuxtLink>
    </div>

    <nav class="c-header-nav">
      <ul role="list">
        <li role="listitem u-hover"><NuxtLink to="/">Home</NuxtLink></li>
        <li role="listitem u-hover"><NuxtLink to="/works">Works</NuxtLink></li>
        <li role="listitem u-hover"><NuxtLink to="/contact">Contact</NuxtLink></li>
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
const arukuchanAttention = ref<HTMLElement | null>(null);

const headerElem = ref<HTMLElement | null>(null)
useElemHeight(headerElem, 'header-height')

const enterArukuchan = ref(false);

const onArukuchanClick = () => {
  const arukusound = new Audio('/assets/sound/arukuchan.mp3')
  arukusound.play();

  arukuchanClickNum.value += 1

  if (arukuchanClickNum.value % 20 === 0) {
    arukuchanComment.value?.classList.add('js-active')
    setTimeout(() => {
      arukuchanComment.value?.classList.remove('js-active')
    }, 2000)
  }
}


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
        if (enterArukuchan.value == false) {
          enterArukuchan.value = true;
        }
      }
      else {
        arukuchan.value?.classList.remove('js-active');

        if (enterArukuchan.value == true) {
          enterArukuchan.value = false;
        }
      }
    }
  }));

  watch(() => enterArukuchan.value, (newVal) => {
    // console.log(enterArukuchan.value)
    if (enterArukuchan.value == true) {
      arukuchanAttention.value?.classList.add('js-active');
      setTimeout(() => {
        arukuchanAttention.value?.classList.remove('js-active');
      }, 200);
    }
  })
});
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @include mixin.pc {
    padding: 20px 20px;
  }

  @include mixin.sp {
    padding: mixin.vw(20, var.$dsSp) mixin.vw(15, var.$dsSp);
  }
}

.c-header-logo-attention {
  position: absolute;
  top: -40%;
  bottom: 0;
  margin: auto;
  left: 85px;
  width: 20px;
  height: 20px;
  mask-image: url("/assets/images/common/attention.svg");
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  background: var.$color-light-green;
  opacity: 0;

  &.js-active {
    opacity: 1;
  }
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
  filter: drop-shadow(0.1rem 0.1rem 0.05rem rgba(0,0,0,0.1));

  background: var.$color-white;

  opacity: 0;
  transition: opacity 1s;

  @include mixin.pc {
    left: 90px;
  }

  @include mixin.sp {
    left: mixin.vw(78, var.$dsSp);
  }

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
    
    @include mixin.sp {
      display: none;
    }

    li {
      :deep(a) {
        color: var.$color-black;
        text-decoration: none;
      }
    }
  }

  button {
    @include mixin.fs-large;
  }
}
</style>