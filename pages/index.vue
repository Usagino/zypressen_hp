<template lang="pug">
  .container
    MouseStoker
    PageHeader(:refs="this.$refs")
    PageIndicator(:refs="this.$refs")
    .background-movie
      img(src="/image/background.png")
    client-only
      swiper(:options="swiperOption" ref="pageSwiper" @slideChangeTransitionStart="slideChange")
        swiper-slide
          tp-top
        swiper-slide()
          .slide-contents
            h1 2
        swiper-slide
          tp-about
        swiper-slide
          tp-contact
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line

export default {
  data() {
    return {
      swiperOption: {
        speed: 1000,
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: {
          invert: false
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.pageSwiper.$swiper
    }
  },
  mounted() {
    this.slideChange()
  },
  methods: {
    slideChange(e) {
      let index = 0
      if (e !== undefined) {
        index = e.snapIndex
        this.indicatorAnimation(index)
      } else {
        this.indicatorAnimation(index)
      }
    },
    indicatorAnimation(index) {
      console.log(index)
      gsap.utils.toArray('.page-indicator__meter').forEach((section, i) => {
        console.log(section)
        if (i === index) {
          gsap.to(section.querySelector('.page-indicator__meter__bar'), 0.3, {
            x: 0
          })
          gsap.to(section.querySelector('.page-indicator__meter__text'), 0.5, {
            color: 'white',
            scale: 1
          })
        } else {
          gsap.to(section.querySelector('.page-indicator__meter__bar'), 0.3, {
            x: '100%'
          })
          gsap.to(section.querySelector('.page-indicator__meter__text'), 0.5, {
            color: '',
            scale: 0.9
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include full-screen;
}
.background-movie {
  position: fixed;
  z-index: -1;
  @include full-screen;
  img {
    @include full-screen;
    object-fit: cover;
  }
}
.slide-contents {
  //scroll-snap-align: start;
  @include full-screen;
  @include flex-middle;
}
</style>
