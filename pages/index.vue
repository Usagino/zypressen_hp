<template lang="pug">
  .container
    .top-page
      .link-window
        .link-window__wrap
          p.link-window--text(style="opacity:1") HELLO!!
      .link-window(v-for="data in linkData" :class="'item-'+data.name.toLowerCase()")
        .link-window__wrap
          nuxt-link.link-window--text(:to="data.link") {{ data.name }}
          .link-window--bar
          .link-window--bar-hide
    .navigation
      .navigation__wrap
        p.navigation--current.navigation--num(v-for="i of 4") {{'0'+i}}
      .navigation--bar
      p.navigation--maxnum.navigation--num 04
    .scroll-wire
      .scroll-wire__text
        p.scroll-wire--item SCROLL
        .scroll-wire--bar
      .scroll-wire__arrow
        img.scroll-wire--item(src="/arrow.svg" @click="scrollToNext()")
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
    console.log(document.body.clientHeight)
    this.changeLinkText()
    this.keyDown(this.scrollToNext)
  },
  methods: {
    scrollToNext() {
      gsap.registerPlugin(ScrollToPlugin)
      gsap.registerPlugin(ScrollTrigger)
      let displayEl = 0
      const linkWindowArray = document.querySelectorAll('.link-window')
      // console.log(linkWindowArray)
      linkWindowArray.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          onEnter: () => {
            displayEl = linkWindowArray[index + 1]
          }
        })
      })
      const wh = window.innerHeight * -1
      console.log(wh)
      gsap.to(window, { duration: 1, scrollTo: { y: displayEl, offsetY: wh } })
    },

    changeLinkText() {
      gsap.registerPlugin(ScrollTrigger)
      gsap.utils.toArray('.link-window').forEach((section, index) => {
        if (section.className.includes('item')) {
          const tl = gsap.timeline({// eslint-disable-line
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              scrub: 0.5,
              // markers: true,
              pin: section
            }
          })
          tl.to(section.querySelector(`.link-window--bar`), {
            x: 0
          })
            .set(section.querySelector(`.link-window--text`), { opacity: 1 })
            .to(section.querySelector(`.link-window--bar`), {
              x: '100%'
            })
            .to(section, { delay: 1 })

          gsap.to(`.navigation--current:nth-child(${index + 1})`, {
            scrollTrigger: {
              trigger: section,
              scrub: 0.5,
              start: 'bottom bottom'
              // markers: true
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
  height: 100vh;
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
    transform: translateX(-100%);
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
  &__wrap {
    overflow: hidden;
    position: relative;
    height: 1em;
    width: 100%;
  }
  &--num {
    @include font-family;
    font-size: 16px;
    text-align: center;
  }
  &--current {
    transform: translateY(100%);
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
  &__arrow {
    position: absolute;
    right: $pri-value;
    bottom: 0;
    cursor: pointer;
  }
  &--item {
    @include font-nav-secondary;
    color: $color-gray;
  }
}
</style>
