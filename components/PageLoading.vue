<template lang="pug">
  transition(name="fade")
    .loading(v-show="loading && animateProgress")
      img.loading__logo(src="/PageLogo.svg")
      .loading__progress
        .loading__progress__bar
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line

export default {
  name: 'Loading',
  data() {
    return {
      loading: true,
      animateProgress: true
    }
  },
  mounted() {
    // const target = document.querySelector('.webgl')
    // console.log(target)
    const tl = gsap.timeline()
    tl.set('html,body', { overflow: 'hidden' })
      .to('.loading__progress__bar', 14, {
        scaleX: '1',
        delay: 1
      })
      .set('html,body', {
        overflow: 'scroll',
        onComplete: () => {
          console.log(this.animateProgress)
          this.animateProgress = false
        }
      })
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: var(--wh, 100vh);
  z-index: 9999;
  transition: all 1.2s ease;
  background: $color-black;
  display: grid;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  place-items: center;
  grid-gap: $pri-value;
  padding: $pri-value * 2;
  box-sizing: border-box;
  &__logo {
    height: 40px;
    width: auto;
  }
  &__progress {
    width: 300px;
    height: 8px;
    content: '';
    display: block;
    background: $color-gray;
    &__bar {
      transform-origin: left center;
      width: 100%;
      height: 100%;
      content: '';
      display: block;
      background: $color-orange;
      transform: scaleX(0);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
  transition-delay: 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
