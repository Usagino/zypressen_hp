<template lang="pug">
  .container
    ScrollBar
    MouseStoker
    .top-page
      .link-window.fisrt
        .link-window__wrap
          p.link-window--text(style="opacity:1") HELLO!!
      .link-window(v-for="data in linkData")
        .link-window__wrap
          nuxt-link.link-window--text(:to="data.link") {{ data.name }}
          .link-window--bar
    .navigation
      .navigation__wrap
        p.navigation--current.navigation--num(v-for="i of 4") {{'0'+i}}
      .navigation--bar
      p.navigation--maxnum.navigation--num 04
    .scroll-wire
      .scroll-wire__text
        p.scroll-wire--item SCROLL
        .scroll-wire--bar
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line
import { ScrollToPlugin } from "gsap/ScrollToPlugin";  // eslint-disable-line

export default {
  data() {
    return {
      screenHeight: 0,
      linkData: [
        {
          name: 'WORKS',
          link: '/works'
        },
        {
          name: 'ABOUT',
          link: '/about'
        },
        {
          name: 'CONTACT',
          link: '/contact'
        }
      ]
    }
  },
  mounted() {
    this.changeLinkText()
    // this.keyDown(this.scrollToNext)
    // this.keyUp(this.scrollToPrev)
    // this.autoScroll()
  },

  methods: {
    scrollToPrev() {
      gsap.registerPlugin(ScrollToPlugin)
      gsap.registerPlugin(ScrollTrigger)
      let displayEl = 0 // eslint-disable-line
      const linkWindowArray = document.querySelectorAll('.link-window')
      linkWindowArray.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          onEnter: () => {
            displayEl = linkWindowArray[index - 1]
          }
        })
      })
      gsap.to(window, { duration: 0.7, scrollTo: { y: displayEl } })
    },
    scrollToNext() {
      gsap.registerPlugin(ScrollToPlugin)
      gsap.registerPlugin(ScrollTrigger)
      let displayEl = 0
      let nowPosY = 0
      const linkWindowArray = document.querySelectorAll('.link-window')
      linkWindowArray.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          onEnter: (el) => {
            displayEl = linkWindowArray[index + 1]
            nowPosY = el.end
          }
        })
      })
      const wh = window.innerHeight * -1 // eslint-disable-line

      if (document.body.clientHeight !== nowPosY) {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: displayEl }
        })
      } else {
        gsap.to(window, { duration: 1, scrollTo: { y: 0 } })
      }
    },
    autoScroll() {
      gsap.registerPlugin(ScrollToPlugin)
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray('.link-window').forEach((section, index) => {
        console.log(section)
        gsap.timeline({// eslint-disable-line
          scrollTrigger: {
            trigger: section,
            onEnter: () => {
              gsap.to(window, { duration: 0.6, scrollTo: section, delay: 0.6 })
            }
          }
        })
      })
    },
    changeLinkText() {
      gsap.registerPlugin(ScrollToPlugin)
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray('.link-window').forEach((section, index) => {
        if (!section.className.includes('fisrt')) {
          const tl = gsap.timeline({// eslint-disable-line
            scrollTrigger: {
              trigger: section.querySelector('.link-window--text'),
              toggleActions: 'play none play reset'
            }
          })
          tl.to(section.querySelector(`.link-window--bar`), 0.3, {
            x: 0,
            delay: 0.7
          })
            .set(section.querySelector(`.link-window--text`), { opacity: 1 })
            .to(section.querySelector(`.link-window--bar`), 0.3, {
              x: '101%'
            })
            .to(section, { delay: 1 })

          gsap.to(`.navigation--current:nth-child(${index + 1})`, 0.3, {
            scrollTrigger: {
              trigger: section.querySelector(`.link-window--text`),
              toggleActions: 'play reverse resume reverse'
            },
            y: 0
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.link-window {
  height: var(--wh, 100vh);
  width: 100vw;
  // top: 0px !important;
  @include flex-middle;
  &__wrap {
    height: fit-content;
    width: fit-content;
    position: relative;
    overflow: hidden;
    // transform: translateY(-50vh);
  }
  &--text {
    @include font-title-first;
    opacity: 0;
  }
  &--bar,
  &--bar-hide {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: $color-gray;
    transform: translateX(-101%);
  }
}
.navigation {
  mix-blend-mode: difference;
  position: fixed;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 2;
  right: $pri-value;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  @include gap-bottom(20px);
  @include mq(sm) {
    display: none;
  }
  &__wrap {
    overflow: hidden;
    position: relative;
    height: 1em;
    width: 100%;
  }
  &--num {
    font-family: $en;
    font-size: 16px;
    text-align: center;
  }
  &--current {
    transform: translateY(101%);
    position: absolute;
    top: 0px;
    background: $color-black;
    &:first-child {
      transform: translateY(0);
    }
  }
  &--bar {
    content: '';
    height: 1px;
    width: 28px;
    display: block;
    background: $color-white;
  }
}
.scroll-wire {
  bottom: $pri-value;
  width: 100vw;
  position: fixed;
  @include flex-middle;
  @include mq(sm) {
    bottom: 32px;
  }
  &__arrow {
    position: absolute;
    right: $pri-value;
    bottom: 0;
    cursor: pointer;
  }
  &--item {
    @include font-nav-secondary;
    color: $color-gray;
    @include mq(sm) {
      font-size: 10px;
      letter-spacing: normal;
    }
  }
}
</style>
