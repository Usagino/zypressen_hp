<template lang="pug">
  .container
    .works
      .works__item(v-for="image in imageObj")
        img(:src="image.urls.thumb")
</template>

<script>
import Unsplash, { toJson } from 'unsplash-js'

export default {
  async asyncData() {
    const unsplash = new Unsplash({
      accessKey: 'mbG-P-q7ubPVqmXbZYLHaLJi5B_GuIvoNX6sahRHkRU',
      // Optionally you can also configure a custom header to be sent with every request
      headers: {
        'X-Custom-Header': 'foo'
      }
    })
    return await unsplash.search
      .photos('foggy forest', 1, 20)
      .then(toJson)
      .then((json) => {
        return { imageObj: json.results }
      })
  },
  data() {
    return {
      imageObj: []
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
  &__item {
    padding: 12px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
