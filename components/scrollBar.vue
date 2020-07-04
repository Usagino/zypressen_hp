<template lang="pug">
  .scroll-bar
    .scroll-bar__item
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line
import { ScrollToPlugin } from "gsap/ScrollToPlugin";  // eslint-disable-line

export default {
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.scroll-bar__item', {
      scrollTrigger: {
        trigger: '.container',
        scrub: true,
        start: 'top top',
        end: 'bottom bottom'
        // markers: true
      },
      scaleY: 1
    })
  }
}
</script>

<style lang="scss" scoped>
.scroll-bar {
  position: fixed;
  right: 0;
  top: 0;
  width: 8px;
  height: 100vh;
  z-index: 1;
  &__item {
    position: absolute;
    top: 0;
    left: 0;
    background: $color-white;
    height: 100vh;
    content: '';
    display: block;
    width: 100%;
    transform: scaleY(0);
    transform-origin: top center;
  }
}
</style>
