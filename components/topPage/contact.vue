<template lang="pug">
.contact-page
  .contact-page__textwrap
    .contact-page__textwrap__container
      .contact-page__textwrap__container__text(v-for="text in texts.split(' ')")
        p {{text}}
    .contact-page__textwrap__social
      .contact-page__textwrap__social__wrap
        a(href="https://twitter.com/home" target="_blank") twitter
      .contact-page__textwrap__social__wrap
        a(href="https://twitter.com/home" target="_blank") instagram
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      texts:
        'PLEASE FEEL FREE TO CONTACT US ANYTIME. YOUR FRIENDLY NEIGHBOR ZYPRESSEN!!'
    }
  },
  methods: {
    enterAnime() {
      gsap.utils
        .toArray('.contact-page__textwrap__container__text')
        .forEach((item, i) => {
          gsap.to(item.querySelector('p'), 0.3, {
            x: '0%',
            delay: i * 0.1
          })
        })
      gsap.utils
        .toArray('.contact-page__textwrap__social__wrap')
        .forEach((item, i) => {
          gsap.to(item.querySelector('a'), 0.3, {
            x: '0%',
            delay: i * 0.1 + 1
          })
        })
    },
    offAnime() {
      gsap.set('.contact-page__textwrap__container__text p', {
        x: ''
      })
      gsap.set('.contact-page__textwrap__social__wrap a', {
        x: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-page {
  @include full-screen;
  display: flex;
  align-items: center;
  @include mq(sm) {
    padding: 0 30px;
    box-sizing: border-box;
  }
  &__textwrap {
    width: 560px;
    height: fit-content;
    margin-left: auto;
    margin-right: $pri-value;
    @include mq(sm) {
      margin-right: auto;
    }
    &__container {
      display: inline-flex;
      flex-wrap: wrap;
      gap: 12px;
      @include mq(sm) {
        gap: 6px;
        text-align: center;
      }
      &__text {
        overflow: hidden;
        p {
          transform: translateX(-100%);
        }
      }
    }
    p,
    a {
      @include font-text-en;
      @include mq(sm) {
        font-size: 16px;
        line-height: 18px;
        letter-spacing: 1.2px;
      }
    }
    a {
      text-decoration: underline;
    }
    &__social {
      @include gap-right(20px);
      @include mq(sm) {
        padding-top: 12px;
        @include flex-middle;
      }
      &__wrap {
        display: inline-block;
        overflow: hidden;
        a {
          display: block;
          transform: translateX(-100%);
        }
      }
    }
  }
}
</style>
