<!-- pages/index.vue -->
<template>
  <div>
    <div class="content">
      <div class="img__wrapper" ref="imgWrap">
        <img class="img_content" src="../assets/images/rendered/0001.png" alt="aaa" ref="imgContent"></img>
      </div>
      <div class="grass_wrap">
        <div class="grass_wrap__inner">
          <div class="grass"></div>
          <div class="grass"></div>
          <div class="grass"></div>
          <div class="grass"></div>
        </div>
      </div>
    </div>
    <div class="empty"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { throttle } from 'throttle-debounce';

// DOM要素の参照を作成
const imgWrap = ref(null);
const imgContent = ref(null);
const grassImgs = ref([]);

// ウィンドウサイズ
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Grass画像の管理
const grassImagesCount = 65;
onMounted(() => {
  // DOMの初期化
  const grassElements = document.querySelectorAll('.grass');
  grassImgs.value = Array.from(grassElements);

  // Grass 画像にスタイルを初期設定
  grassImgs.value.forEach((img, index) => {
    img.style.transform = `translate3d(0, 0, ${index * 10}px) scale(${1 - index * 0.1})`;
    img.style.bottom = `${index * 3}%`;
    img.style.zIndex = `${-index}`;
    img.style.backgroundPositionX = `${Math.random() * 20}px`;
  });

  // 画像をプリロードし、スクロールイベントをセット
  preloadImages();
  setupScrollEvent();
  setupMouseEvent();

  // リサイズイベントをセット
  window.addEventListener('resize', throttle(100, updateWindowSize));
});

// 画像のプリロード処理
async function preloadImages() {
  const img_urls = Array.from({ length: grassImagesCount }, (_, i) =>
    String(i + 1).padStart(4, '0')
  );
  await Promise.all(
    img_urls.map(async (url) => {
      const img = new Image();
      img.src = `../assets/images/rendered/${url}.png`;
      await new Promise((resolve) => {
        img.onload = resolve
      });
    })
  );
  imgContent.value.classList.add('js-active');
  imgContent.value.src = `../assets/images/rendered/0001.png`;
}

// ウィンドウサイズの更新
function updateWindowSize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

// スクロールイベント
let ticking1 = false;
function setupScrollEvent() {
  window.addEventListener('scroll', () => {
    if (!ticking1) {
      window.requestAnimationFrame(() => {
        const scrollAmount = parseInt(window.scrollY / 30);
        const imgNumber = (scrollAmount % grassImagesCount) + 1;
        const paddedScrollAmount = String(imgNumber).padStart(4, '0');
        imgContent.value.src = `../assets/images/rendered/${paddedScrollAmount}.png`;
        ticking1 = false;
      });
      ticking1 = true;
    }
  });
}

// マウス移動イベント
let ticking2 = false;
function setupMouseEvent() {
  window.addEventListener('mousemove', (e) => {
    if (!ticking2) {
      window.requestAnimationFrame(() => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const optimalX = mapNumRange(mouseX, 0, windowWidth, -1, 1);
        const optimalY = mapNumRange(mouseY, 0, windowHeight, -1, 1);

        // 画像ラップの移動処理
        if (Math.abs(optimalX) > 0.99 || Math.abs(optimalY) > 0.99) {
          imgWrap.value.style.transform = `translate(0px, 0px)`;
        } else {
          imgWrap.value.style.transform = `translate(${optimalX * 20}px, ${optimalY * 20}px)`;
        }

        // grass 画像の移動処理
        grassImgs.value.forEach((img, index) => {
          const x = optimalX * ((grassImgs.value.length - index * 2) * 0.9);
          img.style.transform = `translate3d(${x}px, 0, ${index * 10}px) scale(${1 - index * 0.1})`;
        });

        ticking2 = false;
      });
      ticking2 = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    imgWrap.value.style.transform = `translate(0px, 0px)`;
  });
}

// 数値の範囲を変換する関数
function mapNumRange(num, inMin, inMax, outMin, outMax) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

onBeforeUnmount(() => {
  // イベントリスナーの削除
  window.removeEventListener('scroll', setupScrollEvent);
  window.removeEventListener('mousemove', setupMouseEvent);
  window.removeEventListener('resize', updateWindowSize);
});
</script>

<style lang="stylus" scoped>
.content
  position sticky
  height 100vh
  top 0
  overflow hidden

.img__wrapper
  position absolute
  width 500px
  height 500px
  top 0
  left 0
  right 0
  bottom 0
  margin auto
  transition all 0.3s ease-out

.img_content
  width 100%
  height 100%
  background-size cover
  opacity 0
  transition opacity 0.5s

.img_content
  &.js-active
    opacity 1

.empty
  width 100%
  height 500vh

.grass_wrap
  position absolute
  width 100%
  height 100%
  top 0
  left 0
  right 0
  bottom 0
  perspective 8000px

.grass_wrap__inner
  position relative
  width 100%
  height 100%

.grass
  position absolute
  width 100%
  height 170px
  left 0
  right 0
  bottom 0
  background url("../assets/images/gold_grass.png") repeat center
  background-size 100% 100%
</style>