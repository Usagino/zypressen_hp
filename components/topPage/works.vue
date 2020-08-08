<template lang="pug">
  .works-page
    .works-page__blur
    .works-page__contents
      .item
        .item__thumbnail
          img.item__thumbnail__image(
            v-for="item in works"
            :src="`${item.THUMBNAIL.url}?auto=compress&w=400&h=600&fit=crop`")
        .item__title
          h2.item__title__text {{itemTitle}}
      .infomation
        .infomation__numbers
          p.infomation__numbers__current {{zeroPadding(countNum + 1)}}
          p /
          p.infomation__numbers__maxed {{zeroPadding(worksArrayLength)}}
        .infomation__indicator
          .infomation__indicator__bar
        .infomation__buttons
          button.infomation__buttons__back(@click="backSlide(),resetProgressTimeline()" :class="{enable:colorEnableBack}") BACK
          p /
          button.infomation__buttons__next(@click="nextSlide(),resetProgressTimeline()" :class="{enable:colorEnableNext}") NEXT
</template>

<script>
import { gsap } from 'gsap'

export default {
  props: {
    works: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      itemImage: '',
      itemTitle: '',
      pageNum: 0,
      countNum: 0,
      colorEnableNext: false,
      colorEnableBack: false,
      worksArrayLength: 0,
      progressBarTimeline: gsap.timeline({
        onComplete() {
          this.restart()
        }
      })
    }
  },
  mounted() {
    this.itemTitle = this.works[this.pageNum].TITLE
    this.worksArrayLength = this.works.length
    this.progressBarAnime()

    gsap.set('.item__thumbnail__image:nth-child(1)', {
      x: '0%'
    })
  },
  methods: {
    resetProgressTimeline() {
      gsap.to('.infomation__indicator__bar', 0.5, {
        scaleX: 0,
        onComplete: () => {
          this.progressBarTimeline.seek(0)
        }
      })
    },
    progressBarAnime() {
      this.progressBarTimeline.pause()
      const bar = '.infomation__indicator__bar'
      this.progressBarTimeline
        .to(bar, 10, {
          scaleX: 1,
          ease: 'linear',
          delay: 1,
          onComplete: () => {
            this.nextSlide()
          }
        })
        .set(bar, {
          transformOrigin: 'right'
        })
        .to(bar, 1, {
          scaleX: 0,
          ease: 'linear'
        })
        .set(bar, {
          transformOrigin: ''
        })
    },
    nextSlide() {
      if (!(this.pageNum >= this.worksArrayLength - 1)) {
        const oldPageNum = this.pageNum
        this.pageNum += 1
        this.colorEnableNext = this.colorEnableBack = false
        this.changeSlideAnime(oldPageNum + 1, this.pageNum + 1)
      } else {
        const oldPageNum = this.pageNum
        this.pageNum = 0
        this.colorEnableNext = this.colorEnableBack = false
        this.changeSlideAnime(oldPageNum + 1, this.pageNum + 1)
      }
    },
    backSlide() {
      if (!(this.pageNum === 0)) {
        const oldPageNum = this.pageNum
        this.pageNum -= 1
        this.colorEnableNext = this.colorEnableBack = false
        this.changeSlideAnime(oldPageNum + 1, this.pageNum + 1)
      } else {
        const oldPageNum = 0
        this.pageNum = this.worksArrayLength
        this.colorEnableNext = this.colorEnableBack = false
        this.changeSlideAnime(oldPageNum + 1, this.pageNum)
        this.pageNum = this.worksArrayLength - 1
      }
    },
    changeSlideAnime(oldVal, newVal) {
      // title change
      gsap
        .timeline()
        .to('.item__title__text', 0.3, {
          opacity: 0,
          onComplete: () => {
            this.itemTitle = this.works[newVal - 1].TITLE
          }
        })
        .to('.item__title__text', 0.3, {
          opacity: 1
        })
      // slide change
      gsap
        .timeline()
        .set('.infomation__buttons button', {
          pointerEvents: 'none'
        })
        .to(`.item__thumbnail__image:nth-child(${oldVal})`, 0.6, {
          x: oldVal < newVal ? '-150%' : '150%'
        })
        .set(`.item__thumbnail__image:nth-child(${newVal})`, {
          x: oldVal < newVal ? '150%' : '-150%'
        })
        .to(`.item__thumbnail__image:nth-child(${newVal})`, 0.6, {
          x: '0%',
          delay: 0.5
        })
        .set('.infomation__buttons button', {
          pointerEvents: ''
        })
      // change page number
      gsap
        .timeline()
        .to('.infomation__numbers__current', 0.3, {
          y: oldVal < newVal ? '-150%' : '150%',
          opacity: 0
        })
        .set('.infomation__numbers__current', {
          y: oldVal < newVal ? '150%' : '-150%',
          onComplete: () => {
            this.countNum = this.pageNum
          }
        })
        .to('.infomation__numbers__current', 0.3, {
          y: '0%',
          opacity: 1
        })

      console.log(oldVal < newVal ? 'next' : 'back')
    },
    enterAnime() {
      const tl = gsap.timeline() // eslint-disable-line
      gsap.to('.works-page__blur', 1, {
        backdropFilter: 'blur(20px)',
        onComplete: () => {
          this.progressBarTimeline.play()
        }
      })
    },
    offAnime() {
      this.progressBarTimeline.pause()
      gsap.set('.works-page__blur', {
        backdropFilter: 'blur(0px)'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.startButton {
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
}
.works-page {
  @include full-screen;
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  z-index: 20;
  &__blur {
    @include full-screen;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    backdrop-filter: blur(0px);
  }
  &__contents {
    display: flex;
    width: 100vw;
    // cursor: grab;
    position: relative;
    @include flex-middle;
    flex-direction: column;
    @include gap-bottom(56px);
    //
    // &:active {
    //   cursor: grabbing;
    // }
  }
}
.enable {
  color: $color-gray;
  pointer-events: none;
}
.item {
  position: relative;
  @include full-size;
  @include grid-middle;
  &__thumbnail {
    height: 60vh;
    width: 40vh;
    overflow: hidden;
    position: relative;
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      height: inherit;
      width: inherit;
      object-fit: cover;
      transform: translateX(150%);
    }
  }
  &__title {
    @include absolute-middle;
    z-index: 2;
    @include just-fitsize;
    display: block;
    @include grid-middle;
    &__text {
      @include font-twelve;
      display: inline;
      text-align: center;
    }
  }
}
.infomation {
  @include flex-middle;
  @include gap-right(36px);
  &__numbers,
  &__buttons {
    overflow: hidden;
    width: 140px;
    @include flex-middle;
    @include gap-right(20px);
    * {
      user-select: none;
    }
    p,
    button {
      @include font-one;
      background: transparent;
    }
  }
  &__buttons {
    button {
      transition: color 1s ease;
      &:active {
        cursor: pointer;
        transform: translateY(1px);
      }
    }
  }
  &__indicator {
    height: 4px;
    width: 360px;
    background: $color-gray;
    &__bar {
      transform-origin: left;
      transform: scaleX(0);
      height: inherit;
      width: inherit;
      background: $color-green;
    }
  }
}
</style>
