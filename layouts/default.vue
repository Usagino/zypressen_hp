<template lang="pug">
  .page
    nuxt-link.page__logo(to="/")
      img.page__logo__image(src="/PageLogo.svg")
    PageMenu
    nuxt
</template>

<script>
import deviceMixin from '@/assets/js/device'
import EventBus from '@/utils/event-bus' // eslint-disable-line

export default {
  mixins: [deviceMixin],
  mounted() {
    // dimensionalModel(v-show="this.$route.matched[0].path !== '/works/:page'")
    addEventListener('keydown', (event) => {
      console.log(event.code)
    })
    const babseStyle = [
      'padding:4px 12px',
      'font-size: 8px',
      'border:1px solid #020202'
    ]
    const textStyle = [
      ...babseStyle,
      'background-color: #020202',
      'color: white',
      'border-right: none'
    ].join(';')
    const iconStyle = [
      ...babseStyle,
      'text-decoration: none;',
      'background-color: #5e5e5e',
      'border-right: none',
      'border-left: none',
      'padding:4px 2px'
    ].join(';')
    const linkStyle = [...babseStyle, 'border-left: none'].join(';')

    console.log(
      '%cMADE WITH BY ZYPRESSEN%c🌲%chttps://zypressen.org',
      textStyle,
      iconStyle,
      linkStyle
    )
  },

  methods: {}
}
</script>

<style lang="scss">
html {
  background: $color-black;
}
.page {
  min-height: var(--wh, 100vh);
  width: 100vw;
  //overflow: hidden;
  &__logo {
    mix-blend-mode: difference;
    position: fixed;
    top: $pri-value;
    left: $pri-value;
    height: 16px;
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
      height: 16px;
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
