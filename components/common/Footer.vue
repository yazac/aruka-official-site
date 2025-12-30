<template>
  <div class="c-footer">
    <div>
      <nav class="c-footer-nav">
        <ul role="list">
          <li role="listitem"><NuxtLink to="/" class="u-font-en">Home</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/about" class="u-font-en">About</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/works" class="u-font-en">Works</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/contact" class="u-font-en">Contact</NuxtLink></li>
          <li role="listitem"><NuxtLink to="/privacy-policy" class="u-font-en">Privacy Policy</NuxtLink></li>
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
          onEnter: () => (animTrigger = true)
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
const route = useRoute()
const animTrigger = ref(false)
</script>

<style scoped lang="scss">
@use '@/assets/css/_var.scss';

.c-footer {
  width: 100%;
  padding: 80px 18px 0 20px;
  background: var.$color-light-green;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.c-footer-logo-text {
  width: 700px;
}

.c-footer-nav {
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    gap: 20px;

    li {
      @include var.fs-medium;
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
}

.c-footer-copyright {
  display: inline-block;
  margin-top: 60px;
  margin-bottom: 8px;
  color: var.$color-white;
  @include var.fs-small;
  letter-spacing: calc(40 / 1000 * 1rem);
}
</style>