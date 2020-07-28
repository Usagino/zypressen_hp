<template lang="pug">
  .container
    MouseStoker
    PageHeader(:refs="this.$refs")
    PageIndicator(:refs="this.$refs")
    .background-movie
      img(src="/image/background.png")
    swiper(
      :options="swiperOption"
      ref="pageSwiper"
      @slideChangeTransitionStart="slideChangeStart"
      @slideChangeTransitionEnd="slideChangeEnd")
      swiper-slide
        tp-top(ref="topPage")
      swiper-slide
        tp-works(:works="this.data" ref="worksPage")
      swiper-slide
        tp-about(ref="aboutPage")
      swiper-slide
        tp-contact(ref="contactPage")
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line

export default {
  async asyncData({ app, params }) {
    const { data } = await app.$axios.get(
      'https://zypressen.microcms.io/api/v1/works/',
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    return {
      data: data.contents
    }
  },
  data() {
    return {
      activeTopToggle: false,
      activeWorksToggle: false,
      activeAboutToggle: false,
      activeContactToggle: false,
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
    },
    topPageEl() {
      return this.$refs.topPage.$el
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.topEnter()
    })
    this.slideChangeStart()
    this.slideChangeEnd()
  },
  methods: {
    slideChangeStart(e) {
      let index = 0
      if (e !== undefined) {
        index = e.snapIndex
        this.indicatorAnimation(index)
      } else {
        this.indicatorAnimation(index)
      }
    },
    slideChangeEnd(e) {
      if (e !== undefined) {
        switch (e.snapIndex) {
          case 0:
            this.activeTopToggle = true
            break
          case 1:
            this.activeWorksToggle = true
            break
          case 2:
            this.activeAboutToggle = true
            break
          case 3:
            this.activeContactToggle = true
            break
        }
      } else {
        this.activeTopToggle = true
      }
    },
    indicatorAnimation(index) {
      gsap.utils.toArray('.page-indicator__meter').forEach((section, i) => {
        if (i === index) {
          gsap.to(section.querySelector('.page-indicator__meter__bar'), 0.8, {
            x: 0
          })
          gsap.to(section.querySelector('.page-indicator__meter__text'), 0.9, {
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
    },
    topEnter() {
      const getEl = (el) => {
        return this.topPageEl.querySelector(el)
      }
      gsap.to(getEl('.top-page__title__wrap:nth-child(1) > span'), 0.8, {
        x: '0%'
      })
      gsap.to(getEl('.top-page__title__wrap:nth-child(2) > span'), 0.8, {
        x: '0%',
        delay: 0.1
      })
      gsap.to(getEl('.top-page__title__wrap:nth-child(3) > span'), 0.8, {
        x: '0%',
        delay: 0.2
      })
      gsap.to(getEl('.top-page__copylight__text'), 0.8, {
        x: '0%',
        delay: 0.3
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
