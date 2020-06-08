<template lang="pug">
  div.page
    nuxt-link.page__logo(to="/")
      img.page__logo__image(src="/PageLogo.svg")
    .page__copylight
      p.page__copylight__text ©️2020ZYPRESSEN
    client-only
      PageMenuIcon
    PageScroll
    dimensionalModel(v-show="this.$route.matched[0].path !== '/works/:page'")
    //mouseStoker
    nuxt
</template>

<script>
import dimensionalModel from '@/components/dimensionalModel'
import EventBus from '~/utils/event-bus' // eslint-disable-line

export default {
  components: {
    dimensionalModel
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
html {
  background: $color-black;
}
.page {
  min-height: 100vh;
  width: 100vw;
  //overflow: hidden;
  &__logo {
    position: fixed;
    top: $pri-value;
    left: $pri-value;
    height: 18px;
    font-size: medium;
    z-index: 1000;
    @include mq(sm) {
      left: 0px;
      right: 0px;
      margin: auto;
      width: fit-content;
      top: 32px;
    }
    img {
      height: 18px;
      width: auto;
    }
  }
  &__copylight {
    position: fixed;
    bottom: $pri-value;
    right: $pri-value;
    z-index: 1000;
    display: flex;
    @include gap-right(16px);
    @include mq(sm) {
      display: none;
    }
    &__text {
      @include font-nav-secondary;
      line-height: 18px;
    }
    &__image {
      font-size: medium;
      height: 16px;
      width: 16px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
.testbuton {
  cursor: pointer;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}
</style>
