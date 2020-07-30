<template lang="pug">
  .container
    MouseStoker
    PageHeader(:refs="this.$refs")
    PageIndicator(:refs="this.$refs")
    .scrollButton(@click="nextSlide")
      p.scrollButton__text scroll
      .scrollButton__bar
    .background-movie
      img(src="/image/background.png")
    client-only
      swiper(
        :options="swiperOption"
        ref="pageSwiper"
        @ready="swiperRedy"
        @slideChangeTransitionStart="slideChangeStart"
        @slideChangeTransitionEnd="slideChangeEnd")
        swiper-slide
          tp-top(ref="topPage")
        swiper-slide
          tp-works(ref="worksPage" :works="this.data")
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
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.slideChangeEnd()
  },
  methods: {
    setTimeoutAsync(delay) {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, delay)
      })
    },
    nextSlide() {
      const swiper = this.$refs.pageSwiper.$swiper // eslint-disable-line
      swiper.slideNext(1000)
    },
    swiperRedy(e) {
      this.slideChangeEnd(e)
      this.slideChangeStart(e)
    },
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
            this.$refs.topPage.enterAnime()
            this.$refs.worksPage.offAnime()
            break
          case 1:
            this.$refs.worksPage.enterAnime()
            this.$refs.aboutPage.offAnime()
            this.$refs.topPage.offAnime()
            break
          case 2:
            this.$refs.aboutPage.enterAnime()
            this.$refs.worksPage.offAnime()
            this.$refs.topPage.offAnime()
            // this.$refs.contactPage.offAnime()
            break
          case 3:
            this.$refs.contactPage.enterAnime()
            this.$refs.aboutPage.offAnime()
            this.$refs.topPage.offAnime()
            break
        }
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
    aboutEnter() {
      const targetAll = this.aboutPageEl.querySelectorAll(
        '.about-page__textwrap__item'
      )
      targetAll.forEach((item, i) => {
        gsap.to(item.querySelector('p'), 0.3, { x: '0%', delay: i * 0.01 })
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
.scrollButton {
  position: fixed;
  bottom: 0;
  z-index: 10;
  left: 0;
  right: 0;
  margin: auto;
  @include just-fitsize;
  @include flex-middle;
  flex-direction: column;
  cursor: pointer;
  &__text {
    padding-bottom: 20px;
    @include font-text-en;
    font-size: 16px;
  }
  &__bar {
    content: '';
    height: 32px;
    width: 1px;
    display: block;
    background: $color-white;
  }
}
</style>
