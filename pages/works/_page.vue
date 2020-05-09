<template lang="pug">
.container
  .first-thumbnail(:style="{backgroundImage:Thumbnail}")
    .first-thumbnail--title
      h1 {{Work.TITLE}}
      p -{{this.$dayjs(this.Work.DATE).format('YYYY')}}
    .first-thumbnail--scroll
      p scroll
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
      p(v-html="Work.BODY")
    .second-body__colors
      .second-body__colors--color(
        v-for="color in Colors"
        :style="{backgroundColor:color.COLOR}")
  .third-images
    img.third-images--image(v-for="image in Work.IMAGE" :src="image.IMAGE.url" :key="image.index")
</template>

<script>
// import color from 'img-color'
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
      Pagination: pagination
    }
  },
  data() {
    return {
      Data: null,
      Work: {},
      Thumbnail: '',
      Colors: [],
      IdArray: [],
      Pagination: {}
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
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
    }
  }
  &--nav {
    position: absolute;
    margin: auto;
    height: fit-content;
    top: 0px;
    bottom: 0px;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    p {
      @include font-nav;
      padding: 6px;
    }
    span {
      height: 2px;
      width: 32px;
      background: $color-white;
      content: ' ';
      display: block;
    }
  }
  &--next {
    right: 0px;
    -webkit-writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  &--back {
    left: 0px;
    -webkit-writing-mode: vertical-rl;
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
  padding-top: $pri-value;
  @include default-pc-width;
  &__text {
    p {
      @include font-text-primary;
    }
  }
  &__colors {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    &--color {
      height: 32px;
      width: 32px;
    }
  }
}
.third-images {
  padding: $pri-value 0px $sec-value;
  @include default-pc-width;
  @include gap-bottom(24px);
  &--image {
    width: 100%;
    height: auto;
  }
}
</style>
