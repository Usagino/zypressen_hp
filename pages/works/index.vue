<template lang="pug">
  .container
    .works
      nuxt-link.works__item(v-for="works in WorksArray" :to="'/works/'+works.id" :key="works.id")
        .works__imgbox
          img(:src="works.THUMBNAIL.url")
</template>

<script>
// import Unsplash, { toJson } from 'unsplash-js'
import axios from 'axios'

export default {
  async asyncData() {
    const { data } = await axios.get(
      'https://zypressen.microcms.io/api/v1/works',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    // const unsplash = await new Unsplash({
    //   accessKey: 'mbG-P-q7ubPVqmXbZYLHaLJi5B_GuIvoNX6sahRHkRU',
    //   headers: {
    //     'X-Custom-Header': 'foo'
    //   },
    //   timeout: 2000
    // })
    // console.log(unsplash, toJson)
    // unsplash.photos
    //   .getRandomPhoto()
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.dir(json)
    //   })

    // console.log(images)
    return {
      WorksArray: data.contents
    }
  },
  data() {
    return {
      WorksArray: []
    }
  }
}
</script>

<style lang="scss" scoped>
.works {
  margin: 0 auto;
  @include secondary-margin;
  box-sizing: border-box;
  padding-top: 180px;
  width: 100%;
  column-count: 3;
  column-gap: 0;
  @include mq(sm) {
    column-count: 1;
    padding: 0px;
    padding-top: $pri-value;
  }
  &__item {
    padding: 12px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    display: block;

    @include mq(sm) {
      padding: 12px 0px;
    }
  }
  &__imgbox {
    overflow: hidden;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
      img {
        transform: scale(1.1);
        -webkit-filter: grayscale(0%);
        -moz-filter: grayscale(0%);
        -ms-filter: grayscale(0%);
        -o-filter: grayscale(0%);
        filter: grayscale(0%);
      }
    }
    img {
      transition: all 0.3s cubic-bezier(0.45, 0.05, 0.66, 0.32);
      width: 100%;
      height: auto;
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
      -ms-filter: grayscale(100%);
      -o-filter: grayscale(100%);
      filter: grayscale(100%);
    }
  }
}
</style>
