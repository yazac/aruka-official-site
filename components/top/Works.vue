<template>
  <span
    class="layer-images" 
    :class="`layer${props.layerNum}`" 
    v-for="(work, index) in props.data"
    :key="index"
    :style="positions[index]"
    v-intersection-observe="{
      threshold: 0.5,
      rootMargin: '0px 0px -20% 0px',
      retrigger: true,
    }"
  >
    <NuxtImg 
      :src="work.image[0] === null? 'https://placehold.jp/800x800.png': `/images/works${work.image[0]}`"
      width="800" height="800" loading="lazy" quality="50" placeholder
      style="position: absolute; transform: translate(0, -50%);"
    />
  </span>
</template>

<script setup lang="ts">
interface Props {
  layerNum: number
  data: any[]
}
const props = defineProps<Props>()

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const seed = ref(0)

const getGridPosition = (index: number, total: number, seed: number) => {
  const cols = Math.ceil(Math.sqrt(total))
  const rows = Math.ceil(total / cols)
  const cellWidth = 100 / cols
  const cellHeight = 100 / rows
  const row = Math.floor(index / cols)
  const col = index % cols
  
  const offsetX = ((seededRandom(seed + index * 2) + seededRandom(seed + index * 3)) / 2 - 0.5) * cellWidth
  const offsetY = ((seededRandom(seed + index * 4) + seededRandom(seed + index * 5)) / 2 - 0.5) * cellHeight

  // const offsetX = 0
  // const offsetY = 0

  return {
    top: `${row * cellHeight + cellHeight / 2 + offsetY}%`,
    left: `${col * cellWidth + cellWidth / 2 + offsetX}%`,
  }
}

onMounted(() => {
  if(window.innerWidth > 768) {
    seed.value = 32549038
  } else {
    seed.value = 325490
  }
})

const positions = computed(() => props.data.map((_, index) => getGridPosition(index, props.data.length, seed.value)))
</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.layer-images {
  display: block;
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease-out;
  transform: translate(-50%, 0);

  &.js-active {
    opacity: 1;
  }

  &.layer1 {
    max-width: 120px;
    width: mixin.vw(120, var.$dsPc);

    @include mixin.sp {
      max-width: 70px;
      width: mixin.vw(70, var.$dsSp);
    }
  }
  &.layer2 {
    max-width: 180px;
    width: mixin.vw(180, var.$dsPc);


    @include mixin.sp {
      max-width: 100px;
      width: mixin.vw(100, var.$dsSp);
    }
  }
  &.layer3 {
    max-width: 400px; 
    width: mixin.vw(400, var.$dsPc);

    @include mixin.sp {
      max-width: 180px;
      width: mixin.vw(180, var.$dsSp);
    }
  }
}
</style>