<template lang="pug">
.contact-page
  .contact-page__textwrap
    p PLEASE FEEL FREE TO CONTACT US ANYTIME. YOUR FRIENDLY NEIGHBOR ZYPRESSEN!!
    .contact-page__textwrap__social
      a(href="https://twitter.com/home" target="_blank") twitter
      a(href="https://twitter.com/home" target="_blank") instagram
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.contact-page {
  @include full-screen;
  display: flex;
  align-items: center;
  &__textwrap {
    margin-left: $pri-value;
    width: 560px;
    height: fit-content;
    p,
    a {
      @include font-text-en;
    }
    a {
      text-decoration: underline;
    }
    &__social {
      @include gap-right(20px);
    }
  }
}
</style>
