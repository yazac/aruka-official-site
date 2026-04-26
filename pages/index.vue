<!-- pages/index.vue -->
<template>
  <div>
    <TopKv />

    <CommonContentsInner>
      <CommonSplitter class="u-anim-opacity" v-intersection-observe="{
          threshold: 0.5
        }"/>

      <div class="p-aboutme-wrapper">

        <CommonTextNormalLarge lang="jp" style="line-height: 2;" class="u-font-color-dark-green u-anim-opacity" v-intersection-observe="{
          threshold: 0.5
        }">
          はじめまして、 a r u k a. といいます。
          <br>
          <br>
          作曲と、3Dアート、プログラミングを組み合わせた<br>作品を作っています。<br>
          WORKSやギャラリーのページから見ていってくださいね！
          <br>
          <br>
          僕には大切なキャラクターがいます。
          <br>
          arukuちゃんです。丸くて光る大きな目が２つあって、空中をふわふわ飛び回ります。
          <br>
          可愛がってもらえると、arukuちゃんも僕もとても嬉しいです。
          <br>
          <br>
          お問い合わせはcontactページから、若しくは
          <NuxtLink class="external-icon" href="mailto:aruka.music.pon@gmail.com" target="_blank">aruka.music.pon@gmail.com</NuxtLink>まで
        </CommonTextNormalLarge>

        <div class="p-aboutme-img u-anim-stepmotion" 
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
          <NuxtImg src="/assets/images/gallery/aruku-morning.jpg" alt="flying arukuchan in moring sky" loading="lazy" placeholder/>
        </div>

      </div>
    </CommonContentsInner>    
  </div>
  
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.p-aboutme-wrapper {
  @include mixin.pc {
    display: flex;
    justify-content: space-between;
    margin-top: 120px;
    padding-bottom: 520px;
    gap: 110px;
  }
}
</style>