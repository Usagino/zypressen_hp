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
      li(@click="menuToggle").menulist__box__link
        .hide-bar
        nuxt-link.menulist__box--link(to="/" :class="{'menulist__box--fadein':!lottieOptions.toggle}") TOP
      li(@click="menuToggle").menulist__box__link
        .hide-bar
        nuxt-link.menulist__box--link(to="/works" :class="{'menulist__box--fadein':!lottieOptions.toggle}") WORKS
      li(@click="menuToggle").menulist__box__link
        .hide-bar
        nuxt-link.menulist__box--link(to="/about" :class="{'menulist__box--fadein':!lottieOptions.toggle}") ABOUT
      li(@click="menuToggle").menulist__box__link
        .hide-bar
        nuxt-link.menulist__box--link(to="/contact" :class="{'menulist__box--fadein':!lottieOptions.toggle}") CONTACT
      li.social-button__list(@click="menuToggle" v-show="this.$ua.deviceType() === 'smartphone'")
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
    // const tl = gsap.timeline()
    // tl.set('.menulist__box--link', {
    //   y: '150%',
    //   z: '0',
    //   rotateY: '-30deg',
    //   scale: '1'
    // })
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(3)
    },
    menuToggle() {
      const tl = gsap.timeline() // eslint-disable-line

      if (this.lottieOptions.toggle) {
        console.log('open')
        this.anim.setDirection(1)
        this.anim.play()
        this.lottieOptions.toggle = !this.lottieOptions.toggle

        tl.set('.menulist', { skewX: -20 }).to('.menulist', 0.4, {
          x: 0,
          skewX: 0
        })
        gsap.utils.toArray('.menulist__box__link').forEach((section, index) => {
          // tl.to()
          console.log(section.querySelector('.hide-bar'))
          tl.to(section.querySelector('.hide-bar'), 0.2, {
            x: 0
          })
            .set(section.querySelector('.menulist__box--link'), {
              opacity: 1
            })
            .to(section.querySelector('.hide-bar'), 0.2, {
              x: '100%',
              delay: 0.1
            })
            .set(section.querySelector('.hide-bar'), { x: '-100%' })
        })
      } else {
        console.log('close')
        this.anim.setDirection(-1)
        this.anim.play()
        tl.to('.menulist', 0.4, {
          opacity: 0,
          delay: 0.3
        })
          .set('.menulist', {
            x: '-100%',
            opacity: 1
          })
          .set('.menulist__box--link', {
            opacity: 0,
            onComplete: () => {
              this.lottieOptions.toggle = !this.lottieOptions.toggle
            }
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
  background: $color-black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-100%);
  &__box {
    width: 100%;
    position: absolute;
    padding: 220px 0;
    @include secondary-margin;
    box-sizing: border-box;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include mq(sm) {
      @include gap-bottom(8px);
    }
    li {
      display: inline-block;
      height: fit-content;
      width: fit-content;
      overflow: hidden;
      position: relative;
      .hide-bar {
        @include hide-bar;
        z-index: 10;
      }
    }
    &--link {
      opacity: 0;
      text-align: center;
      @include font-title-first;
      display: block;
      line-height: 80px;
      transition: all 300ms ease;
      // pointer-events: none;
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
