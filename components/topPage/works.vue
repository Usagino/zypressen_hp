<template lang="pug">
  .works-page
    .works-page__contents
      .works-page__blur
      .swiper(v-swiper="swiperWorksOption")
        .swiper-wrapper(:style="{display:'flex'}")
          .swiper-slide.works-page__contents__item(
            v-for="item in works"
            :key="item.id"
            @click="linkPage(item.id)")
            img(:src="`${item.THUMBNAIL.url}?auto=compress&w=600&h=600`")
            p.works-page__contents__item__title {{item.TITLE}}
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
      windowImage: '',
      swiperWorksOption: {
        speed: 1000,
        slidesPerView: 'auto',
        spaceBetween: 100,
        slidesOffsetBefore: 320,
        slidesOffsetAfter: 320,
        direction: 'horizontal',
        autoplay: {
          delay: 5000
        }
      }
    }
  },
  methods: {
    linkPage(id) {
      const tl = gsap.timeline()
      const obj = this.works.find((e) => e.id === id)
      this.windowImage = obj.THUMBNAIL.url
      console.log(this.windowImage)
      gsap.utils
        .toArray('.works-page__contents .swiper-slide')
        .forEach((section, i) => {
          gsap.to(
            section.querySelector('.works-page__contents__item img'),
            0.8,
            {
              clipPath: 'inset(0 0% 0% 100%)',
              delay: 0.2 * i,
              ease: 'expo.out',
              onComplete: () => {
                gsap.set('.works-page__contents__item', {
                  pointerEvents: 'none'
                })
              }
            }
          )
        })
      tl.to('.page-indicator', 0.4, {
        x: '100%',
        delay: 0.6,
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
      gsap.utils
        .toArray('.works-page__contents .swiper-slide')
        .forEach((section, i) => {
          gsap.to(
            section.querySelector('.works-page__contents__item img'),
            0.8,
            {
              clipPath: 'inset(0 0% 0% 0%)',
              delay: 0.2 * i,
              ease: 'expo.out',
              onComplete: () => {
                gsap.set('.works-page__contents__item', {
                  pointerEvents: 'auto'
                })
              }
            }
          )
        })
    },
    offAnime() {
      gsap.set('.works-page__blur', {
        backdropFilter: 'blur(0px)'
      })
      gsap.set('.works-page__contents__item img', {
        clipPath: 'inset(0 100% 0 0%)'
      })
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
    &:active {
      cursor: grabbing;
    }
    &__item {
      height: 560px;
      width: 350px;
      display: inline-block;
      position: relative;
      overflow: hidden;
      pointer-events: none;
      cursor: pointer;
      &:last-child {
        padding-right: 320px;
        box-sizing: border-box;
      }
      &:active {
        cursor: grabbing;
      }
      img {
        clip-path: inset(0 100% 0 0%);
        @include full-size;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }
      &__title {
        width: 100%;
        position: absolute;
        bottom: -52px;
        text-align: center;
        @include font-text-en;
        font-size: 36px;
        line-height: 50px;
        transition: bottom 0.5s ease;
      }
      &:hover > p {
        // transition: translateY(0%);
        bottom: 52px;
      }
    }
  }
}
</style>
