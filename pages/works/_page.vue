<template lang="pug">
.container
  .first-thumbnail(:style="{backgroundImage:Thumbnail}")
    .first-thumbnail--title
      h1 {{Work.TITLE}}
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
  .second-body
    .second-body__text
      p(v-html="Body")
    .second-body__colors
      .second-body__colors--color(
        v-for="color in Colors"
        :style="{backgroundColor:color.COLOR}")
  .third-images
    img.third-images--image(v-for="image in Work.IMAGE" :src="image.IMAGE.url" :key="image.index")
  .four-nextpage(v-if="Pagination.next !== '/works/undefined'")
    nuxt-link(:to="Pagination.next") NEXT WORK
</template>

<script>
import axios from 'axios'

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
      Body: ' '
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.first-thumbnail {
  @include full-screen;
  background-size: cover;
  background-position: center;
  @include flex-middle;
  position: relative;
  &--title {
    h1 {
      @include font-title-secondry;
    }
    p {
      @include font-title-secondry;
      font-size: 44px;
      text-align: right;
      @include mq(sm) {
        font-size: 24px;
      }
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
    position: absolute;
    margin: auto;
    height: fit-content;
    top: 0px;
    bottom: 0px;
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
      @include font-nav;
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
      @include font-nav;
    }
  }
}
.second-body {
  padding-top: 150px;
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
  padding: 150px 0px 40px;
  @include default-width;
  @include gap-bottom(24px);
  @include mq(sm) {
    padding: 32px 0px 0px;
  }
  &--image {
    width: 100%;
    height: auto;
  }
}
.four-nextpage {
  margin: 88px auto;
  @include flex-middle;
  a {
    @include font-title-secondry;
    font-size: 24px;
    display: inline-block;
  }
}
</style>
