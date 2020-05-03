<template lang="pug">
  section.artwork
    canvas.artwork__canvas(ref="canvas")
</template>

<script>
import ArtworkGL from './js/ArtworkGL'

export default {
  name: 'Artwork',
  components: {},
  props: [],
  data() {
    // 基本的にはここにthree.jsのオブジェクトを追加しない。
    return {}
  },
  computed: {},
  mounted() {
    // canvas要素を渡す。
    this.artworkGL = new ArtworkGL({
      $canvas: this.$refs.canvas
    })
  }
}
</script>

<style>
/* スタイルなどお好みで*/
.artwork {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
}
</style>
