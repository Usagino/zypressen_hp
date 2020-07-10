<template lang="pug">
  .container.about-page
    ScrollBar
    MouseStoker
    .about-page__wrap
      .page-title
        h1
          span.page-title__wrap(v-for="text in this.titleText.split(' ')")
            span.page-title__wrap--text {{text}}
      .about-body
        img(:src="this.changeWebpLocal('/about/about_one.jpg')")
        .about-body__textwrap
          p Zypressenはデジタルプロダクトデザインをつくるクリエイティブチームです。固定概念に囚われずチームの一人一人が常に最先端のフィロソフィーを持って活動しています。一人一人がそれぞれ動画やグラフィック、webデザインやモーションを専攻に吸収し、それぞれのデザインを複合して新た「デザインコンプレックス」に価値を見出しています。<br>私たちのデザインは常に他とは違う新しいものを作るために、今まで先人たちが築き上げてきたものを観察し吸収して今までにない新たな価値を見出しています。<br>そして私たちはこれを「Different from the Others」と呼んでいます。
          p Zypressen is a creative team that creates digital product design. Each member of the team is not confined to stereotypes, but always works with a cutting-edge philosophy. Each one of us has absorbed video, graphics, web design and motion in our major. We find value in the new "design complex" by combining each design.<br>Our designs are always trying to create something new and different, something that our predecessors have built up over the years We observe and absorb things and find new values that have never been seen before. <br>And we call this "Different from the Others". It is.
      .contact-link
        nuxt-link(to='/contact') CONTACT
</template>

<script>
import { TimelineMax,TweenMax } from 'gsap' // eslint-disable-line
export default {
  data() {
    return {
      titleText: 'DIFFERENT FROM OTHERS!!'
    }
  },
  mounted() {
    const tl = new TimelineMax()
    tl.to('.page-title__wrap--text', 0.3, {
      y: '0%',
      delay: 2
    })
      .to('.about-body img', 0.3, { y: '0%' })
      .set('.about-page', {
        overflow: 'scroll',
        height: 'auto'
      })
  }
}
</script>

<style lang="scss" scoped>
.about-page {
  height: 100vh;
  overflow: hidden;
}
.about-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 1px 1px;
  grid-template-areas: 'main main main . .';
  @include default-width;
  &__wrap {
    grid-area: main;
    padding: $sec-value 0;
  }
}
.page-title {
  box-sizing: border-box;
  height: calc(var(--wh, 100vh) - #{$sec-value} * 2);
  @include flex-middle;
  h1 {
    @include font-title-secondary;

    span {
      display: inline-block;
    }
  }
  &__wrap {
    overflow: hidden;
    height: fit-content;
    &--text {
      transform: translateY(100%);
    }
  }

  @include mq(sm) {
    margin-top: 100px;
  }
}
.about-body {
  @include gap-bottom(100px);
  @include mq(sm) {
    @include gap-bottom(60px);
    max-width: 100vw;
    padding: 0px;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    margin: 0 auto;
    display: block;
    box-sizing: border-box;
    transform: translateY(100%);
    @include mq(sm) {
      padding: 0px;
      height: 240px;
    }
  }
  p {
    @include font-text-primary;
    @include mq(sm) {
      padding: 0px 0px;
    }
  }
  &__textwrap {
    @include gap-bottom(40px);
    margin: 0 auto;
    display: block;
    @include mq(sm) {
      @include default-width;
    }
  }
}
.contact-link {
  margin: auto;
  display: block;
  width: fit-content;
  padding: 140px 0;
  a {
    @include font-title-secondary;
    @include text-outline;
  }
  @include mq(sm) {
    padding: $pri-value 0px;
    a {
      color: $color-white;
    }
  }
}
</style>
