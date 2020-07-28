<template lang="pug">
.about-page
  .about-page__textwrap
    .about-page__textwrap__item(v-for="text in texts.split(' ')")
      p {{text}}
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      texts:
        'ZYPRESSEN IS A CREATIVE TEAM THAT CREATES DIGITAL PRODUCT DESIGN. EACH MEMBER OF THE TEAM IS FREE FROM STEREOTYPES AND ALWAYS AT THE FOREFRONT OF PHILOSOPHY. OUR DESIGNS ARE BASED ON THE PHILOSOPHY THAT OUR PREDECESSORS HAVE BUILT TO CREATE SOMETHING NEW AND DIFFERENT. BY OBSERVING AND ABSORBING THINGS, WE ARE FINDING NEW VALUES THAT HAVE NEVER BEEN SEEN BEFORE. AND WE CALL IT "DIFFERENT FROM OTHERS".'
    }
  }
}
</script>

<style lang="scss">
.about-page {
  @include full-screen;
  display: flex;
  align-items: center;
  &__textwrap {
    margin-left: $pri-value;
    width: 560px;
    height: fit-content;
    &__item {
      display: inline-block;
      overflow: hidden;
    }
    p {
      @include font-text-en;
      margin-right: 0.5em;
      transform: translateX(-100%);
    }
  }
}
</style>
