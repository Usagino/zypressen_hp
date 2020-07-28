<template lang="pug">
.works-page
  .works-page__contents
    .works-page__contents__item(v-for="item in works" :style="{backgroundImage:'url('+item.THUMBNAIL.url+'?auto=compress&w=600&h=600)'}")
      p {{item.TITLE}}
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    works: {
      type: Array,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.works-page {
  @include full-screen;
  display: flex;
  align-items: center;
  backdrop-filter: blur(20px);
  &__contents {
    display: flex;
    @include gap-right(80px);
    &__item {
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 560px;
      width: 350px;
    }
  }
}
</style>
