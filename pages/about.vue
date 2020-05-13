<template lang="pug">
  .container
    .about
      .about__lang
        .about__lang__wrap
          p.about__lang__wrap--ja(@click="changeLang()" :class="{gray:!lang}") JP
          p.about__lang__wrap--en(@click="changeLang()" :class="{gray:lang}") EN
      .about__titlewrap
        .about__titlewrap__aboutwrap
          p.about__titlewrap--aboutus  ABOUT US
        .about__titlewrap__h1wrap
          h1 Different from others!!
        .about__titlewrap__explanationwrap
          p.about__titlewrap--explanation(v-if="lang") “私たちは固定の概念に囚われず、唯一無二を形にするクリエイティブチームです”
          p.about__titlewrap--explanation(v-else) "We're a creative team that doesn't get caught up in fixed concepts and gives shape to the one and only."
      .about__textwrap
        p 複素数体であれば、任意のCM-タイプの A は、実際、数体である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。 CM-タイプ(CM-type)は、単位元での A の正則接空 の（最大）可換部分環 L の作用を記述したものである。単純な種類のスペクトル理論が適応され、L が固有ベクトルの基底を通して作用することを示すことができる。
      // .about__textwrap
        // p If it is a complex number body, then any CM- type A has a field of definition (English version) that is, in fact, a number body. The possible types of self-isomorphic rings have already been classified as rings with counterparts (Rosati's counterparts (English version) (Rosati involution), leading to the classification of CM-types of Abelian manifolds. To construct a CM-type manifold in the same way as an elliptic curve, it is necessary to start with the lattice Λ in Cd and take into account Riemann relations (English version) of the Arbel manifold. The CM-type describes the action of the (maximum) commutative partial ring L of the regular tangent of A in the unit source. A simple kind of spectral theory can be adapted to show that L acts through the basis of eigenvectors.
      .about__linkwrap
        nuxt-link(to="/contact") CONTACT
</template>

<script>
import { TimelineMax } from 'gsap'
export default {
  data() {
    return {
      lang: true
    }
  },
  mounted() {
    this.titleAnimate()
    this.textAnimate()
    this.langAnimate()
  },
  methods: {
    titleAnimate() {
      const tl = new TimelineMax()

      tl.to('.about__titlewrap--aboutus', 0.5, {
        y: '0%',
        rotate: '0deg',
        ease: 'ease-in',
        delay: 0.2
      })
        .to('.about__titlewrap__h1wrap h1', 0.5, {
          y: '0%',
          rotate: '0deg',
          ease: 'ease-in'
        })
        .to('.about__titlewrap--explanation', 0.5, {
          y: '0%',
          rotate: '0deg',
          ease: 'ease-in'
        })
    },
    textAnimate() {
      const textbox = document.querySelector('.about__textwrap p')
      const text = textbox.textContent

      textbox.innerHTML = null

      text.split('').forEach(function(c) {
        textbox.innerHTML +=
          '<span class="about__fontwrap"><span class="about__fontwrap__font">' +
          c +
          '</span></span>'
      })
      const tl = new TimelineMax()
      tl.to('.about__textwrap', 0, { opacity: 1 }).to(
        '.about__fontwrap__font',
        2,
        {
          x: '0%',
          rotate: '0deg',
          delay: 2,
          ease: 'ease-in'
        }
      )
    },
    langAnimate() {
      const tl = new TimelineMax()
      tl.to('.about__lang', 0.2, { opacity: 1, delay: 2.1 })
    },
    changeLang() {
      this.lang = !this.lang
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include full-screen;
  @include flex-middle;
  @include mq(sm) {
    height: fit-content;
  }
}
.about {
  width: 800px;
  height: fit-content;
  align-items: center;
  position: relative;
  padding-top: 24px;
  & * {
    display: inline-block;
  }
  @include gap-bottom(32px);
  &__lang {
    position: absolute;
    top: 0px;
    right: 0px;
    opacity: 0;
    &__wrap {
      * {
        @include font-text-primary;
        font-size: 12px;
      }
      &--ja {
        margin-right: 8px;
      }
      &--en {
        margin-left: 8px;
      }
      .gray {
        color: $color-gray;
        cursor: pointer;
      }
    }
  }
  &__titlewrap {
    text-align: center;
    div {
      height: fit-content;
      overflow: hidden;
    }
    &--aboutus {
      @include font-title-secondry;
      font-size: 24px;
      transform: translateY(120%) rotate(5deg);
      transform-origin: left top;
      @include mq(sm) {
        font-size: 18px;
      }
    }
    h1 {
      @include font-title-secondry;
      font-size: 60px;
      transform: translateY(120%) rotate(5deg);
      transform-origin: left top;
      @include mq(sm) {
        font-size: 28px;
      }
    }
    &--explanation {
      @include font-text-primary;
      font-size: 16px;
      transform: translateY(120%) rotate(5deg);
      transform-origin: left top;
      @include mq(sm) {
        font-size: 14px;
      }
    }
    &__aboutwrap {
      width: 100%;
      margin-bottom: 12px;
    }
  }
  &__textwrap {
    opacity: 0;
    p {
      @include font-text-primary;
      overflow: hidden;
    }
  }
  &__linkwrap {
    width: 100%;
    @include flex-middle;
    a {
      margin: 0 auto;
      @include font-title-secondry;
      font-size: 18px;
      display: flex;
      flex-direction: column;
      &::after {
        content: ' ';
        height: 2px;
        width: 90%;
        margin: auto;
        margin-top: 8px;
        background: $color-white;
        display: inline-block;
      }
    }
  }
  @include mq(sm) {
    margin: 120px 40px;
  }
}
</style>
<style lang="scss">
.about {
  &__fontwrap {
    overflow: hidden;
    display: inline-block;
    &__font {
      transform: translateX(200%) rotate(15deg);
      display: inline-block;
    }
  }
}
</style>
