<!-- pages/index.vue -->
<template>
  <div class="u-font-en">
    <TopKv />

    <CommonContentsInner>
      <CommonSplitter />

      <div class="p-home-aboutme-wrapper">

        <CommonTextNormalLarge lang="jp" style="line-height: 2;" class="u-font-color-dark-green u-anim-opacity" v-intersection-observe="{
          threshold: 0.5
        }">
          Hi! I'm a r u k a.
          <br>
          <br>
          I create works that combine music composition, 3D graphics and programming.
          <br>
          <br>
          For inquiries, please contact me at <a class="external-icon" href="mailto:aruka.music.pon@gmail.com" target="_blank">aruka.music.pon@gmail.com</a>
        </CommonTextNormalLarge>

        <div class="p-home-aboutme-img u-anim-stepmotion" 
        v-step-animation="{ 
          duration: 500,
          delay: 0,
          startPosition: { x: 100, y: 100 },
          startRotation: random(-2, 2),
          startScale:  1
        }"
        v-intersection-observe="{
          threshold: 0.5,
          retrigger: false,
        }">
          <NuxtImg src="/assets/images/works/3d/aruku-morning2.jpg" alt="flying arukuchan in moring sky" loading="lazy" placeholder/>
        </div>

      </div>
    </CommonContentsInner>    

    <div
      class="p-home-works-wrapper"
      ref="worksWrap"
      v-intersection-observe="{
        threshold: 0.5,
        retrigger: true,
    }">
      <div class="p-home-works-inner">
        <NuxtLink  
          class="p-home-works-link u-font-en u-anim-stepmotion"
          to="/works"
          v-step-animation="{ 
            duration: 800,
            delay: 0,
            startPosition: { x: 50, y: 100 },
            startRotation: random(-2, 2),
            startScale:  1
          }"
          v-intersection-observe="{
            threshold: 0.5,
            retrigger: true,
        }">
          <span>
            View More Works
          </span>
        </NuxtLink>
      </div>
      <div class="p-home-works-inner">
        <TopWorks :data="layer1" :layerNum="1"/>
      </div>
      <div class="p-home-works-inner" v-parallax="{speed: 0.2,}" style="will-change: transform;">
        <TopWorks :data="layer2" :layerNum="2"/>
      </div>
      <div class="p-home-works-inner" v-parallax="{speed: 0.5,}" style="will-change: transform;">
        <TopWorks :data="layer3" :layerNum="3"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import meta from '@/assets/json/meta.json'
const { path } = useRoute()
useHead({
  title: meta.pages.home.title,
  meta: [
    { name: 'description', content: meta.pages.home.description.en },
    { property: 'og:title', content: meta.pages.home.title },
    { property: 'og:description', content: meta.pages.home.description.en },
    { property: 'og:url', content: `${meta.domain}${path}` },
    { name: 'twitter:title', content: meta.pages.home.title },
    { name: 'twitter:description', content: meta.pages.home.description.en },
  ]
})

import worksData from '@/assets/json/works.json'
const worksDetailData = worksData.works
const topWorksDetail = worksDetailData.sort(()=> Math.random() - 0.5)
const worksWrap = ref<HTMLElement | null>(null)
const isWorksVisible = ref(false)

const layer1 = ref<any[]>([])
const layer2 = ref<any[]>([])
const layer3 = ref<any[]>([])

onMounted(() => {
  if (window.innerWidth > 768) {
    layer1.value = topWorksDetail.slice(0, 10)
    layer2.value = topWorksDetail.slice(10, 16)
    layer3.value = topWorksDetail.slice(16, 17)
  } else {
    layer1.value = topWorksDetail.slice(0, 6)
    layer2.value = topWorksDetail.slice(6, 10)
    layer3.value = topWorksDetail.slice(10, 11)
  }

  const observer = new MutationObserver(() => {
    if (worksWrap.value?.classList.contains('js-active')) {
      isWorksVisible.value = true
    } else {
      isWorksVisible.value = false
    }
  });

  if (worksWrap.value) {
    observer.observe(worksWrap.value, { attributes: true, attributeFilter: ['class'] });
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.p-home-aboutme-wrapper {
  @include mixin.pc {
    display: flex;
    justify-content: space-between;
    margin-top: 120px;
    padding-bottom: 120px;
    gap: 50px;
  }

  @include mixin.sp {
    display: flex;
    margin-top: mixin.vw(60, var.$dsSp);
    padding-bottom: mixin.vw(120, var.$dsSp);
    flex-direction: column;
    align-items: center;
    gap: mixin.vw(60, var.$dsSp);
  }
}

.p-home-aboutme-img {
  @include mixin.pc {
    max-width: 400px;
  }
}

.p-home-works-wrapper {
  display: block;
  position:relative;
  padding-bottom: 150svh;
  margin: 0 10%;
}

.p-home-works-inner {
  display: block;
  position:absolute;
  top: 0;
  width:100%;
  @include mixin.pc {
    height: 100vh;
  }
  @include mixin.sp {
    height: 80svh;
  }
}

.p-home-works-link {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  color: white;
  background-color: var.$color-light-green;
  text-align: center;
  height: fit-content;
  z-index: 2;
  box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.2);

  @include mixin.pc {
    padding: 20px 40px;
    width: 240px;
    
  }

  @include mixin.sp {
    width : 100%;
    padding: mixin.vw(20, var.$dsSp) 0;
  }

  span {
    &:after {
      content: "";
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      mask-image: url("/assets/images/common/arrow01.svg");
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
      background: white;
      vertical-align: text-top;
    }
  }
}
</style>