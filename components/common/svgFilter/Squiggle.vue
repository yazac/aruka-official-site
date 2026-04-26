<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display: none;">
    <defs>
      <filter id="squiggly-test">
        <feTurbulence
          ref="turbulence"
          type="fractalNoise"
          baseFrequency="0.2"
          numOctaves="3"
          seed="0"
          result="noise"
        />
        <feDisplacementMap
          ref="displacementMap"
          in="SourceGraphic"
          in2="noise"
          scale="2"
        />
      </filter>
    </defs>
  </svg>
</template>

<script setup lang="ts">
const turbulence = ref<SVGFETurbulenceElement | null>(null)
const displacementMap = ref<SVGFEDisplacementMapElement | null>(null);

const seeds = [0, 1, 2, 3, 4]
const scales = [2, 3, 2, 3, 1]

onMounted(() => {
  const animate = async (i: number) => {
    turbulence.value?.setAttribute(
      'seed',
      seeds[i]!.toString()
    )

    displacementMap.value?.setAttribute(
      'scale',
      scales[i]!.toString()
    )

    await wait(100)

    requestAnimationFrame(() =>
      animate((i + 1) % seeds.length)
    )
  }

  animate(0)
})
</script>

<style>
.u-anim-squiggle {
  filter: url("#squiggly-test");
}
  
@supports (font: -apple-system-body) { 
  .u-anim-squiggle {
    filter: none !important;
  }
}
</style>
