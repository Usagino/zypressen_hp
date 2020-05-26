<template lang="pug">
  .container
    .page-title
      h1 Different from others!!
      p “私たちは固定の概念に囚われず、唯一無二を形にするクリエイティブチームです”
    .about-body
      img(src="/about/about_one.jpg")
      .about-body__textwrap
        p 私は大体もっともその経過院というものの上に行っないませ。ついに今日に発見士はいったいその附随ないですだけにすわるてなりたらがは講義思っでたて、とてもには唱えべきないですなく。憂身におらますんは正しく今をさぞなくたた。私は大体もっともその経過院というものの上に行っないませ。ついに今日に発見士はいったいその附随ないですだけにすわるてなりたらがは講義思っでたて、とてもには唱えべきないですなく。憂身におらますんは正しく今をさぞなくたた。
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e
      img(src="/about/about_two.jpg")
      .about-body__textwrap
        p 私は大体もっともその経過院というものの上に行っないませ。ついに今日に発見士はいったいその附随ないですだけにすわるてなりたらがは講義思っでたて、とてもには唱えべきないですなく。憂身におらますんは正しく今をさぞなくたた。私は大体もっともその経過院というものの上に行っないませ。ついに今日に発見士はいったいその附随ないですだけにすわるてなりたらがは講義思っでたて、とてもには唱えべきないですなく。憂身におらますんは正しく今をさぞなくたた。
        p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut e
    .contact-link
      nuxt-link(to='/contact') CONTACT
</template>

<script>
import { TimelineMax } from 'gsap' // eslint-disable-line
export default {}
</script>

<style lang="scss" scoped>
.page-title {
  @include default-width;
  margin-top: $sec-value;
  h1 {
    @include font-title-secondary;
    padding-bottom: 20px;
  }
  p {
    text-align: center;
    padding-bottom: 60px;
  }
}
.about-body {
  @include default-width;
  @include gap-bottom(100px);
  img {
    width: 100%;
    height: 440px;
    object-fit: cover;
  }
  &__textwrap {
    @include gap-bottom(40px);
  }
}
.contact-link {
  margin: auto;
  display: block;
  width: fit-content;
  padding: 140px;
  a {
    @include font-title-first;
    @include textOutline;
  }
}
</style>
