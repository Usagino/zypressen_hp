<template lang="pug">
  .page-header
    nuxt-link.page-header__toplink(to="/")
      img.page-header__logo(src="/inline_logo.svg")
    ul.page-header__menu
      li.page-header__menu__item.page-header__works(v-on:click="toScroll(1)" ref="works")
        p WORKS
      li.page-header__menu__item.page-header__about(v-on:click="toScroll(2)" ref="about")
        p ABOUT
      li.page-header__menu__item.page-header__contact(v-on:click="toScroll(3)" ref="contact")
        p CONTACT
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line
export default {
  props: {
    refs: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  methods: {
    toScroll(i) {
      const sw = this.refs.pageSwiper.$swiper
      sw.slideTo(i)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  padding: 0px $pri-value;
  width: 100vw;
  box-sizing: border-box;
  position: fixed;
  top: $pri-value;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include mq(sm) {
    top: 20px;
    justify-content: center;
  }
  &__logo {
    padding: 0px $pri-value;
  }
  &__menu {
    display: flex;
    @include gap-right(28px);
    @include font-text-en;
    font-size: 18px;
    &__item {
      cursor: pointer;
    }
    @include mq(sm) {
      display: none;
    }
  }
}
</style>
