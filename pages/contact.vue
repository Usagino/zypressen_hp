<template lang="pug">
  .container.contact-page
    ScrollBar
    MouseStoker
    .message
      h2.message--text
        span.message--text__wrap(v-for="text in this.messageText.split(' ')")
          span.message--text__item {{text}}
          .message--text__cover
      h2.message--text.message--mail
        span.message--text__wrap
          span.message--text__item info@zypressen.org
          .message--text__cover
</template>

<script>
import { TweenMax, TimelineMax } from 'gsap' // eslint-disable-line

export default {
  data() {
    const tl = new TimelineMax()
    return {
      tl,
      messageText:
        'Please feel free to contact us anytime. Your Friendly Neighbor ZYPRESSEN.'
    }
  },
  mounted() {
    const textarrayLength = this.messageText.split(' ').length
    const minitues = [...Array(textarrayLength).keys()].map(i => ++i)// eslint-disable-line
    // this.displayTextAnimate(minitues.slice(-1)[0])
    // this.displayText()
    this.tl
      .staggerTo(
        '.message--text__cover',
        0.5,
        {
          x: '0%'
        },
        0.1
      )
      .set('.message--text__item', { opacity: 1 })
      .staggerTo(
        '.message--text__cover',
        0.3,
        {
          x: '110%'
        },
        0.1
      )
  },
  methods: {
    shuffle([...array]) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    displayText() {
      const textarrayLength = this.messageText.split(' ').length
      const minitues = [...Array(textarrayLength).keys()].map(i => ++i)// eslint-disable-line
      minitues.pop()
      this.shuffle(minitues).forEach((item, i) => {
        this.displayTextAnimate(item)
      })
    },
    displayTextAnimate(item) {
      const el = `.message--text__wrap:nth-child(${item}) `
      this.tl
        .to(el + '.message--text__cover', 0.4, {
          x: '0%'
        })
        .set(el + '.message--text__item', { opacity: 1 })
        .to(el + '.message--text__cover', 0.2, {
          x: '110%'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include full-screen;
  position: relative;
}
.contact-page {
  @include full-screen;
  @include flex-middle;
  @include default-width;
  box-sizing: border-box;
}
.message {
  height: fit-content;
  width: 100%;
  &--text {
    @include font-title-secondary;
    @include gap-right(0.5em);
    // line-height: 1.2em;
    span {
      display: inline-block;
      @include mq(sm) {
        @include font-title-thirdry;
      }
    }
    &__wrap {
      overflow: hidden;
      width: fit-content;
      height: fit-content;
      position: relative;
    }
    &__item {
      vertical-align: middle;
      opacity: 0;
      padding: 6px 0px;
      @include mq(sm) {
        padding: 0px;
      }
    }
    &__cover {
      height: 100%;
      width: 100%;
      background: $color-white;
      position: absolute;
      top: 0;
      left: 0;
      transform: translateX(-110%);
    }
  }
  &--mail {
    span {
      @include text-outline;
      @include mq(sm) {
        @include font-title-thirdry;
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
