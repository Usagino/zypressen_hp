<template lang="pug">
.container
  scrollBar
  mouseStoker
  .meeting
    h2.meeting__title Meeting
    .meeting__box
      nuxt-link.item(v-for="item in ITEM" :to="'/meeting/'+item.Name+'-'+item.id")
        .item__name {{ item.Name }}
</template>

<script>
import axios from 'axios' // eslint-disable-line

export default {
  async asyncData() {
    const { data } = await axios.get(
      'https://notion-api.splitbee.io/v1/table/baf5e3df7d7a46b6b0e4dc406d98a16b'
    )
    console.log(data[0])
    return {
      ITEM: data
    }
  }
}
</script>

<style lang="scss" scoped>
.meeting {
  padding: $sec-value;
  width: 100vw;
  box-sizing: border-box;
  &__title {
    font-size: 36px;
    margin-bottom: 40px;
  }
  &__box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 40px;
  }
}
.item {
  padding: 20px;
  border: 1px solid $color-white;
}
</style>
