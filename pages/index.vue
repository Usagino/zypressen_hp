<template lang="pug">
.container
  nuxt-link(to="/test") test
  telphoneBox
</template>

<script>
export default {
  methods: {
    hoge() {
      console.log(this.$nuxt.$emit)
    }
  }
}
</script>

<style lang="scss">
.container {
  color: $color-orange;
}
</style>
