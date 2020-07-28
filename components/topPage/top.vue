<template lang="pug">
.top-page
  .top-page__title
    h1.top-page__title__text DIFFERENT<br>FROM<br>OTHERS!!
  .top-page__copylight
    h2.top-page__copylight__text ©2020
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.top-page {
  @include full-screen;
  position: relative;
  &__title {
    position: absolute;
    bottom: $pri-value;
    left: $pri-value;
    &__text {
      @include font-title-first;
    }
  }
  &__copylight {
    position: absolute;
    bottom: $pri-value;
    right: $pri-value;
    &__text {
      @include font-copylight;
    }
  }
}
</style>
