<template>
  <div class="c-footer" ref="footerElem">
    <div>
      <nav class="c-footer-nav">
        <ol role="list">
          <li role="listitem"><NuxtLink to="/" class="u-font-en">Home</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/works" class="u-font-en">Works</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/contact" class="u-font-en">Contact</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/privacy-policy" class="u-font-en">Privacy Policy</NuxtLink></li>
        </ol>

        <ul role="list">
          <li role="listitem" v-for="item, field in snsLinks">
            <NuxtLink :to="item.url" target="_blank" class="u-hover">
              <img :src="`/assets/images/common/icon-${item.name}.svg`" :alt="`${item.name}`">
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <span class="c-footer-copyright u-font-en">
        Copyright &copy; 2026 a r u k a. All rights reserved
      </span>
    </div>
    <div class="c-footer-logo-text">
      <CommonLogoText 
        ref="logotext"
        color="white"
        :trigger="animTrigger" 
        v-intersection-observe="{
          threshold: 0.5,
          retrigger: true,
          onEnter: () => (animTrigger = true),
          onLeave: () => (animTrigger = false)
        }"
        :height="{
          pc: 60,
          sp: 50
        }"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import snsLinks from '@/assets/json/sns.json';

const route = useRoute()
const animTrigger = ref(false)

const footerElem = ref<HTMLElement | null>(null)
const footerIntersectingState = useFooterIntersectingState()

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (footerElem.value) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        footerIntersectingState.value = entry.isIntersecting;
        if (entry.isIntersecting) {
          console.log('Footer is intersecting');
        }
      });
    }, {
      rootMargin: "0px",
      threshold: 0,
    });
    
    observer.observe(footerElem.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.c-footer {
  width: 100%;
  background: var.$color-brown;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  overflow: hidden;

  @include mixin.pc {
    padding: 80px 18px 0 20px;
  }

  @include mixin.sp {
    padding: mixin.vw(60, var.$dsSp) mixin.vw(20, var.$dsSp);
  }
}

.c-footer-logo-text {
  
  @include mixin.pc {
    width: 700px;
  }

  @include mixin.sp {
    display: none;
  }
}

.c-footer-nav {
  ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 20px;

    li {
      @include mixin.fs-medium;
      letter-spacing: calc(40 / 1000 * 1rem);

      :deep(a) {
        display: inline-block;
        position: relative;
        width: 100%;
        color: var.$color-white;
        text-decoration: none;
        padding: 4px 0;
        opacity: 1;

        &:before {
          content: "";
          display: block;
          position: absolute;
          right: 0;
          width: 1.2rem;
          height: 1.2rem;
          mask-image: url("/assets/images/common/arrow01.svg");
          mask-size: contain;
          mask-position: center;
          mask-repeat: no-repeat;
          background: var.$color-white;
          opacity: 0;
        }

        &:after {
          content: "";
          display: block;
          background: var.$color-white;
          width: 100%;
          height: 1px;
        }

        &:hover {
          opacity: 0.8;
          &:before {
            opacity: 1;
          }
        }
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    gap: 16px;
    margin-top: 48px;
    li {
      width: 30px;
    }
  }
}

.c-footer-copyright {
  display: inline-block;
  margin-top: 60px;
  margin-bottom: 8px;
  color: var.$color-white;
  @include mixin.fs-small;
  letter-spacing: calc(40 / 1000 * 1rem);
}
</style>