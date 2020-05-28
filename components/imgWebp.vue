<template lang="pug">
  picture
    source(:srcset="webpSrc" type="image/webp")
    img(:src="imgSrc")
</template>

<script>
export default {
  props: {
    webpSrc: {
      default: 'hoge',
      type: String
    },
    imgSrc: {
      default: 'hoge',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
