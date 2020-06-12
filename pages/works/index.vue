<template lang="pug">
  .container
    .works-scrollwrap
      .works-title
        h1 WORKS
      .works-list
        .works-list__single(v-for="(item,index) in WorksArray")
          a.works-list__single--wrap(:href="'/works/'+item.id")
            img.works-list__single--thumbnail(:src="item.THUMBNAIL.url")
            .works-list__single--title
              h2.works-list__single--title__text {{item.TITLE}}
</template>

<script>
import axios from 'axios'
import { TimelineMax, TweenMax } from 'gsap' // eslint-disable-line
import inView from 'in-view' // eslint-disable-line

export default {
  async asyncData() {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    return {
      WorksArray: data.contents
    }
  },
  data() {
    return {
      WorksArray: [],
      htmlElement: null
    }
  },
  mounted() {
    if (this.$ua.deviceType() !== 'smartphone') {
      this.scrollLeft()
    }
    TweenMax.to('.works-list__single:first-child', 0.3, {
      opacity: 1,
      x: 0,
      delay: 1
    })
    // inView.threshold(0.8)
  },
  methods: {
    scrollLeft() {
      const element = document.querySelector('.container')
      window.addEventListener(
        'mousewheel',
        (e) => {
          e.stopPropagation()
          e.preventDefault()
          element.scrollBy(e.deltaY, 0)
        },
        { passive: false }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: scroll;
  overflow-y: hidden;
  @include mq(sm) {
    overflow-y: scroll;
    overflow-x: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
.works-scrollwrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: fit-content;
  @include mq(sm) {
    flex-direction: column;
    padding: 100px 0px;
    width: 100vw;
  }
}
.works-title {
  height: 100vh;
  min-width: 80vw;
  padding-left: calc(10vw);
  @include flex-middle;
  h1 {
    @include font-title-first;
  }
  @include mq(sm) {
    height: auto;
    width: fit-content;
    padding: 0px;
    padding-bottom: 60px;
  }
}
.works-list {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-right: calc(10vw);
  @include gap-right(200px);
  @include mq(sm) {
    flex-direction: column;
    margin-right: 0px;
    @include gap-right(0px);
  }
  &__single {
    &:first-child {
      opacity: 0;
      transform: translateX(10vw);
    }
    &--wrap {
      width: 750px;
      height: 500px;
      display: block;
      position: relative;
      @include mq(sm) {
        width: 100vw;
        height: 100vw;
      }
    }
    &--thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &--title {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: block;
      padding: 24px;
      height: fit-content;
      width: 100%;
      margin: auto;
      box-sizing: border-box;
      &__text {
        @include font-title-secondary;
        text-align: center;
      }
    }
  }
}
</style>
