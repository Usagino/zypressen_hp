<template lang="pug">
  .container
    scrollBar
    mouseStoker
    .meeting
      p aaaaaaaaaaaa
</template>

<script>
import axios from 'axios' // eslint-disable-line

export default {
  async asyncData(app) {
    const route = app.route.params.id
    const { data } = await axios.get(
      'https://notion-api.splitbee.io/v1/page/' + route
    )
    await console.log(
      'https://notion-api.splitbee.io/v1/page/' + app.route.params.id
    )
    return {
      ITEM: data
    }
  }
}
</script>

<style lang="scss" scoped></style>
