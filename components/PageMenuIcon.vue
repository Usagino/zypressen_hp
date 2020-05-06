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
        img.stokerImage(:src="imagePath[0]")
      li(@click="menuToggle")
        nuxt-link(to="/works") WORKS
        img.stokerImage(:src="imagePath[1]")
      li(@click="menuToggle")
        nuxt-link(to="/about") ABOUT US
        img.stokerImage(:src="imagePath[2]")
      li(@click="menuToggle")
        nuxt-link(to="/contact") CONTACT
        img.stokerImage(:src="imagePath[3]")
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
      }
    }
  },
  mounted() {
    window.onload = function() {
      // マウス移動時のイベントをBODYタグに登録する
      document.body.addEventListener('mousemove', (e) => {
        const mX = e.pageX
        const mY = e.pageY
        console.log(mX, mY)
        TweenMax.set('.stokerImage', {
          top: mY - 200,
          left: mX - 500
        })
      })
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
    @include secondary-margin;
    box-sizing: border-box;
    z-index: 2000;
    li {
      text-align: right;
      a {
        position: relative;
        z-index: 2000;
      }
      a:hover {
        color: transparent;
        -webkit-text-stroke: 0.1px $color-white;
        // text-shadow: $color-white 1px 1px 0px, $color-white -1px 1px 0px,
        //   $color-white 1px -1px 0px, $color-white -1px -1px 0px;
      }
      a:hover + .stokerImage {
        opacity: 1;
      }
    }
  }
}
.stokerImage {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 500px;
  height: auto;
  opacity: 0;
}
</style>
