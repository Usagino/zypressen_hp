<template lang="pug">
  .container.works-page
    .works-item.works-first
      .works-item__image-wrap
        img.works-item--thumbnail(:src="WORKS[0].THUMBNAIL.url")
      .works-item__body
        .works-item__body__title.works-item__body__contents
          h2.works-item--title-text(style="opacity:1") {{WORKS[0].TITLE}}
        .works-item__body__category.works-item__body__contents
          p.works-item--category-text(style="opacity:1") {{WORKS[0].CATEGORY}}
          .works-item--bar
        .works-item__body__time.works-item__body__contents
          p.works-item--time-text(style="opacity:1") Created  - <span>{{ $dayjs(WORKS[0].DATE).format('MMM , DD , YYYY') }}</span>
          .works-item--bar
    .works-item(v-for="(item,index) in WORKS" :key="item.id" v-show="index !== 0")
      .works-item__image-wrap
        img.works-item--thumbnail(:src="item.THUMBNAIL.url")
      .works-item__body
        .works-item__body__title.works-item__body__contents
          h2.works-item--title-text
            .item-text(v-for="text in item.TITLE.split(' ')")
              .item-text--text {{text}}
              .item-text--bar
        .works-item__body__category.works-item__body__contents
          p.works-item--category-text {{item.CATEGORY}}
          .works-item--bar
        .works-item__body__time.works-item__body__contents
          p.works-item--time-text Created  - <span>{{ $dayjs(item.DATE).format('MMM , DD , YYYY') }}</span>
          .works-item--bar
    .works-end.works-item
      .works-end__wrap
        h2.works-end--text Comming<br>soon...
        nuxt-link.works-end--link(to="/about") ABOUT
    .navigation
      .navigation__wrap
        p.navigation--current.navigation--num(v-for="i of WORKS.length + 1") {{'0'+i}}
      .navigation--bar
      p.navigation--maxnum.navigation--num(v-if="2 <= String(WORKS.length + 1).length") {{WORKS.length + 1}}
      p.navigation--maxnum.navigation--num(v-else) 0{{WORKS.length + 1}}
</template>

<script>
import axios from 'axios' // eslint-disable-line
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

export default {
  async asyncData() {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    return {
      WORKS: data.contents
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    const elementLength = gsap.utils.toArray('.works-item').length // eslint-disable-line
    gsap.utils.toArray('.works-item').forEach((section, index) => {
      if (index !== 0 && index !== elementLength - 1) {
        const tl = gsap.timeline({ // eslint-disable-line
          scrollTrigger: {
            trigger: section,
            start: 'bottom bottom',
            scrub: 0.4,
            pin: section
          }
        })
        const titleBarEl = section.querySelectorAll(
          '.works-item__body__title .item-text--bar'
        )
        const titleTextEl = section.querySelectorAll('.item-text--text')
        const worksItemBar = section.querySelectorAll('.works-item--bar')
        const categoryText = section.querySelector('.works-item--category-text')
        const timeText = section.querySelector('.works-item--time-text')
        tl.to(titleBarEl, {
          x: 0
        })
          .set(titleTextEl, {
            opacity: 1
          })
          .to(titleBarEl, {
            x: '100%'
          })
          .to(worksItemBar, {
            x: 0
          })
          .set(categoryText, { opacity: 1 })
          .set(timeText, { opacity: 1 })
          .to(worksItemBar, {
            x: '100%'
          })
          .to(section, { delay: 2 })
      }

      if (index !== 0) {
        console.log(index + 1, section.className)
        gsap.to(`.navigation--current:nth-child(${index})`, {
          scrollTrigger: {
            trigger: section,
            scrub: 0.5,
            start: 'center center',
            end: 'bottom bottom',
            onEnter: () => {
              console.log(index)
            }
          },
          y: 0
        })
      }
    })
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.works-item {
  @include full-screen;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 1fr;
  &__image-wrap {
    width: 50vw;
    height: 100%;
    height: 100%;
  }
  &--thumbnail {
    @include full-size;
    object-fit: cover;
  }
  &--bar {
    position: absolute;
    top: 0;
    left: 0;
    @include full-size;
    background: $color-gray;
    transform: translateX(-100%);
  }
  &__body {
    padding: 0px 140px 0px 80px;
    @include flex-middle;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
    max-height: 100vh;
    span {
      color: $color-gray;
    }
    &__contents {
      position: relative;
      overflow: hidden;
    }
    &__title {
      margin-bottom: 12px;
    }
    &__category {
      margin-bottom: 8px;
    }
    &__category,
    &__time {
      position: relative;
    }
  }
  &--category-text,
  &--time-text {
    opacity: 0;
  }
  &--title-text {
    @include font-title-secondary;
  }
}
.works-end {
  @include full-screen;
  position: relative;
  &__wrap {
    height: fit-content;
    width: fit-content;
    position: absolute;
    bottom: 60px;
    right: 140px;
  }
  &--text {
    margin-bottom: 12px;
    @include font-title-secondary;
  }
  &--link {
    @include text-outline;
    @include font-family;
    font-size: 56px;
  }
}
.item-text {
  overflow: hidden;
  position: relative;
  width: fit-content;
  &--text {
    opacity: 0;
  }
  &--bar {
    position: absolute;
    top: 0;
    left: 0;
    @include full-size;
    background: $color-gray;
    transform: translateX(-100%);
  }
}
</style>
