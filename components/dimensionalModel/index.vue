<template lang="pug">
  .webgl(:ref='this.$ua.deviceType()' v-show="this.$route.name !== 'works-page'")
    canvas(ref='canvas')
</template>

<script>
import WebglWrap from './js/index.js'
export default {
  name: 'DimensionalModel',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {
    // canvas要素を渡す。
    this.webglWrap = new WebglWrap({
      $canvas: this.$refs.canvas,
      $device: this.$refs.pc
    })
  },
  destroyed() {
    // canvasを作ったり壊したりする前提の場合はここに処理停止する処理を書く（今回省略）。
  }
}
</script>

<style lang="scss" scoped>
.webgl {
  position: fixed;
  @include full-screen;
  z-index: -10;
  top: 0;
  left: 0;
}
</style>
