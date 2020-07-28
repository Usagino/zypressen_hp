<template lang="pug">
.top-page
  .top-page__title
    h1.top-page__title__text
      span(v-for="text in titleText.split(' ')").top-page__title__wrap
        span.top-page__title__wrap__text {{text}}
  .top-page__copylight
    h2.top-page__copylight__text ©2020
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

  methods: {}
}
</script>

<style lang="scss">
.top-page {
  @include full-screen;
  position: relative;
  &__title {
    position: absolute;
    bottom: $pri-value;
    left: $pri-value;
    &__text {
      @include font-title-first;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    &__wrap {
      overflow: hidden;
      @include just-fitsize;
      line-height: 100%;
      &__text {
        display: inline-block;
        line-height: 100%;
        transform: translateX(-100%);
      }
    }
  }
  &__copylight {
    position: absolute;
    bottom: $pri-value;
    right: $pri-value;
    overflow: hidden;
    &__text {
      @include font-copylight;
      transform: translateX(-100%);
    }
  }
}
</style>
