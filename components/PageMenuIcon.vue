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
      li(@click="menuToggle")
        nuxt-link(to="/") TOP
        img.stokerImage(:src="this.changeWebpLocal('/menu/top.jpg')")
      li(@click="menuToggle")
        nuxt-link(to="/works") WORKS
        img.stokerImage(:src="this.changeWebpLocal('/menu/works.jpg')")
      li(@click="menuToggle")
        nuxt-link(to="/about") ABOUT
        img.stokerImage(:src="this.changeWebpLocal('/menu/about.jpg')")
      li(@click="menuToggle")
        nuxt-link(to="/contact") CONTACT
        img.stokerImage(:src="this.changeWebpLocal('/menu/contact.jpg')")
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
import { TweenMax } from 'gsap'
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
    if (this.$ua.deviceType() === 'pc') {
      window.onload = function() {
        document.body.addEventListener('mousemove', (e) => {
          const mX = e.clientX
          const mY = e.clientY
          TweenMax.set('.stokerImage', {
            top: mY - 200,
            left: mX - 700
          })
        })
        // マウス移動時のイベントをBODYタグに登録する
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
        TweenMax.set('html,body', { overflow: 'hidden' })
        this.anim.setDirection(1)
        this.anim.play()
        TweenMax.set('.menulist', {
          display: 'flex'
        })
        TweenMax.to('.menulist', 0.3, { opacity: 1 })
        this.lottieOptions.toggle = !this.lottieOptions.toggle
      } else {
        TweenMax.set('html,body', { overflow: 'scroll' })
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
  display: none;
  opacity: 0;
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
      text-align: center;
      a {
        position: relative;
        z-index: 2000;
        @include font-title-first;
        line-height: 80px;
        @include mq(sm) {
          line-height: 100%;
        }
      }
      a:hover {
        @include textOutline;
        @include mq(sm) {
          color: $color-white;
          -webkit-text-stroke: unset;
        }
      }
      a:hover + .stokerImage {
        opacity: 1;
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
</style>
