<template lang="pug">
  .container
    .about
      .about__lang
        .about__lang__wrap
          p.about__lang__wrap--ja(@click="changeJa()") JP
          p.about__lang__wrap--en(@click="changeToEn()") EN
          span.about__lang__wrap__bar
      .about__titlewrap
        .about__titlewrap__aboutwrap
          p.about__titlewrap--aboutus  ABOUT US
        .about__titlewrap__h1wrap
          h1 Different from others!!
        .about__titlewrap__explanationwrap.explanationwrap_ja
          p.about__titlewrap--explanation “私たちは固定の概念に囚われず、唯一無二を形にするクリエイティブチームです”
        .about__titlewrap__explanationwrap.explanationwrap_en
          p.about__titlewrap--explanation "We're a creative team that doesn't get caught up in fixed concepts and gives shape to the one and only."
      .about__textwrap.about__textwrap--ja
        p 複素数体であれば、任意のCM-タイプの A は、実際、数体である定義体（英語版）(field of definition)を持っている。自己準同型環の可能なタイプは、対合（ロサチの対合（英語版）(Rosati involution）をもつ環として既に分類されていて、CM-タイプのアーベル多様体の分類を導き出す。楕円曲線と同じような方法でCM-タイプの多様体を構成するには、Cd の中の格子 Λ から始め、アーベル多様体のリーマンの関係式（英語版）(Riemann relations)を考えに入れる必要がある。 CM-タイプ(CM-type)は、単位元での A の正則接空 の（最大）可換部分環 L の作用を記述したものである。単純な種類のスペクトル理論が適応され、L が固有ベクトルの基底を通して作用することを示すことができる。
      .about__textwrap.about__textwrap--en
        p If it is a complex number body, then any CM- type A has a field of definition (English version) that is, in fact, a number body. The possible types of self-isomorphic rings have already been classified as rings with counterparts (Rosati's counterparts (English version) (Rosati involution), leading to the classification of CM-types of Abelian manifolds. To construct a CM-type manifold in the same way as an elliptic curve, it is necessary to start with the lattice Λ in Cd and take into account Riemann relations (English version) of the Arbel manifold. The CM-type describes the action of the (maximum) commutative partial ring L of the regular tangent of A in the unit source. A simple kind of spectral theory can be adapted to show that L acts through the basis of eigenvectors.
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
    this.notScroll()
    this.titleAnimate()
    this.textAnimate()
    this.langAnimate()
  },
  methods: {
    titleAnimate() {
      const tl = new TimelineMax()
      tl.set('.about__lang__wrap--en', {
        color: 'rgba(122,122,122,1)'
      }).set('.about__lang__wrap--ja', {
        color: 'rgba(255,255,255,1)'
      })
      tl.set('.explanationwrap_en', { display: 'none' })
        .to('.about__titlewrap--aboutus', 0.5, {
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
        .to('.explanationwrap_ja .about__titlewrap--explanation', 0.5, {
          y: '0%',
          rotate: '0deg',
          ease: 'ease-in'
        })
    },
    textAnimate() {
      const textboxJa = document.querySelector('.about__textwrap--ja p')
      const textJa = textboxJa.textContent
      textboxJa.innerHTML = null
      textJa.split('').forEach((c) => {
        textboxJa.innerHTML +=
          '<span class="about__fontwrap"><span class="about__fontwrap__font font_ja">' +
          c +
          '</span></span>'
      })
      const textboxEn = document.querySelector('.about__textwrap--en p')
      const textEn = textboxEn.textContent
      textboxEn.innerHTML = null
      textEn.split('').forEach((c) => {
        textboxEn.innerHTML +=
          '<span class="about__fontwrap"><span class="about__fontwrap__font font_en">' +
          c +
          '</span></span>'
      })
      const tl = new TimelineMax()
      tl.set('.about__textwrap--en', { display: 'none' })
      tl.to('.about__textwrap--ja', 0, { opacity: 1 }).to('.font_ja', 2, {
        x: '0%',
        rotate: '0deg',
        delay: 2,
        ease: 'ease-in'
      })
    },
    langAnimate() {
      const tl = new TimelineMax()
      tl.to('.about__lang', 0.2, { opacity: 1, delay: 2.1 })
    },
    changeLang() {
      this.lang = !this.lang
    },
    changeToEn() {
      if (this.lang) {
        this.changeLang()
        const tl = new TimelineMax()
        // explanation
        tl.set('.about__lang__wrap--ja', {
          color: 'rgba(122,122,122,1)'
        }).set('.about__lang__wrap--en', {
          color: 'rgba(255,255,255,1)'
        })
        tl.to('.about__lang__wrap__bar', 0.3, { left: '32px' })
        tl.to('.explanationwrap_ja .about__titlewrap--explanation', 1, {
          y: '100%'
        })
          .set('.explanationwrap_ja', { display: 'none' })
          .set('.explanationwrap_en', { display: 'block' })
          .to('.explanationwrap_en p', 1, { y: '0%' })
        // text
        tl.to('.font_ja', 1, { y: '100%' })
          .set('.about__textwrap--ja', { display: 'none' })
          .set('.font_en', { y: '100%' })
          .set('.about__textwrap--en', { display: '', opacity: 1 })
          .to('.font_en', 1, { y: '0%' })
      }
    },
    changeJa() {
      if (!this.lang) {
        this.changeLang()
        const tl = new TimelineMax()
        // explanation
        tl.set('.about__lang__wrap--en', {
          color: 'rgba(122,122,122,1)'
        }).set('.about__lang__wrap--ja', {
          color: 'rgba(255,255,255,1)'
        })
        tl.to('.about__lang__wrap__bar', 0.3, { left: '0px' })
        tl.to('.explanationwrap_en p', 1, {
          y: '100%'
        })
          .set('.explanationwrap_en', { display: 'none' })
          .set('.explanationwrap_ja', { display: 'block' })
          .to('.explanationwrap_ja p', 1, {
            y: '0%'
          })
        // text
        tl.to('.font_en', 1, { y: '100%' })
          .set('.about__textwrap--en', {
            display: 'none',
            opacity: 0
          })
          .set('.about__textwrap--ja', { display: 'block' })
          .to('.font_ja', 1, { y: '0%' })
      }
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
      position: relative;
      * {
        @include font-text-primary;
        font-size: 12px;
        cursor: pointer;
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
      &__bar {
        position: absolute;
        bottom: 0px;
        left: 0px;
        content: ' ';
        width: 15px;
        height: 2px;
        display: block;
        background: $color-white;
      }
    }
  }
  &__titlewrap {
    text-align: center;
    display: block;
    margin: auto;
    div {
      height: fit-content;
      overflow: hidden;
    }
    &--aboutus {
      @include font-title-secondary;
      transform: translateY(120%) rotate(5deg);
      transform-origin: left top;
    }
    h1 {
      @include font-title-secondary;
      transform: translateY(120%) rotate(5deg);
      transform-origin: left top;
    }
    &--explanation {
      @include font-text-primary;
      font-size: 16px;

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
      display: inline-block;
    }
  }
}
.font_ja {
  transform: translateX(200%) rotate(15deg);
}

.explanationwrap_ja p {
  transform: translateY(120%) rotate(5deg);
}
.explanationwrap_en {
  p {
    transform: translateY(120%);
  }
}
</style>
