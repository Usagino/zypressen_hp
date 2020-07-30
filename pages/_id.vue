<template lang="pug">
.container
  MouseStoker
  PageHeader
  .first-wrap
    .scrollButton(@click="scrollToSecond()")
      p.scrollButton__text scroll
      .scrollButton__bar
    .first-wrap__imagebox
    .first-wrap__title-container
      img.first-wrap__title-container__image(:src="`${this.data.THUMBNAIL.url}?auto=compress`")
    h1.first-wrap__title-text
      .first-wrap__title-text__item(v-for="text in data.TITLE.split(' ')")
         span {{text}}
  .second-wrap
    .second-wrap__infomation
      p CREATED<br>{{this.$dayjs(data.DATE).format('MMM , DD , YYYY')}}
      .second-wrap__infomation__colors
        .second-wrap__infomation__colors__item(v-for="color in data.COLOR" :style="{backgroundColor:color.COLOR}")
    .second-wrap__text
      p {{data.BODY_EN}}
  .third-wrap
    .third-wrap__image-wrap(v-for="image in data.IMAGE")
      img.third-wrap__image-wrap__image(:src="`${image.IMAGE.url}?auto=compress&w=1440&h=900`")
  .fourth-wrap
    h2 {{data.TITLE}}
    .scrollButton(@click="backTopPage()")
      p.scrollButton__text back
      .scrollButton__bar
</template>

<script>
import { gsap } from 'gsap' // eslint-disable-line
import { ScrollTrigger } from "gsap/ScrollTrigger";  // eslint-disable-line
import { ScrollToPlugin } from "gsap/ScrollToPlugin";  // eslint-disable-line
gsap.registerPlugin(ScrollToPlugin)
export default {
  async asyncData({ app, params }) {
    const { data } = await app.$axios.get(
      `https://zypressen.microcms.io/api/v1/works/${params.id}`,
      {
        headers: { 'X-API-KEY': process.env.CMSKEY }
      }
    )
    // console.log(data)
    return {
      data
    }
  },
  mounted() {
    this.enterAnime()
  },
  methods: {
    backTopPage() {
      const tl = gsap.timeline()
      tl.to(window, {
        duration: 0.5,
        scrollTo: { y: '.first-wrap' }
      })
        .set('.first-wrap__title-text', {
          onComplete: () => {
            gsap.utils
              .toArray('.first-wrap__title-text__item')
              .forEach((section, i) => {
                gsap.to(section.querySelector('span'), 0.6, {
                  x: '150%',
                  delay: i * 0.2
                })
              })
          }
        })
        .to('.first-wrap__title-container__image', 0.4, {
          clipPath: 'inset(0 0% 0% 100%)',
          delay: 0.7
        })
        .to('.first-wrap__imagebox', 0.4, {
          filter: 'blur(0px)',
          onComplete: () => {
            this.$router.push(`/`)
          }
        })
    },
    enterAnime() {
      gsap.to('.first-wrap__title-container__image', 1, {
        clipPath: 'inset(0 0% 0% 0%)',
        delay: 1,
        onComplete: () => {
          gsap.utils
            .toArray('.first-wrap__title-text__item')
            .forEach((section, i) => {
              gsap.to(section.querySelector('span'), 0.6, {
                x: '0%',
                delay: i * 0.2
              })
            })
        }
      })
    },
    scrollToSecond() {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: '.second-wrap' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: $color-purple;
}
.first-wrap {
  @include full-screen;
  position: relative;
  @include flex-middle;
  &__imagebox {
    position: absolute;
    top: 0;
    left: 0;
    @include full-size;
    background: url('/image/background.png');
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    filter: blur(20px);
  }
  &__title-container {
    @include full-screen;
    position: absolute;
    z-index: 1;
    &__image {
      @include absolute-middle;
      height: 70vh;
      width: 488px;
      object-fit: cover;
      clip-path: inset(0 100% 0 0%);
    }
  }
  &__title-text {
    @include absolute-middle;
    @include just-fitsize;
    z-index: 10;
    @include flex-middle;
    flex-direction: column;
    &__item {
      overflow: hidden;
      span {
        text-align: center;
        @include font-title-first;
        @include just-fitsize;
        display: inline-block;
        transform: translateX(-150%);
      }
    }
  }
}
.second-wrap {
  padding: 200px 0px;
  margin: auto;
  width: 920px;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  & * p {
    @include font-text-en;
    font-size: 16px;
    line-height: 180%;
    letter-spacing: 2.2px;
  }
  &__text {
    width: 100%;
    p {
    }
  }
  &__infomation {
    width: 200px;
    margin-right: 200px;
    &__colors {
      margin-top: 32px;
      display: flex;
      &__item {
        width: 32px;
        height: 8px;
        display: block;
        content: '';
      }
    }
  }
}
.third-wrap {
  width: 1100px;
  margin: auto;
  @include gap-bottom(100px);
  &__image-wrap {
    &__image {
      width: 100%;
      height: 640px;
      object-fit: cover;
    }
  }
}
.fourth-wrap {
  padding: 240px 0;
  position: relative;
  h2 {
    @include font-title-first;
    text-align: center;
  }
}
</style>
<style lang="scss">
.scrollButton {
  pointer-events: auto;
}
</style>
