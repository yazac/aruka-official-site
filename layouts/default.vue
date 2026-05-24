<!-- layouts/default.vue -->
<template>
  <div class="layout u-font-jp">
    <VueLenis root />
    
    
    
    <TopSplash v-if="splashState" />

    <!-- ヘッダー -->
    <header class="header">
      <CommonHeader />
    </header>

    <CommonSnsBar />

    <!-- モーダル用 -->
    <div class="modal">
      <CommonModal />
    </div>

    <!-- メインコンテンツ -->
    <main class="main ">
      <slot />
    </main>    


    <!-- フッター -->
    <footer class="footer">
      <CommonFooter />
    </footer>

    <!-- svgフィルター -->
    <CommonSvgFilterSquiggle />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
import meta from '@/assets/json/meta.json'

watch(() => route.path, (newPath) => {
  const pageName: string = getBasePath()
  const pageMeta: any = (meta.pages as Record<string, any>)[pageName]

  if (pageMeta) {
    useHead({
      title: pageMeta.title,
      htmlAttrs: {
        lang: `${getCurrentLanguage() === 'en' ? 'en' : 'ja'}`,
      },
      link: [
        { rel: 'canonical', href: `${meta.domain}${newPath}` },
      ],
      meta: [
        { name: 'description', content: pageMeta.description[getCurrentLanguage()] },
        { property: 'og:title', content: pageMeta.title },
        { property: 'og:site_name', content: pageMeta.title },
        { property: 'og:description', content: pageMeta.description[getCurrentLanguage()] },
        { property: 'og:url', content: `${meta.domain}${newPath}` },
        { name: 'twitter:title', content: pageMeta.title },
        { name: 'twitter:description', content: pageMeta.description[getCurrentLanguage()] },
      ]
    })
  }
}, { immediate: true })



import { VueLenis, useLenis } from 'lenis/vue'
const loading = useLoadingState();
const splashState = useSplashState();
const kvResourcesLoaded = useKVResourcesLoadedState();

onMounted(async() => {
  if (route.path === "/" || route.path === "/en") {
    // Wait for KV resources to load or timeout after 2000ms
    const kvLoadTimeout = new Promise(resolve => setTimeout(resolve, 1300));
    const kvLoadComplete = new Promise(resolve => {
      const unwatch = watch(() => kvResourcesLoaded.value, (loaded) => {
        if (loaded) {
          unwatch();
          resolve(true);
        }
      });
    });

    await Promise.all([kvLoadComplete, kvLoadTimeout]);
  } else {
    await wait(500)
  }

  loading.value = false;
  // console.log('loading', loading.value)
  
  await wait(500);
  splashState.value = false;
  // console.log('splashState', splashState.value)

  ginkChanComment();
})

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';
.layout {
  background-color: var.$color-beige;
  position: relative;
}

.header {
  position: sticky;
  top: 0;
  text-align: center;
  z-index: 2;
  height: 0;
}

.main {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: clip;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg,rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0) 100%);
    mix-blend-mode: overlay;
    z-index: 1;
    pointer-events: none;

    @include mixin.pc {
      width: 40%;
    }
    @include mixin.sp {
      width: 20%;
    }    
  }

  &:after {  
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(270deg,rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0) 100%);
    mix-blend-mode: overlay;
    z-index: 0;
    pointer-events: none;

    @include mixin.pc {
      width: 40%;
    }
    @include mixin.sp {
      width: 20%;
    }
  }
}

.modal {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
}
</style>
