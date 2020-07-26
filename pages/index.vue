<template lang="pug">
  .container
    MouseStoker
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line
import { ScrollToPlugin } from "gsap/ScrollToPlugin";  // eslint-disable-line

export default {
  data() {
    return {
      screenHeight: 0,
      linkData: [
        {
          name: 'WORKS',
          link: '/works'
        },
        {
          name: 'ABOUT',
          link: '/about'
        },
        {
          name: 'CONTACT',
          link: '/contact'
        }
      ]
    }
  },
  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
