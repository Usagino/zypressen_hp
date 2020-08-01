<template lang="pug">
  .works-page
    .works-page__contents
      .works-page__blur
      transition(name="title")
        .works-page__contents__title-box(
          v-if="titleFade"
          @click="linkPage(slideChangeIndex)")
          h2 {{works[slideChangeIndex].TITLE}}
      carousel(
        :loop="true"
        :autoplayTimeout="5000"
        :per-page="1"
        :paginationEnabled="false"
        @pageChange="onPageChange"
        @transitionStart="startChange"
        @transitionEnd="endChange")
        slide.slide-item(
          v-for="item in works"
          :key="item.id"
          :style="{background:`url(${item.THUMBNAIL.url}?auto=compress)`}")
          //.slide-item__image(:style="{background:`url(${item.THUMBNAIL.url}?auto=compress)`}")
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line

export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    works: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      titleFade: true,
      slideIndex: 0,
      slideChangeIndex: 0,
      windowImage: ''
    }
  },
  methods: {
    onPageChange(index) {
      this.slideIndex = index
    },
    startChange() {
      this.titleFade = false
    },
    endChange() {
      this.slideChangeIndex = this.slideIndex
      this.titleFade = true
    },
    linkPage(index) {
      const tl = gsap.timeline() // eslint-disable-line
      const id = this.works[index].id
      console.log(id)
      tl.to('.VueCarousel', 0.4, {
        clipPath: 'inset(0% 0% 0% 100%)'
      })
        .to('.works-page__contents__title-box h2', 0.4, {
          x: '100%'
        })
        .set('.works-page', {
          // position: 'fixed',
          onComplete: () => {
            this.$router.push(`/${id}`)
          }
        })
    },
    enterAnime() {
      const tl = gsap.timeline() // eslint-disable-line
      gsap.to('.works-page__blur', 1, {
        backdropFilter: 'blur(20px)'
      })
      // gsap.utils
      //   .toArray('.works-page__contents .swiper-slide')
      //   .forEach((section, i) => {
      //     gsap.to(
      //       section.querySelector('.works-page__contents__item img'),
      //       0.8,
      //       {
      //         clipPath: 'inset(0 0% 0% 0%)',
      //         delay: 0.2 * i,
      //         ease: 'expo.out',
      //         onComplete: () => {
      //           gsap.set('.works-page__contents__item', {
      //             pointerEvents: 'auto'
      //           })
      //         }
      //       }
      //     )
      //   })
    },
    offAnime() {
      // gsap.set('.works-page__blur', {
      //   backdropFilter: 'blur(0px)'
      // })
      // gsap.set('.works-page__contents__item img', {
      //   clipPath: 'inset(0 100% 0 0%)'
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.works-page {
  @include full-screen;
  display: flex;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  z-index: 20;
  &__blur {
    @include full-screen;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    backdrop-filter: blur(20px);
  }
  &__contents {
    display: flex;
    width: 100vw;
    cursor: grab;
    position: relative;
    @include flex-middle;
    &:active {
      cursor: grabbing;
    }
    &__title-box {
      @include just-fitsize;
      @include absolute-middle;
      z-index: 2;
      overflow: hidden;
      @include mq(sm) {
        bottom: 20px;
        top: auto;
      }
      h2 {
        cursor: pointer;
        @include font-title-first;
        font-size: 120px;
        text-align: center;
        transform: translateX(0%);
        @include mq(sm) {
          font-size: 32px;
          letter-spacing: 0.02em;
          line-height: 44px;
          text-indent: 0px;
        }
      }
    }
  }
}
.slide-item {
  @include full-size;
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed;
}
</style>
<style lang="scss">
.VueCarousel {
  height: 70vh;
  width: 500px;
  clip-path: inset(0% 0% 0% 0%);
  @include mq(sm) {
    width: 80vw;
  }
}
.VueCarousel-wrapper,
.VueCarousel-inner,
.VueCarousel-slide {
  width: 100% !important;
  height: 100% !important;
}
.VueCarousel-slide .slider-inner {
  @include full-size;
}

.title-enter-active,
.title-leave-active {
  transition: all 0.5s;
}
.title-leave,
.title-enter-to {
  opacity: 1;
}
.title-enter,
.title-leave-to {
  opacity: 0;
}
</style>
