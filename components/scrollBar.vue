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
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 8px;
  height: calc(100vh - 24px);
  overflow: hidden;
  border-radius: 8px;
  z-index: 1;
  &__item {
    position: absolute;
    top: 0;
    left: 0;
    background: $color-orange;
    height: 100%;
    content: '';
    display: block;
    width: 100%;
    transform: scaleY(0);
    transform-origin: top center;
  }
}
</style>
