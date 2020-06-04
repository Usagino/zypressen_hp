<template lang="pug">
.mouse-stoker
  span
</template>

<script>
import { TweenMax } from 'gsap'// eslint-disable-line
export default {
  mounted() {
    console.log('こんんちわ')
    window.onmousemove = (e) => {
      console.log(e.pageX, e.pageY)
      TweenMax.set('.mouse-stoker', { x: e.pageX, y: e.pageY })
    }
  }
}
</script>

<style lang="scss" scoped>
.mouse-stoker {
  will-change: transform;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 12px;
  width: 12px;
  border-radius: 100%;
  background: $color-orange;
  pointer-events: none;
}
</style>
