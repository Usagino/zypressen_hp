<template lang="pug">
.about-page
  .about-page__textwrap
    p ZYPRESSEN IS A CREATIVE TEAM THAT CREATES DIGITAL PRODUCT DESIGN. EACH MEMBER OF THE TEAM IS FREE FROM STEREOTYPES AND ALWAYS AT THE FOREFRONT OF PHILOSOPHY. OUR DESIGNS ARE BASED ON THE PHILOSOPHY THAT OUR PREDECESSORS HAVE BUILT TO CREATE SOMETHING NEW AND DIFFERENT. BY OBSERVING AND ABSORBING THINGS, WE ARE FINDING NEW VALUES THAT HAVE NEVER BEEN SEEN BEFORE. AND WE CALL IT "DIFFERENT FROM OTHERS".
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.about-page {
  @include full-screen;
  display: flex;
  align-items: center;
  &__textwrap {
    margin-left: $pri-value;
    width: 560px;
    height: fit-content;
    p {
      @include font-text-en;
    }
  }
}
</style>
