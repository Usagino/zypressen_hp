<template lang="pug">
.top-page
  .top-page__title
    h1.top-page__title__text
      span(v-for="text in titleText.split(' ')").top-page__title__wrap
        span.top-page__title__wrap__text {{text}}
</template>

<script>
import { gsap ,TweenMax} from 'gsap' // eslint-disable-line
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      titleText: 'DIFFERENT FROM OTHERS!!'
    }
  },

  methods: {
    hoge() {
      console.log('hi hi')
    },
    enterAnime() {
      gsap.set('.top-page', {
        backdropFilter: 'blur(0px)'
      })
      gsap.to('.top-page__title__wrap:nth-child(1) > span', 0.8, {
        y: '0%',
        delay: 0.6
      })
      gsap.to('.top-page__title__wrap:nth-child(2) > span', 0.8, {
        y: '0%',
        delay: 0.8
      })
      gsap.to('.top-page__title__wrap:nth-child(3) > span', 0.8, {
        y: '0%',
        delay: 1
      })
    },
    offAnime() {
      gsap.set('.top-page__title__wrap > span', {
        y: '150%'
      })
      gsap.set('.top-page', {
        backdropFilter: 'blur(20px)'
      })
    }
  }
}
</script>

<style lang="scss">
.top-page {
  @include full-screen;
  position: relative;
  &__title {
    @include absolute-middle;
    @include just-fitsize;
    &__text {
      @include font-title-first;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
    }
    &__wrap {
      overflow: hidden;
      @include just-fitsize;
      line-height: 100%;
      &__text {
        display: inline-block;
        line-height: 160px;
        transform: translateY(150%);
      }
    }
  }
}
</style>
