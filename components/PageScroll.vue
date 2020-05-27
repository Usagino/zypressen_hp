<template lang="pug">
.page-scroll
  svg(
    :viewBox="`0 0 ${Size} ${Size}`"
    :width="Size"
    :height="Size"
    transform="rotate(-90)"
    xmlns="http://www.w3.org/2000/svg")
    circle(
      stroke="#7A7A7A"
      stroke-width="2"
      fill-opacity="0"
      :cx="Size / 2"
      :cy="Size / 2"
      :r="Size/2 - 4")
    circle(
      :stroke-dasharray='Percentage+" "+MaxSize'
      stroke="#FF3D00"
      stroke-width="2"
      fill-opacity="0"
      :cx="Size / 2"
      :cy="Size / 2"
      :r="Size/2 - 4")
</template>

<script>
export default {
  data() {
    return {
      Size: 68,
      Percentage: 0,
      MaxSize: 0
    }
  },
  mounted() {
    this.MaxSize = this.Size * 3.14

    this.scrllAnimation()
    window.onscroll = () => {
      this.Percentage = this.scrllAnimation()
    }
    window.onresize = () => {
      this.Percentage = this.scrllAnimation()
    }
  },
  methods: {
    scrllAnimation() {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const y = document.documentElement.scrollTop
      const percentageHeight = (y / scrollHeight) * (this.Size * 3.14)
      return percentageHeight
    }
    // canScroll() {
    //   if (process.browser) {
    //     const cHeight = document.documentElement.scrollHeight
    //     const bHeight = window.parent.screen.height
    //     if (cHeight - bHeight > 0) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
.page-scroll {
  position: fixed;
  bottom: $pri-value;
  left: $pri-value;
  z-index: 500;
  width: fit-content;
  height: fit-content;
  @include mq(sm) {
    transform: scale(0.5);
    transform-origin: bottom left;
    bottom: 32px;
    left: 32px;
  }
}
</style>
