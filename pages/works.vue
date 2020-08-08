<template lang="pug">
.container
  tp-works(ref="worksPage" :works="this.data")
</template>

<script>
export default {
  async asyncData({ app, params }) {
    const { data } = await app.$axios.get(
      'https://zypressen.microcms.io/api/v1/works/',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    return {
      data: data.contents
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #9692b6;
}
</style>
