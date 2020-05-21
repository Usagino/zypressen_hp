<template lang="pug">
.container.works-page
  .first-thumbnail(:style="{backgroundImage:Thumbnail,backgroundSize:BackgroundSize+'%'}")
    .first-thumbnail--screen
      .first-thumbnail--title
        span.first-thumbnail--textwrap
          h1 {{Work.TITLE}}
        span.first-thumbnail--textwrap.first-thumbnail--title__date
          p -{{this.$dayjs(this.Work.DATE).format('YYYY')}}
      .first-thumbnail--scroll
        p scroll
      .first-thumbnail--navwrap
        .first-thumbnail--next.first-thumbnail--nav(v-if="Pagination.next !== '/works/undefined'")
          nuxt-link(:to="Pagination.next")
            p NEXT
            span
        .first-thumbnail--back.first-thumbnail--nav(v-if="Pagination.back !== '/works/undefined'")
          nuxt-link(:to="Pagination.back")
            p BACK
            span
    .cover-wrap

  .second-body
    .second-body__text
      p(v-html="Body")
    .second-body__colors
      .second-body__colors--color(
        v-for="color in Colors"
        :style="{backgroundColor:color.COLOR}")
  .third-images
    span.third-images__wrap(v-for="image in Work.IMAGE" :key="image.index" )
      .third-images--image(:style="{backgroundImage:BodyImage(image.IMAGE.url),backgroundSize:'150%',backgroundPosition:'center'}")
</template>

<script>
import axios from 'axios'
import { TimelineMax, TweenMax } from 'gsap'
import inView from 'in-view'
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works/',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    const work = data.contents.find((el) => el.id === params.page)
    const idArray = data.contents.map((el) => {
      return el.id
    })
    const pagination = {
      next: '/works/' + idArray[idArray.indexOf(params.page) - 1],
      back: '/works/' + idArray[idArray.indexOf(params.page) + 1]
    }
    return {
      Data: data.contents,
      Work: work,
      Thumbnail: 'url("' + work.THUMBNAIL.url + '")',
      Colors: work.COLOR,
      Pagination: pagination,
      Body: work.BODY
    }
  },
  data() {
    return {
      Data: null,
      Work: {},
      Thumbnail: '',
      Colors: [],
      IdArray: [],
      Pagination: {},
      Body: ' ',
      BackgroundSize: '150%'
    }
  },
  mounted() {
    this.imageDisplay()
    window.onscroll = () => {
      const windowHeight = window.innerHeight
      const y = document.documentElement.scrollTop
      // console.log(this.BackgroundSize)
      if (y < windowHeight) {
        const size = y * 0.06 + 100
        this.BackgroundSize = size
      }
      console.log(y / windowHeight + 100)
      const transformValue = 100 - (y / windowHeight) * 100
      TweenMax.to('.cover-wrap', 0.2, { left: transformValue + '%' })
    }
    // this.titleAnimationHide()
  },
  methods: {
    imageDisplay() {
      const tl = new TimelineMax()
      const baseElWidth = document.getElementsByClassName(
        'second-body__text'
      )[0].clientWidth
      const windowWidth = window.innerWidth
      // const windowHeight = window.parent.screen.height
      console.log(baseElWidth, windowWidth)
      tl.set('.third-images--image', {
        scale: baseElWidth / windowWidth
      })
      inView.offset(500)
      inView('.third-images').on('enter', (el) => {
        tl.to('.third-images--image', 0.5, {
          backgroundSize: '100%',
          scale: 1,
          ease: 'easeOut'
        })
      })
    },
    BodyImage(image) {
      return 'url("' + image + '")'
    }
  }
}
</script>

<style lang="scss">
.works-page {
  position: relative;
  scroll-snap-type: y;
  overflow: auto;
}
.first-thumbnail {
  @include full-screen;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-size: 100%;
  position: relative;
  height: 200vh;
  &--screen {
    @include full-screen;
    @include flex-middle;
    position: relative;
  }
  &--title {
    &__date {
      margin-left: auto;
    }

    p {
      @include font-title-secondary;
      text-align: right;
    }
  }
  &--navwrap {
    //The class that wraps the NAV
    @include mq(sm) {
      position: absolute;
      bottom: 32px;
      right: 32px;
      height: fit-content;
      width: fit-content;
    }
  }
  &--nav {
    position: fixed;
    margin: auto;
    height: fit-content;
    top: 0px;
    bottom: 0px;
    z-index: 2;
    @include mq(sm) {
      position: relative;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    p {
      @include font-nav-secondary;
      padding: 6px;
      @include mq(sm) {
        padding: 0px;
      }
    }
    span {
      height: 2px;
      width: 32px;
      background: $color-white;
      content: ' ';
      display: block;
      @include mq(sm) {
        display: none;
      }
    }
  }
  &--next {
    right: 0px;
    -webkit-writing-mode: vertical-rl;
    transform: rotate(180deg);
    @include mq(sm) {
      transform: rotate(0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      &::after {
        height: 8px;
        width: 2px;
        background: $color-white;
        content: ' ';
        display: block;
        margin: 8px;
      }
    }
  }
  &--back {
    left: 0px;
    -webkit-writing-mode: vertical-rl;
    @include mq(sm) {
      transform: rotate(180deg);
    }
  }
  &--scroll {
    position: absolute;
    bottom: $pri-value;
    left: 0;
    right: 0;
    margin: auto;
    display: block;
    width: fit-content;
    p {
      display: inline-block;
      @include font-nav-primary;
    }
  }
  &--textwrap {
    overflow: hidden;
    display: block;
    width: fit-content;
    height: fit-content;
  }
}
.cover-wrap {
  // @include full-screen;
  background: $color-black;
  content: '';
  // opacity: 0;
  position: absolute;
  bottom: 0px;
  left: 100%;
  height: 100vh;
  width: 300vw;
}
.second-body {
  padding: 140px 0px;
  @include default-width;
  &__text {
    p {
      @include font-text-primary;
      line-height: 150%;
    }
  }
  &__colors {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    &--color {
      height: 24px;
      width: 24px;
      @include mq(sm) {
        height: 18px;
        width: 18px;
      }
    }
  }
}
.third-images {
  padding-bottom: 160px;
  // @include default-width;

  @include gap-bottom(2px);
  @include mq(sm) {
    padding: 32px 0px 0px;
  }
  &__wrap {
    display: block;
  }
  &--image {
    transform-origin: center center;
    width: 100%;
    height: auto;
    @include full-screen;
    // background-size: cover;
    background-position: center;
    background-size: 100%;
    background: $color-gray;
  }
}
</style>
