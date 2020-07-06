<template lang="pug">
.pagemenuicon
  .menuicon(
    @click="menuToggle"
    @mouseover="globalIconMoseOver('hover-menu')"
    @mouseleave="iconMouseLeave('hover-menu')"
    )
    lottie(
      :options="lottieOptions"
      :height="16"
      :width="16"
      @animCreated="handleAnimation")
  .menulist(v-show="!lottieOptions.toggle")
    ul.menulist__box
      li(@click="menuToggle").menulist__box--top
        nuxt-link.menulist__box--link(to="/" :class="{'menulist__box--fadein':!lottieOptions.toggle}") TOP
      li(@click="menuToggle").menulist__box--works
        nuxt-link.menulist__box--link(to="/works" :class="{'menulist__box--fadein':!lottieOptions.toggle}") WORKS
      li(@click="menuToggle").menulist__box--about
        nuxt-link.menulist__box--link(to="/about" :class="{'menulist__box--fadein':!lottieOptions.toggle}") ABOUT
      li(@click="menuToggle").menulist__box--contact
        nuxt-link.menulist__box--link(to="/contact" :class="{'menulist__box--fadein':!lottieOptions.toggle}") CONTACT
      li.social-button__list(@click="menuToggle" v-if="this.$ua.deviceType() === 'smartphone'")
        a.social-button__icon(href="https://twitter.com/home")
          img(src="/DEFAULT/twitter.svg")
        a.social-button__icon(href="https://www.instagram.com/?hl=ja")
          img(src="/DEFAULT/instagram.svg")
    .social-button
      a.social-button__icon(href="https://twitter.com/home")
        img(src="/DEFAULT/twitter.svg")
      a.social-button__icon(href="https://www.instagram.com/?hl=ja")
        img(src="/DEFAULT/instagram.svg")
</template>

<script>
import { gsap } from 'gsap'
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
      },
      scrollOffset: 0
    }
  },
  mounted() {
    const tl = gsap.timeline()
    tl.set('.menulist__box--link', {
      y: '150%',
      z: '0',
      rotateY: '-30deg',
      scale: '1'
    })
    // this.hoverText()
  },
  methods: {
    hoverText() {
      const linkelement = document.querySelectorAll('.menulist__box--link')
      linkelement.forEach((el, i) => {
        el.addEventListener('mouseover', () => {
          gsap.to(el, 0.3, { rotateY: '-15deg' })
        })
        el.addEventListener('mouseout', () => {
          gsap.to(el, 0.3, { rotateY: '-30deg' })
        })
      })
    },
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(3)
    },
    menuToggle() {
      const tl = gsap.timeline()

      if (this.lottieOptions.toggle) {
        console.log(this.lottieOptions.toggle)
        gsap.set('html,body', { overflow: 'hidden' })
        this.anim.setDirection(1)
        this.anim.play()
        tl.to('.menulist', 0.2, {
          y: 0
        })
          .to('.menulist__box--contact .menulist__box--link', 0.1, {
            y: '0%',
            delay: 0.5
          })
          .to('.menulist__box--about .menulist__box--link', 0.1, {
            y: '0%'
          })
          .to('.menulist__box--works .menulist__box--link', 0.1, {
            y: '0%'
          })
          .to('.menulist__box--top .menulist__box--link', 0.1, {
            y: '0%'
          })
          .to('.social-button__icon', 0.1, {
            y: '0%'
          })
          .set('.menulist__box--link', { pointerEvents: 'auto', delay: 1 })
        this.lottieOptions.toggle = !this.lottieOptions.toggle
      } else {
        console.log(this.lottieOptions.toggle)
        gsap.set('html,body', { overflow: 'scroll' })
        this.anim.setDirection(-1)
        this.anim.play()

        tl.set('.menulist__box--link', { pointerEvents: 'none' })
        tl.to('.menulist__box--top .menulist__box--link', 0.1, {
          y: '-150%'
        })
          .to('.menulist__box--works .menulist__box--link', 0.1, {
            y: '-150%'
          })
          .to('.menulist__box--about .menulist__box--link', 0.1, {
            y: '-150%'
          })
          .to('.menulist__box--contact .menulist__box--link', 0.1, {
            y: '-150%'
          })
          .to('.social-button__icon', 0.1, {
            y: '-100%'
          })
          .to('.menulist', 0.4, {
            y: '-100%',
            delay: 0.3,
            onComplete: () => {
              this.lottieOptions.toggle = !this.lottieOptions.toggle
            }
          })
          .set('.menulist,.social-button__icon', {
            y: '100%'
          })
          .set('.menulist__box--link', {
            y: '150%'
          })
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
  @include mq(sm) {
    top: 32px;
    right: 32px;
  }
}
.menulist {
  @include full-screen;
  background: $color-gray;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);
  &__box {
    width: 100%;
    position: absolute;
    padding: 220px 0;
    @include secondary-margin;
    box-sizing: border-box;
    z-index: 2000;
    @include mq(sm) {
      @include gap-bottom(8px);
    }
    li {
      perspective: 500;
      overflow: hidden;
      -webkit-perspective: 500;
      -moz-perspective: 500;
      transform-origin: right center;
      will-change: transform;
    }
    &--top {
      transform: rotate(-4deg);
    }
    &--works {
      transform: rotate(-1.5deg);
    }
    &--about {
      transform: rotate(1.5deg);
    }
    &--contact {
      transform: rotate(4deg);
    }
    &--link {
      text-align: right;
      transform-origin: right center;
      transform-style: preserve-3d;
      will-change: transform;
      @include font-title-first;
      display: block;
      line-height: 80px;
      transition: all 300ms ease;
      pointer-events: none;

      @include mq(sm) {
        line-height: 100%;
      }
      &:hover {
        @include text-outline;
        @include mq(sm) {
          color: $color-white;
          -webkit-text-stroke: unset;
        }
      }
    }
  }
  .social-button {
    position: absolute;
    bottom: $pri-value;
    left: $pri-value;
    overflow: hidden;
    @include gap-right(28px);
    display: flex;
    &__icon {
      height: fit-content;
      display: block;
      transform: translateY(100%);
    }
    @include mq(sm) {
      display: none;
      img {
        height: 28px;
        width: 28px;
      }
    }
    &__list {
      @include gap-right(28px);
    }
  }
}
</style>
