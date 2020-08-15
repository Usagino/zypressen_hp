<template lang="pug">
  .works-page
    .works-page__blur
    .works-page__contents
      .items
        .items__card(
          v-for="item in works"
          :key="item.id")
          img.items__card__image(:src="`${item.THUMBNAIL.url}?auto=compress&w=900&h=900`")
    .infomation
      .infomation__title
        h2 {{itemTitle}}
      .infomation__data
        p created  -  {{this.$dayjs(itemCreateDay).format('MMM , DD , YYYY')}}
      .infomation__link
        nuxt-link(:to="itemLink") view more
    .next-button(@click="nextSlide()")
    .back-button(@click="backSlide()")
    .numbering
      svg.numbering__circle(width="56" height="56"  viewBox="0,0,56,56" xmlns="http://www.w3.org/2000/svg")
        circle.numbering__circle__back(cx="50%" cy="50%" r="27" stroke-width="2" stroke="white" fill="none" stroke-opacity="0.6")
        circle.numbering__circle__front(
          cx="50%"
          cy="50%"
          r="27"
          stroke-width="2"
          stroke="#61FF7A"
          fill="none"
          :stroke-dasharray="2 * 27 * Math.PI"
          :stroke-dashoffset="2 * 27 * Math.PI"
        )
      .numbering__numberwrap
        p.numbering__numberwrap__number(v-for="(num,index) in this.works" :key="index" :class="{numbering__numberwrap__white:pageNum === index}") {{('0' + (index+1)).slice(-2)}}
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
      itemTitle: '',
      itemCreateDay: '',
      itemLink: '',
      pageNum: 0, // 現在表示されてるスライドのナンバー
      thumbnailPosition: 0,
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
    this.itemCreateDay = this.works[this.pageNum].createdAt
    this.itemLink = `/${this.works[this.pageNum].id}`
    this.autoSlideNext()
  },
  methods: {
    nextSlide() {
      const thumbnailEl = document.querySelectorAll('.items__card')
      const circleEl = document.querySelector('.numbering__circle') // eslint-disable-line
      if (this.pageNum < this.worksArrayLength - 1) {
        gsap.to('.items', 1, {
          x: `-=${thumbnailEl[0].clientWidth + 100}px`
        })
        gsap.to('.numbering__circle', 1, {
          x: `+=${circleEl.clientWidth}px`
        })
        this.pageNum++
        gsap
          .timeline()
          .to(`.items__card:nth-child(${this.pageNum})`, 1, {
            opacity: 0,
            rotate: '-10deg'
          })
          .set(`.items__card:nth-child(${this.pageNum})`, {
            rotate: '0deg'
          })

        this.toggleText('.infomation__title', true, () => {
          this.itemTitle = this.works[this.pageNum].TITLE
        })
        this.toggleText('.infomation__data', true, () => {
          this.itemCreateDay = this.works[this.pageNum].createdAt
        })
        this.toggleText('.infomation__link', true, () => {
          this.itemLink = `/${this.works[this.pageNum].id}`
        })
      } else {
        gsap.to('.items', 1, {
          x: '0px'
        })
        gsap.to('.numbering__circle', 1, {
          x: ``
        })
        this.pageNum = 0
        gsap.to(`.items__card`, 1, {
          opacity: 1
        })
        this.toggleText('.infomation__title', true, () => {
          this.itemTitle = this.works[this.pageNum].TITLE
        })
        this.toggleText('.infomation__data', true, () => {
          this.itemCreateDay = this.works[this.pageNum].createdAt
        })
        this.toggleText('.infomation__link', true, () => {
          this.itemLink = `/${this.works[this.pageNum].id}`
        })
      }
    },
    backSlide() {
      const thumbnailEl = document.querySelectorAll('.items__card')
      const circleEl = document.querySelector('.numbering__circle') // eslint-disable-line
      if (this.pageNum > 0) {
        // バックボタンを押したときの処理
        gsap.to('.items', 1, {
          x: `+=${thumbnailEl[0].clientWidth + 100}px`
        })
        gsap.to('.numbering__circle', 1, {
          x: `-=${circleEl.clientWidth}px`
        })
        this.pageNum--
        gsap.to(`.items__card:nth-child(${this.pageNum + 1})`, 1, {
          opacity: 1,
          rotate: '0deg'
        })
        this.toggleText('.infomation__title', false, () => {
          this.itemTitle = this.works[this.pageNum].TITLE
        })
        this.toggleText('.infomation__data', false, () => {
          this.itemCreateDay = this.works[this.pageNum].createdAt
        })
        this.toggleText('.infomation__link', false, () => {
          this.itemLink = `/${this.works[this.pageNum].id}`
        })
      } else {
        // もし初めのスライドにいるときバックボタンを押したときの処理
        gsap.to('.items', 2, {
          x: `-${(thumbnailEl[0].clientWidth + 100) *
            (this.worksArrayLength - 1)}px`
        })
        gsap.to('.numbering__circle', 2, {
          x: `${circleEl.clientWidth * (this.worksArrayLength - 1)}px`
        })
        this.pageNum = this.worksArrayLength - 1
        console.log(`.items__card:nth-child(${this.pageNum})`)
        gsap
          .timeline()
          .to(`.items__card:not(:last-child)`, 0.5, {
            opacity: 0
          })
          .set(`.items__card:not(:last-child)`, {
            opacity: 0
          })
        this.toggleText('.infomation__title', true, () => {
          this.itemTitle = this.works[this.pageNum].TITLE
        })
        this.toggleText('.infomation__data', true, () => {
          this.itemCreateDay = this.works[this.pageNum].createdAt
        })
        this.toggleText('.infomation__link', true, () => {
          this.itemLink = `/${this.works[this.pageNum].id}`
        })
      }
    },
    toggleText(el, vector, onCompleteMethods) {
      gsap
        .timeline()
        .set('.next-button,.back-button', {
          pointerEvents: 'none'
        })
        .to(`${el} *`, 0.6, {
          y: vector ? '100%' : '-100%',
          onComplete: onCompleteMethods
        })
        .set(`${el} *`, {
          y: vector ? '-100%' : '100%'
        })
        .to(`${el} *`, 0.6, {
          y: '0%'
        })
        .set('.next-button,.back-button', {
          pointerEvents: ''
        })
    },
    autoSlideNext() {
      const tl = gsap.timeline({
        repeat: -1
      })
      tl.to('.numbering__circle__front', 7, {
        strokeDashoffset: 0,
        ease: 'linear',
        onComplete: () => {
          this.nextSlide()
        }
      }).to('.numbering__circle__front', 1, {
        strokeDashoffset: 2 * 27 * Math.PI,
        ease: 'linear'
      })
    },
    enterAnime() {
      this.progressBarTimeline.play()
      gsap.to('.works-page__contents', 0.5, { opacity: 1 })
      gsap.to('.works-page__blur', 0.5, {
        backdropFilter: 'blur(20px)'
      })
    },
    offAnime() {
      this.progressBarTimeline.pause()
      gsap.to('.works-page__contents', 0.5, { opacity: 0 })
      gsap.to('.works-page__blur', 1, {
        backdropFilter: 'blur(0px)'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.works-page {
  @include full-screen;
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  z-index: 20;
  overflow: hidden;
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
    //
    // &:active {
    //   cursor: grabbing;
    // }
  }
}
.items {
  $contents-width: 64vw;
  $contents-height: 60vh;
  width: $contents-width;
  height: $contents-height;
  display: flex;
  @include gap-right(100px);
  will-change: transform;
  &__card {
    &__image {
      width: $contents-width;
      height: $contents-height;
      object-fit: cover;
      user-select: none;
    }
  }
}
.infomation {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 10vw;
  margin: auto;
  @include just-fitsize;
  * {
    overflow: hidden;
    * {
      user-select: none;
    }
  }
  &__title {
    h2 {
      @include font-five;
      text-indent: 0px;
      line-height: 160%;
      margin-bottom: 16px;
    }
  }
  &__data {
    p {
      @include font-three;
    }
  }
  &__link {
    a {
      @include just-fitsize;
      display: inline-block;
      @include font-four;
      text-decoration: underline;
    }
  }
}
.next-button,
.back-button {
  position: absolute;
  content: '';
  width: 15vw;
  height: 100vh;
  top: 0px;
  cursor: pointer;
}
.next-button {
  right: 0px;
}
.back-button {
  left: 0px;
}
.numbering {
  position: absolute;
  bottom: $pri-value;
  right: $pri-value;
  z-index: 1;
  &__circle {
    position: absolute;
    top: 0;
    bottom: 0;
    // left: -20px;
    left: 0px;
    margin: auto;
    @include just-fitsize;
    width: 56px;
    height: 56px;
    transform: rotate(-90deg);
    &__front,
    &__back {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  &__numberwrap {
    display: flex;
    align-items: center;
    // @include gap-right(40px);
    transition: color 1s ease;
    &__number {
      @include font-one;
      color: $color-gray;
      transition: color 1s ease;
      width: 56px;
      text-align: center;
    }
    &__white {
      color: $color-white;
    }
  }
}
</style>
