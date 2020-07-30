<template lang="pug">
  .page-indicator
    .page-indicator__meter(v-for="n of 4" :key="n")
      p.page-indicator__meter__text(@click="toScroll(n-1)") 0{{n}}
      .page-indicator__meter__bar
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

export default {
  props: {
    refs: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    console.log(this.refs)
    gsap.to('.page-indicator', 0.4, {
      x: '0%',
      delay: 0.6
    })
  },
  methods: {
    toScroll(i) {
      const sw = this.refs.pageSwiper.$swiper
      sw.slideTo(i)
    }
  }
}
</script>

<style lang="scss">
.page-indicator {
  transform: translateX(150%);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @include just-fitsize;
  height: 180px;
  &__meter {
    width: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__text {
      cursor: pointer;
      @include font-text-en;
      font-size: 16px;
      color: $color-gray;
      transition: all 0.4s ease;
      &:hover {
        color: $color-white;
        transform: scale(1);
      }
    }
    &__bar {
      transform: translateX(100%);
      content: '';
      width: 32px;
      height: 1px;
      background: $color-white;
    }
  }
}
</style>
