<template lang="pug">
  .page-indicator
    .page-indicator__meter
      p.page-indicator__meter__text 01
      .page-indicator__meter__bar
    .page-indicator__meter
      p.page-indicator__meter__text 02
      .page-indicator__meter__bar
    .page-indicator__meter
      p.page-indicator__meter__text 03
      .page-indicator__meter__bar
    .page-indicator__meter
      p.page-indicator__meter__text 04
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
  watch: {
    refs() {
      this.indicatorAnimation()
    }
  },
  mounted() {
    console.log(this.refs)
  },
  methods: {
    indicatorAnimation() {
      const sw = this.$refs.pageSwiper.$swiper
      console.log(sw.progress)
    }
  }
}
</script>

<style lang="scss">
.page-indicator {
  position: fixed;
  z-index: 1;
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
      @include font-text-en;
      font-size: 16px;
      color: $color-gray;
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
