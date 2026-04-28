<template>
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <filter id="turbulence-1">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="5" data-filterId="3" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
    </filter>

    <filter id="turbulence-2">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="5" data-filterId="3" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
    </filter>

    <filter id="turbulence-3">
      <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" data-filterId="3" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
    </filter>

    <filter id="turbulence-4">
      <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" data-filterId="3" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
    </filter>

    <filter id="turbulence-5">
      <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="5" data-filterId="3" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" scale="5" />
    </filter>

  </svg>
</template>

<script setup lang="ts">
</script>

<style>
.u-anim-squiggle {
  animation: squigglevision 0.5s linear infinite;
}

@keyframes squigglevision {
  0% {
    filter: url("#turbulence-1");
  }
  25% {
    filter: url("#turbulence-2");
  }
  50% {
    filter: url("#turbulence-3");
  }
  75% {
    filter: url("#turbulence-4");
  }
  100% {
    filter: url("#turbulence-5");
  }
}
</style>
