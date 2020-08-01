<template lang="pug">
  .mouse-stoker(:class="{ 'hover-link':linkClassToggle}")
    span
</template>

<script>
import { TweenMax,TweenLite ,gsap} from 'gsap'// eslint-disable-line
export default {
  data() {
    return {
      linkClassToggle: false,
      menuClassToggle: false
    }
  },
  mounted() {
    if (this.$ua.deviceType() !== 'smartphone') {
      window.onmousemove = (e) => {
        this.moveCircle(e)
      }
      this.linkHover()
    }
  },
  methods: {
    linkHover() {
      gsap.utils.toArray('a').forEach((section) => {
        section.addEventListener(
          'mouseover',
          () => {
            this.linkClassToggle = true
          },
          false
        )

        section.addEventListener(
          'mouseleave',
          () => {
            this.linkClassToggle = false
          },
          false
        )
      })
      window.onmousewheel = () => {
        this.linkClassToggle = false
      }
    },
    moveCircle(e) {
      TweenLite.set('.mouse-stoker', {
        css: {
          opacity: 1,
          x: e.clientX,
          y: e.clientY
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mouse-stoker {
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1000;
  height: 40px;
  width: 40px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  border: 2px solid $color-white;
  pointer-events: none;
  transition: height 0.3s, width 0.3s, background 0.3s;
}
.hover-link {
  mix-blend-mode: normal;
  width: 200px;
  // background: $color-gray;
  border-radius: 0px;
  overflow: hidden;
  &__text {
    font-family: $en;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}
.hover-menu {
  background: transparent;
  border: 2px solid $color-orange;
  // border-radius: 0px;
  border-radius: 200px;
  height: 44px;
  width: 44px;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
