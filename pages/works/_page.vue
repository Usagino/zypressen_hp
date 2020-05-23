<template lang="pug">
.container.works-page
  .first-thumbnail(:style="{backgroundImage:BodyImage(ThumbnailImage),backgroundSize:BackgroundSize+'%'}")
    .first-thumbnail--screen
      .first-thumbnail--title
        span.first-thumbnail--textwrap
          h1 {{Work.TITLE}}
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
    .second-body--infomation
      .second-body--infomation__createdtime
        p.second-body--infomation__title Created
        p {{this.$dayjs(Work.DATE).format('MMM , DD , YYYY')}}
      .second-body--infomation__designer
        p.second-body--infomation__title Designer
        p {{Work.DESIGNER}}
      .second-body--infomation__developer
        p.second-body--infomation__title Developer
        p {{Work.DESIGNER}}
      .second-body--infomation__colors
        span(v-for='(color,index) in Work.COLOR' :style="{backgroundColor:color.COLOR}")
    .second-body--japansetext
      p {{Work.BODY_JA}}
    .second-body--englishtext
      p {{Work.BODY_EN}}

  .third-images
    span.third-images__wrap(v-for="(image,index) in Work.IMAGE" :key="image.index" )
      .third-images--image(:class="'page-image-' + index" :style="{backgroundImage:BodyImage(image.IMAGE.url),backgroundSize:'cover',backgroundPosition:'center'}")
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
      BodyJa: work.BODY_JA,
      ThumbnailImage: work.THUMBNAIL.url
    }
  },
  data() {
    return {
      Data: null,
      Work: {},
      Thumbnail: '',
      ThumbnailImage: '',
      Colors: [],
      IdArray: [],
      Pagination: {},
      BodyJa: ' ',
      BackgroundSize: '150%',
      firstThumbnail: {
        backgroundImage: this.changeWebp(this.Thumbnail),
        backgroundSize: this.BackgroundSize + '%'
      }
    }
  },
  mounted() {
    // this.imageDisplay()
    this.hideDisplay()
    this.thirdImageDisplay()
    window.onscroll = () => {
      this.hideDisplay()
      this.thirdImageDisplay()
    }
  },
  methods: {
    hideDisplay() {
      const windowHeight = window.innerHeight
      const y = document.documentElement.scrollTop
      // console.log(this.BackgroundSize)
      if (y < windowHeight) {
        const size = y * 0.06 + 100
        this.BackgroundSize = size
      }
      const transformValue = (y / windowHeight) * 100
      if (transformValue <= 120) {
        TweenMax.set('.cover-wrap', { width: transformValue + 'vw' })
      }
    },
    thirdImageDisplay() {
      const tl = new TimelineMax()
      const baseElWidth =
        document.getElementsByClassName('second-body')[0].clientWidth - 140

      // const baseElWidth = 1080
      const windowWidth = window.innerWidth
      const imageWidthScale = baseElWidth / windowWidth
      // const windowHeight = window.parent.screen.height
      tl.set('.page-image-0', {
        scale: imageWidthScale
      })
      const bodyRect = document.body.getBoundingClientRect()
      const thirdImage = document
        .querySelector('.third-images')
        .getBoundingClientRect()
      // 👇ブラウザーの高さ
      const windowHeight = window.innerHeight
      // 👇thirdImageのページの一番上からの距離から、ブラウザーの高さを引いたもの
      const offsetTop = thirdImage.top - bodyRect.top - windowHeight
      // 👇 スクロール量からoffsetTopを引いた
      const offsetTopY = document.documentElement.scrollTop - offsetTop
      const percentage = Math.round((offsetTopY / windowHeight) * 100) / 100

      if (percentage < 1) {
        tl.set('.page-image-0', {
          backgroundSize: 'cover',
          scale: imageWidthScale + (1 - imageWidthScale) * percentage
        })
      } else {
        tl.set('.page-image-0', {
          backgroundSize: 'cover',
          scale: 1
        })
      }
    },
    imageDisplay() {
      const tl = new TimelineMax()
      const baseElWidth =
        document.getElementsByClassName('second-body')[0].clientWidth - 280

      // const baseElWidth = 1080
      const windowWidth = window.innerWidth
      // const windowHeight = window.parent.screen.height
      tl.set('.page-image-0', {
        scale: baseElWidth / windowWidth
      })
      inView.offset(500)
      inView('.third-images').on('enter', (el) => {
        tl.to('.page-image-0', 0.3, {
          backgroundSize: '100%',
          scale: 1,
          ease: 'easeOut'
        })
      })
    },
    BodyImage(image) {
      const picture = this.changeWebp(image)
      return 'url("' + picture + '")'
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
  right: 0px;
  height: 100vh;
  width: 0vw;
}
.second-body {
  padding: 140px 0px;
  @include default-width;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px 24px;
  grid-template-areas: 'infomation body_ja body_ja body_ja body_ja' 'infomation body_en body_en body_en body_en';
  &--infomation {
    grid-area: infomation;
    @include gap-bottom(20px);
    p {
      @include font-text-secondary;
    }
    &__title {
      color: $color-gray;
      padding-bottom: 8px;
    }
    &__colors {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      span {
        height: 22px;
        width: 22px;
        content: ' ';
        display: block;
      }
    }
  }
  &--japansetext {
    grid-area: body_ja;
  }
  &--englishtext {
    grid-area: body_en;
  }
  &--japansetext,
  &--englishtext {
    p {
      color: $color-white;
      @include font-text-primary;
      white-space: pre-line;
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
    will-change: transform;
    transform-origin: center center;
    width: 100vw;
    height: auto;
    @include full-screen;
    height: calc(1000vw / 16);
    // background-size: cover;
    background-position: center;
    background-size: 100%;
    background: $color-gray;
  }
}
</style>
