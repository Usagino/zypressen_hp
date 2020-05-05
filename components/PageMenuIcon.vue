<template lang="pug">
.pagemenuicon
  .menuicon(@click="menuToggle")
    lottie(
      :options="lottieOptions"
      :height="18"
      :width="18"
      @animCreated="handleAnimation")
  .menulist
    ul.menulist__box
      li
        nuxt-link(to="/") TOP
      li
        nuxt-link(to="/works") WORKS
      li
        nuxt-link(to="/about") ABOUT US
      li
        nuxt-link(to="/contact") CONTACT
</template>

<script>
import { TweenMax } from 'gsap'
import * as menuIcon from '~/assets/animation/menu_icon.json'

export default {
  data() {
    return {
      lottieOptions: {
        animationData: menuIcon,
        loop: false,
        autoplay: false,
        speed: 1,
        toggle: true
      }
    }
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(3)
    },
    menuToggle() {
      if (this.lottieOptions.toggle) {
        this.anim.setDirection(1)
        this.anim.play()
        TweenMax.set('.menulist', {
          display: 'flex'
        })
        TweenMax.to('.menulist', 0.3, { opacity: 1 })
        this.lottieOptions.toggle = !this.lottieOptions.toggle
      } else {
        this.anim.setDirection(-1)
        this.anim.play()
        TweenMax.to('.menulist', 0.3, {
          opacity: 0,
          onComplete: () => {
            TweenMax.set('.menulist', {
              display: 'none'
            })
          }
        })
        this.lottieOptions.toggle = !this.lottieOptions.toggle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menuicon {
  position: fixed;
  top: 70px;
  right: 70px;
  cursor: pointer;
  z-index: 1000;
}
.menulist {
  @include full-screen;
  background: $color-black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  opacity: 0;
  &__box {
    width: 100%;
    padding: 0 240px;
    li {
      text-align: right;
    }
  }
}
</style>
