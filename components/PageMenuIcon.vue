<template lang="pug">
.pagemenuicon
  .menuicon(@click="menuToggle")
    lottie(
      :options="lottieOptions"
      :height="18"
      :width="18"
      @animCreated="handleAnimation")
  transition
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
          a.social-button--icon(href="https://twitter.com/home")
            img(src="/DEFAULT/twitter.svg")
          a.social-button--icon(href="https://www.instagram.com/?hl=ja")
            img(src="/DEFAULT/instagram.svg")
      .social-button
          a.social-button--icon(href="https://twitter.com/home")
            img(src="/DEFAULT/twitter.svg")
          a.social-button--icon(href="https://www.instagram.com/?hl=ja")
            img(src="/DEFAULT/instagram.svg")
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap'
import * as menuIcon from '~/assets/animation/menu_icon.json'

export default {
  data() {
    return {
      imagePath: [
        '/menu/top.jpg',
        '/menu/works.jpg',
        '/menu/about.jpg',
        '/menu/contact.jpg'
      ],
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
    const tl = new TimelineMax() // eslint-disable-line
    tl.set('.menulist__box--link', {
      y: '150%',
      z: '0',
      rotateY: '-30deg',
      scale: '1'
    })
    const linkelement = document.querySelectorAll('.menulist__box--link')
    linkelement.forEach((el, i) => {
      el.addEventListener('mouseover', () => {
        TweenMax.to(el, 0.3, { rotateY: '-15deg' })
      })
      el.addEventListener('mouseout', () => {
        TweenMax.to(el, 0.3, { rotateY: '-30deg' })
      })
    })
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(3)
    },
    menuToggle() {
      const tl = new TimelineMax() // eslint-disable-line
      if (this.lottieOptions.toggle) {
        TweenMax.set('html,body', { overflow: 'hidden' })
        this.anim.setDirection(1)
        this.anim.play()
        tl.to('.menulist__box--contact .menulist__box--link', 0.1, {
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
        this.lottieOptions.toggle = !this.lottieOptions.toggle
      } else {
        TweenMax.set('html,body', { overflow: 'scroll' })
        this.anim.setDirection(-1)
        this.anim.play()
        tl.to('.menulist__box--top .menulist__box--link', 0.1, {
          y: '150%'
        })
          .to('.menulist__box--works .menulist__box--link', 0.1, {
            y: '150%'
          })
          .to('.menulist__box--about .menulist__box--link', 0.1, {
            y: '150%'
          })
          .to('.menulist__box--contact .menulist__box--link', 0.1, {
            y: '150%',
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
    @include gap-right(28px);
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
.stokerImage {
  @include mq(sm) {
    display: none;
  }
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 600px;
  height: 400px;
  object-fit: cover;
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
