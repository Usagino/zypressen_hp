<template lang="pug">
.container.works-page
  scrollBar
  mouseStoker
  .first-thumbnail(:style="{backgroundImage:BodyImage(ThumbnailImage+'?auto=compress'),backgroundSize:BackgroundSize+'%'}")
    .first-thumbnail--screen
      .first-thumbnail--title
        span.first-thumbnail--textwrap
          h1 {{Work.TITLE}}
      .first-thumbnail--scroll
        p scroll
    .cover-wrap
  .second-body

    .second-body--japansetext
      p {{Work.BODY_JA}}
    .second-body--englishtext
      p {{Work.BODY_EN}}
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
  .third-images
    span.third-images__wrap(v-for="(image,index) in Work.IMAGE" :key="image.index")
      img.third-images--image(:src="image.IMAGE.url+'?auto=compress'")
      span.third-images--cover
  .fourth-button(v-show="Pagination.back !== '/works/undefined'")
    nuxt-link.fourth-button__link(:to="Pagination.back")
      p NEXT
      h2 PROJECT
</template>

<script>
import axios from 'axios'
import { TimelineMax, TweenMax, Power2,gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

import inView from 'in-view' // eslint-disable-line
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
      offsetTop: 0,
      windowHeight: 0,
      windowWidth: 0,
      BackgroundSize: '150%',
      thirdImagePadding: 0,
      firstThumbnail: {
        backgroundImage: this.changeWebp(this.Thumbnail),
        backgroundSize: this.BackgroundSize + '%'
      }
    }
  },
  mounted() {
    this.hideDisplay()

    gsap.registerPlugin(ScrollTrigger)
    gsap.utils.toArray('.third-images__wrap').forEach((section) => {
      gsap.to(section.querySelector('.third-images--cover'), {
        scrollTrigger: {
          trigger: section,
          scrub: true,
          end: 'center center'
          // markers: true
        },
        scaleX: 0,
        ease: Power2.easeOut
      })
    })
  },
  methods: {
    hideDisplay() {
      gsap.registerPlugin(ScrollTrigger)
      gsap.set('.cover-wrap', { x: '100%' })
      gsap.to('.cover-wrap', {
        scrollTrigger: {
          trigger: '.cover-wrap',
          scrub: true,
          end: 'bottom bottom'
        },
        x: '0%'
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
  will-change: contents;
  @include mq(sm) {
    background-size: cover;
  }
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
      font-family: $en;
    }
  }
  &--textwrap {
    overflow: hidden;
    display: block;
    width: fit-content;
    height: fit-content;
    @include default-width;
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
  height: var(--wh, 100vh);
  width: 100vw;
  transform-origin: right bottom;
  will-change: transform;
}
.second-body {
  padding: 140px 0px;
  @include default-width;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 24px 24px;
  grid-template-areas: 'infomation body_ja body_ja body_ja body_ja' 'infomation body_en body_en body_en body_en';
  @include mq(sm) {
    display: flex;
    flex-direction: column;
    padding: 60px 24px;
    @include gap-bottom(44px);
  }
  &--infomation {
    grid-area: infomation;
    @include gap-bottom(20px);

    p {
      @include font-text-secondary;
      color: $color-gray;
    }
    &__title {
      color: $color-white !important;
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
  @include default-width;
  @include gap-bottom(60px);
  @include mq(sm) {
    padding: 32px 0px 0px;
  }
  &__wrap {
    display: block;
    position: relative;
    overflow: hidden;
  }
  &--image {
    will-change: transform;
    transform-origin: center center;
    width: 100%;
    height: 580px;
    object-fit: cover;
    background: $color-gray;
    @include mq(sm) {
      height: 268px;
    }
  }
  &--cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(1.1);
    background-color: $color-black;
    transform-origin: right bottom;
    will-change: transform;
  }
}
.fourth-button {
  @include default-width;
  margin-bottom: 160px;
  @include mq(sm) {
    margin-bottom: 100px;
    margin-top: 100px;
  }
  &__link {
    p {
      @include font-title-secondary;
      text-align: right;
      @include text-outline;
    }
    h2 {
      @include font-title-first;
      text-align: right;
    }
  }
}
</style>
