<template lang="pug">
  .container.works-page
    .works-item(v-for="(item,index) in WORKS" :key="item.id")
      .works-item__image-wrap
        img.works-item--thumbnail(:src="item.THUMBNAIL.url")
      p aaa
</template>

<script>
import axios from 'axios' // eslint-disable-line
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
      WORKS: data.contents
    }
  },
  data() {
    return {
      WORKS: [],
      currentNum: 0
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.works-item {
  @include full-screen;
  &__image-wrap {
    width: 50vw;
    height: 100%;
    height: 100%;
  }
  &--thumbnail {
    @include full-size;
    object-fit: cover;
  }
}
</style>
