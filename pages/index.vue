<template lang="pug">
.container.pageAyumukun
  .switch_linked
    .switch_linked__wrap
      .switch_linked__wrap__text
        p.s-lw-top(@click="modelFunction('hoge')") HELLO
        nuxt-link.s-lw-works(to="/works") WORKS
        nuxt-link.s-lw-about(to="/about") ABOUT
        nuxt-link.s-lw-contact(to="/contact") CONTACT
  .switch_linked__scroll
    p SCROLL
</template>

<script>
import { TimelineMax } from 'gsap'
import dimensionalModel from '@/components/dimensionalModel'
import EventBus from "~/utils/event-bus"; // eslint-disable-line

export default {
  components: {
    dimensionalModel
  },
  data() {
    const tl = new TimelineMax()
    return {
      tl,
      animaChangeCount: 1,
      PreviousClass: 'top'
    }
  },

  mounted() {
    this.tl
      .set('.s-lw-top', {
        display: 'block'
      })
      .to('.s-lw-top', 0.3, {
        y: '0%',
        ease: 'ease-in',
        delay: 2,
        rotate: '0deg'
      })
    this.wheelAction()
    this.swipeAciton()
  },
  methods: {
    modelFunction(direction) {
      EventBus.$emit('MOVE_MODEL', direction)
    },
    wheelAction() {
      // Function of the wheel. Scrolling at a constant power will do the job.
      let wheelToggle = true
      window.onmousewheel = (event) => {
        const wheelPower = 50
        if (event.wheelDelta > wheelPower && wheelToggle) {
          this.animaChangeCount -= 1
          if (this.animaChangeCount <= 0) {
            this.animaChangeCount = 4
          }
          // this.changeAnimation(this.animaChangeCount)
          this.changeTitleText(this.animaChangeCount)
          wheelToggle = false
          setTimeout(() => {
            wheelToggle = true
          }, 1000)
        } else if (event.wheelDelta < wheelPower * -1 && wheelToggle) {
          this.animaChangeCount += 1
          if (this.animaChangeCount >= 5) {
            this.animaChangeCount = 1
          }
          // this.changeAnimation(this.animaChangeCount)
          this.changeTitleText(this.animaChangeCount)
          wheelToggle = false
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
            this.animaChangeCount -= 1
            if (this.animaChangeCount <= 0) {
              this.animaChangeCount = 4
            }
            this.changeTitleText(this.animaChangeCount)
          } else {
            console.log('☝️', absValue)
            this.animaChangeCount += 1
            if (this.animaChangeCount >= 5) {
              this.animaChangeCount = 1
            }
            this.changeTitleText(this.animaChangeCount)
          }
        }
      })
    },
    changeTitleText(number) {
      if (this.$route.path === '/') {
        switch (number) {
          case 1:
            console.log(number)
            this.switchText('top')
            EventBus.$emit('MOVE_MODEL', 'TOP')
            this.PreviousClass = 'top'
            break
          case 2:
            console.log(number)
            this.switchText('works')
            EventBus.$emit('MOVE_MODEL', 'WORKS')
            this.PreviousClass = 'works'
            break
          case 3:
            console.log(number)
            this.switchText('about')
            EventBus.$emit('MOVE_MODEL', 'ABOUT')
            this.PreviousClass = 'about'
            break
          case 4:
            console.log(number)
            this.switchText('contact')
            EventBus.$emit('MOVE_MODEL', 'CONTACT')
            this.PreviousClass = 'contact'
            break
        }
      }
    },
    switchText(CurrentClass) {
      this.tl
        .to(`.s-lw-${this.PreviousClass}`, 0.3, {
          y: '120%',
          rotate: '45deg'
        })
        .set(`.s-lw-${this.PreviousClass}`, { display: 'none' })
        .set(`.s-lw-${CurrentClass}`, { display: 'block' })
        .to(`.s-lw-${CurrentClass}`, 0.3, {
          y: '0%',
          rotate: '0deg',
          delay: 0.3
        })
    }
  }
}
</script>

<style lang="scss">
.pageAyumukun {
  position: fixed;
  top: 0;
  left: 0;
  @include full-screen;
  .switch_linked {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    width: fit-content;
    height: fit-content;
    display: block;
    margin: auto;
    @include mq(sm) {
      bottom: 32px;
    }
    &__wrap {
      &__text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        width: fit-content;
        overflow: hidden;
        text-align: center;
        @include font-title-first;
        p,
        a {
          display: none;
          cursor: pointer;
          transform: translateY(120%) rotate(5deg);
          transform-origin: left;
          @include font-title-first;
        }
      }
    }
    &__scroll {
      position: absolute;
      bottom: $pri-value;
      left: 0px;
      right: 0px;
      text-align: center;
      @include mq(sm) {
        bottom: 32px;
      }
      @include font-nav-primary;
      p {
        color: $color-gray;
      }
    }
  }
}
</style>
