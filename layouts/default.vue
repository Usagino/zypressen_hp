<template lang="pug">
  div.page
    nuxt-link.page__logo(to="/")
      img.page__logo__image(src="PageLogo.svg")
    .page__copylight
      p.page__copylight__text @2020ZYPRESSEN
      a.page__copylight__image(href="twitter.com")
        img(src="icon_twitter.svg")
      a.page__copylight__image(href="facebook.com")
        img(src="icon_facebook.svg")
      a.page__copylight__image(href="instagram.com")
        img(src="icon_instagram.svg")
    PageMenuIcon
    nuxt
</template>

<script>
export default {}
</script>

<style lang="scss">
html {
  background: $color-black;
}
.page {
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  &__logo {
    position: fixed;
    top: 70px;
    left: 70px;
    height: 18px;
    font-size: medium;
    z-index: 1000;
    img {
      height: 18px;
      width: auto;
    }
  }
  &__copylight {
    position: fixed;
    bottom: 70px;
    right: 70px;
    z-index: 1000;
    display: flex;
    @include gap-right(16px);

    &__image {
      font-size: medium;
      height: 16px;
      width: 16px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
