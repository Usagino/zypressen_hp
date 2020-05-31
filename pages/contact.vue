<template lang="pug">
  .container
    .first-mail
      .first-mail__wrap
        h1 info@zypressen.org
    .second-text
      .second-text__wrap
        p.second-text--text
          span.second-text--text__box
            p We are a creative
          span.second-text--text__box
            p team with a small
          span.second-text--text__box
            p group of people.
          span.second-text--text__box
            p Please feel free to
          span.second-text--text__box
            p contact us anytime.
          span.second-text--text__box
            p Your Friendly
          span.second-text--text__box
            p Neighbor
          span.second-text--text__box
            p ZYPRESSEN.
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap' // eslint-disable-line

export default {
  data() {
    const tl = new TimelineMax()
    return {
      wheelShow: true,
      animaChangeCount: 0,
      wheelToggleCount: 0,
      tl,
      swipeStart: 0,
      swipeEnd: 0
    }
  },
  mounted() {
    this.wheelAction()
    this.swipeAciton()
    // this.newWheelAction()
  },
  methods: {
    wheelAction() {
      // Function of the wheel. Scrolling at a constant power will do the job.
      let wheelToggle = true
      window.onmousewheel = (event) => {
        const wheelPower = 10
        if (event.wheelDelta > wheelPower && wheelToggle) {
          console.log(this.animaChangeCount)
          wheelToggle = false
          // animation
          this.textAnimationDown()
          setTimeout(() => {
            wheelToggle = true
          }, 1000)
        } else if (event.wheelDelta < wheelPower * -1 && wheelToggle) {
          console.log(this.animaChangeCount)
          wheelToggle = false
          // animation
          this.textAnimationTop()
          setTimeout(() => {
            wheelToggle = true
          }, 1000)
        }
      }
    },
    swipeAciton() {
      window.addEventListener('touchstart', (event) => {
        this.swipeStart = event.changedTouches[0].pageY
      })
      window.addEventListener('touchend', (event) => {
        this.swipeEnd = event.changedTouches[0].pageY
        const absValue = Math.abs(this.swipeStart - this.swipeEnd)
        if (absValue > 100) {
          if (this.swipeStart > this.swipeEnd) {
            console.log('👇', absValue)
            this.textAnimationDown()
          } else {
            console.log('☝️', absValue)
            this.textAnimationTop()
          }
        }
      })
    },
    textAnimationDown() {
      if (this.wheelShow) {
        this.tl
          .to('.first-mail__wrap h1', 0.3, { y: 100 })
          .set('.second-text--text__box p', {
            y: -100
          })
          .to('.second-text--text__box p', 0.4, { y: 0, delay: 0.3 })
        this.wheelShow = !this.wheelShow
      } else {
        this.tl
          .to('.second-text--text__box p', 0.4, { y: 100 })
          .set('.first-mail__wrap h1', {
            y: -100
          })
          .to('.first-mail__wrap h1', 0.5, { y: 0, delay: 0.3 })
        this.wheelShow = !this.wheelShow
      }
    },
    textAnimationTop() {
      if (this.wheelShow) {
        this.wheelShow = !this.wheelShow
        this.tl
          .to('.first-mail__wrap h1', 0.3, { y: -100 })
          .set('.second-text--text__box p', {
            y: 100
          })
          .to('.second-text--text__box p', 0.4, { y: 0, delay: 0.3 })
      } else {
        this.wheelShow = !this.wheelShow
        this.tl
          .to('.second-text--text__box p', 0.4, { y: -100 })
          .set('.first-mail__wrap h1', {
            y: 100
          })
          .to('.first-mail__wrap h1', 0.5, { y: 0 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include full-screen;
  position: relative;
}
.first-mail {
  position: absolute;
  top: 0;
  left: 0;
  @include full-screen;
  @include flex-middle;
  &__wrap {
    overflow: hidden;
    h1 {
      @include font-title-secondary;
      @include text-outline;
      @include mq(sm) {
        @include font-title-thirdry;
        -webkit-text-stroke: 0px $color-white;
        color: $color-white;
      }
    }
  }
}
.second-text {
  position: absolute;
  top: 0;
  left: 0;
  @include full-screen;
  @include flex-middle;
  &__wrap {
    @include default-width;
  }
  &--text {
    &__box {
      overflow: hidden;
      height: fit-content;
      display: block;
      p {
        @include font-title-secondary;
        line-height: 120%;
        transform: translateY(-100%);
      }
    }
  }
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
