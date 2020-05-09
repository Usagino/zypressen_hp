<template lang="pug">
.container
  .first-thumbnail(:style="{backgroundImage:'url('+Work.THUMBNAIL.url+')'}")
    .first-thumbnail--title
      h1 {{Work.TITLE}}
      p -{{this.$dayjs(this.Work.DATE).format('YYYY')}}
  .second-body
    .second-body__text
      p(v-html="Work.BODY")
    .second-body__colors
      .second-body__colors--color(
        v-for="color in Work.COLOR"
        :style="{backgroundColor:color.COLOR}")
  .third-images
    img.third-images--image(v-for="image in Work.IMAGE" :src="image.IMAGE.url" :key="image.index")
</template>

<script>
// import color from 'img-color'
import axios from 'axios'

export default {
  async asyncData({ app, params }) {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works/' + params.page,
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )

    return {
      Work: data
    }
  },
  data() {
    return {
      Work: {}
    }
  },
  mounted() {
    console.log('aaaaaa', process.env.CMSKEY)
    console.log(this.Work)
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
