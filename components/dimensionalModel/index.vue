<template lang="pug">
  .webgl(:ref='this.$ua.deviceType()' v-show="this.$route.name !== 'works-page'")
    canvas(ref='canvas')
</template>

<script>
import WebglWrap from './js/index.js'
import EventBus from "~/utils/event-bus"; // eslint-disable-line

export default {
  name: 'DimensionalModel',
  components: {},
  props: [],
  data() {
    return {}
  },
  computed: {},
  watch: {
    '$route.name'(_new, _old) {
      EventBus.$emit('passingThePath', _new)
    }
  },
  mounted() {
    // canvas要素を渡す。
    EventBus.$emit('passingThePath', this.$route.name)
    this.webglWrap = new WebglWrap({
      $canvas: this.$refs.canvas,
      $device: this.$refs.pc,
      $path: this.$route.name
    })
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
